import React from 'react';
import { Cart as ApiCart } from 'boclips-api-client/dist/sub-clients/carts/model/Cart';
import { CartOrderSummary } from './CartOrderSummary';
import { CartSummary } from './CartSummary';
import { CartDetails } from './CartDetails';

interface Props {
  cart: ApiCart;
  videoIds: string[];
}

export const Cart = ({ cart, videoIds }: Props) => {
  return (
    <>
      <CartSummary cart={cart} />
      <CartDetails videoIds={videoIds} />
      <CartOrderSummary videoIds={videoIds} />
    </>
  );
};
