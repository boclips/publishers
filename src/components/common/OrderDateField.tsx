import React from 'react';
import dateFormat from 'dateformat';
import { OrderInformationField } from './OrderInformationField';

interface Props {
  date?: Date;
  fieldName: string;
}
export const OrderDateField = ({ date, fieldName }: Props) => (
  <OrderInformationField fieldName={fieldName}>
    <div className="text-base">{date ? dateFormat(date, 'dd/mm/yy') : '-'}</div>
  </OrderInformationField>
);
