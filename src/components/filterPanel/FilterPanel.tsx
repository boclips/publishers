import React from 'react';
import { VideoFacets } from 'boclips-api-client/dist/sub-clients/videos/model/VideoFacets';
import { VideoTypeFilter } from 'src/components/filterPanel/VideoTypeFilter';
import { SubjectFilter } from 'src/components/filterPanel/SubjectFilter';
import { ChannelFilter } from 'src/components/filterPanel/ChannelFilter';
import { DurationFilter } from 'src/components/filterPanel/DurationFilter';
import { useFilterOptions } from 'src/hooks/useFilterOptions';
import { PriceFilter } from 'src/components/filterPanel/PriceFilter';
import c from 'classnames';
import { ChannelsAndSubjectsProvider } from 'src/components/filterPanel/ChannelsAndSubjectsProvider';
import { SelectedFilters } from './SelectedFilters';

interface Props {
  query: string;
  facets?: VideoFacets;
  handleChange: (filter: string, values: string[]) => void;
  removeFilter: (filter: string, value: string) => void;
  removeAllFilters: () => void;
  noResults: boolean;
  areFiltersApplied: boolean;
}

export const FilterPanel = ({
  query,
  facets,
  handleChange,
  removeFilter,
  removeAllFilters,
  noResults,
  areFiltersApplied,
}: Props) => {
  const filterOptions = useFilterOptions(facets);

  const SelectedFilterPanelWithTitle = () => {
    return (
      <>
        <div
          className={c('text-primary text-lg font-medium', {
            // 'pb-4': selectedFilterOptions.length,
            'pb-4': true,
          })}
        >
          Filter by:
        </div>
        <SelectedFilters
          removeFilter={removeFilter}
          clearFilters={removeAllFilters}
        />
      </>
    );
  };

  if (noResults && !areFiltersApplied) return null;

  return (
    <div className="col-start-2 col-end-7">
      <ChannelsAndSubjectsProvider query={query}>
        <SelectedFilterPanelWithTitle />
        {!noResults && !areFiltersApplied && (
          <>
            <VideoTypeFilter
              options={filterOptions.videoTypes}
              handleChange={handleChange}
            />
            <DurationFilter
              options={filterOptions?.durations}
              handleChange={handleChange}
            />
            <ChannelFilter
              options={filterOptions?.channels}
              handleChange={handleChange}
            />
            <PriceFilter
              options={filterOptions.prices}
              handleChange={handleChange}
            />
            <SubjectFilter
              options={filterOptions?.subjects}
              handleChange={handleChange}
            />
          </>
        )}
      </ChannelsAndSubjectsProvider>
    </div>
  );
};
