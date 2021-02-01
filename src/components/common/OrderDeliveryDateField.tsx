import React from 'react';
import dateFormat from 'dateformat';
import { OrderInformationField } from './OrderInformationField';

interface Props {
  deliveryDate: Date;
}
export const OrderDeliveryDateField = ({ deliveryDate }: Props) => (
  <OrderInformationField
    label="Delivery date"
    value={
      <div className="text-gray-800 text-base" data-qa="delivery-date">
        {deliveryDate ? dateFormat(deliveryDate, 'dd/mm/yy') : '-'}
      </div>
    }
  />
);
