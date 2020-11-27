import React from 'react';
import { Facet } from 'boclips-api-client/dist/sub-clients/videos/model/VideoFacets';
import { Filter } from 'src/components/filterPanel/filter/Filter';

interface Props {
  handleFilter: (key: string, values: string[]) => void;
  initialValues: string[];
  options: Facet[];
}

export const SubjectFilter = ({
  handleFilter,
  initialValues,
  options,
}: Props) => {
  return (
    <Filter
      options={options}
      title="Subject"
      filterName="subject"
      onFilter={handleFilter}
      initialValues={initialValues}
    />
  );
};
