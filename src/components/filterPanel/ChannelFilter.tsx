import React from 'react';
import { Facet } from 'boclips-api-client/dist/sub-clients/videos/model/VideoFacets';
import { Filter } from 'src/components/filterPanel/filter/Filter';

interface Props {
  options: Facet[];
  handleChange: (filter: string, values: string[]) => void;
}

export const ChannelFilter = ({ options, handleChange }: Props) => {
  return (
    <Filter
      options={options}
      title="Channel"
      filterName="channel"
      handleChange={handleChange}
      searchPlaceholder="Search for channel"
      searchEnabled
    />
  );
};
