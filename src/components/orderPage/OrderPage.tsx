import React from 'react';
import { useLocation } from 'react-router-dom';
import { ourQueryCache } from 'src/hooks/api/queryCache';
import { Order } from 'boclips-api-client/dist/sub-clients/orders/model/Order';
import { useQuery } from 'react-query';
import { OrderItem } from 'boclips-api-client/dist/sub-clients/orders/model/OrderItem';
import { Loading } from 'src/components/common/Loading';
import { OrderItemCard } from 'src/components/orderPage/OrderItemCard';
import { OrderHeader } from 'src/components/orderPage/OrderHeader';
import { getOrder } from 'src/hooks/api/orderQuery';

export const OrderPage = () => {
  return null;
  const orders = ourQueryCache.getQueryData('orders') as Order[];
  const location = useLocation();
  const orderId = location.pathname.split('/orders/')[1];

  const { data, isLoading } = useQuery(
    ['order', orderId],
    () => getOrder(orderId),
    {
      initialData: () => orders?.find((d) => d.id === orderId),
    },
  );

  return (
    <>
      {isLoading ? (
        <div className="grid-cols-24 row-span-3 col-start-2 col-end-26 h-auto rounded-lg">
          <Loading />
        </div>
      ) : (
        <div className="col-start-2 col-end-26 row-start-2 row-end-4">
          <OrderHeader id={data.id} />
          {data?.items?.map((item: OrderItem) => {
            return <OrderItemCard item={item} key={item.video.id} />;
          })}
        </div>
      )}
    </>
  );
};
