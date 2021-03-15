import './main.less';

import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactDom from 'react-dom';
import { FakeBoclipsClient } from 'boclips-api-client/dist/test-support';
import BoclipsSecurity from 'boclips-js-security';
import App from './App';
import { Constants } from './AppConstants';

const authOptions = {
  realm: 'boclips',
  clientId: 'boclips-web-app',
  requireLoginPage: true,
  authEndpoint: Constants.AUTH_ENDPOINT,
  onLogin: async () => {
    const apiClient = new FakeBoclipsClient();

    ReactDom.render(
      <Router>
        <App apiClient={apiClient} />
      </Router>,
      document.getElementById('root'),
    );
  },
};

BoclipsSecurity.createInstance(authOptions);
