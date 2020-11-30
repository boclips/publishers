import React from 'react';
import { Facet } from 'boclips-api-client/dist/sub-clients/videos/model/VideoFacets';
import { Filter } from 'src/components/filterPanel/filter/Filter';

interface Props {
  options: Facet[];
}

export const ChannelFilter = ({ options }: Props) => {
  return (
    <Filter
      options={options}
      title="Channel"
      filterName="channel"
      searchPlaceholder="Search for channel"
      searchEnabled
    />
  );
};
