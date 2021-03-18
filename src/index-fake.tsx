import './main.less';

import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactDom from 'react-dom';
import { FakeBoclipsClient } from 'boclips-api-client/dist/test-support';
import BoclipsSecurity from 'boclips-js-security';
import { Bo, bo } from 'src/testSupport/bo';
import App from './App';

const apiClient = new FakeBoclipsClient();

ReactDom.render(
  <Router>
    <App apiClient={apiClient} />
  </Router>,
  document.getElementById('root'),
);

declare global {
  interface Window {
    bo: Bo;
  }
}

window.bo = bo(apiClient);

const authOptions = {
  realm: 'nonexistent-realm',
  clientId: 'bogus-client-id',
  requireLoginPage: false,
  authEndpoint: 'http://localhost:9000/',
  onLogin: async () => {},
};

BoclipsSecurity.createInstance(authOptions);
