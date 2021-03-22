import React, { useState } from 'react';
import SearchIconSVG from 'resources/icons/search-icon.svg';
import CrossIconSVG from 'resources/icons/cross-icon.svg';
import { handleEnterKeyDown } from 'src/services/handleEnterKeyDown';

interface Props {
  placeholderText?: string;
  onSearch: (text) => void;
}
export const FilterSearch = ({
  placeholderText = 'Search',
  onSearch,
}: Props) => {
  const [searchText, setSearchText] = useState<string>('');
  const setText = (text: string) => {
    setSearchText(text);
    onSearch(text);
  };
  return (
    <div className="w-full h-10 bg-white mt-2 border-2 focus-within:border-solid hover:border-solid hover:border-blue-500 focus-within:border-blue-500 rounded flex items-center">
      <div className="w-5 h-5 m-1 ml-2 mr-1 flex-shrink-0">
        <SearchIconSVG className="stroke-current text-gray-600 stroke-2" />
      </div>
      <input
        className="focus:outline-none outline-none active:outline-none border-none placeholder-grey-600 h-full w-full"
        placeholder={placeholderText}
        value={searchText}
        onChange={(e: any) => setText(e.target.value)}
      />
      {searchText.length > 0 && (
        <div
          className="mr-3 cursor-pointer"
          onClick={(_: any) => setText('')}
          role="button"
          tabIndex={0}
          onKeyPress={(event) => handleEnterKeyDown(event, setText(''))}
        >
          <CrossIconSVG className="stroke-current text-gray-600 stroke-2 h-4 w-4 object-fill" />
        </div>
      )}
    </div>
  );
};
