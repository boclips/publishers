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

  it('applies filters', () => {
    cy.visit(`${endpoint}/`);

    cy.bo('create', 'fixtureSet', 'eelsBiologyGeography');

    cy.get('[data-qa="search-input"]').type('eel');
    cy.get('button').contains('Search').click();

    cy.get('[data-qa="video-card-wrapper"]').should((videoCard) => {
      expect(videoCard.length).to.equal(2);
    });

    cy.percySnapshot('Search before filtering', {
      widths: [1280, 1440, 1680],
    });

    cy.get('label').contains('Biology').click();
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
