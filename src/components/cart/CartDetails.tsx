import React from 'react';
import { doUpdateCartNote } from 'src/hooks/api/cartQuery';
import { InputWithDebounce as CartNote } from 'src/components/cart/InputWithDebounce';
import { useBoclipsClient } from 'src/components/common/BoclipsClientProvider';
import { useMutation } from 'react-query';
import { Video } from 'boclips-api-client/dist/types';
import { Cart as ApiCart } from 'boclips-api-client/dist/sub-clients/carts/model/Cart';
import { Skeleton } from 'antd';
import CartItem from './CartItem/CartItem';

interface Props {
  cartItemVideos: Video[];
  cart: ApiCart;
  isLoading: Boolean;
}

export const CartDetails = ({ cartItemVideos, cart, isLoading }: Props) => {
  const apiClient = useBoclipsClient();

  const { mutate: onUpdateNote } = useMutation((note: string) =>
    doUpdateCartNote(note, apiClient),
  );

  const singleCartItem = (videoId: string) => {
    return cart.items?.find((it) => it.videoId === videoId);
  };

  const displayCartItems = () => {
    const cartItems = cartItemVideos.map((item) => (
      <CartItem
        videoItem={item}
        key={item.id}
        cartItem={singleCartItem(item.id)}
      />
    ));

    if (cartItems.length === cart.items.length) return cartItems;

    return cart.items.map(() => (
      <div className="mb-8">
        <Skeleton
          loading
          active
          title={{ width: '100%' }}
          paragraph={{ rows: 2 }}
          avatar={{ shape: 'square', size: 128 }}
        />
      </div>
    ));
  };

  return (
    <div className="col-start-2 col-end-20 font-medium text-md row-start-3 row-end-3 flex flex-col">
      <CartNote
        currentValue={cart?.note}
        onUpdate={onUpdateNote}
        placeholder="Add a note about this order (optional)"
      />
      <div className="pt-4 font-medium text-sm col-start-2 col-span-10">
        {!isLoading && displayCartItems()}
      </div>
    </div>
  );
};
