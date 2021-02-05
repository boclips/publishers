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
    <div className=" border-2 border-blue-500 rounded mb-10 flex flex-col px-10">
      <div className="flex flex-row justify-between">
        <OrderDateField date={order.createdAt} />
        <OrderInformationField
          label="Video quantity"
          value={
            <div data-qa="video-quantity" className="text-gray-800 text-base">
              {order.items.length}
            </div>
          }
        />
        <OrderTotalValueField price={order.totalPrice} highlighted />
        <OrderStatusField orderStatus={order.status} />
        <OrderDeliveredDateField deliveredAt={order.deliveredAt} />
      </div>
      {order.note && (
        <div className="flex flex-col text-base my-8">
          <div className="text-sm text-grey-700 font-medium">Notes</div>
          {order.note}
        </div>
      )}
    </div>
  );
};
