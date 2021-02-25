import React, { useState } from 'react';
import Navbar from 'src/components/layout/Navbar';
import Footer from 'src/components/layout/Footer';
import { OrdersTable } from 'src/components/ordersTable/OrdersTable';
import { useGetOrdersQuery } from 'src/hooks/api/orderQuery';
import { Loading } from 'src/components/common/Loading';
import { ErrorBoundary } from 'src/components/common/errors/ErrorBoundary';
import { RefreshPageError } from 'src/components/common/errors/refreshPageError/RefreshPageError';
import EmptyOrdersSVG from 'src/resources/icons/empty-order-history.svg';

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

  const hasOrders = orders?.orders.length > 0;

  if (isLoading && !hasOrders) return <Loading />;

  return (
    <div className="grid grid-rows-orders-view grid-cols-container gap-8">
      <Navbar showSearchBar />
      <div className="col-start-2 col-end-26 row-start-2 row-end-2 flex items-center">
        <div className="font-bold text-2xl text-grey-800">Your Orders</div>
      </div>
      {hasOrders ? (
        <ErrorBoundary fallback={<RefreshPageError />}>
          <OrdersTable paginationPage={changePaginationPage} orders={orders} />
        </ErrorBoundary>
      ) : (
        <div className="col-start-2 col-end-26 bg-primary-light h-full rounded-lg">
          <section className="grid grid-cols-content gap-8  h-full">
            <div className="col-start-5 col-end-9 flex justify-center items-center my-12">
              <span data-qa="empty-orders-image">
                <EmptyOrdersSVG />
              </span>
            </div>
            <div className="col-start-12 col-end-21 text-blue-800 flex flex-col justify-center my-11">
              <h2 className="blue-800 font-medium text-4xl">
                You have no order history... yet!
              </h2>
              <p className="text-gray-800 text-lg">
                But when you order something, you can keep track of all your
                orders here.
              </p>
            </div>
          </section>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default OrdersView;
