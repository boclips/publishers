import React from 'react';
import { Facet } from 'boclips-api-client/dist/sub-clients/videos/model/VideoFacets';
import { Filter } from 'src/components/filterPanel/filter/Filter';
import { convertFacets } from 'src/services/convertFacets';

interface Props {
  options: Facet[];
  handleChange: (filter: string, values: string[]) => void;
}

export const SubjectFilter = ({ options, handleChange }: Props) => {
  return (
    <Filter
      options={convertFacets(options, 'SORT_BY_HITS_AND_NAME')}
      title="Subject"
      filterName="subject"
      handleChange={handleChange}
    />
  );
};
