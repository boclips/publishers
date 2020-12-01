import React, { useState } from 'react';
import { getFacetSorter } from 'src/services/sortFacets';
import { Facet } from 'boclips-api-client/dist/sub-clients/videos/model/VideoFacets';
import { SortBy } from 'src/types/SortBy';
import c from 'classnames';
import { FilterOption } from 'src/components/filterPanel/filter/FilterOption';
import { handleEnterKeyDown } from 'src/services/handleEnterKeyDown';
import s from './FilterOptionList.module.less';

interface Props {
  options: Facet[];
  selectedOptions: string[];
  onSelect: (event, item) => void;
  sortBy?: SortBy;
}
const DEFAULT_VISIBLE_OPTIONS = 5;

export const FilterOptionList = ({
  options,
  selectedOptions,
  onSelect,
  sortBy = 'SORT_BY_HITS_AND_NAME',
}: Props) => {
  const [allExpanded, setAllExpanded] = useState<boolean>(false);

  const toggleOptions = () => setAllExpanded(!allExpanded);

  const tooManyOptions = options.length > DEFAULT_VISIBLE_OPTIONS;

  return (
    <div className="flex flex-col mb-1 mt-4">
      <div
        className={c(s.filterOptions, {
          'h-64': allExpanded && tooManyOptions,
        })}
      >
        {options
          .sort(getFacetSorter(sortBy))
          .slice(0, allExpanded ? options.length : DEFAULT_VISIBLE_OPTIONS)
          .map((option) => (
            <span key={option.id}>
              <FilterOption
                option={option}
                selected={selectedOptions.includes(option.id)}
                onSelect={onSelect}
              />
            </span>
          ))}
      </div>
      {tooManyOptions && (
        <div
          role="button"
          tabIndex={0}
          onClick={() => setAllExpanded(!allExpanded)}
          onKeyDown={(event) => handleEnterKeyDown(event, toggleOptions)}
          className="text-blue-800 underline font-medium text-right focus:outline-none"
        >
          {allExpanded ? 'Show less' : `Show all (${options.length})`}
        </div>
      )}
    </div>
  );
};
