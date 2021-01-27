import React from 'react';
import { getFacetSorter } from 'src/services/sortFacets';
import { SortBy } from 'src/types/SortBy';
import { FilterOption } from 'src/types/FilterOption';

export const convertFilterOptions = (
  options: FilterOption[],
  sortBy: SortBy = 'SORT_BY_HITS_AND_NAME',
): FilterOption[] => options?.sort(getFacetSorter(sortBy));

export const searchFilterOptions = (
  options: FilterOption[],
  searchText?: string,
  sortBy: SortBy = 'SORT_BY_HITS_AND_NAME',
): FilterOption[] =>
  options.sort(getFacetSorter(sortBy)).reduce((acc, option) => {
    if (!searchText) {
      acc.push(option);
    } else if (option.name.toLowerCase().includes(searchText.toLowerCase())) {
      const filterOption: FilterOption = {
        ...option,
        label: boldMatchingText(option.name, searchText),
      };

      acc.push(filterOption);
    }
    return acc;
  }, []);

const boldMatchingText = (text, shouldBeBold) => {
  const textArray = text.split(new RegExp(`(${shouldBeBold})`, 'i'));
  return (
    <>
      {textArray.map((item) => {
        return (
          <React.Fragment key={item}>
            {item.toLowerCase().includes(shouldBeBold.toLowerCase()) ? (
              <span key={item} className="font-medium">
                {item}
              </span>
            ) : (
              item
            )}
          </React.Fragment>
        );
      })}
    </>
  );
};
