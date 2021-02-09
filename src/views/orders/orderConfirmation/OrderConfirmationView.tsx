import React, { useEffect } from 'react';
import Navbar from 'src/components/layout/Navbar';
import Footer from 'src/components/layout/Footer';
import { useHistory } from 'react-router-dom';
import { OrderConfirmation } from 'src/components/orderConfirmation/OrderConfirmation';

interface OrderConfirmedInterface {
  state: any;
}

const OrderConfirmationView = ({ state }: OrderConfirmedInterface) => {
  const history = useHistory();

  useEffect(() => {
    if (!state || !state.orderLocation) {
      history.push('/');
    }
  }, [state, history]);

  const orderId = state?.orderLocation.substring(
    state.orderLocation.lastIndexOf('/') + 1,
  );

  if (!state || !state.orderLocation) return null;

  return (
    <div className="grid grid-cols-container grid-rows-cart-view gap-8">
      <Navbar showSearchBar />
      <OrderConfirmation orderId={orderId} />
      <Footer />
    </div>
  );
};

export default OrderConfirmationView;
