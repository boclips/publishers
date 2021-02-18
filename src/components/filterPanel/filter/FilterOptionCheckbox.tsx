import React from 'react';
import c from 'classnames';
import { FilterOption } from 'src/types/FilterOption';

interface Props {
  option: FilterOption;
  selected: boolean;
  onSelect: (event, item) => void;
}
export const FilterOptionCheckbox = ({ option, selected, onSelect }: Props) => {
  return (
    <div key={option.id} className="mb-2">
      <label
        htmlFor={option.id}
        className="flex items-start cursor-pointer text-gray-800"
      >
        <input
          onChange={(event) => onSelect(event, option.id)}
          className="form-checkbox checked:bg-blue-800 w-5 h-5 hover:border-blue-800 hover:border-solid border-2 cursor-pointer"
          type="checkbox"
          value={option.id}
          checked={selected}
          data-qa={`${option.id}-checkbox`}
          id={option.id}
        />
        <span
          className={c('text-sm ml-2 flex-grow text-left', {
            'font-medium': selected,
          })}
        >
          {option.label}
        </span>
        <span className="text-blue-700">{option.hits}</span>
      </label>
    </div>
  );
};
