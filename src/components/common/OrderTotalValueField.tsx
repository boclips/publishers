import React from 'react';
import { createPriceDisplayValue } from 'src/services/createPriceDisplayValue';
import { OrderPrice } from 'boclips-api-client/dist/sub-clients/orders/model/OrderPrice';
import c from 'classnames';
import { OrderInformationField } from './OrderInformationField';

interface Props {
  totalPrice: OrderPrice;
  highlighted?: boolean;
}
export const OrderTotalValueField = ({ totalPrice, highlighted }: Props) => (
  <OrderInformationField fieldName="Total value">
    <span
      className={c('text-gray-800 text-base', {
        'font-medium': highlighted,
      })}
    >
      {createPriceDisplayValue(
        totalPrice.value,
        totalPrice.currency,
        navigator.language,
      )}
    </span>
  </OrderInformationField>
);
