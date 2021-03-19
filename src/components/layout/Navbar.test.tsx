import { FakeBoclipsClient } from 'boclips-api-client/dist/test-support';
import React from 'react';
import { render } from 'src/testSupport/render';
import { stubBoclipsSecurity } from 'src/testSupport/StubBoclipsSecurity';
import { BoclipsClientProvider } from '../common/providers/BoclipsClientProvider';
import { BoclipsSecurityProvider } from '../common/providers/BoclipsSecurityProvider';
import Navbar from './Navbar';

describe('Navbar', () => {
  it('does not render the search bar by default', async () => {
    const navbar = render(
      <BoclipsSecurityProvider boclipsSecurity={stubBoclipsSecurity}>
        <BoclipsClientProvider client={new FakeBoclipsClient()}>
          <Navbar />
        </BoclipsClientProvider>
      </BoclipsSecurityProvider>,
    );

    await navbar.findByTitle('Boclips logo');

    expect(
      navbar.queryByRole('combobox', { name: /search/i }),
    ).not.toBeInTheDocument();
  });

  it('does renders the search bar when told to', async () => {
    const navbar = render(
      <BoclipsSecurityProvider boclipsSecurity={stubBoclipsSecurity}>
        <BoclipsClientProvider client={new FakeBoclipsClient()}>
          <Navbar showSearchBar />
        </BoclipsClientProvider>
      </BoclipsSecurityProvider>,
    );

    expect(
      await navbar.findByRole('combobox', { name: /search/i }),
    ).toBeVisible();
  });
});
