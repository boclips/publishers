import React from 'react';
import { createPriceDisplayValue } from 'src/services/createPriceDisplayValue';
import { OrderPrice } from 'boclips-api-client/dist/sub-clients/orders/model/OrderPrice';
import c from 'classnames';
import { OrderInformationField } from './OrderInformationField';

interface Props {
  price: OrderPrice;
  highlighted?: boolean;
}
export const OrderTotalValueField = ({ price, highlighted }: Props) => (
  <OrderInformationField
    label="Total value"
    value={
      <div
        className={c('text-gray-800 text-base', {
          'font-medium': highlighted,
        })}
      >
        {createPriceDisplayValue(
          price?.value,
          price?.currency,
          navigator.language,
        )}
      </div>
    }
  />
);
