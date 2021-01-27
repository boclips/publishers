import React from 'react';
import { getFacetSorter } from 'src/services/sortFacets';
import { SortBy } from 'src/types/SortBy';
import { FilterOption, FilterOptionWithLabel } from 'src/types/FilterOption';

const addLabel = (option: FilterOption): FilterOptionWithLabel => ({
  label: <span>{option.name}</span>,
  hits: option.hits,
  id: option.id,
  isSelected: false,
});

export const convertFilterOptions = (
  options: FilterOption[],
  sortBy: SortBy = 'SORT_BY_HITS_AND_NAME',
): FilterOptionWithLabel[] =>
  options?.sort(getFacetSorter(sortBy))?.map(addLabel);

export const searchFilterOptions = (
  options: FilterOption[],
  searchText?: string,
  sortBy: SortBy = 'SORT_BY_HITS_AND_NAME',
): FilterOptionWithLabel[] =>
  options.sort(getFacetSorter(sortBy)).reduce((acc, option) => {
    if (!searchText) {
      acc.push(addLabel(option));
    } else if (option.name.toLowerCase().includes(searchText.toLowerCase())) {
      const filterOption: FilterOptionWithLabel = {
        id: option.id,
        hits: option.hits,
        label: boldMatchingText(option.name, searchText),
        isSelected: false,
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
