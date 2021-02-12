import React from 'react';

interface Props {
  count: number;
  query: string;
}

export const SearchResultsSummary = ({ count, query }: Props) => {
  return (
    <div className="text-lg text-gray-800 font-normal mb-4">
      Showing{' '}
      <span data-qa="search-hits" className="font-extrabold">
        {count}
      </span>{' '}
      videos for &quot;
      {query}
      &quot;
    </div>
  );
};
