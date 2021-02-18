import EmptyCartCharacter from 'src/resources/icons/empty-cart-character.svg';
import { Link } from 'react-router-dom';
import React from 'react';
import c from 'classnames';
import s from './style.module.less';

export const EmptyCart = () => {
  return (
    <div className={c(s.emptyCartView, { [s.fadeIn]: true })}>
      <div className="col-start-5 col-end-10 flex justify-center items-center">
        <EmptyCartCharacter />
      </div>
      <div className="col-start-12 col-end-21 text-blue-800 flex flex-col justify-center">
        <h2>There are no items in your shopping cart</h2>
        <p className="text-h3 text-gray-800">
          Go to our <Link to="/">homepage</Link> and search for your perfect
          video
        </p>
      </div>
    </div>
  );
};
