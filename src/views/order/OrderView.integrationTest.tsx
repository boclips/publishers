import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from 'src/App';
import React from 'react';
import {
  OrderItemFactory,
  OrdersFactory,
} from 'boclips-api-client/dist/test-support';
import { FakeApiClient } from 'src/testSupport/fakeApiClient';
import { FakeOrdersClient } from 'boclips-api-client/dist/sub-clients/orders/client/FakeOrdersClient';
import { OrderCaptionStatus } from 'boclips-api-client/dist/sub-clients/orders/model/OrderItem';
import { Link } from 'boclips-api-client/dist/types';
import { FakeVideosClient } from 'boclips-api-client/dist/sub-clients/videos/client/FakeVideosClient';
import { VideoFactory } from 'boclips-api-client/dist/test-support/VideosFactory';

describe('order table', () => {
  let ordersClient: FakeOrdersClient = null;
  let videosClient: FakeVideosClient = null;

  beforeEach(async () => {
    ordersClient = (await FakeApiClient).orders;
    videosClient = (await FakeApiClient).videos;

    ordersClient.clear();
    videosClient.clear();
  });

  it('renders the order header with an id that matches query', async () => {
    const orders = [
      OrdersFactory.sample({ id: 'not-the-id' }),
      OrdersFactory.sample({
        id: 'i-am-the-id',
      }),
    ];

    orders.forEach((order) => ordersClient.insertOrderFixture(order));

    const wrapper = render(
      <MemoryRouter initialEntries={['/orders/i-am-the-id']}>
        <App />
      </MemoryRouter>,
    );

    const order = await wrapper.findAllByText('Order i-am-the-id');

    expect(order.length).toEqual(2);
    expect(await wrapper.findByText('Your orders')).toBeVisible();
    expect(await wrapper.queryByText('not-the-id')).not.toBeInTheDocument();
  });

  it('renders a order with items', async () => {
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

    orders.forEach((order) => ordersClient.insertOrderFixture(order));
    videosClient.insertVideo(video);

    const wrapper = render(
      <MemoryRouter initialEntries={['/orders/i-am-the-id']}>
        <App />
      </MemoryRouter>,
    );

    expect(await wrapper.findByText('video-1-title')).toBeVisible();
    expect(await wrapper.findByAltText('thumbnail')).toBeVisible();
    expect(await wrapper.findByText('$600')).toBeVisible();
    expect(await wrapper.findByText('ID: video-id-1')).toBeVisible();
  });
});
