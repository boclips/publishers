import React from 'react';
import MyAccountSVG from '../../resources/my-account-icon.svg';
import MyBasketSVG from '../../resources/shopping-cart-icon.svg';
import BoclipsLogoSVG from '../../resources/boclips.svg';
import { Search } from '../searchBar/SearchBar';

interface Props {
  showSearchBar?: boolean;
}

const Navbar = ({ showSearchBar }: Props = { showSearchBar: false }) => {
  return (
    <nav className="shadow-md" aria-label="Bolcips navigation bar">
      <div className="container mx-auto">
        <div className="grid grid-cols-3 md:grid-cols-12 md:gap-2 py-3 items-center">
          <div className="col-span-1 md:col-span-3">
            <a href="/" title="Boclips logo">
              <BoclipsLogoSVG />
            </a>
          </div>
          <div className="col-span-1 md:col-span-6 flex justify-center">
            {showSearchBar && <Search size="small" showIconOnly />}
          </div>
          <div className="col-span-1 md:col-span-3 flex justify-end">
            <div className="flex flex-col items-center mr-6">
              <MyAccountSVG />
              <span className="text-xs mt-1">Profile</span>
            </div>
            <div className="flex flex-col items-center">
              <MyBasketSVG />
              <span className="text-xs mt-1">Basket</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
