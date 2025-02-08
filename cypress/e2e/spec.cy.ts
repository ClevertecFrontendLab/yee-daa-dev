/// <reference types="cypress" />

describe('App Component', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000');
    });

    it('should take a screenshot of the app', () => {
        cy.screenshot('app-screenshot');
    });
});
