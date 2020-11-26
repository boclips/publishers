import { Facet } from 'boclips-api-client/dist/sub-clients/videos/model/VideoFacets';
import CheckboxFilter from 'src/components/filters/CheckboxFilter';
import React from 'react';

interface Props {
  handleFilter: (filter: string, values: string[]) => void;
  initialValues: string[];
  options: Facet[];
}

const setLabels = (filterOptions: Facet[]): Facet[] =>
  filterOptions.map((option) => {
    option = { ...option, id: option.id.toLocaleUpperCase() };
    switch (option.id) {
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
    <CheckboxFilter
      filterOptions={setLabels(options)}
      title="Video type"
      filterName="video_type"
      onFilter={handleFilter}
      initialValues={initialValues}
    />
  );
};
