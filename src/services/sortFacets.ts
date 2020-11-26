import { Facet } from 'boclips-api-client/dist/sub-clients/videos/model/VideoFacets';

export const sortByHitAndName = (a: Facet, b: Facet) => {
  if (a.hits === b.hits) {
    return a.name.localeCompare(b.name);
  }
  return b.hits - a.hits;
};
