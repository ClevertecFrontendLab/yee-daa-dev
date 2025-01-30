/// <reference types="cypress" />

describe('App Component', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000');
    });

    it('should increase the count when button is clicked', () => {
        cy.contains('count is 0');
        // Нажатие на кнопку
        cy.get('button').click();
        cy.contains('count is 1');
    });

    it('should take a screenshot of the app', () => {
        cy.screenshot('app-screenshot');
    });
});
