import { useMutation, useQueryCache } from 'react-query';
import { doAddToCart, useCartQuery } from 'src/hooks/api/cartQuery';
import { Cart } from 'boclips-api-client/dist/sub-clients/carts/model/Cart';
import Button from '@boclips-ui/button';
import React from 'react';
import CartIcon from '../../resources/cart-icon.svg';

interface AddToCartButtonProps {
  videoId: string;
}

const AddToCartButton = ({ videoId }: AddToCartButtonProps) => {
  const cache = useQueryCache();
  const { data: cart } = useCartQuery();

  const [mutateAddToCart] = useMutation(
    (id: string) => doAddToCart(cart as Cart, id),
    {
      onSuccess: (it) => {
        cache.setQueryData('cart', (old: Cart) => ({
          ...old,
          items: [...old.items, it],
        }));
      },
    },
  );
  const addToCartButton =
    cart.items.filter((it) => it.videoId === videoId).length === 0;

  const displayButton = () => {
    if (addToCartButton) {
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
        onClick={() => null}
        theme="publishers"
        type="secondary"
        text="Remove from cart"
        icon={<CartIcon />}
      />
    );
  };

  return (
    <div className="h-12 w-full flex justify-end mt-2"> {displayButton()} </div>
  );
};

export default AddToCartButton;
