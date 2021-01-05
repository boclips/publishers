import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import App from 'src/App';
import { FakeApiClient } from 'src/testSupport/fakeApiClient';
import { FakeOrdersClient } from 'boclips-api-client/dist/sub-clients/orders/client/FakeOrdersClient';
import { OrdersFactory } from 'boclips-api-client/dist/test-support';

describe('OrderView', () => {
  let ordersClient: FakeOrdersClient = null;

  beforeEach(async () => {
    ordersClient = (await FakeApiClient).orders;
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
      OrdersFactory.sample({ id: 'woop-woop-im-an-id' }),
      OrdersFactory.sample({ id: 'me-too!' }),
    ];

    orders.forEach((v) => ordersClient.insertOrderFixture(v));

    const wrapper = render(
      <MemoryRouter initialEntries={['/orders']}>
        <App />
      </MemoryRouter>,
    );

    expect(await wrapper.findByText('Your Orders')).toBeVisible();
    expect(await wrapper.findByText('woop-woop-im-an-id')).toBeVisible();
  });
  it('if no orders are there it shows no orders', async () => {
    const wrapper = render(
      <MemoryRouter initialEntries={['/orders']}>
        <App />
      </MemoryRouter>,
    );

    expect(await wrapper.findByTestId('no-results')).toBeVisible();
  });
});
