import React from 'react';
import SearchIconSVG from 'resources/icons/search-icon.svg';

interface Props {
  filterIsOpen: boolean;
  placeholderText?: string;
  onSearch: (text) => void;
}
export const FilterSearch = ({
  filterIsOpen,
  placeholderText = 'Search',
  onSearch,
}: Props) => {
  return (
    filterIsOpen && (
      <div className="w-full h-10 bg-white mt-2 border-2 flex focus-within:shadow-outline hover:shadow-outline rounded flex items-center">
        <div className="w-5 h-5 m-1 ml-2 mr-1">
          <SearchIconSVG className="stroke-current text-gray-600 stroke-2" />
        </div>
        <input
          className="focus:outline-none outline-none active:outline-none border-none placeholder-grey-600 h-full w-full"
          placeholder={placeholderText}
          onChange={(e: any) => onSearch(e.target.value)}
        />
      </div>
    )
  );
};
