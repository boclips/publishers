context('UI Regression', () => {
  it('has a homepage', () => {
    cy.visit('http://localhost:9000/');

    cy.percySnapshot('Home Page', {
      widths: [1280, 1440, 1680],
    });
  });

  it('renders account panel', () => {
    cy.visit('http://localhost:9000/');

    cy.percySnapshot('Account panel', {
      widths: [1280, 1440, 1680],
    });
  });
});
