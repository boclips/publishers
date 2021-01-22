import React, { useState } from 'react';
import { Video } from 'boclips-api-client/dist/types';
import { useCartQuery } from 'src/hooks/api/cartQuery';
import CartItem from './CartItem/CartItem';

interface Props {
  videos: Video[];
  onUpdateNote: (note) => void;
}

export const CartItemList = ({ videos, onUpdateNote }: Props) => {
  const { data: cart } = useCartQuery();
  const [note, setNote] = useState(cart.note);

  const singleCartItem = (videoId: string) => {
    return cart.items?.find((it) => it.videoId === videoId);
  };

  const handleOnChange = (e: any) => {
    setNote(e.target.value);
    console.log('updating note');
    // onUpdateNote(note);
  };

  return (
    <div className="col-start-2 col-end-20 font-medium row-start-3 row-end-3 flex flex-col">
      <input
        className="border rounded-sm text-gray-600 h-52 p-3 bg-scroll "
        type="textarea"
        placeholder="Add a note about this order (optional)"
        onChange={handleOnChange}
        value={note}
      />
      <div className="pt-4 font-medium col-start-2 col-span-10">
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
