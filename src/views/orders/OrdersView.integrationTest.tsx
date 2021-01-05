import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import App from 'src/App';

describe('OrderView', () => {
  it('loads the order view', async () => {
    const wrapper = render(
      <MemoryRouter initialEntries={['/orders']}>
        <App />
      </MemoryRouter>,
    );

    expect(await wrapper.findByText('Your Orders')).toBeInTheDocument();
  });
});
