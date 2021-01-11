import React, { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ReactQueryDevtools } from 'react-query-devtools';
import { Loading } from 'src/components/common/Loading';
import { hot } from 'react-hot-loader/root';
import { ReactQueryCacheProvider } from 'react-query';
import { ourQueryCache } from './hooks/api/queryCache';
import { BoclipsClient } from 'boclips-api-client'

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
  apiClient: BoclipsClient
}

const App = (props: AppOptions) => {
  return (
    <>
      <Switch>
        <ReactQueryCacheProvider queryCache={ourQueryCache}>
          <Suspense fallback={<Loading />}>
            <Route exact path="/">
              <HomeView apiClient={props.apiClient} />
            </Route>
            <Route exact path="/videos">
              <SearchResultsView apiClient={props.apiClient} />
            </Route>
            <Route exact path="/cart">
              <CartView apiClient={props.apiClient} />
            </Route>
            <Route exact path="/orders">
              <OrdersView apiClient={props.apiClient} />
            </Route>
            <Route exact path="/orders/:id">
              <OrderView apiClient={props.apiClient} />
            </Route>
            <Route
              path="/order-confirmed"
              render={({ location }) => (
                <OrderConfirmationView state={location?.state} apiClient={props.apiClient} />
              )}
            />
          </Suspense>
          <ReactQueryDevtools initialIsOpen={false} />
        </ReactQueryCacheProvider>
      </Switch>
    </>
  );
};

export default hot(App);
