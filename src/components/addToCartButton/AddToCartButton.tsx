import { useMutation, useQueryClient } from 'react-query';
import {
  doAddToCart,
  doDeleteFromCart,
  useCartQuery,
} from 'src/hooks/api/cartQuery';
import { Cart } from 'boclips-api-client/dist/sub-clients/carts/model/Cart';
import Button from '@boclips-ui/button';
import React from 'react';
import c from 'classnames';
import CartIcon from 'resources/icons/cart-icon.svg';
import { AppcuesEvent } from 'src/types/AppcuesEvent';
import AnalyticsFactory from 'src/services/analytics/AnalyticsFactory';
import s from './style.module.less';
import { useBoclipsClient } from '../common/providers/BoclipsClientProvider';

interface AddToCartButtonProps {
  videoId: string;
  width?: string;
  appcueEvent?: AppcuesEvent;
}

export const AddToCartButton = ({
  videoId,
  width,
  appcueEvent,
}: AddToCartButtonProps) => {
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

        if (appcueEvent) {
          AnalyticsFactory.getAppcues().sendEvent(appcueEvent);
        }
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

  return (
    <div
      style={{ width }}
      className={c(`h-12 flex justify-end ${s.svgOutlineNone}`, {
        [s.svgOutline]: cartItem,
      })}
    >
      {!cartItem ? (
        <Button
          onClick={() => mutateAddToCart(videoId)}
          text="Add to cart"
          icon={<CartIcon />}
          width="100%"
        />
      ) : (
        <Button
          onClick={() => mutateDeleteFromCart(cartItem.id)}
          type="outline"
          text="Remove"
          icon={<CartIcon />}
          width="100%"
        />
      )}
    </div>
  );
};

export default AddToCartButton;
