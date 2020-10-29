import './main.css';

import React from 'react';
import ReactDom from 'react-dom';
import HomeView from 'src/views/HomeView';
import BoclipsSecurity from 'boclips-js-security';
import { Constants } from './AppConstants';

const authOptions = {
  realm: 'boclips',
  clientId: 'publishers',
  requireLoginPage: true,
  authEndpoint: Constants.AUTH_ENDPOINT,
  onLogin: () => {
    ReactDom.render(<HomeView />, document.getElementById('root'));
  },
};

BoclipsSecurity.createInstance(authOptions);
