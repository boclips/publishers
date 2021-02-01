import React from 'react';
import { createPriceDisplayValue } from 'src/services/createPriceDisplayValue';
import { OrderPrice } from 'boclips-api-client/dist/sub-clients/orders/model/OrderPrice';
import { OrderInformationField } from './OrderInformationField';

interface Props {
  price: OrderPrice;
}
export const OrderTotalValueField = ({ price }: Props) => (
  <OrderInformationField
    label="Total value"
    value={
      <div className="text-gray-800 font-medium text-base">
        {createPriceDisplayValue(
          price?.value,
          price?.currency,
          navigator.language,
        )}
      </div>
    }
  />
);
