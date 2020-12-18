import { useQuery } from 'react-query';
import { ApiClientWrapper } from 'src/services/apiClientWrapper';
import { Cart } from 'boclips-api-client/dist/sub-clients/carts/model/Cart';

const doGetCart = () =>
  ApiClientWrapper.get().then((client) => {
    return client.carts.getCart();
  });

export const doAddToCart = (cart: Cart, videoId: string) =>
  ApiClientWrapper.get().then((client) => {
    return client.carts.addItemToCart(cart, videoId);
  });

export const doDeleteFromCart = (cart: Cart, cartItemId: string) =>
  ApiClientWrapper.get().then((client) => {
    return client.carts
      .deleteItemFromCart(cart, cartItemId)
      .then((_) => cartItemId);
  });

export const useCartQuery = () => useQuery('cart', () => doGetCart());
