import './main.less';

import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactDom from 'react-dom';
import BoclipsSecurity from 'boclips-js-security';
import { ApiBoclipsClient } from 'boclips-api-client';
import axios from 'axios';
import App from './App';
import { Constants } from './AppConstants';

const authOptions = {
  realm: 'boclips',
  clientId: 'boclips-web-app',
  requireLoginPage: true,
  authEndpoint: Constants.AUTH_ENDPOINT,
  onLogin: async () => {
    ReactDom.render(
      <Router>
        <App
          apiClient={await ApiBoclipsClient.create(axios, Constants.API_PREFIX)}
        />
      </Router>,
      document.getElementById('root'),
    );
  },
};

BoclipsSecurity.createInstance(authOptions);
