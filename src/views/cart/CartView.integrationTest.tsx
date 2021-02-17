import {
  fireEvent,
  render,
  RenderResult,
  waitFor,
  within,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from 'src/App';
import React from 'react';
import { VideoFactory } from 'boclips-api-client/dist/test-support/VideosFactory';
import { UserFactory } from 'boclips-api-client/dist/test-support/UserFactory';
import { BoclipsApiErrorFactory } from 'boclips-api-client/dist/test-support/BoclipsApiErrorFactory';
import { FakeBoclipsClient } from 'boclips-api-client/dist/test-support';
import { queryClientConfig } from 'src/hooks/api/queryClientConfig';
import { QueryClient } from 'react-query';

describe('CartView', () => {
  const video = VideoFactory.sample({
    id: 'video-id',
    title: 'news video',
    price: {
      amount: 600,
      currency: 'USD',
    },
    types: [{ name: 'NEWS', id: 2 }],
  });

  it('when no items in cart, displays empty cart view', async () => {
    const wrapper = renderCartView(new FakeBoclipsClient());

    await waitFor(async () => {
      expect(
        await wrapper.findByText('There are no items in your shopping cart'),
      ).toBeInTheDocument();
    });
  });

  it('when videos in cart, displays video player with information and prices', async () => {
    const fakeClient = new FakeBoclipsClient();

    fakeClient.videos.insertVideo(video);
    fakeClient.carts.insertCartItem({ videoId: 'video-id' });

    const wrapper = renderCartView(fakeClient);

    await waitFor(
      async () => {
        expect(await wrapper.findByText('Shopping cart')).toBeInTheDocument();
        expect(await wrapper.findByText('(1 item)')).toBeInTheDocument();
        expect(await wrapper.findByText('news video')).toBeInTheDocument();
        expect(await wrapper.findByText('ID: video-id')).toBeInTheDocument();
        expect(
          await wrapper.findByText('Additional services'),
        ).toBeInTheDocument();
        expect(await wrapper.findByText('Trim video')).toBeInTheDocument();
        expect((await wrapper.findByTestId('price-value')).innerHTML).toEqual(
          '$600',
        );
      },
      {
        timeout: 5000,
      },
    );
  });

  it(`displays order confirmation when place order button clicked`, async () => {
    const fakeClient = new FakeBoclipsClient();

    fakeClient.videos.insertVideo(video);
    fakeClient.carts.insertCartItem({ videoId: 'video-id' });

    const wrapper = renderCartView(fakeClient);

    wrapper
      .findByText('Place an order')
      .then((button) => fireEvent.click(button));

    const modal = await wrapper.findByTestId('order-modal');
    expect(await within(modal).findByText('news video')).toBeVisible();
    expect(await within(modal).findByText('Confirm order')).toBeVisible();
    expect(await within(modal).findByText('$600')).toBeVisible();
    expect(await within(modal).findByText('Go back to cart')).toBeVisible();
  });

  it(`places order when confirmation button is clicked`, async () => {
    const fakeClient = new FakeBoclipsClient();

    fakeClient.users.insertCurrentUser(UserFactory.sample({ id: 'user-id' }));
    fakeClient.videos.insertVideo(video);
    fakeClient.carts.insertCartItem({ videoId: 'video-id' });

    const wrapper = renderCartView(fakeClient);
    await placeAndConfirmOrder(wrapper);

    expect(await wrapper.findByText('Loading')).toBeVisible();

    const confirmation = await wrapper.findByTestId('order-confirmed');
    expect(await fakeClient.orders.getAll()).toHaveLength(1);
    const placedOrder = await fakeClient.orders
      .getAll()
      .then((orders) => orders[0]);

    expect(
      within(confirmation).getByText('Your order is confirmed'),
    ).toBeVisible();

    expect(
      within(confirmation).getByText('View order details').closest('a'),
    ).toHaveAttribute('href', `/orders/${placedOrder.id}`);

    expect(
      within(confirmation).getByText('View all orders').closest('a'),
    ).toHaveAttribute('href', `/orders`);
  });

  it(`has the 'Video(s) total' label`, async () => {
    const fakeClient = new FakeBoclipsClient();

    fakeClient.videos.insertVideo(
      VideoFactory.sample({
        price: { amount: 300, currency: 'USD' },
        id: 'video-id-1',
      }),
    );

    fakeClient.videos.insertVideo(
      VideoFactory.sample({
        price: { amount: 600, currency: 'USD' },
        id: 'video-id-2',
      }),
    );

    fakeClient.carts.insertCartItem({ videoId: 'video-id-1' });
    fakeClient.carts.insertCartItem({ videoId: 'video-id-2' });

    const wrapper = renderCartView(fakeClient);

    expect(await wrapper.findByText(' total', { exact: false })).toBeVisible();
    expect(await wrapper.findByText('$900')).toBeVisible();
  });

  it(`displays error page when error while placing order`, async () => {
    const fakeClient = new FakeBoclipsClient();

    fakeClient.users.insertCurrentUser(UserFactory.sample({ id: 'user-id' }));
    fakeClient.videos.insertVideo(video);
    fakeClient.carts.insertCartItem({ videoId: 'video-id' });
    fakeClient.orders.rejectNextPlaceOrder(
      BoclipsApiErrorFactory.sample({ message: 'channel is missing price' }),
    );

    const wrapper = renderCartView(fakeClient);
    await placeAndConfirmOrder(wrapper);

    expect(await wrapper.findByText('Did not work dude!')).toBeVisible();
    expect(wrapper.getByText(/channel is missing price/)).toBeVisible();
  });

  it('displays a notes field', async () => {
    const fakeClient = new FakeBoclipsClient();
    fakeClient.carts.insertCartItem({ videoId: 'video-id' });

    const wrapper = renderCartView(fakeClient);

    expect(
      await wrapper.findByPlaceholderText(
        'Add a note about this order (optional)',
      ),
    ).toBeVisible();
  });

  it('saves a note on the cart', async () => {
    const fakeClient = new FakeBoclipsClient();
    fakeClient.carts.insertCartItem({ videoId: 'video-id' });

    const wrapper = renderCartView(fakeClient);

    const input = await wrapper.findByPlaceholderText(
      'Add a note about this order (optional)',
    );

    fireEvent.change(input, { target: { value: 'i am a note' } });
    const changedInput = await wrapper.findByDisplayValue('i am a note');
    expect(changedInput).toBeVisible();

    const cart = await fakeClient.carts.getCart();

    await waitFor(() => {
      expect(cart.note).toEqual('i am a note');
    });
  });

  it('removes item from cart', async () => {
    const fakeClient = new FakeBoclipsClient();
    fakeClient.videos.insertVideo(video);
    fakeClient.carts.insertCartItem({ videoId: video.id });

    const wrapper = renderCartView(fakeClient);
    const removeButton = await wrapper.findByText('Remove');
    fireEvent.click(removeButton);
    expect(
      await wrapper.findByText('There are no items in your shopping cart'),
    ).toBeInTheDocument();
  });

  function renderCartView(client) {
    return render(
      <MemoryRouter initialEntries={['/cart']}>
        <App
          apiClient={client}
          reactQueryClient={new QueryClient(queryClientConfig)}
        />
      </MemoryRouter>,
    );
  }

  async function placeAndConfirmOrder(wrapper: RenderResult) {
    await wrapper.findByText('Place an order');
    fireEvent.click(wrapper.getByText('Place an order'));

    const modal = await wrapper.findByTestId('order-modal');

    await waitFor(async () =>
      expect(
        within(modal).getByText('Confirm order').closest('button'),
      ).not.toBeDisabled(),
    );

    await within(modal)
      .findByText('Confirm order')
      .then((button) => fireEvent.click(button));
  }
  it('takes you back to video page when cart item title is clicked', async () => {
    const fakeClient = new FakeBoclipsClient();

    fakeClient.videos.insertVideo(video);
    fakeClient.carts.insertCartItem({ videoId: 'video-id' });

    const wrapper = renderCartView(fakeClient);

    const title = await wrapper.findByText('news video');

    fireEvent.click(title);

    expect(await wrapper.findByTestId('video-page')).toBeVisible();
  });
});
