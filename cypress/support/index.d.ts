/// <reference types="cypress" />

// import { Bo } from '../../src/testSupport/bo';

type PathTree<T> = {
  [P in keyof T]: T[P] extends Record<string, unknown>
    ? [P?, ...Path<T[P]>]
    : [P?];
};

type Path<T> = PathTree<T>[keyof PathTree<T>];

declare namespace Cypress {
  type Bo = import('../../src/testSupport/bo').Bo;

  interface Chainable {
    bo<T extends keyof Bo, U extends keyof Bo[T], V extends keyof Bo[T][U]>(
      verb: T,
      noun: U,
      value?: V | any,
    );
  }
}
