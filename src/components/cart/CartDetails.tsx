import React from 'react';
import { Video } from 'boclips-api-client/dist/types';
import { useCartQuery } from 'src/hooks/api/cartQuery';
import { InputWithDebounce as CartNote } from 'src/components/cart/InputWithDebounce';
import CartItem from './CartItem/CartItem';

interface Props {
  videos: Video[];
  onUpdateNote: (note) => void;
}

export const CartDetails = ({ videos, onUpdateNote }: Props) => {
  const { data: cart } = useCartQuery();

  const singleCartItem = (videoId: string) => {
    return cart.items?.find((it) => it.videoId === videoId);
  };

  return (
    <div className="col-start-2 col-end-20 font-medium text-md row-start-3 row-end-3 flex flex-col">
      <CartNote
        currentValue={cart.note || undefined}
        onUpdate={onUpdateNote}
        placeholder="Add a note about this order (optional)"
      />
      <div className="pt-4 font-medium text-sm col-start-2 col-span-10">
        {videos.map((item) => (
          <CartItem
            videoItem={item}
            key={item.id}
            cartItem={singleCartItem(item.id)}
          />
        ))}
      </div>
    </div>
  );
};
