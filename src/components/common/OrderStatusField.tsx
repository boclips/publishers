import React from 'react';
import { OrderStatus } from 'boclips-api-client/dist/sub-clients/orders/model/Order';
import { orderDeliveryStatus } from 'src/components/ordersTable/OrderDeliveryStatus';
import c from 'classnames';
import { OrderInformationField } from 'src/components/common/OrderInformationField';

interface Props {
  status: OrderStatus;
}

export const OrderStatusField = ({ status }: Props) => {
  const deliveryStatus = orderDeliveryStatus.get(status);

  return (
    <OrderInformationField fieldName="Status">
      <div
        data-qa="order-status-field"
        className={c('text-gray-800 text-base font-medium', {
          'text-blue-700': deliveryStatus === 'PROCESSING',
        })}
      >
        {deliveryStatus || '-'}
      </div>
    </OrderInformationField>
  );
};
