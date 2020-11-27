import React from 'react';
import { Facet } from 'boclips-api-client/dist/sub-clients/videos/model/VideoFacets';
import { Filter } from 'src/components/filterPanel/filter/Filter';

interface Props {
  handleFilter: (key: string, values: string[]) => void;
  initialValues: string[];
  options: Facet[];
}

export const ChannelFilter = ({
  handleFilter,
  initialValues,
  options,
}: Props) => {
  return (
    <Filter
      options={options}
      title="Channel"
      filterName="channel"
      onFilter={handleFilter}
      initialValues={initialValues}
      searchPlaceholder="Search for channel"
      searchEnabled
    />
  );
};
