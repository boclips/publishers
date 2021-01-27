import React from 'react';
import { fireEvent } from '@testing-library/react';
import { Filter } from 'src/components/filterPanel/filter/Filter';
import { renderWithLocation } from 'src/testSupport/renderWithLocation';
import { FilterOptionWithLabel } from 'src/types/FilterOption';

describe(`filterPanel`, () => {
  const generateOptions = (optionNumber: number): FilterOptionWithLabel[] => {
    const options: FilterOptionWithLabel[] = [];
    for (let i = 0; i < optionNumber; i++) {
      options.push({
        hits: 10 - i,
        id: `${i}-option`,
        label: <span>Option {i}</span>,
        isSelected: false,
      });
    }
    return options;
  };

  const videoTypes: FilterOptionWithLabel[] = [
    {
      hits: 10,
      id: 'stock',
      label: <span>Stock</span>,
      isSelected: false,
    },
    {
      hits: 5,
      id: 'news',
      label: <span>News</span>,
      isSelected: false,
    },
  ];

  it('renders the title, filters and facets provided', () => {
    const panel = renderWithLocation(
      <Filter
        options={videoTypes}
        title="Video Types"
        filterName="test"
        handleChange={() => {}}
      />,
    );

    expect(panel.getByText('Video Types')).toBeInTheDocument();

    expect(panel.getByText('Stock')).toBeInTheDocument();
    expect(panel.getByText('10')).toBeInTheDocument();
    expect(panel.getByText('News')).toBeInTheDocument();
    expect(panel.getByText('5')).toBeInTheDocument();
    expect(panel.queryByText('Show all (2)')).toBeNull();
  });

  it('can hide the options if you collapse the panel', () => {
    const panel = renderWithLocation(
      <Filter
        options={videoTypes}
        title="Video Types"
        filterName="test"
        handleChange={() => {}}
      />,
    );

    fireEvent.click(panel.getByText('Video Types'));
    expect(panel.queryByText('Stock')).toBeNull();
    fireEvent.click(panel.getByText('Video Types'));
    expect(panel.getByText('Stock')).toBeVisible();
  });

  it('can uncheck an option and others remain checked', () => {
    const panel = renderWithLocation(
      <Filter
        options={videoTypes}
        title="Video Types"
        filterName="test"
        handleChange={() => {}}
      />,
    );

    fireEvent.click(panel.getByText('News'));
    fireEvent.click(panel.getByText('Stock'));

    fireEvent.click(panel.getByText('News'));

    const stockCheckbox = panel.getByTestId('stock-checkbox');
    expect(stockCheckbox).toHaveProperty('checked', true);
  });

  it('renders a show more label with the correct number', () => {
    const panel = renderWithLocation(
      <Filter
        options={generateOptions(6)}
        title="Video Types"
        filterName="test"
        handleChange={() => {}}
      />,
    );

    expect(panel.getByText('Show all (6)')).toBeVisible();
    expect(panel.getByText('Option 1')).toBeVisible();
    expect(panel.queryByText('Option 5')).toBeNull();
  });

  it('toggles the filter to show more results', () => {
    const panel = renderWithLocation(
      <Filter
        options={generateOptions(6)}
        title="Video Types"
        filterName="test"
        handleChange={() => {}}
      />,
    );

    expect(panel.queryByText('Option 5')).toBeNull();

    fireEvent.click(panel.getByText('Show all (6)'));

    expect(panel.queryByText('Option 5')).toBeVisible();
    expect(panel.getByText('Show less')).toBeVisible();
  });
});
