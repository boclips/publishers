import React, { useEffect, useState } from 'react';
import FilterArrowUp from 'src/resources/filter-arrow-up.svg';
import FilterArrowDown from 'src/resources/filter-arrow-down.svg';

import c from 'classnames';

interface FilterOption {
  hits?: number;
  id?: string;
  label: string;
}

export interface Props {
  filterOptions: FilterOption[];
  title: string; // Video type
  filterName: string; // video_type
  onFilter: (states: { [key: string]: boolean }) => void;
}

const CheckboxFilter = ({ filterOptions, title, onFilter }: Props) => {
  const [open, setOpen] = useState<boolean>(true);
  const [optionStates, setOptionStates] = useState<{
    [key: string]: boolean;
  }>(
    filterOptions.reduce((acc, cur) => {
      acc[cur.id] = false;
      return acc;
    }, {}),
  );
  const [filtersTouched, setFiltersTouched] = useState<boolean>(false);

  useEffect(() => {
    if (filtersTouched) {
      onFilter(optionStates);
    }
  }, [filtersTouched, optionStates, onFilter]);

  const onSelectOption = (event, item: FilterOption) => {
    setFiltersTouched(true);
    setOptionStates({
      ...optionStates,
      [item.id]: event.target.checked,
    });
  };

  const toggleOpen = () => setOpen(!open);
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      toggleOpen();
    }
  };

  return (
    <div className="w-64 bg-blue-100 mt-6 mx-12 border-solid border border-blue-300 rounded p-4">
      <div
        className="text-base text-blue-800 font-semibold flex items-center cursor-pointer active:border-none"
        onClick={toggleOpen}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="listbox"
      >
        <span className="flex-grow">{title}</span>{' '}
        {open ? <FilterArrowUp /> : <FilterArrowDown />}
      </div>
      {open && (
        <div className="flex flex-col mb-1 mt-4">
          {filterOptions
            .filter((filter) => filter.hits && filter.hits > 0)
            .map((item) => (
              <div key={item.id} className="mb-3">
                <label
                  htmlFor={item.id}
                  className="flex items-center cursor-pointer"
                >
                  <input
                    className="form-checkbox checked:bg-blue-800 w-5 h-5"
                    type="checkbox"
                    value={item.id}
                    checked={optionStates[item.id]}
                    id={item.id}
                    onChange={(event) => onSelectOption(event, item)}
                  />
                  <span
                    className={c('text-sm ml-2 flex-grow', {
                      'font-semibold': optionStates[item.id],
                    })}
                  >
                    {item.label}
                  </span>
                  <span className="text-blue-700">{item.hits}</span>
                </label>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default CheckboxFilter;
