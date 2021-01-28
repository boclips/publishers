import { useMutation, useQueryClient } from 'react-query';
import {
  doAddToCart,
  doDeleteFromCart,
  useAddToCartQuery,
  useCartQuery,
  useDeleteFromCartQuery,
} from 'src/hooks/api/cartQuery';
import Button from '@boclips-ui/button';
import React from 'react';
import CartIcon from '../../resources/icons/cart-icon.svg';

interface AddToCartButtonProps {
  videoId: string;
}

const AddToCartButton = ({ videoId }: AddToCartButtonProps) => {
  const { data: cart } = useCartQuery();
  const { mutate: mutateAddToCart } = useAddToCartQuery();
  const { mutate: deleteFromCart } = useDeleteFromCartQuery();

  const cartItem = cart?.items?.find((it) => it?.videoId === videoId);

  const displayButton = () => {
    if (!cartItem) {
      return (
        <Button
          onClick={() => mutateAddToCart(videoId)}
          theme="publishers"
          type="primary"
          text="Add to cart"
          icon={<CartIcon />}
        />
      );
    }
    return (
      <Button
        onClick={() => deleteFromCart(cartItem.id)}
        theme="publishers"
        type="secondary"
        text="Remove from cart"
        icon={<CartIcon />}
      />
    );
  };

  return (
    <div className="h-12 w-full flex justify-end mt-2">{displayButton()}</div>
  );
};

export default AddToCartButton;
