context('UI Regression', () => {
  const endpoint = 'http://localhost:9000'

  it('has a homepage', () => {
    cy.visit(`${endpoint}/`);

    cy.percySnapshot('Home Page', {
      widths: [1280, 1440, 1680],
    });
  });

  it('renders account panel', () => {
    cy.visit(`${endpoint}/`);

    cy.percySnapshot('Account panel', {
      widths: [1280, 1440, 1680],
    });
  });
});
