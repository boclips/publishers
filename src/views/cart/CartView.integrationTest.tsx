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

describe('CartView', () => {
  const video = VideoFactory.sample({
    id: 'video-id',
    title: 'news video',
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

  it('when videos in cart, displays video player with title and additional services ', async () => {
    const fakeClient = new FakeBoclipsClient();

    fakeClient.videos.insertVideo(video);
    fakeClient.carts.insertCartItem('video-id');

    const wrapper = renderCartView(fakeClient);

    await waitFor(
      async () => {
        expect(await wrapper.findByText('Shopping cart')).toBeInTheDocument();
        expect(await wrapper.findByText('(1 item)')).toBeInTheDocument();
        expect(await wrapper.findByText('news video')).toBeInTheDocument();
        expect(
          await wrapper.findByText('Additional services'),
        ).toBeInTheDocument();
        expect(await wrapper.findByText('Trim video')).toBeInTheDocument();
      },
      {
        timeout: 5000,
      },
    );
  });

  it(`displays order confirmation when place order button clicked`, async () => {
    const fakeClient = new FakeBoclipsClient();

    fakeClient.videos.insertVideo(video);
    fakeClient.carts.insertCartItem('video-id');

    const wrapper = renderCartView(fakeClient);

    wrapper
      .findByText('Place an order')
      .then((button) => fireEvent.click(button));

    const modal = await wrapper.findByTestId('order-modal');
    expect(await within(modal).findByText('news video')).toBeVisible();
    expect(await within(modal).findByText('Confirm order')).toBeVisible();
    expect(await within(modal).findByText('Go back to cart')).toBeVisible();
  });

  it(`places order when confirmation button is clicked`, async () => {
    const fakeClient = new FakeBoclipsClient();

    fakeClient.users.insertCurrentUser(UserFactory.sample({ id: 'user-id' }));
    fakeClient.videos.insertVideo(video);
    fakeClient.carts.insertCartItem('video-id');

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

  it(`displays error page when error while placing order`, async () => {
    const fakeClient = new FakeBoclipsClient();

    fakeClient.users.insertCurrentUser(UserFactory.sample({ id: 'user-id' }));
    fakeClient.videos.insertVideo(video);
    fakeClient.carts.insertCartItem('video-id');
    fakeClient.orders.rejectNextPlaceOrder(
      BoclipsApiErrorFactory.sample({ message: 'channel is missing price' }),
    );

    const wrapper = renderCartView(fakeClient);
    await placeAndConfirmOrder(wrapper);

    expect(await wrapper.findByText('Did not work dude!')).toBeVisible();
    expect(wrapper.getByText(/channel is missing price/)).toBeVisible();
  });

  function renderCartView(client) {
    return render(
      <MemoryRouter initialEntries={['/cart']}>
        <App apiClient={client} />
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
});
