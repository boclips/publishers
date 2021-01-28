import React from 'react';
import { useDeleteFromCartQuery } from 'src/hooks/api/cartQuery';
import DeleteIconSVG from 'src/resources/icons/delete.svg';
import { CartItem as ApiCartItem } from 'boclips-api-client/dist/sub-clients/carts/model/CartItem';

interface Props {
  cartItem: ApiCartItem;
  setDeletingState: (state: 'loading' | 'done') => void;
}

const DeleteCartItemButton = ({ cartItem, setDeletingState }: Props) => {
  const { mutate: deleteFromCart } = useDeleteFromCartQuery();

  const deleteVideo = async () => {
    setDeletingState('loading');
    await new Promise((r) => setTimeout(r, 1000));
    deleteFromCart(cartItem.id);
    setDeletingState('done');
    await new Promise((r) => setTimeout(r, 1000));
  };

  return (
    <button
      onClick={() => deleteVideo()}
      type="button"
      className="text-blue-800 text-md cursor-pointer flex flex-row justify-between w-24 my-2 py-2 px-1 rounded hover:bg-blue-300"
    >
      <DeleteIconSVG />
      <span className="ml-2.5 leading-5">Remove</span>
    </button>
  );
};

export default DeleteCartItemButton;
