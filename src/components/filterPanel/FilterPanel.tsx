import React from 'react';
import { VideoFacets } from 'boclips-api-client/dist/sub-clients/videos/model/VideoFacets';
import { VideoTypeFilter } from 'src/components/filterPanel/VideoTypeFilter';
import { SubjectFilter } from 'src/components/filterPanel/SubjectFilter';
import { ChannelFilter } from 'src/components/filterPanel/ChannelFilter';

interface Props {
  facets?: VideoFacets;
}

export const FilterPanel = ({ facets }: Props) => {
  return (
    <div className="col-start-2 col-end-7">
      <VideoTypeFilter options={facets?.videoTypes} />
      <ChannelFilter options={facets?.channels} />
      <SubjectFilter options={facets?.subjects} />
    </div>
  );
};
