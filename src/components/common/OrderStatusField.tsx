import React, { ReactElement } from 'react';
import { OrderStatus } from 'boclips-api-client/dist/sub-clients/orders/model/Order';
import { orderDeliveryStatus } from 'src/components/ordersTable/OrderDeliveryStatus';
import { OrderInformationField } from './OrderInformationField';

interface Props {
  orderStatus: OrderStatus;
}
export const OrderStatusField = ({ orderStatus }: Props) => {
  const getDeliveryStatusLabel = (status: OrderStatus): ReactElement | null => {
    const deliveryStatus = orderDeliveryStatus.get(status);

    if (deliveryStatus === undefined) {
      return null;
    }
    return (
      <div
        className={`${
          deliveryStatus === 'PROCESSING' ? 'text-blue-700' : 'text-gray-800'
        } text-base font-medium`}
      >
        {deliveryStatus}
      </div>
    );
  };
  return (
    <OrderInformationField
      label="Status"
      value={getDeliveryStatusLabel(orderStatus)}
    />
  );
};
