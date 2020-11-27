import React, { useEffect, useState } from 'react';
import FilterArrowUp from 'src/resources/filter-arrow-up.svg';
import FilterArrowDown from 'src/resources/filter-arrow-down.svg';
import SearchIconSVG from 'src/resources/search-icon.svg';
import c from 'classnames';
import { Facet } from 'boclips-api-client/dist/sub-clients/videos/model/VideoFacets';
import { getFacetSorter } from 'src/services/sortFacets';
import { SortBy } from 'src/types/SortBy';

export interface Props {
  filters: Facet[];
  title: string;
  filterName: string;
  onFilter: (filter: string, values: string[]) => void;
  sortBy?: SortBy;
  initialValues?: string[];
  searchEnabled?: boolean;
  searchPlaceHolderText?: string;
}

const DEFAULT_VISIBLE_OPTIONS = 5;

const CheckboxFilter = ({
  filters,
  title,
  onFilter,
  filterName,
  sortBy = 'SORT_BY_HITS_AND_NAME',
  initialValues,
  searchEnabled,
  searchPlaceHolderText = 'Search',
}: Props) => {
  const [open, setOpen] = useState<boolean>(true);
  const [searchText, setSearchText] = useState<string>();
  const [optionStates, setOptionStates] = useState<string[]>(
    initialValues || [],
  );
  const [filtersTouched, setFiltersTouched] = useState<boolean>(false);
  const [allOptionsVisible, setAllOptionsVisible] = useState<boolean>(false);

  const filteredFilters = filters.filter(
    (option) =>
      !searchText ||
      option.name.toLowerCase().includes(searchText.toLowerCase()),
  );

  useEffect(() => {
    if (filtersTouched) {
      onFilter(filterName, optionStates);
    }
  }, [filtersTouched, filterName, optionStates, onFilter]);

  const onSelectOption = (_, item: string) => {
    setFiltersTouched(true);
    const itemIndex = optionStates.indexOf(item); // -1

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
  const toggleOptions = () => setAllOptionsVisible(!allOptionsVisible);

  const handleKeyDown = (event, callback) => {
    if (event.key === 'Enter') {
      callback();
    }
  };

  const renderOptionsToggle = () => {
    const tooManyOptions = filteredFilters.length > DEFAULT_VISIBLE_OPTIONS;

    if (tooManyOptions) {
      return (
        <div
          role="button"
          tabIndex={0}
          onClick={toggleOptions}
          onKeyDown={(event) => handleKeyDown(event, toggleOptions)}
          className="text-blue-800 underline font-medium text-right focus:outline-none"
        >
          {allOptionsVisible
            ? 'Show less'
            : `Show all (${filteredFilters.length})`}
        </div>
      );
    }
    return '';
  };

  return (
    <div className="bg-blue-100 mt-6 p-4  border-solid border border-blue-300 rounded ">
      <div
        className="text-base text-blue-800 font-medium flex items-center cursor-pointer active:border-none"
        onClick={toggleFilter}
        onKeyDown={(event) => handleKeyDown(event, toggleFilter)}
        tabIndex={0}
        role="listbox"
      >
        <span className="flex-grow">{title}</span>{' '}
        {open ? <FilterArrowUp /> : <FilterArrowDown />}
      </div>
      {open && searchEnabled && (
        <div className="w-full h-8 bg-white mt-2 border-2 flex focus-within:shadow-outline hover:shadow-outline rounded">
          <div className="w-4 h-4 m-1">
            <SearchIconSVG className="stroke-current text-gray-600 stroke-2" />
          </div>
          <input
            className="focus:outline-none outline-none active:outline-none border-none mt-1"
            placeholder={searchPlaceHolderText}
            onChange={(e: any) => setSearchText(e.target.value)}
          />
        </div>
      )}
      {open && (
        <div className="flex flex-col mb-1 mt-4">
          <div className={`overflow-y-scroll ${allOptionsVisible && 'h-64'}`}>
            {filteredFilters
              .sort(getFacetSorter(sortBy))
              .slice(
                0,
                allOptionsVisible
                  ? filteredFilters.length
                  : DEFAULT_VISIBLE_OPTIONS,
              )
              .map((item) => (
                <div key={item.id} className="mb-3">
                  <label
                    htmlFor={item.id}
                    className="flex items-center cursor-pointer text-gray-700"
                  >
                    <input
                      onChange={(event) => onSelectOption(event, item.id)}
                      className="form-checkbox checked:bg-blue-800 w-5 h-5 hover:border-blue-800 hover:border-solid border-2"
                      type="checkbox"
                      value={item.id}
                      checked={optionStates.indexOf(item.id) > -1}
                      data-qa={`${item.id}-checkbox`}
                      id={item.id}
                    />
                    <span
                      className={c('text-sm ml-2 flex-grow', {
                        'font-medium': optionStates.includes(item.id),
                      })}
                    >
                      {item.name}
                    </span>
                    <span className="text-blue-700">{item.hits}</span>
                  </label>
                </div>
              ))}
          </div>
          {renderOptionsToggle()}
        </div>
      )}
    </div>
  );
};

export default CheckboxFilter;
