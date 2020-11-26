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

export const useCartQuery = () => useQuery('cart', () => doGetCart());

// export const useAddToCartQuery = (cart: Cart, videoId: string) =>
//   useQuery('addToCart', () => doAddToCart(cart, videoId));