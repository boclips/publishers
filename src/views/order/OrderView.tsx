import React from 'react';
import Navbar from 'src/components/layout/Navbar';
import Footer from 'src/components/layout/Footer';
import { OrderPage } from 'src/components/orderPage/OrderPage';

const OrderTable = () => {
  return (
    <div className="grid grid-rows-orders-view grid-cols-container gap-8">
      <Navbar showSearchBar={false} />
      <OrderPage />
      <Footer />
    </div>
  );
};

export default OrderTable;
