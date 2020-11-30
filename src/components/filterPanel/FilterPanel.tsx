import React from 'react';
import { VideoFacets } from 'boclips-api-client/dist/sub-clients/videos/model/VideoFacets';
import { VideoTypeFilter } from 'src/components/filterPanel/VideoTypeFilter';
import { SubjectFilter } from 'src/components/filterPanel/SubjectFilter';
import { ChannelFilter } from 'src/components/filterPanel/ChannelFilter';

interface Props {
  handleFilter: (filter: string, values: string[]) => void;
  facets?: VideoFacets;
  initialVideoTypeFilters: string[];
  initialSubjectFilters: string[];
  initialChannelFilters: string[];
}

export const FilterPanel = ({
  handleFilter,
  facets,
  initialVideoTypeFilters,
  initialSubjectFilters,
  initialChannelFilters,
}: Props) => {
  return (
    <div className="col-start-2 col-end-7">
      <VideoTypeFilter
        handleFilter={handleFilter}
        options={facets?.videoTypes}
        initialValues={initialVideoTypeFilters}
      />
      <ChannelFilter
        options={facets?.channels}
        handleFilter={handleFilter}
        initialValues={initialChannelFilters}
      />
      <SubjectFilter
        handleFilter={handleFilter}
        options={facets?.subjects}
        initialValues={initialSubjectFilters}
      />
    </div>
  );
};
