import { useMutation, useQuery, useQueryClient } from 'react-query';
import { ApiClientWrapper } from 'src/services/apiClientWrapper';
import { User } from 'boclips-api-client/dist/sub-clients/organisations/model/User';
import { Cart } from 'boclips-api-client/dist/sub-clients/carts/model/Cart';
import { OrdersPage } from 'boclips-api-client/dist/sub-clients/orders/model/OrdersPage';

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
  setLoading: (isLoading: boolean) => void,
  onOrderPlaced: (location: string) => void,
  setErrorMessage: (location: string) => void,
) => {
  const queryClient = useQueryClient();
  return useMutation(
    (request: PlaceOrderQueryRequest) => doPlaceOrder(request),
    {
      onSuccess: (orderLocation) => {
        onOrderPlaced(orderLocation);
        queryClient.setQueryData('cart', () => ({
          items: [],
        }));
      },
      onError: (error) => {
        setErrorMessage(JSON.stringify(error));
        setLoading(false);
      },
      onMutate: () => {
        setLoading(true);
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
) =>
  useQuery(['orders', ordersQuery], () => getOrders(ordersQuery), {
    onError: (error) => {
      setErrorMessage(JSON.stringify(error));
    },
  });

export const useFindOrGetOrder = (orderId: string) => {
  const queryClient = useQueryClient();

  return useQuery(['order', orderId], () => getOrder(orderId), {
    initialData: () =>
      queryClient
        .getQueryData<OrdersPage>('orders')
        ?.orders.find((d) => d.id === orderId),
  });
};
