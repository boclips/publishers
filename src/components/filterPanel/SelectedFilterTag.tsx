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
    <span className="py-1 px-2 mr-2 mb-2 border-solid border-2 border-blue-700 rounded flex flex-nowrap items-center">
      {filter.name}
      <span
        role="button"
        data-qa="remove-filter"
        className="ml-2"
        tabIndex={0}
        onKeyPress={(_) => removeFilter(filter.key, filter.id)}
        onClick={() => removeFilter(filter.key, filter.id)}
      >
        <CrossIconSVG className="text-blue-700 stroke-current stroke-2" />
      </span>
    </span>
  );
};
