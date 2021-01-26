import { useQuery } from 'react-query';
import { Cart } from 'boclips-api-client/dist/sub-clients/carts/model/Cart';
import { CartItem } from 'boclips-api-client/dist/sub-clients/carts/model/CartItem';
import { AdditionalServices } from 'boclips-api-client/dist/sub-clients/carts/model/AdditionalServices';
import { BoclipsClient } from 'boclips-api-client';
import { useBoclipsClient } from 'src/components/common/BoclipsClientProvider';

const doGetCart = (client: BoclipsClient) => client.carts.getCart();

export const doAddToCart = (
  cart: Cart,
  videoId: string,
  client: BoclipsClient,
) => client.carts.addItemToCart(cart, videoId);

export const doDeleteFromCart = (
  cart: Cart,
  cartItemId: string,
  client: BoclipsClient,
) => client.carts.deleteItemFromCart(cart, cartItemId).then((_) => cartItemId);

export const doUpdateCartItem = (
  cartItem: CartItem,
  additionalServices: AdditionalServices,
  client: BoclipsClient,
) => {
  return client.carts.updateCartItemAdditionalServices(
    cartItem,
    additionalServices,
  );
};

export const useCartQuery = () => {
  const client = useBoclipsClient();
  return useQuery('cart', () => doGetCart(client));
};

export const doUpdateCartNote = (note: string, client: BoclipsClient) =>
  client.carts.updateCart(note);
