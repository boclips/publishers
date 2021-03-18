// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
import '@percy/cypress';
import { VideoFacets } from 'boclips-api-client/dist/sub-clients/videos/model/VideoFacets';
import { Subject } from 'boclips-api-client/dist/sub-clients/subjects/model/Subject';

Cypress.Commands.add('bo', {}, () => {
  cy.window().then(({ bo }) => {
    return bo;
  });
});

Cypress.Commands.add('create', { prevSubject: true }, (bo) => {
  return bo.create;
});

Cypress.Commands.add('setFacets', (facets: Partial<VideoFacets>) => {
  cy.window().then(({ bo }) => {
    bo.set.facets(facets);
  });
});

Cypress.Commands.add('createSubject', (subject: Subject) => {
  cy.window().then(({ bo }) => {
    bo.create.subject(subject);
  });
});

Cypress.Commands.add('video', { prevSubject: true }, (create, attrs) => {
  create.video(attrs);
});
