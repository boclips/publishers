import React, { useEffect, useState } from 'react';
import { FilterHeader } from 'src/components/filterPanel/filter/FilterHeader';
import { FilterSearch } from 'src/components/filterPanel/filter/FilterSearch';
import { FilterOptionList } from 'src/components/filterPanel/filter/FilterOptionList';
import { Facet } from 'boclips-api-client/dist/sub-clients/videos/model/VideoFacets';
import { SortBy } from 'src/types/SortBy';

interface Props {
  title: string;
  options: Facet[];
  filterName: string;
  onFilter: (filter: string, values: string[]) => void;
  initialValues?: string[];
  searchEnabled?: boolean;
  searchPlaceholder?: string;
  sortBy?: SortBy;
}

export const Filter = ({
  title,
  options,
  filterName,
  onFilter,
  initialValues,
  searchEnabled,
  searchPlaceholder,
  sortBy,
}: Props) => {
  const [open, setOpen] = useState<boolean>(true);
  const [searchText, setSearchText] = useState<string>();
  const [filtersTouched, setFiltersTouched] = useState<boolean>(false);
  const [optionStates, setOptionStates] = useState<string[]>(
    initialValues || [],
  );

  useEffect(() => {
    if (filtersTouched) {
      onFilter(filterName, optionStates);
    }
  }, [filtersTouched, filterName, optionStates, onFilter]);

  const onSelectOption = (_, item: string) => {
    setFiltersTouched(true);
    const itemIndex = optionStates.indexOf(item);

    if (itemIndex >= 0) {
      setOptionStates((prevState) =>
        prevState.filter((_item, i) => i !== itemIndex),
      );
    } else {
      setOptionStates((prevState) => [...prevState, item]);
    }
  };

  const toggleFilter = () => {
    setOpen(!open);
    setSearchText('');
  };

  return (
    <div className="bg-blue-100 mt-6 p-4 border-solid border border-blue-300 rounded ">
      <FilterHeader
        text={title}
        filterIsOpen={open}
        toggleFilter={toggleFilter}
      />
      {searchEnabled && (
        <FilterSearch
          filterIsOpen={open}
          placeholderText={searchPlaceholder}
          onSearch={setSearchText}
        />
      )}
      <FilterOptionList
        options={options}
        selectedOptions={optionStates}
        onSelect={onSelectOption}
        sortBy={sortBy}
        filterIsOpen={open}
        searchText={searchText}
      />
    </div>
  );
};
