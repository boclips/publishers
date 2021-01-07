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

describe('order table', () => {
  let ordersClient: FakeOrdersClient = null;

  beforeEach(async () => {
    ordersClient = (await FakeApiClient).orders;
  });
  it('renders a order with an id that matches query', async () => {
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

    expect(await wrapper.findByText('Order i-am-the-id')).toBeVisible();
    expect(await wrapper.queryByText('not-the-id')).not.toBeInTheDocument();
  });

  it('renders a order with items', async () => {
    const item = OrderItemFactory.sample({
      video: {
        title: 'item-1-title',
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
        id: 'not-the-id',
        items: [item],
      }),
    ];

    orders.forEach((order) => ordersClient.insertOrderFixture(order));

    const wrapper = render(
      <MemoryRouter initialEntries={['/orders/i-am-the-id']}>
        <App />
      </MemoryRouter>,
    );

    expect(await wrapper.getByText('item-1-title')).toBeVisible();
    expect(await wrapper.getByAltText('thumbnail')).toBeVisible();
    expect(await wrapper.getByText('$600')).toBeVisible();
    expect(await wrapper.getByText('video-id-1')).toBeVisible();
  });
});
