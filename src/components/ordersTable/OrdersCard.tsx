import { Order } from 'boclips-api-client/dist/sub-clients/orders/model/Order';
import React from 'react';
import dateFormat from 'dateformat';
import { Link } from 'react-router-dom';

interface Props {
  order: Order;
}

export const OrdersCard = ({ order }: Props) => {
  return (
    <div className="col-start-2 col-end-26 flex flex-row border-b-2">
      <div className="flex flex-col text-xs m-8">
        <div className="font-medium text-grey-500 "> Order date</div>
        <div>{dateFormat(order.createdAt, 'dd/mm/yy')}</div>
      </div>
      <Link
        data-qa="order-id"
        to={`/orders/${order.id}`}
        className="flex flex-col text-xs ma m-8"
      >
        <div className="font-medium text-grey-500">Order number</div>
        <div>{order.id}</div>
      </Link>
    </div>
  );
};
