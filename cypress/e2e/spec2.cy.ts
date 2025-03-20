import { Paths } from '~/constants/path';
import { TOAST_MESSAGE } from '~/constants/toast';
import { CyTestId } from '~/cy-test-id';
import { API_BASE_URL } from '~/redux/api/constants';

describe('Sprint 4', () => {
    describe('Sign in flow', () => {
        beforeEach(() => {
            cy.visit('/sign-in');
            cy.getByTestId(CyTestId.Auth.SignInForm).as('signInForm');
            cy.getByTestId(CyTestId.Auth.LoginInput).as('loginInput');
            cy.getByTestId(CyTestId.Auth.SubmitButton).as('submitButton');
            cy.getByTestId(CyTestId.Auth.PasswordInput).as('passwordInput');
        });

        it('Sign in 401 invalid credentials', () => {
            cy.get('@signInForm').within(() => {
                cy.get('@submitButton').click();
                cy.contains('Введите логин').should('exist');
                cy.contains('Введите пароль').should('exist');

                cy.get('@loginInput').type('username');
                cy.get('@passwordInput').type('password').should('have.attr', 'type', 'password');

                const passwordToggleVisibility = cy.getByTestId(
                    CyTestId.Auth.PasswordVisibilityButton,
                );

                passwordToggleVisibility.then(($toggle) => {
                    // Нажимаем и удерживаем
                    cy.wrap($toggle).trigger('mousedown');
                    cy.get('@passwordInput').should('have.attr', 'type', 'text');

                    cy.wait(1000);

                    // Отпускаем кнопку
                    cy.wrap($toggle).trigger('mouseup');
                    cy.get('@passwordInput').should('have.attr', 'type', 'password');
                });

                cy.intercept(
                    {
                        method: 'POST',
                        url: `${API_BASE_URL}${Paths.SIGN_IN}`,
                    },
                    {
                        statusCode: 401,
                    },
                ).as('signInRequest');

                cy.get('@passwordInput').type('{enter}');
                cy.wait('@signInRequest');
            });

            cy.get(`[id*=${TOAST_MESSAGE.signInError.id}]`)
                .should('exist')
                .should('be.visible')
                .should('contain', TOAST_MESSAGE.signInError.title)
                .should('contain', TOAST_MESSAGE.signInError.description);
        });
    });
});
