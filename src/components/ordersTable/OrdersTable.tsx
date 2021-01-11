import React, { useState } from 'react';
import { useGetOrdersQuery } from 'src/hooks/api/orderQuery';
import { Empty, List } from 'antd';
import { OrdersCard } from 'src/components/ordersTable/OrdersCard';
import { Order } from 'boclips-api-client/dist/sub-clients/orders/model/Order';
import { Loading } from 'src/components/common/Loading';
import { ErrorMessage } from 'src/components/common/ErrorMessage';

export const PAGE_SIZE = 10;

export const OrdersTable = () => {
  const [page, setPage] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>(null);
  const { isLoading, isError, data } = useGetOrdersQuery(
    {
      page: page || 0,
      size: PAGE_SIZE,
    },
    setErrorMessage,
  );

  const handlePageChange = (newPage: number) => {
    window.scrollTo({ top: 0 });
    setPage(newPage - 1);
  };

  return (
    <div className="col-start-2 col-end-26 row-start-2 row-end-4">
      <div className="text-lg font-bold">Your Orders</div>
      {isError ? (
        <ErrorMessage errorMessage={errorMessage} />
      ) : (
        <>
          {isLoading ? (
            <div className="h-auto rounded-lg grid-cols-24 row-span-3 col-start-2 col-end-26">
              <Loading />
            </div>
          ) : (
            <>
              {data?.orders.length > 0 ? (
                <List
                  itemLayout="vertical"
                  size="large"
                  pagination={{
                    total: data?.page?.totalElements,
                    pageSize: 10,
                    showSizeChanger: false,
                    onChange: handlePageChange,
                    current: data?.page?.number,
                  }}
                  dataSource={data?.orders}
                  renderItem={(order: Order) => (
                    <div className="mb-4">
                      <OrdersCard order={order} />
                    </div>
                  )}
                />
              ) : (
                <div data-qa="no-results">
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};
