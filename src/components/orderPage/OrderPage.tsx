import React from 'react';

import { OrderHeader } from 'src/components/orderPage/OrderHeader';

import { Order } from 'boclips-api-client/dist/sub-clients/orders/model/Order';
import { OrderSummary } from 'src/components/orderPage/OrderSummary';
import { OrderVideoList } from 'src/components/orderPage/OrderVideoList';

interface Props {
  order: Order;
}

export const OrderPage = ({ order }: Props) => {
  // change grid
  return (
    <div className="col-start-2 col-end-26 row-start-2 row-end-4">
      <OrderHeader id={order.id} />
      <OrderSummary order={order} />
      <OrderVideoList order={order} />
    </div>
  );
};
