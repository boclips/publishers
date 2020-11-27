import React from 'react';
import { Link } from 'react-router-dom';
import { useCartQuery } from 'src/hooks/api/cartQuery';
import MyAccountSVG from '../../resources/my-account-icon.svg';
import MyBasketSVG from '../../resources/shopping-cart-icon.svg';
import BoclipsLogoSVG from '../../resources/boclips.svg';
import { Search } from '../searchBar/SearchBar';
import s from './Navbar.module.less';

interface Props {
  showSearchBar?: boolean;
}

const Navbar = ({ showSearchBar }: Props = { showSearchBar: false }) => {
  const { data } = useCartQuery();

  return (
    <nav className="shadow-md" aria-label="Boclips navigation bar">
      <div className="container mx-auto">
        <div className="grid grid-cols-3 md:grid-cols-12 md:gap-2 py-3 items-center">
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
            <div className="flex flex-col items-center relative">
              <MyBasketSVG />
              <span className="text-xs mt-1">
                Cart
                <div data-qa="cart-counter" className={s.basketCounter}>
                  {data?.items?.length}
                </div>
              </span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
