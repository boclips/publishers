import React, { useState } from 'react';
import c from 'classnames';
import { handleEnterKeyDown } from 'src/services/handleEnterKeyDown';
import { FilterOption } from 'src/types/FilterOption';
import { FilterOptionCheckbox } from 'src/components/filterPanel/filter/FilterOptionCheckbox';
import s from './FilterOptionList.module.less';

interface Props {
  options: FilterOption[];
  selectedOptions: string[];
  onSelect: (event, item) => void;
}
const DEFAULT_VISIBLE_OPTIONS = 5;

export const FilterOptionList = ({
  options,
  selectedOptions,
  onSelect,
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

          .slice(0, allExpanded ? options.length : DEFAULT_VISIBLE_OPTIONS)
          .map((option) => (
            <span key={option.id}>
              <FilterOptionCheckbox
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
          onKeyPress={(event) => handleEnterKeyDown(event, toggleOptions)}
          className="text-blue-800 underline font-medium text-right focus:outline-none"
        >
          {allExpanded ? 'Show less' : `Show all (${options.length})`}
        </div>
      )}
    </div>
  );
};
