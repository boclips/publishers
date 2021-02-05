import React from 'react';
import { FilterOption } from 'src/types/FilterOption';
import { SelectedFilterTag } from 'src/components/filterPanel/SelectedFilterTag';
import { FilterKey } from 'src/types/search/FilterKey';

interface Props {
  selectedFilterOptions?: FilterOption[];
  removeFilter?: (filter: FilterKey, value: string) => void;
}

export const SelectedFilters = ({
  selectedFilterOptions,
  removeFilter,
}: Props) => {
  if (selectedFilterOptions.length === 0) {
    return <></>;
  }

  return (
    <div>
      <div className="text-base font-medium mb-4">Selected filters</div>
      <div className="flex flex-wrap">
        {selectedFilterOptions.map((filter) => (
          <SelectedFilterTag filter={filter} removeFilter={removeFilter} />
        ))}
      </div>
    </div>
  );
};
