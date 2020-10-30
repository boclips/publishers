import React from 'react';
import MyAccountSVG from '../resources/my-account-icon.svg';
import MyBasketSVG from '../resources/shopping-cart-icon.svg';
import BoclipsLogoSVG from '../resources/boclips.svg';

const Navbar = () => {
  return (
    <nav className="shadow-md">
      <div className="py-3 px-4 flex justify-between container mx-auto">
        <div>
          <a href="/" title="Boclips logo">
            <BoclipsLogoSVG />
          </a>
        </div>
        <div className="grid grid-cols-2 gap-4 justify-center text-xs place-items-center">
          <span className="flex items-center flex-col">
            <MyAccountSVG />
            Profile
          </span>
          <span className="flex items-center flex-col">
            <MyBasketSVG />
            Cart
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
