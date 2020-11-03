import React from 'react';
import MyAccountSVG from '../resources/my-account-icon.svg';
import MyBasketSVG from '../resources/shopping-cart-icon.svg';
import BoclipsLogoSVG from '../resources/boclips.svg';

const Navbar = () => {
  return (
    <nav className="shadow-md">
      <div className="container mx-auto">
        <div className="grid grid-cols-3 gap-4 py-3 items-center">
          <div className="col-span-2">
            <a href="/" title="Boclips logo">
              <BoclipsLogoSVG />
            </a>
          </div>
          <div className="col-span-1 flex justify-end">
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
