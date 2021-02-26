import React from 'react';
import { renderWithLocation } from 'src/testSupport/renderWithLocation';
import { FilterOptionFactory } from 'src/testSupport/FilterOptionFactory';
import {FilterOptionList} from "src/components/filterPanel/filter/FilterOptionList";

describe(`FilterOptionList`, () => {
  it('renders first 5 filter options with given order when none option is selected', () => {
    const options = [
      FilterOptionFactory.sample({
        hits: 3,
        id: `3-option`,
        label: <span>Option 3</span>,
      }),
      FilterOptionFactory.sample({
        hits: 2,
        id: `2-option`,
        label: <span>Option 2</span>,
      }),
      FilterOptionFactory.sample({
        hits: 1,
        id: `1-option`,
        label: <span>Option 1</span>,
      })
    ]
    const panel = renderWithLocation(
        <FilterOptionList
            options={options}
            onSelect={() => {}}
            selectedOptions={[]}
        />
    );

    expect(panel.getByText('Option 3')).toBeInTheDocument();
    expect(panel.getByText('Option 2')).toBeInTheDocument();
    expect(panel.getByText('Option 1')).toBeInTheDocument();
  });

  it('renders selected filters first', () => {
    const options = [
      FilterOptionFactory.sample({
        hits: 3,
        id: `3-option`,
        label: <span>Option 3</span>,
      }),
      FilterOptionFactory.sample({
        hits: 2,
        id: `2-option`,
        label: <span>Option 2</span>,
      }),
      FilterOptionFactory.sample({
        hits: 1,
        id: `1-option`,
        label: <span>Option 1</span>,
      })
    ]
    const panel = renderWithLocation(
        <FilterOptionList
            options={options}
            onSelect={() => {}}
            selectedOptions={[`2-option`]}
        />
    );
    const childNodes = panel.getByTestId('filter-option-list').childNodes;
    expect(childNodes[0].textContent).toContain('Option 2');
    expect(childNodes[1].textContent).toContain('Option 3');
    expect(childNodes[2].textContent).toContain('Option 1');
  });

  it('does not filter out options with zero hits', () => {
    const options = [
      FilterOptionFactory.sample({
        hits: 3,
        id: `3-option`,
        label: <span>Option 3</span>,
      }),
      FilterOptionFactory.sample({
        hits: 0,
        id: `0-option`,
        label: <span>Option 0</span>,
      }),
      FilterOptionFactory.sample({
        hits: 1,
        id: `1-option`,
        label: <span>Option 1</span>,
      })
    ]
    const panel = renderWithLocation(
        <FilterOptionList
            options={options}
            onSelect={() => {}}
            selectedOptions={[`0-option`]}
        />
    );
    const childNodes = panel.getByTestId('filter-option-list').childNodes;
    expect(childNodes[0].textContent).toContain('Option 0');
    expect(childNodes[1].textContent).toContain('Option 3');
    expect(childNodes[2].textContent).toContain('Option 1');
  });
});
