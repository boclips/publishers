import s from 'src/components/cart/style.module.less';
import OrderConfirmedBueno from 'src/resources/icons/order-confirmed-bueno.svg';
import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@boclips-ui/button';

export interface OrderConfirmationProps {
  orderId: string;
}

export const OrderConfirmation = ({ orderId }: OrderConfirmationProps) => {
  const history = useHistory();
  return (
    <>
      <div className={s.orderConfirmedView} data-qa="order-confirmed">
        <div className="col-start-5 col-end-10 flex justify-center items-center">
          <OrderConfirmedBueno />
        </div>
        <div className="col-start-12 col-end-21 text-blue-800 flex flex-col justify-center">
          <div className="text-4xl text-blue-800 font-medium">
            Your order is confirmed
          </div>
          <div className="text-base text-gray-800 mt-3">
            <span>{`Your order #${orderId} is currently being processed.`}</span>
            <br />
            We&apos;ve sent you an email with your order confirmation.
            <p className="mt-6">
              You can track and review all orders in your account
            </p>
            <div className="flex space-x-5 mt-8 font-medium items-center">
              <Button
                onClick={() => {
                  history.push({
                    pathname: `/orders/${orderId}`,
                  });
                }}
                text="View order details"
                height="44px"
                width="170px"
              />
              <a href="/orders">View all orders</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
