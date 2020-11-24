import React from 'react';
import { VideoFacets } from 'boclips-api-client/dist/sub-clients/videos/model/VideoFacets';
import { VideoTypeFilter } from 'src/components/filters/VideoTypeFilter';

interface Props {
  handleFilter: (filter: string, values: string[]) => void;
  facets?: VideoFacets;
  initialVideoTypeFilters: string[];
}

export const FilterPanel = ({
  handleFilter,
  facets,
  initialVideoTypeFilters,
}: Props) => {
  return (
    <VideoTypeFilter
      handleFilter={handleFilter}
      options={facets?.videoTypes}
      initialValues={initialVideoTypeFilters}
    />
  );
};
