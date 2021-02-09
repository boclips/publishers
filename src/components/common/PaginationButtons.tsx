import PreviousArrow from 'src/resources/icons/pagination-prev-arrow.svg';
import NextArrow from 'src/resources/icons/pagination-next-arrow.svg';
import Ellipsis from 'src/resources/icons/pagination-ellipsis.svg';
import React, { ReactNode } from 'react';
import c from 'classnames';

interface Props {
  largeButton?: boolean;
  children: ReactNode;
  theme?: 'gray' | 'blue';
}

const CustomPaginationButton = ({
  children,
  largeButton,
  theme = 'blue',
}: Props) => {
  return (
    <div
      className={c(
        'flex flex-row font-bold border-2 h-9 rounded items-center px-2 justify-around',
        {
          'w-20': largeButton,
          'text-blue-800 border-gray-300': theme === 'blue',
          'text-gray-500 border-gray-400': theme === 'gray',
        },
      )}
    >
      {children}
    </div>
  );
};

export const PaginationButtons = (current, type, _originalElement) => {
  if (type === 'prev') {
    return (
      <CustomPaginationButton largeButton theme="gray">
        <PreviousArrow className="w-4" />
        <span>Prev</span>
      </CustomPaginationButton>
    );
  }
  if (type === 'jump-next' || type === 'jump-prev') {
    return (
      <CustomPaginationButton>
        <Ellipsis className="w-3" />
      </CustomPaginationButton>
    );
  }
  if (type === 'page') {
    return (
      <CustomPaginationButton>
        <span>{current}</span>
      </CustomPaginationButton>
    );
  }
  if (type === 'next') {
    return (
      <CustomPaginationButton largeButton>
        <span>Next</span>
        <NextArrow className="w-4" />
      </CustomPaginationButton>
    );
  }
  return null;
};
