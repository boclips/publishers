import { useMutation, useQueryClient } from 'react-query';
import {
  doAddToCart,
  doDeleteFromCart,
  useCartQuery,
} from 'src/hooks/api/cartQuery';
import { Cart } from 'boclips-api-client/dist/sub-clients/carts/model/Cart';
import Button from '@boclips-ui/button';
import React from 'react';
import CartIcon from '../../resources/icons/cart-icon.svg';
import { useBoclipsClient } from '../common/BoclipsClientProvider';

interface AddToCartButtonProps {
  videoId: string;
}

const AddToCartButton = ({ videoId }: AddToCartButtonProps) => {
  const queryClient = useQueryClient();
  const boclipsClient = useBoclipsClient();
  const { data: cart } = useCartQuery();

  const cartItem = cart?.items?.find((it) => it?.videoId === videoId);

  const { mutate: mutateAddToCart } = useMutation(
    (id: string) => {
      if (cartItem === undefined) {
        return doAddToCart(cart as Cart, id, boclipsClient);
      }
      return Promise.reject(new Error('Item already in cart'));
    },
    {
      onSuccess: (it) => {
        queryClient.setQueryData('cart', (old: Cart) => ({
          ...old,
          items: [...old.items, it],
        }));
      },
    },
  );

  const { mutate: mutateDeleteFromCart } = useMutation(
    async (cartItemId: string) => {
      if (cartItem) {
        return doDeleteFromCart(cart as Cart, cartItemId, boclipsClient);
      }
      return Promise.reject(new Error('Item is not in cart'));
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

  const displayButton = () => {
    if (!cartItem) {
      return (
        <Button
          onClick={() => mutateAddToCart(videoId)}
          text="Add to cart"
          icon={<CartIcon />}
        />
      );
    }
    return (
      <Button
        onClick={() => mutateDeleteFromCart(cartItem.id)}
        type="outline"
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
