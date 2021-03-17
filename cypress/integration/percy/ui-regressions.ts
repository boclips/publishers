context('UI Regression', () => {
  it('has a homepage', () => {
    cy.visit('http://localhost:9000/');

    cy.findByText('What videos do you need today?');

    cy.percySnapshot('Home Page', {
      widths: [1280, 1440, 1680],
    });
  });

  it('renders account panel', () => {
    cy.visit('http://localhost:9000/');

    cy.findByText('Account').click();
    cy.findByText('Your orders');

    cy.percySnapshot('Account panel', {
      widths: [1280, 1440, 1680],
    });
  });
});
