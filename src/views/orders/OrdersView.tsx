import React from 'react';
import Navbar from 'src/components/layout/Navbar';
import Footer from 'src/components/layout/Footer';
import { OrdersTable } from 'src/components/ordersTable/OrdersTable';

const OrdersView = () => {
  return (
    <div className="grid grid-rows-orders-view grid-cols-container gap-8">
      <Navbar showSearchBar />
      <OrdersTable />
      <Footer />
    </div>
  );
};

export default OrdersView;