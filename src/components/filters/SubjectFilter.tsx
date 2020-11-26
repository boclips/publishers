import CheckboxFilter from 'src/components/filters/CheckboxFilter';
import React from 'react';
import { Facet } from 'boclips-api-client/dist/sub-clients/videos/model/VideoFacets';

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
    <CheckboxFilter
      filterOptions={options}
      title="Subject"
      filterName="subject"
      onFilter={handleFilter}
      initialValues={initialValues}
    />
  );
};
