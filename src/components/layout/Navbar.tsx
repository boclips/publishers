import React from 'react';
import { Link } from 'react-router-dom';
import CartButton from 'src/components/cartButton/CartButton';
import MyAccountSVG from '../../resources/my-account-icon.svg';
import BoclipsLogoSVG from '../../resources/boclips.svg';
import { Search } from '../searchBar/SearchBar';
import s from './navbar.module.less';

interface Props {
  showSearchBar?: boolean;
}

const Navbar = ({ showSearchBar }: Props = { showSearchBar: false }) => {
  return (
    <nav className="shadow-md" aria-label="Boclips navigation bar">
      <div className="container mx-auto ">
        <div className={s.navbarWrapper}>
          <div className="col-span-1 md:col-span-3">
            <Link to="/" title="Boclips logo">
              <BoclipsLogoSVG />
            </Link>
          </div>
          <div className="col-span-1 md:col-span-6 flex justify-center">
            {showSearchBar && <Search size="small" showIconOnly />}
          </div>
          <div className="col-span-1 md:col-span-3 flex justify-end">
            <div className="flex flex-col items-center mr-6">
              <MyAccountSVG />
              <span className="text-xs mt-1">Profile</span>
            </div>
            <CartButton />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
