import React from 'react';
import { FilterOption } from 'src/types/FilterOption';
import { FilterKey } from 'src/types/search/FilterKey';
import CrossIconSVG from 'src/resources/icons/cross-icon.svg';

interface Props {
  filter: FilterOption;
  removeFilter: (filter: FilterKey, value: string) => void;
}

export const SelectedFilterTag = ({ filter, removeFilter }: Props) => {
  return (
    <span className="py-1 pl-2 mb-1 border-solid border-2 border-blue-700 rounded flex flex-nowrap items-center">
      {filter.name}
      <span
        role="button"
        data-qa="remove-filter"
        className="mx-1 rounded p-1 text-gray-600 hover:text-blue-800 hover:border-blue-500 hover:bg-blue-400 h-5 w-5"
        tabIndex={0}
        onKeyPress={(_) => removeFilter(filter.key, filter.id)}
        onClick={() => removeFilter(filter.key, filter.id)}
      >
        <CrossIconSVG className="stroke-current  stroke-2 h-3 w-3" />
      </span>
    </span>
  );
};
