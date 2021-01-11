import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import App from 'src/App';
import {
  FakeBoclipsClient,
  OrdersFactory,
} from 'boclips-api-client/dist/test-support';
import { FakeOrdersClient } from 'boclips-api-client/dist/sub-clients/orders/client/FakeOrdersClient';

describe('OrderView', () => {
  let fakeClient: FakeBoclipsClient = null;
  let ordersClient: FakeOrdersClient = null;

  beforeEach(() => {
    fakeClient = new FakeBoclipsClient();
    ordersClient = fakeClient.orders;
  });

  it('loads the order view', async () => {
    const wrapper = render(
      <MemoryRouter initialEntries={['/orders']}>
        <App apiClient={fakeClient} />
      </MemoryRouter>,
    );

    expect(await wrapper.findByText('Your Orders')).toBeVisible();
  });
  it('loads the order cards', async () => {
    const orders = [
      OrdersFactory.sample({ id: 'woop-woop-im-an-id' }),
      OrdersFactory.sample({ id: 'me-too!' }),
    ];

    orders.forEach((v) => ordersClient.insertOrderFixture(v));

    const wrapper = render(
      <MemoryRouter initialEntries={['/orders']}>
        <App apiClient={fakeClient} />
      </MemoryRouter>,
    );

    expect(await wrapper.findByText('Your Orders')).toBeVisible();
    expect(await wrapper.findByText('woop-woop-im-an-id')).toBeVisible();
  });
  it('if no orders are there it shows no orders', async () => {
    const wrapper = render(
      <MemoryRouter initialEntries={['/orders']}>
        <App apiClient={fakeClient} />
      </MemoryRouter>,
    );

    expect(await wrapper.findByTestId('no-results')).toBeVisible();
  });
});
