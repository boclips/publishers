import React, { useEffect, useState } from 'react';
import { FilterOption } from 'src/types/FilterOption';
import { SelectedFilterTag } from 'src/components/filterPanel/SelectedFilterTag';
import { FilterKey } from 'src/types/search/FilterKey';
import { useSearchQueryLocationParams } from 'src/hooks/useLocationParams';

interface Props {
  // selectedFilterOptions?: FilterOption[];
  removeFilter?: (filter: FilterKey, value: string) => void;
  clearFilters?: () => void;
}

export const SelectedFilters = ({ removeFilter, clearFilters }: Props) => {
  // if (selectedFilterOptions.length === 0) {
  //   return <></>;
  // }

  const [selectedFilters, setSelectedFilters] = useState();

  const [searchLocation] = useSearchQueryLocationParams();

  // console.log(searchLocation);

  useEffect(() => {
    console.log('channel changed');

    setSelectedFilters(prevState => [...prevState, mapped channel])

  }, [searchLocation.filters.channel]);

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
        {selectedFilters.map((filter) => filter)}
      </div>
    </div>
  );
};

// <SelectedFilterTag
//   key={`${filter.name}-${filter.id}`}
//   filter={filter}
//   removeFilter={removeFilter}
// />
