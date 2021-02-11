import { VideoFacets } from 'boclips-api-client/dist/sub-clients/videos/model/VideoFacets';
import { FilterOption } from 'src/types/FilterOption';
import { useSearchQueryLocationParams } from 'src/hooks/useLocationParams';
import { convertFacetsToFilterOptions } from 'src/services/convertFacetsToFilterOptions';
import { useEffect, useState } from 'react';

export interface Filters {
  subjects: FilterOption[];
  durations: FilterOption[];
  channels: FilterOption[];
  videoTypes: FilterOption[];
  prices: FilterOption[];
}

export const useFilterOptions = (facets: VideoFacets): Filters => {
  const [statefulFacets, setStatefulFacets] = useState<VideoFacets>(facets);
  const [urlParams] = useSearchQueryLocationParams();

  useEffect(() => {
    const newFacets = facets;

    Object.keys(statefulFacets).forEach((key) => {
      newFacets[key] = statefulFacets[key].map((facet) => ({
        ...facet,
        hits: facets[key].find((it) => it.id === facet.id)?.hits || 0,
      }));
    });

    setStatefulFacets(newFacets as VideoFacets);
  }, [facets]);

  return convertFacetsToFilterOptions(statefulFacets, urlParams.filters);
};
