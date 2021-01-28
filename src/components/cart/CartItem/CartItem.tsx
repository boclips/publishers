import React, { useState } from 'react';
import { Video } from 'boclips-api-client/dist/types';
import { VideoPlayer } from 'src/components/videoCard/VideoPlayer';
import AdditionalServices from 'src/components/cart/AdditionalServices/AdditionalServices';
import { CartItem as ApiCartItem } from 'boclips-api-client/dist/sub-clients/carts/model/CartItem';
import { useMutation, useQueryClient } from 'react-query';
import { useBoclipsClient } from 'src/components/common/BoclipsClientProvider';
import { doDeleteFromCart, useCartQuery } from 'src/hooks/api/cartQuery';
import { Cart } from 'boclips-api-client/dist/sub-clients/carts/model/Cart';
import DeleteIconSVG from 'src/resources/icons/delete.svg';
import { RemovedCartItem } from 'src/components/cart/CartItem/RemovedCartItem';
import c from 'classnames';

interface Props {
  videoItem: Video;
  cartItem: ApiCartItem;
}

const CartItem = ({ videoItem, cartItem }: Props) => {
  const queryClient = useQueryClient();
  const boclipsClient = useBoclipsClient();
  const { data: cart } = useCartQuery();
  const [removalState, setRemovalState] = useState<'loading' | 'done'>();

  const { mutate: mutateDeleteFromCart } = useMutation(
    async (id: string) => {
      if (cartItem) {
        setRemovalState('loading');
        return doDeleteFromCart(cart as Cart, id, boclipsClient);
      }
      return Promise.reject(new Error('Item is not in cart'));
    },
    {
      onSuccess: async (it) => {
        await new Promise((r) => setTimeout(r, 500));
        setRemovalState('done');
        await new Promise((r) => setTimeout(r, 1000));
        queryClient.setQueryData('cart', (old: Cart) => ({
          ...old,
          items: [...old.items.filter((item) => item.id !== it)],
        }));
      },
    },
  );

  return (
    <div>
      <div className="border-t-2 border-blue-300 max-h-64 object-contain overflow-hidden">
        <div
          className={c('transition-all duration-1000 ease-in-out', {
            'opacity-100': removalState,
            hidden: !removalState,
          })}
        >
          <RemovedCartItem state={removalState} />
        </div>
        <div
          className={c(
            'flex py-3 flex-row transition-opacity transform origin-top duration-500 justify-start',
            { '-translate-y-32 opacity-0': !!removalState },
          )}
        >
          <VideoPlayer video={videoItem} />
          <div className="flex flex-col w-full ml-3">
            <div className="text-md text-gray-900">{videoItem.title}</div>
            <button
              onClick={() => mutateDeleteFromCart(cartItem.id)}
              type="button"
              className="text-blue-800 text-md cursor-pointer flex flex-row justify-between w-24 my-2 py-2 px-1 rounded hover:bg-blue-300"
            >
              <DeleteIconSVG />
              <span className="ml-2.5 leading-5">Remove</span>
            </button>
            <AdditionalServices videoItem={videoItem} cartItem={cartItem} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
