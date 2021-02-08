import { OrderItemCard } from 'src/components/orderPage/OrderItemCard';
import React from 'react';
import { Order } from 'boclips-api-client/dist/sub-clients/orders/model/Order';

interface Props {
  order: Order;
}

export const OrderVideoList = ({ order }: Props) => {
  return (
    <>
      {order?.items.map((orderItem) => (
        <OrderItemCard item={orderItem} key={`id-${orderItem.id}`} />
      ))}
    </>
  );
};
