declare namespace Cypress {
    interface Chainable {
        getByTestId(testId: string, options?: Parameters<typeof cy.get>[1]): Chainable;
    }
}
