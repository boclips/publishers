import React from 'react';
import { OrderInformationField } from 'src/components/common/OrderInformationField';

interface Props {
  videoQuantity: string;
  fieldName: string;
}

export const OrderVideoQuantity = ({ videoQuantity, fieldName }: Props) => (
  <OrderInformationField fieldName={fieldName}>
    <div data-qa="video-quantity" className="text-base">
      {videoQuantity}
    </div>
  </OrderInformationField>
);
