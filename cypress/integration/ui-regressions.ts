import {
  FacetFactory,
  FacetsFactory,
} from 'boclips-api-client/dist/test-support/FacetsFactory';
import { SubjectFactory } from 'boclips-api-client/dist/test-support';
import { Subject } from 'boclips-api-client/dist/types';

context('UI Regression', () => {
  const endpoint = 'http://localhost:9000';

  it('has a homepage', () => {
    cy.visit(`${endpoint}/`);

    cy.percySnapshot('Home Page', {
      widths: [1280, 1440, 1680],
    });
  });

  it('renders account panel', () => {
    cy.visit(`${endpoint}/`);
    cy.get('[data-qa="account-menu"]').click();

    cy.percySnapshot('Account panel', {
      widths: [1280, 1440, 1680],
    });
  });

  it('should apply filters', () => {
    cy.visit(`${endpoint}/`);

    const biology: Subject = SubjectFactory.sample({
      id: 'biology-id',
      name: 'Biology and Environmental Science',
    });
    const geography: Subject = SubjectFactory.sample({
      id: 'geography-id',
      name: 'Geography and Earth Science',
    })

    cy .bo('create-fixture', 'video', biology, 'eel-sex');

    cy.bo('create', 'video', {
      title: 'Eel with DOUBLE JAWS has one Nasty Bite!',
      description:
        `On this episode, Mark and the crew are back in Queensland, Australia for another epic Tide Pool adventure!` +
        `As Mark explores, he comes across a Snowflake Eel - and this eel has double jaws.. and one nasty bite! ` +
        `What other creatures do you think they will come across along the Australian coast? Watch now to find out!`,
      subjects: [geography],
    });

    cy.bo(
      'set',
      'facets',
      FacetsFactory.sample({
        subjects: [
          FacetFactory.sample({
            id: biology.id,
            name: biology.name,
            hits: 1,
          }),
          FacetFactory.sample({
            id: geography.id,
            name: geography.name,
            hits: 1,
          }),
        ],
      }),
    );
    cy.bo('create', 'subject', geography);
    cy.bo('create', 'subject', biology);

    cy.get('[data-qa="search-input"]').type('eel');
    cy.get('button').contains('Search').click();

    cy.get('[data-qa="video-card-wrapper"]').should((videoCard) => {
      expect(videoCard.length).to.equal(2);
    });

    cy.percySnapshot('Search before filtering', {
      widths: [1280, 1440, 1680],
    });

    cy.get('label').contains(biology.name).click();
    cy.get('[data-qa="video-card-wrapper"]').should((videoCard) => {
      expect(videoCard.length).to.equal(1);
    });

    cy.percySnapshot('Search with filters', {
      widths: [1280, 1440, 1680],
    });
  });

  it('renders the cart and order flow', () => {
    cy.visit(`${endpoint}/`);

    cy.bo('create', 'cart');

    cy.get('[data-qa="cart-button"]').click();

    cy.percySnapshot('Cart view', {
      widths: [1280, 1440, 1680],
    });

    cy.get('button').contains('Place order').click();

    cy.percySnapshot('Order confirmation modal', {
      widths: [1280, 1440, 1680],
    });

    cy.get('button').contains('Confirm order').click();
    cy.wait(100);
    cy.get('button').contains('View order details').click();

    cy.percySnapshot('Order view', {
      widths: [1280, 1440, 1680],
    });
  });
});
