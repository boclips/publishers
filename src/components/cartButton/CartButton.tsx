import React, { useState } from 'react';
import { useCartQuery } from 'src/hooks/api/cartQuery';
import { Link, useLocation } from 'react-router-dom';
import c from 'classnames';
import s from './style.module.less';
import CartIcon from '../../resources/icons/cart-icon.svg';

const CartButton = () => {
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const { data: cart } = useCartQuery();

  const location = useLocation();
  const isOnCartPage = location.pathname.includes('cart');
  const onMouseEnterAction = () => {
    setOnMouseEnter(true);
  };
  const onMouseLeaveAction = () => {
    setOnMouseEnter(false);
  };

  return (
    <div
      onMouseEnter={onMouseEnterAction}
      onMouseLeave={onMouseLeaveAction}
      className={c(s.cartButton, { [s.active]: isOnCartPage || onMouseEnter })}
    >
      <Link to="/cart">
        <CartIcon />
        <span className="text-xs mt-1 font-medium">
          Cart
          {cart?.items?.length > 0 && (
            <div data-qa="cart-counter" className={s.basketCounter}>
              {cart?.items?.length}
            </div>
          )}
        </span>
      </Link>
    </div>
  );
};

export default CartButton;
