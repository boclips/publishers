import React from 'react';
import { Facet } from 'boclips-api-client/dist/sub-clients/videos/model/VideoFacets';
import { Filter } from 'src/components/filterPanel/filter/Filter';
import { convertDurations } from 'src/services/convertFacets';

interface Props {
  options: Facet[];
  handleChange: (filter: string, values: string[]) => void;
}

export const DurationFilter = ({ options, handleChange }: Props) => {
  return (
    <Filter
      options={convertDurations(options, 'SORT_BY_DURATION')}
      title="Duration"
      filterName="duration"
      handleChange={handleChange}
    />
  );
};
