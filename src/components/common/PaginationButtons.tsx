import PreviousArrow from 'src/resources/icons/pagination-prev-arrow.svg';
import NextArrow from 'src/resources/icons/pagination-next-arrow.svg';
import React from 'react';

export const PaginationButtons = (_current, type, originalElement) => {
  if (type === 'prev') {
    return (
      <div className="flex flex-row font-bold text-gray-500 border-2 rounded border-gray-400 items-center px-3 w-20 justify-between">
        <PreviousArrow className="w-4" />
        <span>Prev</span>
      </div>
    );
  }
  if (type === 'next') {
    return (
      <div className="flex flex-row font-bold text-blue-800 border-2 rounded border-gray-300 items-center px-3 w-20 justify-between">
        <span>Next</span>
        <NextArrow className="w-4" />
      </div>
    );
  }
  return originalElement;
};
