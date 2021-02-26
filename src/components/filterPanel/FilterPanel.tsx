import React from 'react';
import { VideoFacets } from 'boclips-api-client/dist/sub-clients/videos/model/VideoFacets';
import { VideoTypeFilter } from 'src/components/filterPanel/VideoTypeFilter';
import { SubjectFilter } from 'src/components/filterPanel/SubjectFilter';
import { ChannelFilter } from 'src/components/filterPanel/ChannelFilter';
import { DurationFilter } from 'src/components/filterPanel/DurationFilter';
import { useFilterOptions } from 'src/hooks/useFilterOptions';
import { PriceFilter } from 'src/components/filterPanel/PriceFilter';
import c from 'classnames';
import { useLocationFilters } from 'src/hooks/useLocationFilters';
import { FilterOption } from 'src/types/FilterOption';
import { SelectedFilters } from './SelectedFilters';

interface Props {
  facets?: VideoFacets;
  handleChange: (filter: string, values: string[]) => void;
  removeFilter: (filter: string, value: string) => void;
  removeAllFilters: () => void;
  noResults: boolean;
  areFiltersApplied: boolean;
}

export const FilterPanel = ({
  facets,
  handleChange,
  removeFilter,
  removeAllFilters,
  noResults,
  areFiltersApplied,
}: Props) => {
  const [appliedFilters] = useLocationFilters();
  const filterOptions = useFilterOptions(facets);
  const isDurationFilterApplied = filterOptions.durations.find(
    (it) => it.hits > 0,
  );

  const finalChannelFilters = [
    ...appliedFilters
      .filter((af) => af.key === 'channel')
      .map(
        (fnif): FilterOption => {
          return {
            id: fnif.id,
            name: fnif.name,
            hits: 9999,
            key: 'channel',
            label: <span>{fnif.name}</span>,
          };
        },
      ),
    ...filterOptions.channels,
  ];

  if (noResults && !areFiltersApplied) return null;

  return (
    <div className="col-start-2 col-end-7">
      <div
        className={c('text-primary text-lg font-medium', {
          'pb-4': areFiltersApplied,
        })}
      >
        Filter by:
      </div>
      {areFiltersApplied && (
        <SelectedFilters
          removeFilter={removeFilter}
          clearFilters={removeAllFilters}
          appliedFilters={appliedFilters}
        />
      )}
      {filterOptions.videoTypes.length > 0 && (
        <VideoTypeFilter
          options={filterOptions.videoTypes}
          handleChange={handleChange}
        />
      )}
      {isDurationFilterApplied && (
        <DurationFilter
          options={filterOptions.durations}
          handleChange={handleChange}
        />
      )}
      {finalChannelFilters.length > 0 && (
        <ChannelFilter
          options={finalChannelFilters}
          handleChange={handleChange}
        />
      )}
      {filterOptions.prices.length > 0 && (
        <PriceFilter
          options={filterOptions.prices}
          handleChange={handleChange}
        />
      )}
      {filterOptions.subjects.length > 0 && (
        <SubjectFilter
          options={filterOptions.subjects}
          handleChange={handleChange}
        />
      )}
    </div>
  );
};
