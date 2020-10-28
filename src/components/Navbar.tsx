import React from 'react';
import MyAccountSVG from '../resources/my-account-icon.svg';
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
        <div className="flex mr-2 items-center">
          <span className="mr-4 text-primary">
            <MyAccountSVG />
          </span>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              width="38px"
              height="38px"
              viewBox="0 0 38 38 "
              stroke="currentColor"
              className="text-primary"
            >
              <title>My Basket</title>
              <g
                id="Symbols"
                stroke="currentColor"
                strokeWidth="1"
                fill="none"
                fillRule="evenodd"
              >
                <g
                  id="components-/-navigation-/-header"
                  transform="translate(-1215.000000, -20.000000)"
                  fill="currentColor"
                  fillRule="nonzero"
                >
                  <g
                    id="shopping-cart"
                    transform="translate(1214.000000, 14.000000)"
                  >
                    <g id="Group" transform="translate(0.000000, 5.000000)">
                      <g
                        id="noun_add-cart_3406367"
                        transform="translate(1.583333, 1.583333)"
                      >
                        <circle
                          id="Oval"
                          cx="13.3527778"
                          cy="32.1119792"
                          r="2.53993056"
                        />
                        <circle
                          id="Oval"
                          cx="27.0321181"
                          cy="32.1119792"
                          r="2.53993056"
                        />
                        <path
                          d="M34.2890625,5.33385417 C34.0350694,5.00729167 33.6359375,4.82586806 33.2005208,4.82586806 L9.21631944,4.82586806 L8.96232639,3.12048611 C8.70833333,1.41510417 7.25694444,0.181423611 5.51527778,0.181423611 L1.59652778,0.181423611 C0.834548611,0.181423611 0.217708333,0.798263889 0.217708333,1.56024306 C0.217708333,2.32222222 0.834548611,2.9390625 1.59652778,2.9390625 L5.51527778,2.9390625 C5.878125,2.9390625 6.16840278,3.19305556 6.2046875,3.51961806 L9.36145833,24.3833333 C9.68802083,26.4878472 11.4659722,28.0118056 13.5704861,28.0118056 L28.6649306,28.0118056 C29.4269097,28.0118056 30.04375,27.3949653 30.04375,26.6329861 C30.04375,25.8710069 29.4269097,25.2541667 28.6649306,25.2541667 L13.5704861,25.2541667 C12.8447917,25.2541667 12.2279514,24.7098958 12.0828125,23.9842014 L11.8288194,22.3513889 L30.3703125,22.3513889 C31.0234375,22.3513889 31.6039931,21.8796875 31.7491319,21.2265625 L34.5793403,6.49496528 C34.6881944,6.05954861 34.5793403,5.66041667 34.2890625,5.33385417 Z M29.2454861,19.59375 L11.4296875,19.59375 L9.61545139,7.61979167 L31.5314236,7.61979167 L29.2454861,19.59375 Z"
                          id="Shape"
                        />
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </svg>
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
