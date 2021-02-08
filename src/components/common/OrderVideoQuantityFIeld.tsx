import React from 'react';
import { OrderInformationField } from 'src/components/common/OrderInformationField';

interface Props {
  quantity: number;
  fieldName: string;
}

export const OrderVideoQuantity = ({ quantity, fieldName }: Props) => (
  <OrderInformationField fieldName={fieldName}>
    <div data-qa="video-quantity" className="text-base">
      {quantity}
    </div>
  </OrderInformationField>
);
