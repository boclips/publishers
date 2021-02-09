import { VideoFacets } from 'boclips-api-client/dist/sub-clients/videos/model/VideoFacets';
import { FilterOption } from 'src/types/FilterOption';
import { useSearchQueryLocationParams } from 'src/hooks/useLocationParams';
import { convertFacetsToFilterOptions } from 'src/services/convertFacetsToFilterOptions';

export interface Filters {
  subjects: FilterOption[];
  durations: FilterOption[];
  channels: FilterOption[];
  videoTypes: FilterOption[];
  prices: FilterOption[];
}
/*
1 - receives facets and extracts applied filters from URL
2 -  Converts all facets into filter options to be rendered in the filter panels
3 - adds isSelected: true to all facets that appear in the URL
 */
export const useFilterOptions = (facets: VideoFacets): Filters => {
  const [urlParams] = useSearchQueryLocationParams();
  return convertFacetsToFilterOptions(facets, urlParams.filters);
};
