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

    cy.percySnapshot('Account panel', {
      widths: [1280, 1440, 1680],
    });
  });

  it('renders the search results page', () => {
    cy.visit(`${endpoint}/`);
    cy.bo().create().video({ title: 'orangutans' });

    cy.get('[data-qa="search-input"]').type('orangutans');
    cy.get('button').contains('Search').click();

    cy.get('[data-qa="video-card-wrapper"]').should((videoCard) => {
      expect(videoCard.length).to.be.at.least(1);
    });
  });

  it('should apply filters', () => {
    cy.visit(`${endpoint}/`);
    cy.bo().create().video({ title: 'orangutans' });
    cy.bo().create().video({ title: 'orangutans' });

    // .search(searchTerm)
    // .applyFilters('Up to 1 min');

    cy.get('[data-qa="video-card-wrapper"]').should((videoCard) => {
      expect(videoCard.length).to.be.at.least(1);
    });

    cy.get('#hs-eu-confirmation-button').click();

    cy.percySnapshot('Search with filters', {
      widths: [1280, 1440, 1680],
      percyCSS: '.plyr__video-wrapper { display: none!important; }',
    });
  });
});
