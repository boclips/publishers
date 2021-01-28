import { useMutation, useQuery, useQueryClient } from 'react-query';
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

export const useDeleteFromCartQuery = (
  setDeleteState: (state: 'loading' | 'done') => void = () => {},
  delay: number = 0,
) => {
  const queryClient = useQueryClient();
  const boclipsClient = useBoclipsClient();
  const { data: cart } = useCartQuery();

  return useMutation(
    async (id: string) => {
      setDeleteState('loading');
      if (cart.items.find((item) => item.id === id)) {
        return doDeleteFromCart(cart as Cart, id, boclipsClient);
      }
      return Promise.reject(new Error('Item is not in cart'));
    },
    {
      onSuccess: async (it) => {
        await new Promise((r) => setTimeout(r, delay));
        setDeleteState('done');
        await new Promise((r) => setTimeout(r, delay));

        queryClient.setQueryData('cart', (old: Cart) => ({
          ...old,
          items: [...old.items.filter((item) => item.id !== it)],
        }));
      },
    },
  );
};

export const useAddToCartQuery = () => {
  const queryClient = useQueryClient();
  const boclipsClient = useBoclipsClient();
  const { data: cart } = useCartQuery();

  return useMutation(
    (id: string) => {
      if (!cart?.items?.find((item) => item.id === id)) {
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
};
