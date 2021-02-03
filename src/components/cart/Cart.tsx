import React from 'react';
import { Cart as ApiCart } from 'boclips-api-client/dist/sub-clients/carts/model/Cart';
import { Video } from 'boclips-api-client/dist/types';
import { CartOrderSummary } from './CartOrderSummary';
import { CartSummary } from './CartSummary';
import { CartDetails } from './CartDetails';

interface Props {
  cart: ApiCart;
  cartItemVideos: Video[];
  isCartItemVideosLoading: Boolean;
}

export const Cart = ({
  cart,
  cartItemVideos,
  isCartItemVideosLoading,
}: Props) => {
  return (
    <>
      <CartSummary cart={cart} />
      <CartDetails
        cartItemVideos={cartItemVideos}
        cart={cart}
        isLoading={isCartItemVideosLoading}
      />
      <CartOrderSummary videos={cartItemVideos} />
    </>
  );
};
