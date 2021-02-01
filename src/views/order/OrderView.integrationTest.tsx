import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from 'src/App';
import React from 'react';
import {
  FakeBoclipsClient,
  OrderItemFactory,
  OrdersFactory,
} from 'boclips-api-client/dist/test-support';
import { OrderCaptionStatus } from 'boclips-api-client/dist/sub-clients/orders/model/OrderItem';
import { Link } from 'boclips-api-client/dist/types';
import { VideoFactory } from 'boclips-api-client/dist/test-support/VideosFactory';
import { OrderStatus } from 'boclips-api-client/dist/sub-clients/orders/model/Order';

describe('order table', () => {
  it('renders the order header with an id that matches query', async () => {
    const fakeClient = new FakeBoclipsClient();

    const orders = [
      OrdersFactory.sample({ id: 'not-the-id' }),
      OrdersFactory.sample({
        id: 'i-am-the-id',
      }),
    ];

    orders.forEach((order) => fakeClient.orders.insertOrderFixture(order));

    const wrapper = render(
      <MemoryRouter initialEntries={['/orders/i-am-the-id']}>
        <App apiClient={fakeClient} />
      </MemoryRouter>,
    );

    const order = await wrapper.findAllByText('Order i-am-the-id');

    expect(order.length).toEqual(2);
    expect(wrapper.getByText('Your orders')).toBeVisible();
    expect(wrapper.queryByText('not-the-id')).not.toBeInTheDocument();
  });

  it('renders a order with items', async () => {
    const fakeClient = new FakeBoclipsClient();

    const video = VideoFactory.sample({
      id: 'video-id-1',
      price: {
        currency: 'USD',
        amount: 600,
      },
    });

    const item = OrderItemFactory.sample({
      video: {
        title: 'video-1-title',
        id: 'video-id-1',
        captionStatus: OrderCaptionStatus.PROCESSING,
        maxResolutionAvailable: true,
        videoReference: 'video-ref',
        types: ['I am a type', 'me too!'],
        _links: {
          fullProjection: new Link({ href: 'fullprojection', templated: true }),
          videoUpload: new Link({ href: 'videoUpload', templated: true }),
          captionAdmin: new Link({ href: 'captionAdmin', templated: true }),
        },
      },
      price: {
        displayValue: '$600',
        currency: 'USD',
        value: 600,
      },
    });
    const orders = [
      OrdersFactory.sample({
        id: 'i-am-the-id',
        items: [item],
      }),
    ];

    orders.forEach((order) => fakeClient.orders.insertOrderFixture(order));
    fakeClient.videos.insertVideo(video);

    const wrapper = render(
      <MemoryRouter initialEntries={['/orders/i-am-the-id']}>
        <App apiClient={fakeClient} />
      </MemoryRouter>,
    );

    expect(await wrapper.findByText('video-1-title')).toBeVisible();
    expect(await wrapper.findByAltText('thumbnail')).toBeVisible();
    expect(await wrapper.findByText('$600')).toBeVisible();
    expect(await wrapper.findByText('ID: video-id-1')).toBeVisible();
  });

  it('renders order summary', async () => {
    const fakeClient = new FakeBoclipsClient();
    const items = [
      OrderItemFactory.sample({ id: '1' }),
      OrderItemFactory.sample({ id: '2' }),
    ];
    const order = OrdersFactory.sample({
      id: 'order-id',
      createdAt: new Date('2021-02-01 14:56:21.800Z'),
      deliveryDate: new Date('2021-02-03 14:56:21.800Z'),
      status: OrderStatus.READY,
      note: 'i am a note',
      totalPrice: {
        value: 700.5,
        currency: 'USD',
        displayValue: 'USD 700.5',
      },
      items,
    });
    fakeClient.orders.insertOrderFixture(order);
    const wrapper = render(
      <MemoryRouter initialEntries={['/orders/order-id']}>
        <App apiClient={fakeClient} />
      </MemoryRouter>,
    );

    expect(await wrapper.findByText('Order date')).toBeVisible();
    expect(await wrapper.findByText('Video quantity')).toBeVisible();
    expect(await wrapper.findByText('Total value')).toBeVisible();
    expect(await wrapper.findByText('Status')).toBeVisible();
    expect(await wrapper.findByText('Delivery date')).toBeVisible();
    expect(await wrapper.findByText('Notes')).toBeVisible();

    expect(await wrapper.findByText('$700.50')).toBeVisible();
    expect(await wrapper.findByText('01/02/21')).toBeVisible();
    expect(await wrapper.findByText('PROCESSING')).toBeVisible();
    expect(await wrapper.findByText('03/02/21')).toBeVisible();
    expect((await wrapper.findByTestId('video-quantity')).innerHTML).toEqual(
      '2',
    );
    expect(await wrapper.findByText('i am a note')).toBeVisible();
  });
});
