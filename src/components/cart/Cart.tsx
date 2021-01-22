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
  onUpdateNote: (note) => void;
}

export const Cart = ({ cart, videos, onPlaceOrder, onUpdateNote }: Props) => {
  return (
    <>
      <CartSummary cart={cart} />
      <CartItemList videos={videos} onUpdateNote={onUpdateNote} />
      <CartOrderSummary videos={videos} onPlaceOrder={onPlaceOrder} />
    </>
  );
};
