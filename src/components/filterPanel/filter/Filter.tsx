import React, { useEffect, useState } from 'react';
import { FilterHeader } from 'src/components/filterPanel/filter/FilterHeader';
import { FilterSearch } from 'src/components/filterPanel/filter/FilterSearch';
import { FilterOptionList } from 'src/components/filterPanel/filter/FilterOptionList';
import { Facet } from 'boclips-api-client/dist/sub-clients/videos/model/VideoFacets';
import { SortBy } from 'src/types/SortBy';
import { useSearchQueryLocationParams } from 'src/hooks/useLocationParams';

interface Props {
  title: string;
  options: Facet[];
  filterName: string;
  handleChange: (filter: string, values: string[]) => void;
  searchEnabled?: boolean;
  searchPlaceholder?: string;
  sortBy?: SortBy;
}

export const Filter = ({
  title,
  options = [],
  filterName,
  handleChange,
  searchEnabled,
  searchPlaceholder,
  sortBy,
}: Props) => {
  const [searchLocation] = useSearchQueryLocationParams();
  const [open, setOpen] = useState<boolean>(true);
  const [searchText, setSearchText] = useState<string>();
  const [filtersTouched, setFiltersTouched] = useState<boolean>(false);

  const initialValues = searchLocation.filters[filterName];
  const [optionStates, setOptionStates] = useState<string[]>(
    initialValues || [],
  );

  useEffect(() => {
    if (filtersTouched) {
      handleChange(filterName, optionStates);
    }
  }, [filtersTouched, filterName, optionStates, handleChange]);

  const onSelectOption = (_, item: string) => {
    setFiltersTouched(true);
    if (optionStates.includes(item)) {
      setOptionStates((states) => states.filter((value) => value !== item));
    } else {
      setOptionStates((states) => [...states, item]);
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
      {open && (
        <>
          {searchEnabled && (
            <FilterSearch
              placeholderText={searchPlaceholder}
              onSearch={setSearchText}
            />
          )}
          <FilterOptionList
            options={options}
            selectedOptions={optionStates}
            onSelect={onSelectOption}
            sortBy={sortBy}
            searchText={searchText}
          />
        </>
      )}
    </div>
  );
};
