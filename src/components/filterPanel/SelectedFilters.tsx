import React from 'react';
import { FilterOption } from 'src/types/FilterOption';
import { SelectedFilterTag } from 'src/components/filterPanel/SelectedFilterTag';
import { FilterKey } from 'src/types/search/FilterKey';

interface Props {
  selectedFilterOptions?: FilterOption[];
  removeFilter?: (filter: FilterKey, value: string) => void;
  clearFilters?: () => void;
}

export const SelectedFilters = ({
  selectedFilterOptions,
  removeFilter,
  clearFilters,
}: Props) => {
  if (selectedFilterOptions.length === 0) {
    return <></>;
  }
  return (
    <div>
      <div
        className="mb-4 font-medium flex justify-between items-center"
        style={{ height: '1.9375rem' }}
      >
        <span className="text-base ">Selected filters</span>
        <span
          className="text-sm text-blue-800 cursor-pointer"
          tabIndex={0}
          onKeyDown={() => clearFilters()}
          role="button"
          onClick={() => clearFilters()}
        >
          CLEAR ALL
        </span>
      </div>
      <div className="flex flex-wrap " data-qa="applied-filter-tags">
        {selectedFilterOptions.map((filter) => (
          <SelectedFilterTag
            key={`${filter.name}-${filter.id}`}
            filter={filter}
            removeFilter={removeFilter}
          />
        ))}
      </div>
    </div>
  );
};
