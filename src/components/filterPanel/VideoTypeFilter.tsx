import React from 'react';
import { Filter } from 'src/components/filterPanel/filter/Filter';
import { convertFilterOptions } from 'src/services/convertFilterOptions';
import { FilterOption } from 'src/types/FilterOption';

interface Props {
  options: FilterOption[];
  handleChange?: (filter: string, values: string[]) => void;
}

export const VideoTypeFilter = ({ options = [], handleChange }: Props) => {
  return (
    <Filter
      options={convertFilterOptions(options, 'SORT_BY_NAME')}
      title="Video type"
      handleChange={handleChange}
      filterName="video_type"
    />
  );
};
