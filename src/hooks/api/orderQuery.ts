import { QueryCache, useMutation, useQuery } from 'react-query';
import { User } from 'boclips-api-client/dist/sub-clients/organisations/model/User';
import { Cart } from 'boclips-api-client/dist/sub-clients/carts/model/Cart';
import { ourQueryCache } from 'src/hooks/api/queryCache';
import { Order } from 'boclips-api-client/dist/sub-clients/orders/model/Order';
import { BoclipsClient } from 'boclips-api-client';

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
  apiClient: BoclipsClient,
  cache: QueryCache,
  setLoading: (isLoading: boolean) => void,
  setLocation: (location: string) => void,
  setErrorMessage: (location: string) => void,
) =>
  useMutation(
    (request: PlaceOrderQueryRequest) => doPlaceOrder(apiClient, request),
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

export interface PlaceOrderQueryRequest {
  cart: Cart;
  user: User;
}

export const useGetOrdersQuery = (
  apiClient: BoclipsClient,
  ordersQuery: OrdersQuery,
  setErrorMessage: (location: string) => void,
) =>
  useQuery(['orders', ordersQuery], () => getOrders(apiClient, ordersQuery), {
    onError: (error) => {
      setErrorMessage(JSON.stringify(error));
    },
  });

const getCachedOrders = () => {
  return ourQueryCache.getQueryData('orders') as Order[];
};

export const useFindOrder = (apiClient, orderId: string) =>
  useQuery(['order', orderId], () => getOrder(apiClient, orderId), {
    initialData: () => getCachedOrders()?.find((d) => d.id === orderId),
  });
