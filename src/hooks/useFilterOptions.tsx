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
  const [urlParams] = useSearchQueryLocationParams();
  return convertFacetsToFilterOptions(facets, urlParams.filters);
};

// export const useFilterOptions = (facets: VideoFacets): Filters => {
//   const [cachedFacets, setCacheFacets] = useState<VideoFacets>(facets);
//   const [urlParams] = useSearchQueryLocationParams();

//   useEffect(() => {
//     setCacheFacets((previousCachedFacets) =>
//       mergeFacets(previousCachedFacets, facets),
//     );
//   }, [facets]);

//   return convertFacetsToFilterOptions(cachedFacets, urlParams.filters);
// };

const mergeFacets = (previousFacets, updatedFacets) => {
  const newFacets = { ...updatedFacets };

  Object.keys(previousFacets).forEach((key) => {
    updatedFacets[key] = previousFacets[key].map((facet) => ({
      ...facet,
      hits: updatedFacets[key].find((it) => it.id === facet.id)?.hits || 0,
    }));
  });

  return newFacets;
};
