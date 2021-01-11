import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { FakeBoclipsClient } from 'boclips-api-client/dist/test-support';
import SearchHero from './SearchHero';
import { BoclipsClientProvider } from '../common/BoclipsClientProvider';

describe('SearchBar', () => {
  let fakeClient: FakeBoclipsClient = null;

  beforeEach(() => {
    fakeClient = new FakeBoclipsClient();
  });

  it('renders a search input and a button', () => {
    const wrapper = render(
      <MemoryRouter>
        <SearchHero />
      </MemoryRouter>,
    );

    expect(
      wrapper.getByRole('button', { name: /search/i }),
    ).toBeInTheDocument();

    expect(
      wrapper.getByRole('combobox', { name: /search/i }),
    ).toBeInTheDocument();
  });

  it('can take user input', () => {
    const wrapper = render(
      <MemoryRouter>
        <BoclipsClientProvider client={fakeClient}>
          <SearchHero />
        </BoclipsClientProvider>
      </MemoryRouter>,
    );

    const searchBar = wrapper.getByRole('combobox', {
      name: /search/i,
    }) as HTMLInputElement;

    fireEvent.change(searchBar, { target: { value: 'help' } });
    expect(searchBar.value).toEqual('help');
  });
});
