import React, { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ReactQueryDevtools } from 'react-query-devtools';
import { Loading } from 'src/components/common/Loading';
import { hot } from 'react-hot-loader/root';
import { ReactQueryCacheProvider } from 'react-query';
import { BoclipsClient } from 'boclips-api-client';
import { ourQueryCache } from './hooks/api/queryCache';
import { BoclipsClientProvider } from './components/common/BoclipsClientProvider';

const SearchResultsView = lazy(
  () => import('./views/search/SearchResultsView'),
);
const HomeView = lazy(() => import('./views/home/HomeView'));

const CartView = lazy(() => import('src/views/cart/CartView'));

const OrdersView = lazy(() => import('src/views/orders/OrdersView'));

const OrderView = lazy(() => import('src/views/order/OrderView'));

const OrderConfirmationView = lazy(
  () => import('src/views/orders/orderConfirmation/OrderConfirmationView'),
);

interface AppOptions {
  apiClient: BoclipsClient;
}

const App = ({ apiClient }: AppOptions) => {
  console.log("SET UP", apiClient);
  return (
    <>
      <Switch>
        <ReactQueryCacheProvider queryCache={ourQueryCache}>
          <BoclipsClientProvider client={apiClient}>
            <Suspense fallback={<Loading />}>
              <Route exact path="/">
                <HomeView />
              </Route>
              <Route exact path="/videos">
                <SearchResultsView />
              </Route>
              <Route exact path="/cart">
                <CartView />
              </Route>
              <Route exact path="/orders">
                <OrdersView />
              </Route>
              <Route exact path="/orders/:id">
                <OrderView />
              </Route>
              <Route
                path="/order-confirmed"
                render={({ location }) => (
                  <OrderConfirmationView state={location?.state} />
                )}
              />
            </Suspense>
            <ReactQueryDevtools initialIsOpen={false} />
          </BoclipsClientProvider>
        </ReactQueryCacheProvider>
      </Switch>
    </>
  );
};

export default hot(App);
