import React from 'react';
import { useLocation } from 'react-router-dom';
import { OrderItem } from 'boclips-api-client/dist/sub-clients/orders/model/OrderItem';
import { Loading } from 'src/components/common/Loading';
import { OrderItemCard } from 'src/components/orderPage/OrderItemCard';
import { OrderHeader } from 'src/components/orderPage/OrderHeader';
import { useFindOrder } from 'src/hooks/api/orderQuery';

export const OrderPage = () => {
  const location = useLocation();
  const orderId = location.pathname.split('/orders/')[1];

  const { data, isLoading } = useFindOrder(orderId);

  return (
    <>
      {isLoading ? (
        <div className="grid-cols-24 row-span-3 col-start-2 col-end-26 h-auto rounded-lg">
          <Loading />
        </div>
      ) : (
        <div className="col-start-2 col-end-26 row-start-2 row-end-4">
          <OrderHeader id={data?.id} />
          {data.items.length > 0 ? (
            <>
              {data?.items?.map((item: OrderItem) => {
                return <OrderItemCard item={item} key={`id-${item.id}`} />;
              })}
            </>
          ) : null}
        </div>
      )}
    </>
  );
};
