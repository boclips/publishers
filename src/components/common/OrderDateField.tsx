import React from 'react';
import dateFormat from 'dateformat';
import { OrderInformationField } from './OrderInformationField';

interface Props {
  date: Date;
}
export const OrderDateField = ({ date }: Props) => (
  <OrderInformationField
    label="Order date"
    value={
      <div className="text-gray-800 text-base">
        {dateFormat(date, 'dd/mm/yy')}
      </div>
    }
  />
);
