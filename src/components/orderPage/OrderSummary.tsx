import { Order } from 'boclips-api-client/dist/sub-clients/orders/model/Order';

import React from 'react';
import { OrderDateField } from 'src/components/common/OrderDateField';
import { OrderTotalValueField } from 'src/components/common/OrderTotalValueField';
import { OrderStatusField } from 'src/components/common/OrderStatusField';
import { OrderVideoQuantity } from 'src/components/common/OrderVideoQuantityFIeld';
import { OrderInformationField } from 'src/components/common/OrderInformationField';

interface Props {
  order: Order;
}

export const OrderSummary = ({ order }: Props) => {
  return (
    <div className="grid-row-start-3 grid-row-end-3 col-start-2 col-end-26">
      <div className="text-2xl font-bold text-gray-800 mb-4">{`Order ${order.id}`}</div>

      <div className="flex flex-row flex-wrap border-2 border-blue-500 rounded p-6">
        <OrderDateField fieldName="Order date" date={order.createdAt} />
        <OrderStatusField status={order.status} />
        <OrderDateField fieldName="Delivery date" date={order.deliveredAt} />
        <OrderTotalValueField highlighted totalPrice={order.totalPrice} />
        <OrderVideoQuantity
          quantity={order.items.length}
          fieldName="Video quantity"
        />
        {order?.note && (
          <span className="mt-4">
            <OrderInformationField fieldName="Notes">
              <div className="text-base">{order.note}</div>
            </OrderInformationField>
          </span>
        )}
      </div>
    </div>
  );
};
