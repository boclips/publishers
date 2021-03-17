context('UI Regression', () => {
  it('has a homepage', () => {
    cy.visit('http://localhost:9000/');

    cy.get('.grid').should('be.visible');

    cy.percySnapshot('Home Page', {
      widths: [1280, 1440, 1680],
    });
  });
});
