import React from 'react';
import dateFormat from 'dateformat';
import { OrderInformationField } from './OrderInformationField';

interface Props {
  createdAt: Date;
  fieldName: string;
}
export const OrderDateField = ({ createdAt, fieldName }: Props) => (
  <OrderInformationField fieldName={fieldName}>
    <div className="text-base">{dateFormat(createdAt, 'dd/mm/yy') || '-'}</div>
  </OrderInformationField>
);
