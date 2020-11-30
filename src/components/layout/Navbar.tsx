import React from 'react';
import { Link } from 'react-router-dom';
import CartButton from 'src/components/cartButton/CartButton';
import c from 'classnames';
import MyAccountSVG from 'resources/icons/my-account-icon.svg';
import BoclipsLogoSVG from 'resources/icons/boclips.svg';
import { Search } from '../searchBar/SearchBar';
import s from './navbar.module.less';

interface Props {
  showSearchBar?: boolean;
}

const Navbar = ({ showSearchBar }: Props = { showSearchBar: false }) => {
  return (
    <nav
      className={c(
        s.navbar,
        'col-start-1 col-end-27 gap-x-8 grid grid-cols-container',
      )}
      aria-label="Boclips navigation bar"
    >
      <div className="col-start-2 col-end-5">
        <Link to="/" title="Boclips logo">
          <BoclipsLogoSVG />
        </Link>
      </div>
      {showSearchBar && (
        <div className="col-start-7 col-end-13 flex justify-start">
          <Search size="small" showIconOnly />
        </div>
      )}
      <div className="col-start-15 col-end-26 flex justify-end">
        <div className="flex flex-col items-center mr-6">
          <MyAccountSVG />
          <span className="text-xs mt-1">Profile</span>
        </div>
        <CartButton />
      </div>
    </nav>
  );
};

export default Navbar;
