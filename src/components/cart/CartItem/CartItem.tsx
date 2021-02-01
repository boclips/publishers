import React from 'react';
import { Video } from 'boclips-api-client/dist/types';
import { VideoPlayer } from 'src/components/videoCard/VideoPlayer';
import AdditionalServices from 'src/components/cart/AdditionalServices/AdditionalServices';
import { CartItem as ApiCartItem } from 'boclips-api-client/dist/sub-clients/carts/model/CartItem';
import Button from '@boclips-ui/button';
import RemoveFromCartIcon from 'src/resources/icons/bin.svg';
import { useMutation, useQueryClient } from 'react-query';
import { useBoclipsClient } from 'src/components/common/BoclipsClientProvider';
import { doDeleteFromCart, useCartQuery } from 'src/hooks/api/cartQuery';
import { Cart } from 'boclips-api-client/dist/sub-clients/carts/model/Cart';
import s from './style.module.less';

interface Props {
  videoItem: Video;
  cartItem: ApiCartItem;
}

const CartItem = ({ videoItem, cartItem }: Props) => {
  const queryClient = useQueryClient();
  const boclipsClient = useBoclipsClient();
  const { data: cart } = useCartQuery();

  const { mutate: mutateDeleteFromCart } = useMutation(
    async (cartItemId: string) => {
      return doDeleteFromCart(cart as Cart, cartItemId, boclipsClient);
    },
    {
      onSuccess: (it) => {
        queryClient.setQueryData('cart', (old: Cart) => ({
          ...old,
          items: [...old.items.filter((item) => item.id !== it)],
        }));
      },
    },
  );

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
