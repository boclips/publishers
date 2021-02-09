import Ellipsis from 'src/resources/icons/pagination-ellipsis.svg';
import React, { ReactNode } from 'react';
import c from 'classnames';
import s from './pagination.module.less';
import Chevron from '../../resources/icons/grey-arrow.svg';

interface Props {
  largeButton?: boolean;
  children: ReactNode;
}

const CustomPaginationButton = ({ children, largeButton }: Props) => {
  return (
    <div
      className={c(s.paginationButton, {
        [s.large]: largeButton,
      })}
    >
      {children}
    </div>
  );
};

export const PaginationButtons = (current, type, _originalElement) => {
  if (type === 'prev') {
    return (
      <CustomPaginationButton largeButton>
        <Chevron className={s.prev} />
        <span className={s.copy}>Prev</span>
      </CustomPaginationButton>
    );
  }
  if (type === 'jump-next' || type === 'jump-prev') {
    return (
      <CustomPaginationButton>
        <Ellipsis className={s.ellipsis} />
      </CustomPaginationButton>
    );
  }
  if (type === 'page') {
    return (
      <CustomPaginationButton>
        <span className={s.copy}>{current}</span>
      </CustomPaginationButton>
    );
  }
  if (type === 'next') {
    return (
      <CustomPaginationButton largeButton>
        <span className={s.copy}>Next</span>
        <Chevron />
      </CustomPaginationButton>
    );
  }
  return null;
};
