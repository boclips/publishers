import React, { useEffect, useState } from 'react';
import { SelectedFilterTag } from 'src/components/filterPanel/SelectedFilterTag';
import { FilterKey } from 'src/types/search/FilterKey';
import { useSearchQueryLocationParams } from 'src/hooks/useLocationParams';
import { useChannelsAndSubjectsProvider } from 'src/components/filterPanel/ChannelsAndSubjectsProvider';
import { getFilterLabel } from 'src/services/convertFacetsToFilterOptions';

interface Props {
  removeFilter?: (filter: FilterKey, value: string) => void;
  clearFilters?: () => void;
}

export const SelectedFilters = ({ removeFilter, clearFilters }: Props) => {
  const [searchQueryLocationParams] = useSearchQueryLocationParams();
  const originalFacets = useChannelsAndSubjectsProvider();

  const [filtersToRender, setFiltersToRender] = useState([]);

  useEffect(() => {
    if (searchQueryLocationParams && originalFacets) {
      const filtersInUrl = Object.keys(searchQueryLocationParams.filters)
        .map((key) => {
          return searchQueryLocationParams.filters[key].map((filter) => ({
            id: filter,
            name: getFilterLabel(key, filter, originalFacets),
            key,
          }));
        })
        .flat();

      setFiltersToRender(filtersInUrl);
    }
  }, [
    searchQueryLocationParams.filters.video_type.length,
    searchQueryLocationParams.filters.channel.length,
    searchQueryLocationParams.filters.duration.length,
    searchQueryLocationParams.filters.subject.length,
    searchQueryLocationParams.filters.prices.length,
    originalFacets,
  ]);

  return (
    <div>
      <div
        className="mb-4 font-medium flex justify-between items-center"
        style={{ height: '1.9375rem' }}
      >
        <span className="text-base ">Selected filters</span>
        <span
          className="text-sm text-blue-800 cursor-pointer"
          tabIndex={0}
          onKeyDown={() => clearFilters()}
          role="button"
          onClick={() => clearFilters()}
        >
          CLEAR ALL
        </span>
      </div>
      {console.log(filtersToRender)}
      <div className="flex flex-wrap " data-qa="applied-filter-tags">
        {filtersToRender.map((filter) => (
          <SelectedFilterTag
            key={`${filter.name}-${filter.id}`}
            filter={filter}
            removeFilter={removeFilter}
          />
        ))}
      </div>
    </div>
  );
};
