import React from 'react';
import { Link } from 'react-router-dom';
import CartButton from 'src/components/cartButton/CartButton';
import c from 'classnames';
import PearsonBoclipsLogoSVG from 'resources/icons/pearson-clips-logo.svg';
import { AccountButton } from 'src/components/accountButton/AccountButton';
import { Search } from '../searchBar/SearchBar';
import s from './navbar.module.less';

interface Props {
  showSearchBar?: boolean;
}

const Navbar = ({ showSearchBar }: Props = { showSearchBar: false }) => {
  return (
    <nav
      className={c(s.navbar, 'col-start-1 col-end-25 grid grid-cols-24 gap-6')}
      aria-label="Boclips navigation bar"
    >
      <div className="col-start-1 col-end-5">
        <Link to="/" title="Boclips logo">
          <PearsonBoclipsLogoSVG />
        </Link>
      </div>
      {showSearchBar && (
        <div className="col-start-6 col-end-20 flex justify-start">
          <Search size="small" showIconOnly />
        </div>
      )}
      <div className="col-start-20 col-end-25 flex h-full justify-end">
        <AccountButton />
        <CartButton />
      </div>
    </nav>
  );
};

export default Navbar;
