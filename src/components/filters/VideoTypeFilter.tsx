import { Facet } from 'boclips-api-client/dist/sub-clients/videos/model/VideoFacets';
import CheckboxFilter, {
  FilterOption,
} from 'src/components/filters/CheckboxFilter';
import React from 'react';

interface Props {
  handleFilter: (filter: string, values: string[]) => void;
  initialValues: string[];
  options: { [id: string]: Facet };
}

export const VideoTypeFilter = ({
  handleFilter,
  initialValues,
  options,
}: Props) => {
  return (
    <CheckboxFilter
      filterOptions={getVideoTypeOptions(options)}
      title="Video type"
      filterName="video_type"
      onFilter={handleFilter}
      initialValues={initialValues}
    />
  );
};

const getVideoTypeOptions = (facets: {
  [id: string]: Facet;
}): FilterOption[] => {
  return (
    facets &&
    [
      facets.instructional && {
        label: 'Educational',
        hits: facets.instructional.hits,
        id: 'INSTRUCTIONAL',
      },
      facets.stock && {
        label: 'Raw Footage',
        hits: facets.stock.hits,
        id: 'STOCK',
      },
      facets.news && {
        label: 'News',
        hits: facets.news.hits,
        id: 'NEWS',
      },
    ].filter(Boolean)
  );
};
