import React, { useState } from 'react';
import { Video } from 'boclips-api-client/dist/types';
import { VideoPlayer } from 'src/components/videoCard/VideoPlayer';
import AdditionalServices from 'src/components/cart/AdditionalServices/AdditionalServices';
import { CartItem as ApiCartItem } from 'boclips-api-client/dist/sub-clients/carts/model/CartItem';
import { RemovedCartItem } from 'src/components/cart/CartItem/RemovedCartItem';
import c from 'classnames';
import DeleteCartItemButton from 'src/components/cart/DeleteCartItemButton';

interface Props {
  videoItem: Video;
  cartItem: ApiCartItem;
}

const CartItem = ({ videoItem, cartItem }: Props) => {
  const [deletingStatus, setDeletingStatus] = useState<'loading' | 'done'>();

  return (
    <div>
      <div className="border-t-2 border-blue-300 max-h-64 object-contain overflow-hidden">
        <div
          className={c('transition-all duration-1000 ease-in-out opacity-0', {
            'opacity-100': deletingStatus,
          })}
        >
          <RemovedCartItem state={deletingStatus} />
        </div>
        <div
          className={c(
            'flex py-3 flex-row transition-opacity transform origin-top duration-1000 justify-start',
            { 'opacity-0': !!deletingStatus },
          )}
        >
          <VideoPlayer video={videoItem} />
          <div className="flex flex-col w-full ml-3">
            <div className="text-md text-gray-900">{videoItem.title}</div>
            <DeleteCartItemButton
              cartItem={cartItem}
              setDeletingState={setDeletingStatus}
            />
            <AdditionalServices videoItem={videoItem} cartItem={cartItem} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
