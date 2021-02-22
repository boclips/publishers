import './main.less';

import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactDom from 'react-dom';
import BoclipsSecurity from 'boclips-js-security';
import { ApiBoclipsClient } from 'boclips-api-client';
import axios from 'axios';
import { ExtraErrorData } from '@sentry/integrations';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import App from './App';
import { Constants } from './AppConstants';

if (process.env.NODE_ENV === 'production') {
  const sentryRelease = process.env.SENTRY_RELEASE;

  Sentry.init({
    release: sentryRelease,
    dsn:
      'https://50de7aa7ec43491d9c7140376d0bf128@o236297.ingest.sentry.io/5633299',
    integrations: [new Integrations.BrowserTracing(), new ExtraErrorData()],
    tracesSampleRate: 1.0,
    blacklistUrls: [
      // Chrome extensions
      /extensions\//i,
      /^chrome:\/\//i,
    ],
  });
}

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
