import React from 'react';
import { VideoFacets } from 'boclips-api-client/dist/sub-clients/videos/model/VideoFacets';
import { VideoTypeFilter } from 'src/components/filterPanel/VideoTypeFilter';
import { SubjectFilter } from 'src/components/filterPanel/SubjectFilter';
import { ChannelFilter } from 'src/components/filterPanel/ChannelFilter';
import { DurationFilter } from 'src/components/filterPanel/DurationFilter';
import { useFilterOptions } from 'src/hooks/useFilterOptions';
import { PriceFilter } from 'src/components/filterPanel/PriceFilter';
import c from 'classnames';
import {SelectedFilter, useLocationFilters} from 'src/hooks/useLocationFilters';
import { FilterOption } from 'src/types/FilterOption';
import { SelectedFilters } from './SelectedFilters';
import {FilterKey} from "src/types/search/FilterKey";

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

  const buildEmptyOptionFilter = (selectedFilter: SelectedFilter, filterKey: FilterKey)  => {
    return {
      id: selectedFilter.id,
      name: selectedFilter.name,
      hits: 0,
      key: filterKey,
      label: <span>{selectedFilter.name}</span>,
    };
  }

  const hasNoHits = (filterCategory: FilterOption[], appliedFilter: SelectedFilter) =>
      !filterCategory.find((option => option.id === appliedFilter.id))

  const transformIntoEmptyOptionFilters = (filterCategory: FilterOption[], filterKey: FilterKey) => {
    const filtersWithNoHits = appliedFilters
        .filter((appliedFilter) => appliedFilter.key === filterKey)
        .filter((appliedFilter) => hasNoHits(filterCategory, appliedFilter))
    return filtersWithNoHits
        .map((fnif): FilterOption => (buildEmptyOptionFilter(fnif, filterKey)))
  }

  const buildFilterOptionsWithEmptyHits = (filterCategory: FilterOption[], filterKey: FilterKey) => [
    ...transformIntoEmptyOptionFilters(filterCategory, filterKey),
    ...filterCategory,
  ];

  const finalChannelFilters = buildFilterOptionsWithEmptyHits(filterOptions.channels, 'channel')
  const finalSubjectFilters = buildFilterOptionsWithEmptyHits(filterOptions.subjects, 'subject')
  const finalDurationFilters = buildFilterOptionsWithEmptyHits(filterOptions.durations, 'duration')
  const finalPriceFilters = buildFilterOptionsWithEmptyHits(filterOptions.prices, 'prices')
  const finalVideoTypeFilters = buildFilterOptionsWithEmptyHits(filterOptions.videoTypes, 'video_type')

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
      {finalVideoTypeFilters.length > 0 && (
        <VideoTypeFilter
          options={finalVideoTypeFilters}
          handleChange={handleChange}
        />
      )}
      {isDurationFilterApplied && (
        <DurationFilter
          options={finalDurationFilters}
          handleChange={handleChange}
        />
      )}
      {finalChannelFilters.length > 0 && (
        <ChannelFilter
          options={finalChannelFilters}
          handleChange={handleChange}
        />
      )}
      {finalPriceFilters.length > 0 && (
        <PriceFilter
          options={finalPriceFilters}
          handleChange={handleChange}
        />
      )}
      {finalSubjectFilters.length > 0 && (
        <SubjectFilter
          options={finalSubjectFilters}
          handleChange={handleChange}
        />
      )}
    </div>
  );
};
