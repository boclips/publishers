import axios from 'axios';

import React, { lazy, Suspense, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ApiBoclipsClient } from 'boclips-api-client';
import { ReactQueryDevtools } from 'react-query-devtools';
import { Loading } from 'src/components/common/Loading';
import { hot } from 'react-hot-loader/root';
import { ReactQueryCacheProvider } from 'react-query';
import { ApiClientWrapper } from './services/apiClientWrapper';
import { Constants } from './AppConstants';
import { ourQueryCache } from './hooks/api/queryCache';

export const setupClient = () => {
  ApiClientWrapper.set(ApiBoclipsClient.create(axios, Constants.API_PREFIX));
};

const SearchResultsView = lazy(
  () => import('./views/search/SearchResultsView'),
);
const HomeView = lazy(() => import('./views/home/HomeView'));

const CartView = lazy(() => import('src/views/cart/CartView'));

const OrdersView = lazy(() => import('src/views/orders/OrdersView'));

const App = () => {
  useEffect(() => {
    setupClient();
  }, []);

  return (
    <>
      <Switch>
        <ReactQueryCacheProvider queryCache={ourQueryCache}>
          <Suspense fallback={<Loading />}>
            <Route exact path="/">
              <HomeView />
            </Route>
            <Route path="/videos">
              <SearchResultsView />
            </Route>
            <Route path="/cart">
              <CartView />
            </Route>
            <Route path="/orders">
              <OrdersView />
            </Route>
          </Suspense>
          <ReactQueryDevtools initialIsOpen={false} />
        </ReactQueryCacheProvider>
      </Switch>
    </>
  );
};

export default hot(App);
