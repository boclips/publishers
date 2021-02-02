import React from 'react';
import { doUpdateCartNote, useCartQuery } from 'src/hooks/api/cartQuery';
import { InputWithDebounce as CartNote } from 'src/components/cart/InputWithDebounce';
import { useBoclipsClient } from 'src/components/common/BoclipsClientProvider';
import { useMutation } from 'react-query';
import { useGetVideosQuery } from 'src/hooks/api/videoQuery';
import CartItem from './CartItem/CartItem';

interface Props {
  videoIds: string[];
}

export const CartDetails = ({ videoIds }: Props) => {
  const { data: cart } = useCartQuery();
  const { data: videos, isLoading } = useGetVideosQuery(videoIds);

  const apiClient = useBoclipsClient();

  const { mutate: onUpdateNote } = useMutation((note: string) =>
    doUpdateCartNote(note, apiClient),
  );

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
        {!isLoading &&
          videos.map((item) => (
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
