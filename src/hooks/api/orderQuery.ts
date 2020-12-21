import { QueryCache, useMutation } from 'react-query';
import { ApiClientWrapper } from 'src/services/apiClientWrapper';
import { User } from 'boclips-api-client/dist/sub-clients/organisations/model/User';
import { Cart } from 'boclips-api-client/dist/sub-clients/carts/model/Cart';

export const doPlaceOrder = ({ cart, user }) =>
  ApiClientWrapper.get().then((client) => {
    return client.orders.placeOrder(
      cart.items.map((cartItem) => ({
        id: cartItem.id,
        videoId: cartItem.videoId,
      })),
      user,
    );
  });

export const usePlaceOrderQuery = (
  cache: QueryCache,
  setLoading: (isLoading: boolean) => void,
  setLocation: (location: string) => void,
  setErrorMessage: (location: string) => void,
) =>
  useMutation((request: PlaceOrderQueryRequest) => doPlaceOrder(request), {
    onSuccess: (orderLocation) => {
      setLocation(orderLocation);
      cache.setQueryData('cart', () => ({
        items: [],
      }));
    },
    onError: (error) => {
      setErrorMessage(JSON.stringify(error));
    },
    onMutate: () => {
      setLoading(true);
    },
    onSettled: () => {
      setLoading(false);
    },
  });

export interface PlaceOrderQueryRequest {
  cart: Cart;
  user: User;
}
