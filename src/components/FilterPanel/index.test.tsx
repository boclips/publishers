import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import CheckboxFilter from './index';

describe(`filterPanel`, () => {
  const videoTypes = [
    {
      hits: 10,
      id: 'stock',
      label: 'Stock',
    },
    {
      hits: 5,
      id: 'news',
      label: 'News',
    },
  ];

  it('renders the title, filters and facets provided', () => {
    const panel = render(
      <CheckboxFilter
        filterOptions={videoTypes}
        title="Video Types"
        filterName="test"
        onFilter={() => console.log('tet')}
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
    expect(onFilterSpy).toHaveBeenCalledWith({
      news: true,
      stock: false,
    });
  });

  it('can hide the options if you collapse the panel', () => {
    const panel = render(
      <CheckboxFilter
        filterOptions={videoTypes}
        title="Video Types"
        filterName="test"
        onFilter={() => console.log('tet')}
      />,
    );

    fireEvent.click(panel.getByText('Video Types'));
    expect(panel.queryByText('Stock')).toBeNull();
    fireEvent.click(panel.getByText('Video Types'));
    expect(panel.getByText('Stock')).toBeVisible();
  });
});
