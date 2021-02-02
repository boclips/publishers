import { VideoFacets } from 'boclips-api-client/dist/sub-clients/videos/model/VideoFacets';
import { FilterOption } from 'src/types/FilterOption';
import { useSearchQueryLocationParams } from 'src/hooks/useLocationParams';
import { convertFacets } from 'src/services/convertFacets';

export interface Filters {
  subjects: FilterOption[];
  durations: FilterOption[];
  channels: FilterOption[];
  videoTypes: FilterOption[];
  prices: FilterOption[];
}

export const useFilterOptions = (facets: VideoFacets): Filters => {
  const [params] = useSearchQueryLocationParams();
  return convertFacets(facets, params.filters);
};
