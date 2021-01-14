import React from 'react';
import { Video } from 'boclips-api-client/dist/types';
import CartItem from './CartItem';

interface Props {
  videos: Video[];
}

export const CartItemList = ({ videos }: Props) => {
  return (
    <div className="col-start-2 col-end-20 pt-4 font-medium">
      <div className="pt-4 font-medium col-start-2 col-span-10">
        {videos.map((item) => (
          <CartItem videoItem={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};
