import React from 'react';
import { VideoFacets } from 'boclips-api-client/dist/sub-clients/videos/model/VideoFacets';
import { VideoTypeFilter } from 'src/components/filters/VideoTypeFilter';
import { SubjectFilter } from 'src/components/filters/SubjectFilter';

interface Props {
  handleFilter: (filter: string, values: string[]) => void;
  facets?: VideoFacets;
  initialVideoTypeFilters: string[];
  initialSubjectFilters: string[];
}

export const FilterPanel = ({
  handleFilter,
  facets,
  initialVideoTypeFilters,
  initialSubjectFilters,
}: Props) => {
  return (
    <div>
      <VideoTypeFilter
        handleFilter={handleFilter}
        options={facets?.videoTypes}
        initialValues={initialVideoTypeFilters}
      />
      <SubjectFilter
        handleFilter={handleFilter}
        options={facets?.subjects}
        initialValues={initialSubjectFilters}
      />
    </div>
  );
};
