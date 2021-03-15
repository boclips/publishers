import './main.less';

import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactDom from 'react-dom';
import { FakeBoclipsClient } from 'boclips-api-client/dist/test-support';
import App from './App';

const apiClient = new FakeBoclipsClient();

ReactDom.render(
  <Router>
    <App apiClient={apiClient} />
  </Router>,
  document.getElementById('root'),
);
