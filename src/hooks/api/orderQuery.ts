import { useMutation, useQuery, useQueryClient } from 'react-query';
import { OrdersPage } from 'boclips-api-client/dist/sub-clients/orders/model/OrdersPage';
import { PlaceOrderRequest } from 'boclips-api-client/dist/sub-clients/orders/model/PlaceOrderRequest';
import { BoclipsClient } from 'boclips-api-client';
import { useBoclipsClient } from 'src/components/common/BoclipsClientProvider';

export interface OrdersQuery {
  page: number;
  size: number;
}

export const doPlaceOrder = (
  request: PlaceOrderRequest,
  client: BoclipsClient,
) => client.orders.placeOrder(request);

export const getOrders = ({ page, size }: OrdersQuery, client: BoclipsClient) =>
  client.orders.getUserOrders(page, size);

export const getOrder = (id: string, client: BoclipsClient) =>
  client.orders.get(id);

export const usePlaceOrderQuery = (
  setLoading: (isLoading: boolean) => void,
  onOrderPlaced: (location: string) => void,
  setErrorMessage: (location: string) => void,
) => {
  const queryClient = useQueryClient();
  const boclipsClient = useBoclipsClient();

  return useMutation(
    (request: PlaceOrderRequest) => doPlaceOrder(request, boclipsClient),
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

export const useGetOrdersQuery = (
  ordersQuery: OrdersQuery,
  setErrorMessage: (location: string) => void,
) => {
  const client = useBoclipsClient();
  return useQuery(
    ['orders', ordersQuery],
    () => getOrders(ordersQuery, client),
    {
      onError: (error) => {
        setErrorMessage(JSON.stringify(error));
      },
    },
  );
};

export const useFindOrGetOrder = (orderId: string) => {
  const queryClient = useQueryClient();
  const boclipsClient = useBoclipsClient();

  return useQuery(['order', orderId], () => getOrder(orderId, boclipsClient), {
    initialData: () =>
      queryClient
        .getQueryData<OrdersPage>('orders')
        ?.orders.find((d) => d.id === orderId),
  });
};
