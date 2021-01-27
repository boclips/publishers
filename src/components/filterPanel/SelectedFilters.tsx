import React from 'react';
import { FilterOption } from 'src/types/FilterOption';

interface Props {
  selectedFilterOptions?: FilterOption[];
}

export const SelectedFilters = ({ selectedFilterOptions }: Props) => {
  if (selectedFilterOptions.length === 0) {
    return <></>;
  }

  return (
    <div>
      <div className="text-base font-medium mb-4">Selected filters</div>
      <div className="flex flex-wrap">
        {selectedFilterOptions.map((filter) => (
          <span
            key={`${filter.name}-${filter.id}`}
            className="py-1 px-2 mr-2 mb-2 border-solid border-2 border-blue-700 rounded"
          >
            {filter.name}
          </span>
        ))}
      </div>
    </div>
  );
};
