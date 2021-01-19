/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

module.exports = (on, config) => {
  console.log(config); // see what all is in here!

  // modify config values
  config.defaultCommandTimeout = 10000;
  config.baseUrl = 'https://vidoes.staging-boclips.com';

  // modify env var value
  config.env.ENVIRONMENT = 'staging';

  // return config
  return config;
};
