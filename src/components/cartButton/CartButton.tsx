import MyBasketSVG from 'src/resources/shopping-cart-icon.svg';
import React from 'react';
import { useCartQuery } from 'src/hooks/api/cartQuery';
import { Link } from 'react-router-dom';
import s from './style.module.less';

const CartButton = () => {
  const { data } = useCartQuery();

  return (
    <div className={s.cartButton}>
      <Link to="/cart">
        <MyBasketSVG />
        <span className="text-xs mt-1">
          Cart
          <div data-qa="cart-counter" className={s.basketCounter}>
            {data?.items?.length}
          </div>
        </span>
      </Link>
    </div>
  );
};

export default CartButton;
