import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import App from 'src/App';
import { FakeApiClient } from 'src/testSupport/fakeApiClient';
import { FakeOrdersClient } from 'boclips-api-client/dist/sub-clients/orders/client/FakeOrdersClient';
import { OrdersFactory } from 'boclips-api-client/dist/test-support';
import { OrderStatus } from 'boclips-api-client/dist/sub-clients/orders/model/Order';

describe('OrderView', () => {
  let ordersClient: FakeOrdersClient = null;

  beforeEach(async () => {
    ordersClient = (await FakeApiClient).orders;

    ordersClient.clear();
  });

  it('loads the order view', async () => {
    const wrapper = render(
      <MemoryRouter initialEntries={['/orders']}>
        <App />
      </MemoryRouter>,
    );

    expect(await wrapper.findByText('Your Orders')).toBeVisible();
  });

  it('loads the order cards', async () => {
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

    orders.forEach((v) => ordersClient.insertOrderFixture(v));

    const wrapper = render(
      <MemoryRouter initialEntries={['/orders']}>
        <App />
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
  });

  it('if no orders are there it shows no orders', async () => {
    const wrapper = render(
      <MemoryRouter initialEntries={['/orders']}>
        <App />
      </MemoryRouter>,
    );

    expect(await wrapper.findByTestId('no-results')).toBeVisible();
  });

  it('if there is no deliveryDate it shows a dash', async () => {
    const orders = [
      OrdersFactory.sample({
        id: 'woop-woop-im-an-id',
        deliveryDate: null,
      }),
    ];

    orders.forEach((v) => ordersClient.insertOrderFixture(v));

    const wrapper = render(
      <MemoryRouter initialEntries={['/orders']}>
        <App />
      </MemoryRouter>,
    );

    expect((await wrapper.findByTestId('delivery-date')).innerHTML).toEqual(
      '-',
    );
  });
});
