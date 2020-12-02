import { renderWithLocation } from 'src/testSupport/renderWithLocation';
import { fireEvent } from '@testing-library/react';
import React from 'react';
import { SearchableFilter } from 'src/components/filterPanel/filter/SearchableFilter';

describe(`searchableFilter`, () => {
  const channels = [
    {
      hits: 10,
      id: 'channel-1',
      name: 'TED-ED',
    },
    {
      hits: 5,
      id: 'channel-2',
      name: 'History channel',
    },
    {
      hits: 5,
      id: 'channel-3',
      name: 'geography',
    },
    {
      hits: 5,
      id: 'channel-4',
      name: 'science',
    },
    {
      hits: 5,
      id: 'channel-5',
      name: 'maths',
    },
    {
      hits: 5,
      id: 'channel-6',
      name: 'music',
    },
  ];

  it('renders the search input with default placeholder when enabled', () => {
    const panel = renderWithLocation(
      <SearchableFilter
        searchPlaceholder="Search"
        options={channels}
        title="Video Types"
        filterName="test"
        handleChange={() => {}}
      />,
    );

    expect(panel.getByPlaceholderText('Search')).toBeInTheDocument();
  });

  it('renders the search input with custom placeholder when passed in', () => {
    const panel = renderWithLocation(
      <SearchableFilter
        searchPlaceholder="Search for channel"
        options={channels}
        title="Video Types"
        filterName="test"
        handleChange={() => {}}
      />,
    );

    expect(
      panel.getByPlaceholderText('Search for channel'),
    ).toBeInTheDocument();
  });

  it('filters and bolds options based on the search input', () => {
    const panel = renderWithLocation(
      <SearchableFilter
        searchPlaceholder="Search for channel"
        options={channels}
        title="Video Types"
        filterName="test"
        handleChange={() => {}}
      />,
    );

    const searchInput = panel.getByPlaceholderText('Search for channel');
    expect(panel.getByText('Show all (6)')).toBeInTheDocument();

    fireEvent.change(searchInput, { target: { value: 'TED' } });

    expect(panel.queryByText('Show all (6)')).toBeNull();
    expect(panel.getByText('TED')).toHaveStyle({ 'font-weight': 'bold' });
    expect(panel.getByText('-ED')).toBeInTheDocument();
    expect(panel.queryByText('History channel')).not.toBeInTheDocument();
  });

  it('resets the filter search when toggling the filter', () => {
    const panel = renderWithLocation(
      <SearchableFilter
        searchPlaceholder="Search for channel"
        options={channels}
        title="Channels"
        filterName="test"
        handleChange={() => {}}
      />,
    );

    const searchInput = panel.getByPlaceholderText('Search for channel');
    fireEvent.change(searchInput, { target: { value: 'Not valid channel' } });

    // Close and open the panel
    fireEvent.click(panel.getByText('Channels'));
    fireEvent.click(panel.getByText('Channels'));

    expect(panel.getByPlaceholderText('Search for channel')).toBeVisible();
    expect(panel.getByText('TED-ED')).toBeInTheDocument();
  });
});
