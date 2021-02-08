import React, { useState } from 'react';
import Navbar from 'src/components/layout/Navbar';
import Footer from 'src/components/layout/Footer';
import { OrdersTable } from 'src/components/ordersTable/OrdersTable';
import { useGetOrdersQuery } from 'src/hooks/api/orderQuery';
import { Loading } from 'src/components/common/Loading';

export const PAGE_SIZE = 10;

const OrdersView = () => {
  const [page, setPage] = useState<number>(0);

  const { isLoading, data: orders } = useGetOrdersQuery({
    page,
    size: PAGE_SIZE,
  });

  const changePaginationPage = (pageNum) => {
    setPage(pageNum);
  };

  const areOrders = orders?.orders.length > 0;

  const orderRender = () => {
    if (areOrders)
      return (
        <OrdersTable paginationPage={changePaginationPage} orders={orders} />
      );

    return <div>This will be an empty state</div>;
  };

  if (isLoading && !areOrders) return <Loading />;

  return (
    <div className="grid grid-rows-orders-view grid-cols-container gap-8">
      <Navbar showSearchBar />
      {orderRender()}
      <Footer />
    </div>
  );
};

export default OrdersView;
