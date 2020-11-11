import axios from 'axios';

import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ApiBoclipsClient } from 'boclips-api-client';
import { ReactQueryDevtools } from 'react-query-devtools';
import HomeView from './views/home/HomeView';
import SearchResultsView from './views/search/SearchResultsView';
import { ApiClientWrapper } from './services/apiClientWrapper';
import { Constants } from './AppConstants';

export const setupClient = () => {
  ApiClientWrapper.set(ApiBoclipsClient.create(axios, Constants.API_PREFIX));
};

const App = () => {
  useEffect(() => {
    setupClient();
  }, []);

  return (
    <>
      <Switch>
        <Route exact path="/">
          <HomeView />
        </Route>
        <Route path="/videos">
          <SearchResultsView />
        </Route>
      </Switch>
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
};

export default App;
