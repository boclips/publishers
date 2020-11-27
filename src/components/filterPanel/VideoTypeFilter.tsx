import { Facet } from 'boclips-api-client/dist/sub-clients/videos/model/VideoFacets';
import React from 'react';
import { Filter } from 'src/components/filterPanel/filter/Filter';

interface Props {
  handleFilter: (filter: string, values: string[]) => void;
  initialValues: string[];
  options: Facet[];
}

const setLabels = (filterOptions: Facet[]): Facet[] =>
  filterOptions.map((option) => {
    switch (option.id.toUpperCase()) {
      case 'INSTRUCTIONAL':
        return { ...option, name: 'Educational' };
      case 'STOCK':
        return { ...option, name: 'Raw Footage' };
      case 'NEWS':
        return { ...option, name: 'News' };
      default:
        return option;
    }
  });

export const VideoTypeFilter = ({
  handleFilter,
  initialValues,
  options,
}: Props) => {
  return (
    <Filter
      options={setLabels(options)}
      title="Video type"
      filterName="video_type"
      sortBy="SORT_BY_NAME"
      onFilter={handleFilter}
      initialValues={initialValues}
    />
  );
};
