import React from 'react';
import NoResultsIcon from '../../resources/icons/no-search-results.svg';

interface Props {
  filtersApplied: boolean;
  query: string;
}

export const NoSearchResults = ({ filtersApplied, query }: Props) => {
  const noResultsText = (header, instruction) => {
    return (
      <>
        <div className="font-medium">{header}</div>
        <div>{instruction}</div>
      </>
    );
  };

  return (
    <div className="flex flex-col items-center col-start-7 col-end-26 text-lg text-gray-800 mt-10 ">
      <NoResultsIcon className="h-80 w-80 mb-6" />
      {filtersApplied
        ? noResultsText(
            `We couldn’t find any videos for “${query}” with your filter selection`,
            'Try again using different keywords or change the filters',
          )
        : noResultsText(
            `We couldn’t find any videos for “${query}”`,
            'Please check the spelling or try searching something else',
          )}
    </div>
  );
};
