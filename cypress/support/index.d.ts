/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    bo(verb: string, noun: string, value?: string): Chainable<Element>;
  }
}
