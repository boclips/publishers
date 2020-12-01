import EmptyCartCharacter from 'src/resources/icons/empty-cart-character.svg';
import { Link } from 'react-router-dom';
import React from 'react';
import s from './style.module.less';

export const EmptyCart = () => {
  return (
    <div className={s.emptyCartView}>
      <div className="col-start-2 col-end-9  flex justify-center items-center">
        <EmptyCartCharacter />
      </div>
      <div className="col-start-9 col-end-24 text-blue-800 flex flex-col justify-center items-center">
        <h2>There are no items in your shopping cart</h2>
        <p className="text-h3 text-gray-700">
          Go to our <Link to="/">homepage</Link> and search for your perfect
          video
        </p>
      </div>
    </div>
  );
};
