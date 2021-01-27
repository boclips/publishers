import React, { useMemo, useState } from 'react';
import { Filter } from 'src/components/filterPanel/filter/Filter';
import { FilterSearch } from 'src/components/filterPanel/filter/FilterSearch';
import { FilterOption } from 'src/types/FilterOption';
import { searchFilterOptions } from 'src/services/convertFilterOptions';

interface Props {
  title: string;
  options: FilterOption[];
  filterName: string;
  handleChange: (filter: string, values: string[]) => void;
  searchPlaceholder: string;
}
export const SearchableFilter = ({
  title,
  options = [],
  filterName,
  handleChange,
  searchPlaceholder,
}: Props) => {
  const [searchText, setSearchText] = useState<string>();

  const filteredOptions = useMemo(
    (): FilterOption[] => searchFilterOptions(options, searchText),
    [options, searchText],
  );

  return (
    <Filter
      filterName={filterName}
      title={title}
      options={filteredOptions}
      handleChange={handleChange}
      filtersSearch={
        <FilterSearch
          placeholderText={searchPlaceholder}
          onSearch={setSearchText}
        />
      }
      handleFilterToggle={() => setSearchText('')}
    />
  );
};
