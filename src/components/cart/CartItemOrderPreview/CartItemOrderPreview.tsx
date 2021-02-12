import React from 'react';
import { useCartQuery } from 'src/hooks/api/cartQuery';
import { Video } from 'boclips-api-client/dist/types';
import { OrderItemPreviewAdditionalServices } from 'src/components/cart/CartItemOrderPreview/OrderItemPreviewAdditionalServices';
import s from './style.module.less';

interface Props {
  videos: Video[];
}

export const CartItemOrderPreview = ({ videos }: Props) => {
  const { data: cart } = useCartQuery();

  return (
    <div>
      {videos.map((it) => (
        <div
          key={it.id}
          className="flex flex-row justify-between py-3 border-b-2 border-blue-300 rounded"
        >
          <div className={s.imgWrapper}>
            <img
              src={it.playback.links.thumbnail.getOriginalLink()}
              alt={it.title}
            />
          </div>
          <div className="ml-5 w-full">
            <div className="text-sm text-gray-900 font-medium ">{it.title}</div>
            <div className="text-xs text-gray-700"> ID: {it.id}</div>
            <OrderItemPreviewAdditionalServices
              cartItem={cart?.items?.find(
                (cartItem) => cartItem.videoId === it.id,
              )}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
