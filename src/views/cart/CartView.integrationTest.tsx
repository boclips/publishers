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
import { FakeVideosClient } from 'boclips-api-client/dist/sub-clients/videos/client/FakeVideosClient';
import { FakeCartsClient } from 'boclips-api-client/dist/sub-clients/carts/client/FakeCartsClient';
import { FakeApiClient } from 'src/testSupport/fakeApiClient';
import { FakeUsersClient } from 'boclips-api-client/dist/sub-clients/users/client/FakeUsersClient';
import { UserFactory } from 'boclips-api-client/dist/test-support/UserFactory';
import { FakeOrdersClient } from 'boclips-api-client/dist/sub-clients/orders/client/FakeOrdersClient';
import { BoclipsApiErrorFactory } from 'boclips-api-client/dist/test-support/BoclipsApiErrorFactory';

describe('CartView', () => {
  let videosClient: FakeVideosClient = null;
  let cartClient: FakeCartsClient = null;
  let usersClient: FakeUsersClient = null;
  let ordersClient: FakeOrdersClient = null;

  const video = VideoFactory.sample({
    id: 'video-id',
    title: 'news video',
    types: [{ name: 'NEWS', id: 2 }],
  });

  beforeEach(async () => {
    videosClient = (await FakeApiClient).videos;
    cartClient = (await FakeApiClient).carts;
    usersClient = (await FakeApiClient).users;
    ordersClient = (await FakeApiClient).orders;

    videosClient.clear();
    cartClient.clear();
    usersClient.clear();
    ordersClient.clear();
  });

  it('when no items in cart, displays empty cart view', async () => {
    const wrapper = renderCartView();

    await waitFor(async () => {
      expect(
        await wrapper.findByText('There are no items in your shopping cart'),
      ).toBeInTheDocument();
    });
  });

  it('when videos in cart, displays video player with title and additional services ', async () => {
    videosClient.insertVideo(video);
    cartClient.insertCartItem('video-id');

    const wrapper = renderCartView();

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
    videosClient.insertVideo(video);
    cartClient.insertCartItem('video-id');

    const wrapper = renderCartView();

    wrapper
      .findByText('Place an order')
      .then((button) => fireEvent.click(button));

    const modal = await wrapper.findByTestId('order-modal');
    expect(await within(modal).findByText('news video')).toBeVisible();
    expect(await within(modal).findByText('Confirm order')).toBeVisible();
    expect(await within(modal).findByText('Go back to cart')).toBeVisible();
  });

  it(`places order when confirmation button is clicked`, async () => {
    usersClient.insertCurrentUser(UserFactory.sample({ id: 'user-id' }));
    videosClient.insertVideo(video);
    cartClient.insertCartItem('video-id');

    const wrapper = renderCartView();
    await placeAndConfirmOrder(wrapper);

    expect(await wrapper.findByText('Loading')).toBeVisible();

    const confirmation = await wrapper.findByTestId('order-confirmed');
    expect(await ordersClient.getAll()).toHaveLength(1);
    const placedOrder = await ordersClient.getAll().then((orders) => orders[0]);

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
    usersClient.insertCurrentUser(UserFactory.sample({ id: 'user-id' }));
    videosClient.insertVideo(video);
    cartClient.insertCartItem('video-id');
    ordersClient.rejectNextPlaceOrder(
      BoclipsApiErrorFactory.sample({ message: 'channel is missing price' }),
    );

    const wrapper = renderCartView();
    await placeAndConfirmOrder(wrapper);

    expect(await wrapper.findByText('Did not work dude!')).toBeVisible();
    expect(wrapper.getByText(/channel is missing price/)).toBeVisible();
  });

  it('displays a notes field', async () => {
    cartClient.insertCartItem('video-id');

    const wrapper = renderCartView();

    expect(
      await wrapper.findByPlaceholderText(
        'Add a note about this order (optional)',
      ),
    ).toBeVisible();
  });
  it('saves a note on the cart', async () => {
    cartClient.insertCartItem('video-id');

    const wrapper = renderCartView();

    const input = await wrapper.findByPlaceholderText(
      'Add a note about this order (optional)',
    );

    fireEvent.change(input, { target: { value: 'i am a note' } });
    const changedInput = await wrapper.findByDisplayValue('i am a note');
    expect(changedInput).toBeVisible();

    const cart = await cartClient.getCart();

    await waitFor(() => {
      expect(cart.note).toEqual('i am a note');
    });
  }, 70000);
  function renderCartView() {
    return render(
      <MemoryRouter initialEntries={['/cart']}>
        <App />
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
