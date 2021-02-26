import { useEffect, useState } from 'react';
import { getFilterLabel } from 'src/services/convertFacetsToFilterOptions';
import { useGetChannelsQuery } from 'src/hooks/api/channelQuery';
import { useGetSubjectsQuery } from 'src/hooks/api/subjectQuery';
import { useSearchQueryLocationParams } from 'src/hooks/useLocationParams';
import { FilterKey } from '../types/search/FilterKey';

export interface SelectedFilter {
  id: string;
  name: string;
  key: FilterKey;
}

export const useLocationFilters = (): [SelectedFilter[]] => {
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

  return [filtersToRender];
};
