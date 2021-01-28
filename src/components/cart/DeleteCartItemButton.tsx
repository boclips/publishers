import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { doDeleteFromCart, useCartQuery } from 'src/hooks/api/cartQuery';
import { Cart } from 'boclips-api-client/dist/sub-clients/carts/model/Cart';
import DeleteIconSVG from 'src/resources/icons/delete.svg';
import { useBoclipsClient } from 'src/components/common/BoclipsClientProvider';
import { CartItem as ApiCartItem } from 'boclips-api-client/dist/sub-clients/carts/model/CartItem';

interface Props {
  cartItem: ApiCartItem;
  setDeletingState: (state: 'loading' | 'done') => void;
}

const DeleteCartItemButton = ({ cartItem, setDeletingState }: Props) => {
  const queryClient = useQueryClient();
  const boclipsClient = useBoclipsClient();
  const { data: cart } = useCartQuery();

  const { mutate: mutateDeleteFromCart } = useMutation(
    async (id: string) => {
      if (cartItem) {
        setDeletingState('loading');
        return doDeleteFromCart(cart as Cart, id, boclipsClient);
      }
      return Promise.reject(new Error('Item is not in cart'));
    },
    {
      onSuccess: async (it) => {
        await new Promise((r) => setTimeout(r, 1000));
        setDeletingState('done');
        await new Promise((r) => setTimeout(r, 1000));
        queryClient.setQueryData('cart', (old: Cart) => ({
          ...old,
          items: [...old.items.filter((item) => item.id !== it)],
        }));
      },
    },
  );

  return (
    <button
      onClick={() => mutateDeleteFromCart(cartItem.id)}
      type="button"
      className="text-blue-800 text-md cursor-pointer flex flex-row justify-between w-24 my-2 py-2 px-1 rounded hover:bg-blue-300"
    >
      <DeleteIconSVG />
      <span className="ml-2.5 leading-5">Remove</span>
    </button>
  );
};

export default DeleteCartItemButton;
