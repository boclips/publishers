import { useQuery } from 'react-query';
import { Cart } from 'boclips-api-client/dist/sub-clients/carts/model/Cart';
import { BoclipsClient } from 'boclips-api-client';
import { useBoclipsClient } from 'src/components/common/BoclipsClientProvider';

const doGetCart = (boclipsClient: BoclipsClient) =>
  boclipsClient.carts.getCart();

export const doAddToCart = (
  boclipsClient: BoclipsClient,
  cart: Cart,
  videoId: string,
) => boclipsClient.carts.addItemToCart(cart, videoId);

export const doDeleteFromCart = (
  boclipsClient: BoclipsClient,
  cart: Cart,
  cartItemId: string,
) =>
  boclipsClient.carts
    .deleteItemFromCart(cart, cartItemId)
    .then((_) => cartItemId);

export const useCartQuery = () => {
  const boclipsClient = useBoclipsClient();
  return useQuery('cart', () => doGetCart(boclipsClient));
};
