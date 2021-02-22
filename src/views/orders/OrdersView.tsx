import React, { useState } from 'react';
import Navbar from 'src/components/layout/Navbar';
import Footer from 'src/components/layout/Footer';
import { OrdersTable } from 'src/components/ordersTable/OrdersTable';
import { useGetOrdersQuery } from 'src/hooks/api/orderQuery';
import { Loading } from 'src/components/common/Loading';
import { OmnscientErrorBoundary } from 'src/components/common/errors/OmniscientErrorBoundary';
import { RefreshPageError } from 'src/components/common/errors/refreshPageError/RefreshPageError';

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
      <div className="col-start-2 col-end-26 row-start-2 row-end-4">
        <div className="font-bold text-2xl text-grey-800">Your Orders</div>
        <div>
          <OmnscientErrorBoundary fallback={<RefreshPageError />}>
            {orderRender()}
          </OmnscientErrorBoundary>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OrdersView;
