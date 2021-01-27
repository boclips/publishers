import React, { lazy, Suspense, useEffect } from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { BoclipsClient } from 'boclips-api-client';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Loading } from 'src/components/common/Loading';
import { hot } from 'react-hot-loader/root';
import { QueryClient, QueryClientProvider } from 'react-query';
import { queryClientConfig } from 'src/hooks/api/queryClientConfig';
import { TrackPageRendered } from 'src/services/analytics/HttpBoclipsAnalytics';
import { BoclipsClientProvider } from './components/common/BoclipsClientProvider';

const SearchResultsView = lazy(
  () => import('./views/search/SearchResultsView'),
);
const HomeView = lazy(() => import('./views/home/HomeView'));

const CartView = lazy(() => import('src/views/cart/CartView'));

const OrdersView = lazy(() => import('src/views/orders/OrdersView'));

const OrderView = lazy(() => import('src/views/order/OrderView'));

const VideoView = lazy(() => import('src/views/video/VideoView'));

const OrderConfirmationView = lazy(
  () => import('src/views/orders/orderConfirmation/OrderConfirmationView'),
);

interface Props {
  apiClient: BoclipsClient;
}

const App = ({ apiClient }: Props) => {
  const history = useHistory();

  useEffect(() => {
    apiClient.events.trackPageRendered({
      url: `${window.location.host}${history.location.pathname}${history.location.search}`,
    });
  }, [apiClient, history]);

  return (
    <>
      <Switch>
        <BoclipsClientProvider client={apiClient}>
          <QueryClientProvider client={new QueryClient(queryClientConfig)}>
            <Suspense fallback={<Loading />}>
              <Route exact path="/">
                <HomeView />
              </Route>
              <Route exact path="/videos">
                <SearchResultsView />
              </Route>
              <Route exact path="/videos/:id">
                <VideoView />
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
          </QueryClientProvider>
        </BoclipsClientProvider>
      </Switch>
    </>
  );
};

export default hot(App);
