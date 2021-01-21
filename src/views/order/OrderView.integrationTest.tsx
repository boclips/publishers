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
});
