import React, { useEffect, useState } from 'react';
import FilterArrowUp from 'src/resources/filter-arrow-up.svg';
import FilterArrowDown from 'src/resources/filter-arrow-down.svg';

import c from 'classnames';

export interface FilterOption {
  hits?: number;
  id: string;
  label: string;
}

export interface Props {
  filterOptions: FilterOption[];
  title: string; // Video type
  filterName: string; // video_type
  onFilter: (filter: string, values: string[]) => void;
  initialValues?: string[];
}

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

  useEffect(() => {
    if (filtersTouched) {
      applyFilters();
    }
  }, [filtersTouched, optionStates]);

  const applyFilters = () => onFilter(filterName, optionStates);

  const onSelectOption = (_, item: string) => {
    setFiltersTouched(true);
    const itemIndex = optionStates.indexOf(item); // -1

    if (itemIndex >= 0) {
      setOptionStates([]);
    } else {
      setOptionStates((prevState) => [...prevState, item]);
    }
  };

  const toggleOpen = () => setOpen(!open);
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      toggleOpen();
    }
  };

  return (
    <div className="w-64 bg-blue-100 mt-6 p-4  border-solid border border-blue-300 rounded ">
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
            .sort((a, b) => (a.hits < b.hits ? 1 : -1))
            .map((item) => (
              <div key={item.id} className="mb-3">
                <label
                  // onChange={(event) => onSelectOption(event, item.id)}
                  htmlFor={item.id}
                  className="flex items-center cursor-pointer"
                >
                  <input
                    onChange={(event) => onSelectOption(event, item.id)}
                    className="form-checkbox checked:bg-blue-800 w-5 h-5"
                    type="checkbox"
                    value={item.id}
                    checked={optionStates.indexOf(item.id) > -1}
                    data-qa={`${item.id}-checkbox`}
                    id={item.id}
                  />
                  <span
                    className={c('text-sm ml-2 flex-grow', {
                      'font-semibold': optionStates.includes(item.id),
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
