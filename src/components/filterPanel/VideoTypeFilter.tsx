import { Facet } from 'boclips-api-client/dist/sub-clients/videos/model/VideoFacets';
import React from 'react';
import { Filter } from 'src/components/filterPanel/filter/Filter';
import { convertVideoTypes } from 'src/services/convertFacets';

interface Props {
  options: Facet[];
  handleChange?: (filter: string, values: string[]) => void;
}

export const VideoTypeFilter = ({ options = [], handleChange }: Props) => {
  return (
    <Filter
      options={convertVideoTypes(options, 'SORT_BY_NAME')}
      title="Video type"
      handleChange={handleChange}
      filterName="video_type"
    />
  );
};
