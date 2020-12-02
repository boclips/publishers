import { SortBy } from 'src/types/SortBy';
import { Facet } from 'boclips-api-client/dist/sub-clients/videos/model/VideoFacets';

export const getFacetSorter = (by: SortBy) => {
  if (by === 'SORT_BY_NAME') {
    return sortByName;
  }

  if (by === 'SORT_BY_HITS_AND_NAME') {
    return sortByHitsAndName;
  }

  return sortByHitsAndName;
};

const sortByName = (a: Facet, b: Facet) => a.name.localeCompare(b.name);

const sortByHitsAndName = (a: Facet, b: Facet) => {
  if (a.hits === b.hits) {
    return a.name.localeCompare(b.name);
  }
  return b.hits - a.hits;
};
