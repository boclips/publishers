import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import CheckboxFilter from './CheckboxFilter';

describe(`filterPanel`, () => {
  const videoTypes = [
    {
      hits: 10,
      id: 'stock',
      name: 'Stock',
    },
    {
      hits: 5,
      id: 'news',
      name: 'News',
    },
  ];

  it('renders the title, filters and facets provided', () => {
    const panel = render(
      <CheckboxFilter
        filterOptions={videoTypes}
        title="Video Types"
        filterName="test"
        onFilter={() => {}}
      />,
    );

    expect(panel.getByText('Video Types')).toBeInTheDocument();

    expect(panel.getByText('Stock')).toBeInTheDocument();
    expect(panel.getByText('10')).toBeInTheDocument();
    expect(panel.getByText('News')).toBeInTheDocument();
    expect(panel.getByText('5')).toBeInTheDocument();
  });

  it('calls onfilter with all selected values', () => {
    const onFilterSpy = jest.fn();
    const panel = render(
      <CheckboxFilter
        filterOptions={videoTypes}
        title="Video Types"
        filterName="test"
        onFilter={onFilterSpy}
      />,
    );

    fireEvent.click(panel.getByText('News'));
    expect(onFilterSpy).toHaveBeenCalledTimes(1);
    expect(onFilterSpy).toHaveBeenCalledWith('test', ['news']);
  });

  it('can hide the options if you collapse the panel', () => {
    const panel = render(
      <CheckboxFilter
        filterOptions={videoTypes}
        title="Video Types"
        filterName="test"
        onFilter={() => {}}
      />,
    );

    fireEvent.click(panel.getByText('Video Types'));
    expect(panel.queryByText('Stock')).toBeNull();
    fireEvent.click(panel.getByText('Video Types'));
    expect(panel.getByText('Stock')).toBeVisible();
  });

  it('can uncheck an option and others remain checked', () => {
    const panel = render(
      <CheckboxFilter
        filterOptions={videoTypes}
        title="Video Types"
        filterName="test"
        onFilter={() => {}}
      />,
    );

    fireEvent.click(panel.getByText('News'));
    fireEvent.click(panel.getByText('Stock'));

    fireEvent.click(panel.getByText('News'));

    const stockCheckbox = panel.getByTestId('stock-checkbox');
    expect(stockCheckbox).toHaveProperty('checked', true);
  });
});
