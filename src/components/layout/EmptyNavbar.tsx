import s from 'src/components/layout/navbar.module.less';
import React from 'react';
import c from 'classnames';

interface Props {
  logo?: React.ReactNode;
}

export const EmptyNavbar = ({ logo }: Props) => {
  return (
    <nav
      className={c(s.navbar, 'col-start-1 col-end-25 grid grid-cols-24 gap-6')}
      aria-label="Boclips navigation bar"
    >
      {logo}
    </nav>
  );
};
