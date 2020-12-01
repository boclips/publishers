import React from 'react';
import { VideoFacets } from 'boclips-api-client/dist/sub-clients/videos/model/VideoFacets';
import { VideoTypeFilter } from 'src/components/filterPanel/VideoTypeFilter';
import { SubjectFilter } from 'src/components/filterPanel/SubjectFilter';
import { ChannelFilter } from 'src/components/filterPanel/ChannelFilter';

interface Props {
  facets?: VideoFacets;
  handleChange: (filter: string, values: string[]) => void;
}

export const FilterPanel = ({ facets, handleChange }: Props) => {
  return (
    <div className="col-start-2 col-end-7">
      <VideoTypeFilter
        options={facets?.videoTypes}
        handleChange={handleChange}
      />
      <ChannelFilter options={facets?.channels} handleChange={handleChange} />
      <SubjectFilter options={facets?.subjects} handleChange={handleChange} />
    </div>
  );
};
