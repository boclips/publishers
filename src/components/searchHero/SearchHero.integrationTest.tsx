import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import SearchHero from './SearchHero';
import { FakeBoclipsClient } from 'boclips-api-client/dist/test-support';

describe('SearchBar', () => {
  let fakeClient: FakeBoclipsClient = null;

  beforeEach(() => {
    fakeClient = new FakeBoclipsClient();
  });

  it('renders a search input and a button', () => {
    const wrapper = render(
      <MemoryRouter>
        <SearchHero apiClient={fakeClient} />
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
        <SearchHero apiClient={fakeClient} />
      </MemoryRouter>,
    );

    const searchBar = wrapper.getByRole('combobox', {
      name: /search/i,
    }) as HTMLInputElement;

    fireEvent.change(searchBar, { target: { value: 'help' } });
    expect(searchBar.value).toEqual('help');
  });
});
