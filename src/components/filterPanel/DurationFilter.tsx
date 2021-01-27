import React from 'react';
import { Filter } from 'src/components/filterPanel/filter/Filter';
import { convertFilterOptions } from 'src/services/convertFilterOptions';
import { FilterOption } from 'src/types/FilterOption';

interface Props {
  options: FilterOption[];
  handleChange: (filter: string, values: string[]) => void;
}

export const DurationFilter = ({ options, handleChange }: Props) => {
  return (
    <Filter
      options={convertFilterOptions(options, 'SORT_BY_DURATION')}
      title="Duration"
      filterName="duration"
      handleChange={handleChange}
    />
  );
};
