import {
  FacetFactory,
  FacetsFactory,
} from 'boclips-api-client/dist/test-support/FacetsFactory';
import { SubjectFactory } from 'boclips-api-client/dist/test-support';

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

    cy.bo('create', 'video', {
      title: 'orangutans doing maths',
      subjects: [SubjectFactory.sample({ id: 'maths-id', name: 'maths' })],
    });
    cy.bo('create', 'video', {
      title: 'orangutans speaking english',
      subjects: [SubjectFactory.sample({ id: 'english-id', name: 'english' })],
    });
    cy.bo(
      'set',
      'facets',
      FacetsFactory.sample({
        subjects: [
          FacetFactory.sample({ id: 'maths-id', name: 'maths', hits: 10 }),
          FacetFactory.sample({ id: 'english-id', name: 'english', hits: 10 }),
        ],
      }),
    );
    cy.bo(
      'create',
      'subject',
      SubjectFactory.sample({ name: 'english', id: 'english-id' }),
    );
    cy.bo(
      'create',
      'subject',
      SubjectFactory.sample({ name: 'maths', id: 'maths-id' }),
    );

    cy.get('[data-qa="search-input"]').type('orangutans');
    cy.get('button').contains('Search').click();

    cy.get('[data-qa="video-card-wrapper"]').should((videoCard) => {
      expect(videoCard.length).to.equal(2);
    });

    cy.percySnapshot('Search before filtering', {
      widths: [1280, 1440, 1680],
    });

    cy.get('label').contains('maths').click();
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
