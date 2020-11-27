import React, { useState } from 'react';
import { getFacetSorter } from 'src/services/sortFacets';
import { Facet } from 'boclips-api-client/dist/sub-clients/videos/model/VideoFacets';
import { SortBy } from 'src/types/SortBy';
import { FilterOption } from 'src/components/filterPanel/filter/FilterOption';

interface Props {
  options: Facet[];
  selectedOptions: string[];
  onSelect: (event, item) => void;
  sortBy?: SortBy;
  filterIsOpen: boolean;
  searchText?: string;
  handleKeyDown: (event, callback) => void;
}
const DEFAULT_VISIBLE_OPTIONS = 5;

export const FilterOptionList = ({
  options,
  selectedOptions,
  onSelect,
  sortBy = 'SORT_BY_HITS_AND_NAME',
  searchText,
  filterIsOpen,
  handleKeyDown,
}: Props) => {
  const [allExpanded, setAllExpanded] = useState<boolean>(false);

  const toggleOptions = () => setAllExpanded(!allExpanded);

  const filteredOptions = options.filter(
    (option) =>
      !searchText ||
      option.name.toLowerCase().includes(searchText.toLowerCase()),
  );
  const tooManyOptions = filteredOptions.length > DEFAULT_VISIBLE_OPTIONS;

  return (
    filterIsOpen && (
      <div className="flex flex-col mb-1 mt-4">
        <div className={`overflow-y-scroll ${allExpanded && 'h-64'}`}>
          {filteredOptions
            .sort(getFacetSorter(sortBy))
            .slice(
              0,
              allExpanded ? filteredOptions.length : DEFAULT_VISIBLE_OPTIONS,
            )
            .map((option) => (
              <FilterOption
                option={option}
                selected={selectedOptions.includes(option.id)}
                onSelect={onSelect}
              />
            ))}
        </div>
        {tooManyOptions && (
          <div
            role="button"
            tabIndex={0}
            onClick={() => setAllExpanded(!allExpanded)}
            onKeyDown={(event) => handleKeyDown(event, toggleOptions)}
            className="text-blue-800 underline font-medium text-right focus:outline-none"
          >
            {allExpanded ? 'Show less' : `Show all (${filteredOptions.length})`}
          </div>
        )}
      </div>
    )
  );
};
