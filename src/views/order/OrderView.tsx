import React from 'react';
import Navbar from 'src/components/layout/Navbar';
import Footer from 'src/components/layout/Footer';
import { useGetIdFromLocation } from 'src/hooks/useLocationParams';
import { useFindOrGetOrder } from 'src/hooks/api/orderQuery';
import { Loading } from 'src/components/common/Loading';
import { OrderPage } from 'src/components/orderPage/OrderPage';
import { OmnscientErrorBoundary } from 'src/components/common/errors/OmniscientErrorBoundary';
import { RefreshPageError } from 'src/components/common/errors/refreshPageError/RefreshPageError';
import { OrderHeader } from 'src/components/orderPage/OrderHeader';

const OrderTable = () => {
  const orderId = useGetIdFromLocation('orders');
  const { data: order, isLoading } = useFindOrGetOrder(orderId);

  if (isLoading) return <Loading />;

  return (
    <div className="grid grid-rows-order-view grid-cols-container gap-8">
      <Navbar showSearchBar={false} />
      <OrderHeader id={order?.id} />
      <OmnscientErrorBoundary fallback={<RefreshPageError />}>
        <OrderPage order={order} />
      </OmnscientErrorBoundary>
      <Footer />
    </div>
  );
};

export default OrderTable;
