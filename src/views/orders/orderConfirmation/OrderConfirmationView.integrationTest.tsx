import { render } from '@testing-library/react';
import React from 'react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import App from 'src/App';

describe('OrderConfirmationView', () => {
  it('redirects to main page when no orderLocation', async () => {
    const wrapper = render(
      <MemoryRouter initialEntries={['/order-confirmed']}>
        <App />
      </MemoryRouter>,
    );

    expect(await wrapper.findByText('Loading')).toBeVisible();
    expect(
      await wrapper.findByText('What videos do you need today?'),
    ).toBeVisible();
  });

  it('displays confirmation page', async () => {
    window.history.pushState(
      {
        state: {
          orderLocation: '123',
        },
      },
      'Test page title',
      '/order-confirmed',
    );
    const wrapper = render(<App />, { wrapper: BrowserRouter });

    expect(await wrapper.findByText('Your order is confirmed')).toBeVisible();
    expect(wrapper.getByText('123')).toBeVisible();
  });
});
