import { Order } from 'boclips-api-client/dist/sub-clients/orders/model/Order';
import React, { ReactElement } from 'react';
import dateFormat from 'dateformat';
import { Link } from 'react-router-dom';

interface Props {
  order: Order;
}

interface ItemProps {
  header: string;
  value: ReactElement;
}

const Item = ({ header, value }: ItemProps) => {
  return (
    <div className="flex flex-col text-xs m-8">
      <div className="text-sm text-grey-700 font-medium">{header}</div>
      {value}
    </div>
  );
};

export const OrdersCard = ({ order }: Props) => {
  return (
    <div className="col-start-2 col-end-26 flex flex-row border-b-2 text-grey-700">
      <Item
        header="Order date"
        value={
          <div className="text-grey-800 text-sm">
            {dateFormat(order.createdAt, 'dd/mm/yy')}
          </div>
        }
      />
      <Item
        header="Order number"
        value={
          <Link data-qa="order-id" to={`/orders/${order.id}`}>
            <div className="text-blue-800 text-sm underline">{order.id}</div>
          </Link>
        }
      />
    </div>
  );
};
