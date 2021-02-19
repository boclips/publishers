import React from 'react';
import { Cart as ApiCart } from 'boclips-api-client/dist/sub-clients/carts/model/Cart';

interface Props {
  cart: ApiCart;
}

export const CartSummary = ({ cart }: Props) => {
  return (
    <div className="col-start-2 col-end-26 grid-row-start-2 grid-row-end-2">
      <div className="col-start-1 col-end-21 flex flex-row">
        <h2 className="font-bold">Shopping cart</h2>
        {!!cart.items.length && (
          <span className="text-3xl pl-3">
            ({cart.items.length} item{cart.items.length > 1 ? 's' : ''})
          </span>
        )}
      </div>
    </div>
  );
};
