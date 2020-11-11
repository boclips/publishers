import axios from 'axios';

import React, { lazy, Suspense, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ApiBoclipsClient } from 'boclips-api-client';
import { ReactQueryDevtools } from 'react-query-devtools';
import { Loading } from 'src/components/common/Loading';
import { hot } from 'react-hot-loader/root';
import HomeView from './views/home/HomeView';
import { ApiClientWrapper } from './services/apiClientWrapper';
import { Constants } from './AppConstants';

export const setupClient = () => {
  ApiClientWrapper.set(ApiBoclipsClient.create(axios, Constants.API_PREFIX));
};

const App = () => {
  useEffect(() => {
    setupClient();
  }, []);

  const SearchResultsView = lazy(
    () => import('./views/search/SearchResultsView'),
  );

  return (
    <>
      <Switch>
        <Route exact path="/">
          <HomeView />
        </Route>
        <Route path="/videos">
          <Suspense fallback={<Loading />}>
            <SearchResultsView />
          </Suspense>
        </Route>
      </Switch>
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
};

export default hot(App);
