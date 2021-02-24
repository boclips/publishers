import EmptyCartCharacter from 'src/resources/icons/empty-cart-character.svg';
import { useHistory } from 'react-router-dom';
import React from 'react';
import c from 'classnames';
import Button from '@boclips-ui/button';
import s from './style.module.less';

export const EmptyCart = () => {
  const history = useHistory();
  return (
    <div className="col-start-2 col-end-26 row-start-2 row-end-4">
      <div className="font-bold text-2xl text-grey-800">Shopping cart</div>
      <div className={c(s.emptyCartView, { [s.fadeIn]: true })}>
        <div className="col-start-5 col-end-10 flex justify-center items-center">
          <EmptyCartCharacter />
        </div>
        <div className="col-start-12 col-end-21 text-blue-800 flex flex-col justify-center">
          <h2 className="blue-800 font-medium text-4xl">
            Your shopping cart is empty
          </h2>
          <p className="text-gray-800 text-lg">
            Go to our homepage and search for your perfect video
          </p>
          <div className="mt-5">
            <Button
              onClick={() => {
                history.push({
                  pathname: `/`,
                });
              }}
              text="Go to homepage"
              height="44px"
              width="158px"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
