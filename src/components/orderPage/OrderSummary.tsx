import { Order } from 'boclips-api-client/dist/sub-clients/orders/model/Order';

import React from 'react';
import { OrderDateField } from 'src/components/common/OrderDateField';
import { OrderInformationField } from 'src/components/common/OrderInformationField';
import { OrderTotalValueField } from 'src/components/common/OrderTotalValueField';
import { OrderStatusField } from 'src/components/common/OrderStatusField';
import { OrderDeliveredDateField } from 'src/components/common/OrderDeliveredDateField';

interface Props {
  order: Order;
}
export const OrderSummary = ({ order }: Props) => {
  return (
    <div className=" border-2 border-blue-500 rounded mb-10 flex flex-row px-10 justify-start">
      <OrderDateField date={order.createdAt} />
      <OrderInformationField
        label="Video quantity"
        value={
          <div data-qa="video-quantity" className="text-gray-800 text-base">
            {order.items.length}
          </div>
        }
      />
      <OrderTotalValueField price={order.totalPrice} />
      <OrderStatusField orderStatus={order.status} />
      <OrderDeliveredDateField deliveredAt={order.deliveredAt} />
      <OrderInformationField
        label="Notes"
        value={
          <div className="text-gray-800 text-base">
            {order.note ? order.note : '-'}
          </div>
        }
      />
    </div>
  );
};
