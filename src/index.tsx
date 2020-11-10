import './main.less';

import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactDom from 'react-dom';
import BoclipsSecurity from 'boclips-js-security';
import App from './App';
import { Constants } from './AppConstants';

const authOptions = {
  realm: 'boclips',
  clientId: 'publishers',
  requireLoginPage: true,
  authEndpoint: Constants.AUTH_ENDPOINT,
  onLogin: () => {
    ReactDom.render(
      <Router>
        <App />
      </Router>,
      document.getElementById('root'),
    );
  },
};

BoclipsSecurity.createInstance(authOptions);
