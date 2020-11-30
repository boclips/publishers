import React from 'react';
import { useCartQuery } from 'src/hooks/api/cartQuery';
import EmptyCartCharacter from 'resources/icons/empty-cart-character.svg';
import { Link } from 'react-router-dom';
import c from 'classnames';
import Navbar from 'src/components/layout/Navbar';
import s from './style.module.less';

const CartView = () => {
  const { data: cart } = useCartQuery();

  const itemsInCart = cart?.items?.length > 0;

  const cartToDisplay = () => {
    if (itemsInCart) {
      return (
        <div className={c(s.cartView, 'grid grid-cols-12')}>
          <div className="col-start-1 col-end-13 flex flex-row">
            <h2 className="font-bold">Shopping cart</h2>
            <span className="text-3xl pl-3">(x items)</span>
          </div>
        </div>
      );
    }
    return <EmptyCart />;
  };

  const EmptyCart = () => {
    return (
      <div className={s.emptyCartView}>
        <div className="col-start-2 col-end-9 flex justify-center items-center">
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

  return (
    <div className="grid grid-cols-container grid-rows-cart-view gap-8">
      <Navbar showSearchBar={false} />
      {cartToDisplay()}
    </div>
  );
};

export default CartView;
