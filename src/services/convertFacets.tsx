import { Facet } from 'boclips-api-client/dist/sub-clients/videos/model/VideoFacets';
import { FilterOption } from 'src/types/FilterOption';
import React from 'react';
import { getFacetSorter } from 'src/services/sortFacets';
import { SortBy } from 'src/types/SortBy';
import { DEFAULT_DURATIONS } from 'src/types/DefaultDurations';

const convertFacet = (facet: Facet): FilterOption => ({
  label: <span>{facet.name}</span>,
  hits: facet.hits,
  id: facet.id,
});

export const convertFacets = (
  facets: Facet[],
  sortBy: SortBy = 'SORT_BY_HITS_AND_NAME',
): FilterOption[] =>
  facets && facets.sort(getFacetSorter(sortBy)).map(convertFacet);

export const convertVideoTypes = (
  facets: Facet[],
  sortBy: SortBy,
): FilterOption[] =>
  convertFacets(
    facets.map((option) => {
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
    }),
    sortBy,
  );

export const convertDurations = (
  facets: Facet[],
  sortBy: SortBy,
): FilterOption[] => {
  const filteredFacets = facets?.filter((facet) => facet.hits > 0);
  return convertFacets(
    filteredFacets?.map((option) => {
      switch (option.name) {
        case DEFAULT_DURATIONS[0]:
          return { ...option, name: 'Up to 1 min' };
        case DEFAULT_DURATIONS[1]:
          return { ...option, name: '1 - 5 min' };
        case DEFAULT_DURATIONS[2]:
          return { ...option, name: '5 - 10 min' };
        case DEFAULT_DURATIONS[3]:
          return { ...option, name: '10 - 20 min' };
        case DEFAULT_DURATIONS[4]:
          return { ...option, name: '20 min +' };
        default:
          return option;
      }
    }),
    sortBy,
  );
};

export const searchFilterOptions = (
  options: Facet[],
  searchText?: string,
  sortBy: SortBy = 'SORT_BY_HITS_AND_NAME',
): FilterOption[] =>
  options.sort(getFacetSorter(sortBy)).reduce((acc, option) => {
    if (!searchText) {
      acc.push(convertFacet(option));
    } else if (option.name.toLowerCase().includes(searchText.toLowerCase())) {
      const filterOption: FilterOption = {
        id: option.id,
        hits: option.hits,
        label: boldMatchingText(option.name, searchText),
      };

      acc.push(filterOption);
    }
    return acc;
  }, []);

function boldMatchingText(text, shouldBeBold) {
  const textArray = text.split(new RegExp(`(${shouldBeBold})`, 'i'));
  return (
    <span>
      {textArray.map((item) => {
        return (
          <>
            {item.toLowerCase().includes(shouldBeBold.toLowerCase()) ? (
              <span className="font-medium">{item}</span>
            ) : (
              item
            )}
          </>
        );
      })}
    </span>
  );
}
