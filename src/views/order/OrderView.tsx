import React from 'react';
import Navbar from 'src/components/layout/Navbar';
import Footer from 'src/components/layout/Footer';
import { useGetIdFromLocation } from 'src/hooks/useLocationParams';
import { useFindOrGetOrder } from 'src/hooks/api/orderQuery';
import { Loading } from 'src/components/common/Loading';
import { OrderPage } from 'src/components/orderPage/OrderPage';
import { ErrorBoundary } from 'src/components/common/errors/ErrorBoundary';
import { RefreshPageError } from 'src/components/common/errors/refreshPageError/RefreshPageError';
import { OrderHeader } from 'src/components/orderPage/OrderHeader';
import { Helmet } from 'react-helmet';

const OrderHelmet = ({ orderId }: { orderId?: string }) => {
  return <>{orderId && <Helmet title={`Order ${orderId}`} />}</>;
};

const OrderTable = () => {
  const orderId = useGetIdFromLocation('orders');
  const { data: order, isLoading } = useFindOrGetOrder(orderId);

  if (isLoading)
    return (
      <>
        <OrderHelmet orderId={orderId} />
        <Loading />
      </>
    );

  return (
    <div className="grid grid-rows-order-view grid-cols-container gap-8">
      <OrderHelmet orderId={orderId} />
      <Navbar showSearchBar={false} />
      <OrderHeader id={order?.id} />
      <ErrorBoundary fallback={<RefreshPageError />}>
        <OrderPage order={order} />
      </ErrorBoundary>
      <Footer />
    </div>
  );
};

export default OrderTable;
