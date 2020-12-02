import React, { useMemo, useState } from 'react';
import { Facet } from 'boclips-api-client/dist/sub-clients/videos/model/VideoFacets';
import { SortBy } from 'src/types/SortBy';
import { Filter } from 'src/components/filterPanel/filter/Filter';
import { FilterSearch } from 'src/components/filterPanel/filter/FilterSearch';
import { searchFilterOptions } from 'src/services/convertFacets';
import { FilterOption } from 'src/types/FilterOption';

interface Props {
  title: string;
  options: Facet[];
  filterName: string;
  handleChange: (filter: string, values: string[]) => void;
  searchPlaceholder: string;
  sortBy?: SortBy;
}
export const SearchableFilter = ({
  title,
  options = [],
  filterName,
  handleChange,
  sortBy,
  searchPlaceholder,
}: Props) => {
  const [searchText, setSearchText] = useState<string>();

  const filteredOptions = useMemo(
    (): FilterOption[] => searchFilterOptions(options, searchText, sortBy),
    [options, searchText, sortBy],
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
