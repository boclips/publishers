import React from 'react';
import Navbar from 'src/components/layout/Navbar';
import Footer from 'src/components/layout/Footer';

const OrderView = () => {
  return (
    <div className="grid grid-rows-home grid-cols-container gap-8">
      <Navbar showSearchBar />
      <div>Your Orders</div>
      <Footer />
    </div>
  );
};

export default OrderView;
