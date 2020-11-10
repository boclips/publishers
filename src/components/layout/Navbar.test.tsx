import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './Navbar';

describe('Navbar', () => {
  it('does not render the search bar by default', () => {
    const navbar = render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );

    expect(
      navbar.queryByRole('combobox', { name: /search/i }),
    ).not.toBeInTheDocument();
  });

  it('does renders the search bar when told to', () => {
    const navbar = render(
      <MemoryRouter>
        <Navbar showSearchBar />
      </MemoryRouter>,
    );

    expect(
      navbar.getByRole('combobox', { name: /search/i }),
    ).toBeInTheDocument();
  });
});
