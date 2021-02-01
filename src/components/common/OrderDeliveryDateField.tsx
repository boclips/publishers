import React from 'react';
import dateFormat from 'dateformat';
import { OrderInformationField } from './OrderInformationField';

interface Props {
  deliveredAt: Date;
}
export const OrderDeliveryDateField = ({ deliveredAt }: Props) => (
  <OrderInformationField
    label="Delivery date"
    value={
      <div className="text-gray-800 text-base" data-qa="delivery-date">
        {deliveredAt ? dateFormat(deliveredAt, 'dd/mm/yy') : '-'}
      </div>
    }
  />
);
