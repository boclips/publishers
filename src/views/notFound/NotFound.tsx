import React from 'react';
import Navbar from 'src/components/layout/Navbar';
import Footer from 'src/components/layout/Footer';
import NotFoundSVG from 'src/resources/icons/not-found.svg';
import Button from '@boclips-ui/button';
import s from './style.module.less';

const NotFound = () => (
  <div className="grid grid-rows-home grid-cols-container gap-8">
    <Navbar showSearchBar />
    <div className={s.notFoundView}>
      <div className="col-start-2 col-end-10 flex justify-center items-center">
        <NotFoundSVG />
      </div>
      <div className="col-start-12 col-end-21 text-blue-800 flex flex-col justify-center">
        <div className="text-4xl text-blue-800 font-medium leading-10">
          Page not found!
        </div>
        <div className="text-lg leading-6 text-gray-800 mt-4">
          We can’t seem to find the page you’re looking for. Try going back to
          the previous page or contact support@boclips.com
        </div>
        <div className="flex space-x-14 mt-8 font-medium">
          <Button
            onClick={() => {
              window.location.href = 'mailto:support@boclips.com';
            }}
            text="Contact Support"
          />
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

export default NotFound;
