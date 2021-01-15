import { fireEvent } from '@testing-library/react';
import React from 'react';
import { render } from 'src/testSupport/render';
import SearchHero from './SearchHero';

describe('SearchHero', () => {
  it('renders a search input and a button', () => {
    const wrapper = render(<SearchHero />);

    expect(
      wrapper.getByRole('button', { name: /search/i }),
    ).toBeInTheDocument();

    expect(
      wrapper.getByRole('combobox', { name: /search/i }),
    ).toBeInTheDocument();
  });

  it('can take user input', () => {
    const wrapper = render(<SearchHero />);

    const searchBar = wrapper.getByRole('combobox', {
      name: /search/i,
    }) as HTMLInputElement;

    fireEvent.change(searchBar, { target: { value: 'help' } });
    expect(searchBar.value).toEqual('help');
  });
});
