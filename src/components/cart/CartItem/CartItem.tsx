import React from 'react';
import { Video } from 'boclips-api-client/dist/types';
import { VideoPlayer } from 'src/components/videoCard/VideoPlayer';
import AdditionalServices from 'src/components/cart/AdditionalServices/AdditionalServices';
import { CartItem as ApiCartItem } from 'boclips-api-client/dist/sub-clients/carts/model/CartItem';
import Button from '@boclips-ui/button';
import RemoveFromCartIcon from 'src/resources/icons/bin.svg';
import { useCartMutation } from 'src/hooks/api/cartQuery';
import s from './style.module.less';

interface Props {
  videoItem: Video;
  cartItem: ApiCartItem;
}

const CartItem = ({ videoItem, cartItem }: Props) => {
  const { mutate: mutateDeleteFromCart } = useCartMutation();

  return (
    <div className="flex py-3 flex-row border-t-2 border-blue-300 justify-start ">
      <VideoPlayer video={videoItem} />

      <div className="flex flex-col w-full ml-3">
        <div className="text-md text-gray-900">{videoItem.title}</div>

        <div className={s.textButton}>
          <Button
            onClick={() => mutateDeleteFromCart(cartItem.id)}
            text="Remove"
            icon={<RemoveFromCartIcon />}
          />
        </div>

        <AdditionalServices videoItem={videoItem} cartItem={cartItem} />
      </div>
    </div>
  );
};

export default CartItem;
