import React from 'react';
import { createPriceDisplayValue } from 'src/services/createPriceDisplayValue';
import { OrderPrice } from 'boclips-api-client/dist/sub-clients/orders/model/OrderPrice';
import c from 'classnames';
import { getBrowserLocale } from 'src/services/getBrowserLocale';
import { OrderInformationField } from './OrderInformationField';

interface Props {
  totalPrice: OrderPrice;
  highlighted?: boolean;
}
export const OrderTotalPriceField = ({ totalPrice, highlighted }: Props) => (
  <OrderInformationField fieldName="Total price">
    <span
      className={c('text-gray-800 text-base', {
        'font-medium': highlighted,
      })}
    >
      {createPriceDisplayValue(
        totalPrice?.value,
        totalPrice?.currency,
        getBrowserLocale(),
      )}
    </span>
  </OrderInformationField>
);
