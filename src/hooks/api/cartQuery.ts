import { useQuery } from 'react-query';
import { ApiClientWrapper } from 'src/services/apiClientWrapper';
import { Cart } from 'boclips-api-client/dist/sub-clients/carts/model/Cart';
import { CartItem } from 'boclips-api-client/dist/sub-clients/carts/model/CartItem';
import { AdditionalServices } from 'boclips-api-client/dist/sub-clients/carts/model/AdditionalServices';

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

export const doUpdateCartItem = (
  cartItem: CartItem,
  additionalServices: AdditionalServices,
) => {
  ApiClientWrapper.get().then((client) => {
    return client.carts.updateCartItemAdditionalServices(
      cartItem,
      additionalServices,
    );
  });
};

export const doUpdateCartNote = (note: string): Promise<Cart> => {
  return ApiClientWrapper.get().then((client) => {
    return client.carts.updateCart(note);
  });
};

export const useCartQuery = () => useQuery('cart', () => doGetCart());
