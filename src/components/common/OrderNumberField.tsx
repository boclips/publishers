import React from 'react';
import { Link } from 'react-router-dom';
import { OrderInformationField } from './OrderInformationField';

interface Props {
  id: string;
  isLink?: boolean;
}
export const OrderNumberField = ({ id, isLink = false }: Props) => (
  <OrderInformationField
    label="Order number"
    value={
      isLink ? (
        <Link data-qa="order-id" to={`/orders/${id}`}>
          <div className="text-blue-800 text-base underline">{id}</div>
        </Link>
      ) : (
        <div className="text-blue-800 text-base underline">{id}</div>
      )
    }
  />
);
