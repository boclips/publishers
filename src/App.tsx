import React, { lazy, Suspense, useEffect } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { BoclipsClient } from 'boclips-api-client';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Loading } from 'src/components/common/Loading';
import { hot } from 'react-hot-loader/root';
import { QueryClient, QueryClientProvider } from 'react-query';
import { queryClientConfig } from 'src/hooks/api/queryClientConfig';
import { trackPageRendered } from 'src/components/common/analytics/Analytics';
import { AnalyticsService } from 'src/services/analytics/AnalyticsService';
import AnalyticsFactory from 'src/services/analytics/AnalyticsFactory';
import { AppcuesEvent } from 'src/types/AppcuesEvent';
import { BoclipsClientProvider } from './components/common/BoclipsClientProvider';
import Appcues from './services/analytics/Appcues';

declare global {
  interface Window {
    Appcues: Appcues;
  }
}

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

const ErrorView = lazy(() => import('src/views/error/ErrorView'));

interface Props {
  apiClient: BoclipsClient;
  reactQueryClient?: QueryClient;
}
const analyticsService = new AnalyticsService(window.Appcues);
const queryClient = new QueryClient(queryClientConfig);

const App = ({ apiClient, reactQueryClient = queryClient }: Props) => {
  const currentLocation = useLocation();

  apiClient.users
    .getCurrentUser()
    .then((user) =>
      analyticsService.identify({
        email: user.email,
        firstName: user.firstName,
        id: user.id,
      }),
    )
    .then(() => {
      AnalyticsFactory.getAppcues().sendEvent(AppcuesEvent.LOGGED_IN);
    });

  useEffect(() => {
    trackPageRendered(currentLocation, apiClient);
    analyticsService.pageChanged();
  }, [currentLocation, apiClient]);

  return (
    <QueryClientProvider client={reactQueryClient}>
      <Switch>
        <BoclipsClientProvider client={apiClient}>
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
              exact
              path="/error"
              render={({ location }) => (
                <ErrorView error={location?.state.error} />
              )}
            />
            <Route
              path="/order-confirmed"
              render={({ location }) => (
                <OrderConfirmationView state={location?.state} />
              )}
            />
          </Suspense>
          <ReactQueryDevtools initialIsOpen={false} />
        </BoclipsClientProvider>
      </Switch>
    </QueryClientProvider>
  );
};

export default hot(App);
