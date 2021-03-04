import React from 'react';
import c from 'classnames';

import ErrorEngineer from 'resources/icons/errro-engineer.svg';

import Button from '@boclips-ui/button';
import s from './style.module.less';

export const RefreshPageError = () => {
  const refreshHandler = () => {
    window.location.reload();
  };

  return (
    <div className="col-start-1 col-end-26 bg-primary-light h-full rounded-lg">
      <section
        className={c(
          s.pageErrorWrapper,
          'grid grid-cols-content gap-6  h-full',
        )}
      >
        <div className="col-start-5 col-end-9 flex justify-center items-center">
          <ErrorEngineer />
        </div>
        <div className="col-start-12 col-end-21 text-blue-800 flex flex-col justify-center">
          <h2 className="blue-800 font-medium text-4xl">
            Sorry, it’s not you! It’s us.
          </h2>
          <p className="text-gray-800 text-lg">
            There was an error processing your request. Please try once again.
            <br />
            If this continues, please contact us at support@boclips.com
          </p>
          <div className="mt-8 flex flex-row items-center">
            <Button
              onClick={refreshHandler}
              text="Refresh page"
              height="44px"
              width="145px"
            />

            <div className="font-medium ml-6 blue-800 text-base ">
              <a href="mailto:support@boclips.com">Contact support</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RefreshPageError;
