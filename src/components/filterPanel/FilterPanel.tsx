import React from 'react';
import { VideoFacets } from 'boclips-api-client/dist/sub-clients/videos/model/VideoFacets';
import { VideoTypeFilter } from 'src/components/filterPanel/VideoTypeFilter';
import { SubjectFilter } from 'src/components/filterPanel/SubjectFilter';
import { ChannelFilter } from 'src/components/filterPanel/ChannelFilter';
import { DurationFilter } from 'src/components/filterPanel/DurationFilter';
import { Filters, useFilterOptions } from 'src/hooks/useFilterOptions';
import { FilterOption } from 'src/types/FilterOption';
import { PriceFilter } from 'src/components/filterPanel/PriceFilter';
import { SelectedFilters } from './SelectedFilters';

interface Props {
  facets?: VideoFacets;
  handleChange: (filter: string, values: string[]) => void;
}

export const FilterPanel = ({ facets, handleChange }: Props) => {
  const filterOptions = useFilterOptions(facets);

  const selectedFilterOptions = React.useMemo(
    () => getSelectedFilterOptions(filterOptions),
    [filterOptions],
  );

  return (
    <div className="col-start-2 col-end-7">
      <div className="text-primary text-lg font-medium pb-4">Filter by: </div>
      <SelectedFilters selectedFilterOptions={selectedFilterOptions} />
      <VideoTypeFilter
        options={filterOptions.videoTypes}
        handleChange={handleChange}
      />
      <DurationFilter
        options={filterOptions?.durations}
        handleChange={handleChange}
      />
      <ChannelFilter
        options={filterOptions?.channels}
        handleChange={handleChange}
      />
      <SubjectFilter
        options={filterOptions?.subjects}
        handleChange={handleChange}
      />
      <PriceFilter options={filterOptions.prices} handleChange={handleChange} />
    </div>
  );
};

const getSelectedFilterOptions = (filterOptions: Filters): FilterOption[] => {
  return [
    ...filterOptions.channels.filter((option) => option.isSelected),
    ...filterOptions.subjects.filter((option) => option.isSelected),
    ...filterOptions.videoTypes.filter((option) => option.isSelected),
    ...filterOptions.durations.filter((option) => option.isSelected),
    ...filterOptions.prices.filter((option) => option.isSelected),
  ];
};
