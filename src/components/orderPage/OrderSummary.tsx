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
    <div className="flex flex-row border-2 border-blue-500 rounded p-6 mb-4">
      <OrderDateField fieldName="Order Date" createdAt={order.createdAt} />
      <OrderStatusField status={order.status} />
      <OrderDateField fieldName="Delivery Date" createdAt={order.deliveredAt} />
      <OrderTotalValueField highlighted totalPrice={order.totalPrice} />
      <OrderVideoQuantity
        quantity={order.items.length}
        fieldName="Video quantity"
      />

      {order?.note && (
        <OrderInformationField fieldName="Notes">
          <div className="text-base">{order.note}</div>
        </OrderInformationField>
      )}
    </div>
  );
};
