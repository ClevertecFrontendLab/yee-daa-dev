/// <reference types="cypress" />

Cypress.Commands.add('getByTestId', (testId: string) => {
    cy.get(`[data-test-id="${testId}"]`);
});
