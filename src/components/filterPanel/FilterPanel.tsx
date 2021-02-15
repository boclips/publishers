import React from 'react';
import { VideoFacets } from 'boclips-api-client/dist/sub-clients/videos/model/VideoFacets';
import { VideoTypeFilter } from 'src/components/filterPanel/VideoTypeFilter';
import { SubjectFilter } from 'src/components/filterPanel/SubjectFilter';
import { ChannelFilter } from 'src/components/filterPanel/ChannelFilter';
import { DurationFilter } from 'src/components/filterPanel/DurationFilter';
import { useFilterOptions } from 'src/hooks/useFilterOptions';
import { PriceFilter } from 'src/components/filterPanel/PriceFilter';
import { useSearchQueryLocationParams } from 'src/hooks/useLocationParams';
import c from 'classnames';
import { SelectedFilters } from './SelectedFilters';

interface Props {
  facets?: VideoFacets;
  handleChange: (filter: string, values: string[]) => void;
  removeFilter: (filter: string, value: string) => void;
  removeAllFilters: () => void;
  noResults: boolean;
  areFiltersApplied: boolean;
}

export const FilterPanel = ({
  facets,
  handleChange,
  removeFilter,
  removeAllFilters,
  noResults,
  areFiltersApplied,
}: Props) => {
  const filterOptions = useFilterOptions(facets);
  // const [searchLocation] = useSearchQueryLocationParams();

  const x = () => {
    searchLocation.filters.video_type.map((selectedFilterId) => {
      const matchingFacet = filterOptions.videoTypes.find(
        (facet) => facet.id === selectedFilterId,
      );

      return (
        matchingFacet || {
          name: selectedFilterId,
          id: selectedFilterId,
          label: 'something',
          hits: 0,
        }
      );
    });
  };
  //
  // const selectedFilterOptions = React.useMemo(
  //   () => [
  //     ...filterOptions.channels.filter((option) =>
  //       searchLocation.filters.channel.includes(option.id),
  //     ),
  //     ...filterOptions.subjects.filter((option) =>
  //       searchLocation.filters.subject.includes(option.id),
  //     ),
  //     ...searchLocation.filters.video_type.map((selectedFilterId) => {
  //       const matchingFacet = filterOptions.videoTypes.find(
  //         (facet) => facet.id === selectedFilterId,
  //       );
  //
  //       return (
  //         matchingFacet || {
  //           name: selectedFilterId,
  //           id: selectedFilterId,
  //           label: 'something',
  //           hits: 0,
  //         }
  //       );
  //     }),
  //     ...filterOptions.durations.filter((option) =>
  //       searchLocation.filters.duration.includes(option.id),
  //     ),
  //     ...filterOptions.prices.filter((option) =>
  //       searchLocation.filters.prices.includes(option.id),
  //     ),
  //   ],
  //   [filterOptions, searchLocation],
  // );

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

  const renderFilters = () => {
    if (noResults && !areFiltersApplied) return null;

    if (noResults && areFiltersApplied) return <SelectedFilterPanelWithTitle />;

    return (
      <>
        <SelectedFilterPanelWithTitle />
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
    );
  };

  return <div className={c('col-start-2 col-end-7')}>{renderFilters()}</div>;
};
