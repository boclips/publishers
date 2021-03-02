import React, { useEffect, useState } from 'react';
import { SelectedFilterTag } from 'src/components/filterPanel/SelectedFilterTag';
import { FilterKey } from 'src/types/search/FilterKey';
import { useSearchQueryLocationParams } from 'src/hooks/useLocationParams';
import { getFilterLabel } from 'src/services/convertFacetsToFilterOptions';
import { useGetChannelsQuery } from 'src/hooks/api/channelQuery';
import { useGetSubjectsQuery } from 'src/hooks/api/subjectQuery';

interface Props {
  removeFilter?: (filter: FilterKey, value: string) => void;
  clearFilters?: () => void;
}

export interface SelectedFilter {
  id: string;
  name: string;
  key: FilterKey;
}

export const SelectedFilters = ({ removeFilter, clearFilters }: Props) => {
  const [searchQueryLocationParams] = useSearchQueryLocationParams();

  const [filtersToRender, setFiltersToRender] = useState<SelectedFilter[]>([]);
  const { data: channels } = useGetChannelsQuery();
  const { data: subjects } = useGetSubjectsQuery();

  const buildSelectedFilter = (
    selectedFilterId: string,
    filterKey: FilterKey,
  ): SelectedFilter => {
    return {
      id: selectedFilterId,
      name: getFilterLabel(filterKey, selectedFilterId, channels, subjects),
      key: filterKey,
    };
  };

  useEffect(() => {
    if (searchQueryLocationParams && channels && subjects) {
      const filtersInUrl: SelectedFilter[][] = Object.entries(
        searchQueryLocationParams.filters,
      ).map(([filterKey, appliedFilters]) => {
        return appliedFilters.map((appliedFilterId) =>
          buildSelectedFilter(appliedFilterId, filterKey as FilterKey),
        );
      });
      const flattenedFiltersInUrl: SelectedFilter[] = ([] as SelectedFilter[]).concat(
        ...filtersInUrl,
      );
      setFiltersToRender(flattenedFiltersInUrl);
    }
    // eslint-disable-next-line
  }, [
    searchQueryLocationParams.filters.video_type.length,
    searchQueryLocationParams.filters.channel.length,
    searchQueryLocationParams.filters.duration.length,
    searchQueryLocationParams.filters.subject.length,
    searchQueryLocationParams.filters.prices.length,
    channels,
    subjects,
  ]);

  return (
    <div>
      <div
        className="mb-4 font-medium flex justify-between items-center"
        style={{ height: '1.9375rem' }}
      >
        <span className="text-base ">Selected filters</span>
        <span
          className="text-sm text-blue-800 cursor-pointer"
          tabIndex={0}
          onKeyDown={() => clearFilters()}
          role="button"
          onClick={() => clearFilters()}
        >
          Clear all
        </span>
      </div>
      <div className="flex flex-wrap " data-qa="applied-filter-tags">
        {filtersToRender.map((filter) => (
          <SelectedFilterTag
            key={`${filter.name}-${filter.id}`}
            filter={filter}
            removeFilter={removeFilter}
          />
        ))}
      </div>
    </div>
  );
};
