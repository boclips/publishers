import React from 'react';
import { Cart as ApiCart } from 'boclips-api-client/dist/sub-clients/carts/model/Cart';
import { Video } from 'boclips-api-client/dist/types';
import { CartOrderSummary } from './CartOrderSummary';
import { CartSummary } from './CartSummary';
import { CartItemList } from './CartItemList';

interface Props {
  cart: ApiCart;
  videos: Video[];
  onPlaceOrder: (user) => void;
}

export const Cart = ({ cart, videos, onPlaceOrder }: Props) => {
  return (
    <>
      <CartSummary cart={cart} />
      <CartItemList videos={videos} />
      <CartOrderSummary videos={videos} onPlaceOrder={onPlaceOrder} />
    </>
  );
};
