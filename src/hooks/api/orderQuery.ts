import { QueryCache, useMutation, useQuery } from 'react-query';
import { User } from 'boclips-api-client/dist/sub-clients/organisations/model/User';
import { Cart } from 'boclips-api-client/dist/sub-clients/carts/model/Cart';
import { ourQueryCache } from 'src/hooks/api/queryCache';
import { Order } from 'boclips-api-client/dist/sub-clients/orders/model/Order';
import { useBoclipsClient } from 'src/components/common/BoclipsClientProvider';

export interface OrdersQuery {
  page: number;
  size: number;
}

export const doPlaceOrder = (apiClient, { cart, user }) =>
  apiClient.orders.placeOrder(
    cart.items.map((cartItem) => ({
      id: cartItem.id,
      videoId: cartItem.videoId,
    })),
    user,
  );

export const getOrders = (apiClient, { page, size }: OrdersQuery) =>
  apiClient.orders.getUserOrders(page, size);

export const getOrder = (apiClient, id: string) => apiClient.orders.get(id);

export const usePlaceOrderQuery = (
  cache: QueryCache,
  setLoading: (isLoading: boolean) => void,
  setLocation: (location: string) => void,
  setErrorMessage: (location: string) => void,
) => {
  const boclipsClient = useBoclipsClient();

  return useMutation(
    (request: PlaceOrderQueryRequest) => doPlaceOrder(boclipsClient, request),
    {
      onSuccess: (orderLocation: string) => {
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
    },
  );
};

export interface PlaceOrderQueryRequest {
  cart: Cart;
  user: User;
}

export const useGetOrdersQuery = (
  ordersQuery: OrdersQuery,
  setErrorMessage: (location: string) => void,
) => {
  const boclipsClient = useBoclipsClient();

  return useQuery(
    ['orders', ordersQuery],
    () => getOrders(boclipsClient, ordersQuery),
    {
      onError: (error) => {
        setErrorMessage(JSON.stringify(error));
      },
    },
  );
};

const getCachedOrders = () => {
  return ourQueryCache.getQueryData('orders') as Order[];
};

export const useFindOrder = (orderId: string) => {
  const boclipsClient = useBoclipsClient();

  return useQuery(['order', orderId], () => getOrder(boclipsClient, orderId), {
    initialData: () => getCachedOrders()?.find((d) => d.id === orderId),
  });
};
