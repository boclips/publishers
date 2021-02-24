import React from 'react';
import { Cart as ApiCart } from 'boclips-api-client/dist/sub-clients/carts/model/Cart';
import { Video } from 'boclips-api-client/dist/types';
import { CartValidationProvider } from 'src/components/common/providers/CartValidationProvider';
import { CartOrderSummary } from './CartOrderSummary';
import { CartDetails } from './CartDetails';

interface Props {
  cart: ApiCart;
  cartItemVideos: Video[];
}

export const Cart = ({ cart, cartItemVideos }: Props) => {
  return (
    <CartValidationProvider>
      <CartDetails cartItemVideos={cartItemVideos} cart={cart} />
      <CartOrderSummary videos={cartItemVideos} />
    </CartValidationProvider>
  );
};
