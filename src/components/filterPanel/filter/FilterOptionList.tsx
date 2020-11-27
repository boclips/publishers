import React, { useState } from 'react';
import { getFacetSorter } from 'src/services/sortFacets';
import { Facet } from 'boclips-api-client/dist/sub-clients/videos/model/VideoFacets';
import { SortBy } from 'src/types/SortBy';
import c from 'classnames';

interface Props {
  filterOptions: Facet[];
  selectedOptions: string[];
  onSelect: (event, item) => void;
  sortBy?: SortBy;
  filterIsOpen: boolean;
  searchText?: string;
  handleKeyDown: (event, callback) => void;
}
const DEFAULT_VISIBLE_OPTIONS = 5;

export const FilterOptionList = ({
  filterOptions,
  selectedOptions,
  onSelect,
  sortBy = 'SORT_BY_HITS_AND_NAME',
  searchText,
  filterIsOpen,
  handleKeyDown,
}: Props) => {
  const [allExpanded, setAllExpanded] = useState<boolean>(false);
  const toggleOptions = () => setAllExpanded(!allExpanded);

  const renderOptionsToggle = () => {
    const tooManyOptions = filterOptions.length > DEFAULT_VISIBLE_OPTIONS;

    if (tooManyOptions) {
      return (
        <div
          role="button"
          tabIndex={0}
          onClick={() => setAllExpanded(!allExpanded)}
          onKeyDown={(event) => handleKeyDown(event, toggleOptions)}
          className="text-blue-800 underline font-medium text-right focus:outline-none"
        >
          {allExpanded ? 'Show less' : `Show all (${filterOptions.length})`}
        </div>
      );
    }
    return '';
  };

  return (
    filterIsOpen && (
      <div className="flex flex-col mb-1 mt-4">
        <div className={`overflow-y-scroll ${allExpanded && 'h-64'}`}>
          {filterOptions
            .filter(
              (option) =>
                !searchText ||
                option.name.toLowerCase().includes(searchText.toLowerCase()),
            )
            .sort(getFacetSorter(sortBy))
            .slice(
              0,
              allExpanded ? filterOptions.length : DEFAULT_VISIBLE_OPTIONS,
            )
            .map((item) => (
              <div key={item.id} className="mb-3">
                <label
                  htmlFor={item.id}
                  className="flex items-center cursor-pointer text-gray-700"
                >
                  <input
                    onChange={(event) => onSelect(event, item.id)}
                    className="form-checkbox checked:bg-blue-800 w-5 h-5 hover:border-blue-800 hover:border-solid border-2"
                    type="checkbox"
                    value={item.id}
                    checked={selectedOptions.includes(item.id)}
                    data-qa={`${item.id}-checkbox`}
                    id={item.id}
                  />
                  <span
                    className={c('text-sm ml-2 flex-grow', {
                      'font-medium': selectedOptions.includes(item.id),
                    })}
                  >
                    {item.name}
                  </span>
                  <span className="text-blue-700">{item.hits}</span>
                </label>
              </div>
            ))}
        </div>
        {renderOptionsToggle()}
      </div>
    )
  );
};
