import { FakeBoclipsClient } from 'boclips-api-client/dist/test-support';
import React from 'react';
import { render } from 'src/testSupport/render';
import { BoclipsClientProvider } from '../common/providers/BoclipsClientProvider';
import Navbar from './Navbar';

describe('Navbar', () => {
  it('does not render the search bar by default', () => {
    const navbar = render(
      <BoclipsClientProvider client={new FakeBoclipsClient()}>
        <Navbar />
      </BoclipsClientProvider>,
    );

    expect(
      navbar.queryByRole('combobox', { name: /search/i }),
    ).not.toBeInTheDocument();
  });

  it('does renders the search bar when told to', () => {
    const navbar = render(
      <BoclipsClientProvider client={new FakeBoclipsClient()}>
        <Navbar showSearchBar />
      </BoclipsClientProvider>,
    );

    expect(
      navbar.getByRole('combobox', { name: /search/i }),
    ).toBeInTheDocument();
  });
});
