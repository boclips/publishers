import { Facet } from 'boclips-api-client/dist/sub-clients/videos/model/VideoFacets';
import { FilterOption } from 'src/types/FilterOption';
import React from 'react';
import { getFacetSorter } from 'src/services/sortFacets';
import { SortBy } from 'src/types/SortBy';

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
              <b>{item}</b>
            ) : (
              item
            )}
          </>
        );
      })}
    </span>
  );
}
