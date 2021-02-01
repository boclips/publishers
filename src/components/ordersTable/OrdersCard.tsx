import { Order } from 'boclips-api-client/dist/sub-clients/orders/model/Order';
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@boclips-ui/button';
import { ItemsThumbnail } from 'src/components/ordersTable/OrderThumbnail';
import { OrderDateField } from 'src/components/common/OrderDateField';
import { OrderNumberField } from 'src/components/common/OrderNumberField';
import { OrderTotalValueField } from 'src/components/common/OrderTotalValueField';
import { OrderDeliveryDateField } from 'src/components/common/OrderDeliveryDateField';
import { OrderStatusField } from 'src/components/common/OrderStatusField';

interface Props {
  order: Order;
}

export const OrdersCard = ({ order }: Props) => {
  return (
    <div className="col-start-2 col-end-26 flex flex-row border-b-2 py-8 text-grey-700 justify-between items-center">
      <ItemsThumbnail items={order.items} />
      <OrderDateField date={order.createdAt} />
      <OrderNumberField id={order.id} isLink />
      <OrderTotalValueField price={order.totalPrice} />
      <OrderStatusField orderStatus={order.status} />
      <OrderDeliveryDateField deliveryDate={order.deliveryDate} />
      <div className="h-12 text-base">
        <Link to={`/orders/${order.id}`}>
          <Button
            theme="publishers"
            type="primary"
            text="View order"
            onClick={null}
          />
        </Link>
      </div>
    </div>
  );
};
