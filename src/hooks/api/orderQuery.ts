import { QueryCache, useMutation, useQuery } from 'react-query';
import { ApiClientWrapper } from 'src/services/apiClientWrapper';
import { User } from 'boclips-api-client/dist/sub-clients/organisations/model/User';
import { Cart } from 'boclips-api-client/dist/sub-clients/carts/model/Cart';
import { ourQueryCache } from 'src/hooks/api/queryCache';
import { Order } from 'boclips-api-client/dist/sub-clients/orders/model/Order';

export interface OrdersQuery {
  page: number;
  size: number;
}

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

export const getOrders = ({ page, size }: OrdersQuery) =>
  ApiClientWrapper.get().then((client) => {
    return client.orders.getUserOrders(page, size);
  });

export const getOrder = (id: string) =>
  ApiClientWrapper.get().then((client) => {
    return client.orders.get(id);
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

export const useGetOrdersQuery = (
  ordersQuery: OrdersQuery,
  setErrorMessage: (location: string) => void,
) =>
  useQuery(['orders', ordersQuery], () => getOrders(ordersQuery), {
    onError: (error) => {
      setErrorMessage(JSON.stringify(error));
    },
  });

const getCachedOrders = () => {
  return ourQueryCache.getQueryData('orders') as Order[];
};

export const useFindOrder = (orderId: string) =>
  useQuery(['order', orderId], () => getOrder(orderId), {
    initialData: () => getCachedOrders()?.find((d) => d.id === orderId),
  });
