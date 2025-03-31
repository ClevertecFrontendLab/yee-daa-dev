/// <reference types="cypress" />

Cypress.Commands.add('getByTestId', (testId: string, options: Parameters<typeof cy.get>[1]) => {
    cy.get(`[data-test-id="${testId}"]`, options);
});

Cypress.on(
    'uncaught:exception',
    () => false, // Игнорируем ошибки приложения
);
