import { fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import App from 'src/App';
import {
  FakeBoclipsClient,
  OrderItemFactory,
  OrdersFactory,
} from 'boclips-api-client/dist/test-support';
import { OrderStatus } from 'boclips-api-client/dist/sub-clients/orders/model/Order';

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
    const items = OrderItemFactory.sample({
      id: 'i am the id you are looking for...',
    });
    const order = OrdersFactory.sample({
      items: [items],
    });

    fakeClient.orders.insertOrderFixture(order);

    const wrapper = render(
      <MemoryRouter initialEntries={['/orders']}>
        <App apiClient={new FakeBoclipsClient()} />
      </MemoryRouter>,
    );

    waitFor(async () => {
      const button = await wrapper.getByText('View order');
      fireEvent.click(button);
      expect(
        await wrapper.findByText('i am the id you are looking for...'),
      ).toBeVisible();
    });
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
    const orders = [
      OrdersFactory.sample({
        id: 'woop-woop-im-an-id',
        deliveryDate: null,
      }),
    ];

    orders.forEach((v) => fakeClient.orders.insertOrderFixture(v));

    const wrapper = render(
      <MemoryRouter initialEntries={['/orders']}>
        <App apiClient={fakeClient} />
      </MemoryRouter>,
    );

    expect((await wrapper.findByTestId('delivery-date')).innerHTML).toEqual(
      '-',
    );
  });
});
