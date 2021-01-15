import React from 'react';
import { render } from 'src/testSupport/render';
import Navbar from './Navbar';

describe('Navbar', () => {
  it('does not render the search bar by default', () => {
    const navbar = render(<Navbar />);

    expect(
      navbar.queryByRole('combobox', { name: /search/i }),
    ).not.toBeInTheDocument();
  });

  it('does renders the search bar when told to', () => {
    const navbar = render(<Navbar showSearchBar />);

    expect(
      navbar.getByRole('combobox', { name: /search/i }),
    ).toBeInTheDocument();
  });
});
