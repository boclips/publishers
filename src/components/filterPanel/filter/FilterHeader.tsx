import React from 'react';
import FilterArrowUp from 'src/resources/filter-arrow-up.svg';
import FilterArrowDown from 'src/resources/filter-arrow-down.svg';

interface Props {
  text: string;
  filterIsOpen: boolean;
  toggleFilter: () => void;
  handleKeyDown: (event, callback) => void;
}
export const FilterHeader = ({
  text,
  filterIsOpen,
  toggleFilter,
  handleKeyDown,
}: Props) => {
  return (
    <div
      className="text-base text-blue-800 font-medium flex items-center cursor-pointer active:border-none"
      onClick={toggleFilter}
      onKeyDown={(event) => handleKeyDown(event, toggleFilter)}
      tabIndex={0}
      role="listbox"
    >
      <span className="flex-grow">{text}</span>{' '}
      {filterIsOpen ? <FilterArrowUp /> : <FilterArrowDown />}
    </div>
  );
};
