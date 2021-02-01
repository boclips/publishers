import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import App from 'src/App';
import {
  FakeBoclipsClient,
  OrderItemFactory,
  OrdersFactory,
} from 'boclips-api-client/dist/test-support';
import { OrderStatus } from 'boclips-api-client/dist/sub-clients/orders/model/Order';
import { OrderCaptionStatus } from 'boclips-api-client/dist/sub-clients/orders/model/OrderItem';
import { Link } from 'boclips-api-client/dist/types';
import { VideoFactory } from 'boclips-api-client/dist/test-support/VideosFactory';
import { PlaybackFactory } from 'boclips-api-client/dist/test-support/PlaybackFactory';

describe('OrderView', () => {
  it('loads the orders view', async () => {
    const wrapper = render(
      <MemoryRouter initialEntries={['/orders']}>
        <App apiClient={new FakeBoclipsClient()} />
      </MemoryRouter>,
    );

    expect(await wrapper.findByText('Your Orders')).toBeVisible();
  });

  it('navigates to order view when view order is clicked', async () => {
    const fakeClient = new FakeBoclipsClient();
    const order = OrdersFactory.sample({
      id: 'look for me',
    });

    fakeClient.orders.insertOrderFixture(order);

    const wrapper = render(
      <MemoryRouter initialEntries={['/orders']}>
        <App apiClient={fakeClient} />
      </MemoryRouter>,
    );

    const button = await wrapper.findByText('View order');
    fireEvent.click(button);
    expect((await wrapper.findAllByText('Order look for me')).length).toEqual(
      2,
    );
  });

  it('loads the order cards', async () => {
    const fakeClient = new FakeBoclipsClient();
    const orders = [
      OrdersFactory.sample({
        id: 'woop-woop-im-an-id',
        deliveryDate: new Date('2021-01-15 14:56:21.800Z'),
        createdAt: new Date('2021-01-10 14:56:21.800Z'),
        status: OrderStatus.DELIVERED,
      }),
      OrdersFactory.sample({
        id: 'me-too!',
        status: OrderStatus.READY,
      }),
    ];

    orders.forEach((v) => fakeClient.orders.insertOrderFixture(v));

    const wrapper = render(
      <MemoryRouter initialEntries={['/orders']}>
        <App apiClient={fakeClient} />
      </MemoryRouter>,
    );

    expect(await wrapper.findByText('Your Orders')).toBeVisible();
    expect((await wrapper.findAllByText('Order number')).length).toEqual(2);
    expect(await wrapper.findByText('woop-woop-im-an-id')).toBeVisible();
    expect(await wrapper.findByText('me-too!')).toBeVisible();

    expect((await wrapper.findAllByText('Order date')).length).toEqual(2);
    expect(await wrapper.findByText('10/01/21')).toBeVisible();

    expect((await wrapper.findAllByText('Delivery date')).length).toEqual(2);
    expect(await wrapper.findByText('15/01/21')).toBeVisible();

    expect((await wrapper.findAllByText('Status')).length).toEqual(2);
    expect(await wrapper.findByText('PROCESSING')).toBeVisible();
    expect(await wrapper.findByText('DELIVERED')).toBeVisible();
    expect((await wrapper.findAllByText('View order')).length).toEqual(2);
  });

  it('if no orders are there it shows no orders', async () => {
    const wrapper = render(
      <MemoryRouter initialEntries={['/orders']}>
        <App apiClient={new FakeBoclipsClient()} />
      </MemoryRouter>,
    );

    expect(await wrapper.findByTestId('no-results')).toBeVisible();
  });

  it('if there is no deliveryDate it shows a dash', async () => {
    const fakeClient = new FakeBoclipsClient();
    const order = OrdersFactory.sample({
      id: 'woop-woop-im-an-id',
      deliveryDate: null,
    });

    fakeClient.orders.insertOrderFixture(order);

    const wrapper = render(
      <MemoryRouter initialEntries={['/orders']}>
        <App apiClient={fakeClient} />
      </MemoryRouter>,
    );

    expect((await wrapper.findByTestId('delivery-date')).innerHTML).toEqual(
      '-',
    );
  });

  it('shows video count', async () => {
    const fakeClient = new FakeBoclipsClient();

    const items = [
      OrderItemFactory.sample({
        id: 'item-1',
      }),
      OrderItemFactory.sample({
        id: 'item-2',
      }),
    ];
    const order = OrdersFactory.sample({
      id: 'woop-woop-im-an-id',
      deliveryDate: null,
      items,
    });

    fakeClient.orders.insertOrderFixture(order);

    const wrapper = render(
      <MemoryRouter initialEntries={['/orders']}>
        <App apiClient={fakeClient} />
      </MemoryRouter>,
    );

    expect(await wrapper.findByText('videos')).toBeVisible();
    expect((await wrapper.findByTestId('order-item-count')).innerHTML).toEqual(
      '2',
    );
  });

  it('shows first available thumbnail', async () => {
    const fakeClient = new FakeBoclipsClient();

    const videos = [
      VideoFactory.sample({
        id: '123',
        playback: PlaybackFactory.sample({
          links: {
            thumbnail: new Link({ href: null, templated: true }),
            createPlayerInteractedWithEvent: new Link({
              href: 'player interacted with',
              templated: true,
            }),
          },
        }),
      }),
      VideoFactory.sample({
        id: '123',
        playback: PlaybackFactory.sample({
          links: {
            thumbnail: new Link({ href: 'find me!!', templated: true }),
            createPlayerInteractedWithEvent: new Link({
              href: 'player interacted with',
              templated: true,
            }),
          },
        }),
      }),
    ];

    const items = [
      OrderItemFactory.sample({
        id: 'item-1',
        video: {
          id: '123',
          types: ['123'],
          title: 'videoooo',
          videoReference: 'i am a reference',
          maxResolutionAvailable: true,
          captionStatus: OrderCaptionStatus.PROCESSING,
          _links: {
            fullProjection: new Link({ href: 'i am a link', templated: true }),
            videoUpload: new Link({ href: 'i am a link', templated: true }),
            captionAdmin: new Link({ href: 'i am a link', templated: true }),
          },
        },
      }),
      OrderItemFactory.sample({
        id: 'item-2',
      }),
    ];
    const order = OrdersFactory.sample({
      id: 'woop-woop-im-an-id',
      deliveryDate: null,
      items,
    });

    fakeClient.orders.insertOrderFixture(order);
    videos.forEach((video) => fakeClient.videos.insertVideo(video));

    const wrapper = render(
      <MemoryRouter initialEntries={['/orders']}>
        <App apiClient={fakeClient} />
      </MemoryRouter>,
    );

    expect(
      (await wrapper.findByTestId('order-item-thumbnail')) as HTMLImageElement,
    ).toHaveAttribute('src', 'find me!!');
  });
});
