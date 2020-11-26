import React, { useEffect, useState } from 'react';
import FilterArrowUp from 'src/resources/filter-arrow-up.svg';
import FilterArrowDown from 'src/resources/filter-arrow-down.svg';

import c from 'classnames';
import { Facet } from 'boclips-api-client/dist/sub-clients/videos/model/VideoFacets';
import { sortByHitAndName } from 'src/services/sortFacets';

export interface Props {
  filterOptions: Facet[];
  title: string;
  filterName: string;
  onFilter: (filter: string, values: string[]) => void;
  initialValues?: string[];
}

const DEFAULT_VISIBLE_OPTIONS = 5;

const CheckboxFilter = ({
  filterOptions,
  title,
  onFilter,
  filterName,
  initialValues,
}: Props) => {
  const [open, setOpen] = useState<boolean>(true);
  const [optionStates, setOptionStates] = useState<string[]>(
    initialValues || [],
  );
  const [filtersTouched, setFiltersTouched] = useState<boolean>(false);
  const [allOptionsVisible, setAllOptionsVisible] = useState<boolean>(false);

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

  const toggleFilter = () => setOpen(!open);
  const toggleOptions = () => setAllOptionsVisible(!allOptionsVisible);

  const handleKeyDown = (event, callback) => {
    if (event.key === 'Enter') {
      callback();
    }
  };

  const renderOptionsToggle = () => {
    const tooManyOptions = filterOptions.length > DEFAULT_VISIBLE_OPTIONS;

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
            : `Show all (${filterOptions.length})`}
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
      {open && (
        <div className="flex flex-col mb-1 mt-4">
          {filterOptions
            .sort(sortByHitAndName)
            .slice(
              0,
              allOptionsVisible
                ? filterOptions.length
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
          {renderOptionsToggle()}
        </div>
      )}
    </div>
  );
};

export default CheckboxFilter;
