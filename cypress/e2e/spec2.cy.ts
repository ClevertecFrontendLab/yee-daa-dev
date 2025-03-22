import { Paths } from '~/constants/path';
import { TOAST_MESSAGE } from '~/constants/toast';
import { CyTestId } from '~/cy-test-id';
import { API_BASE_URL } from '~/redux/api/constants';

const interceptSignInRequest = ({
    statusCode,
    body = {},
    delay = 1000,
    alias = 'signInRequest',
}) => {
    cy.intercept(
        {
            method: 'POST',
            url: `${API_BASE_URL}${Paths.SIGN_IN}`,
        },
        {
            statusCode,
            body,
            delay,
        },
    ).as(alias);
};

const fillSignInForm = (login = 'username', password = 'password') => {
    cy.getByTestId(CyTestId.Auth.LoginInput).type(login);
    cy.getByTestId(CyTestId.Auth.PasswordInput).type(password);
};

describe('Sprint 4', () => {
    describe('Sign in flow', () => {
        beforeEach(() => {
            cy.clearLocalStorage();
            cy.visit('/sign-in');
            cy.getByTestId(CyTestId.Auth.SignInForm).as('signInForm');
            cy.getByTestId(CyTestId.Auth.LoginInput).as('loginInput');
            cy.getByTestId(CyTestId.Auth.PasswordInput).as('passwordInput');
            cy.getByTestId(CyTestId.Auth.SubmitButton).as('submitButton');
        });

        it('Sign in 401 invalid credentials', () => {
            cy.get('@signInForm').within(() => {
                cy.get('@submitButton').click();
                cy.contains('Введите логин').should('exist');
                cy.contains('Введите пароль').should('exist');

                fillSignInForm();

                cy.get('@passwordInput').should('have.attr', 'type', 'password');

                const passwordToggleVisibility = cy.getByTestId(
                    CyTestId.Auth.PasswordVisibilityButton,
                );

                passwordToggleVisibility.then(($toggle) => {
                    cy.wrap($toggle).trigger('mousedown');
                    cy.get('@passwordInput').should('have.attr', 'type', 'text');
                    cy.wrap($toggle).trigger('mouseup');
                    cy.get('@passwordInput').should('have.attr', 'type', 'password');
                });

                interceptSignInRequest({
                    statusCode: 401,
                    delay: 2000,
                    alias: 'signInRequest401',
                });

                cy.get('@passwordInput').type('{enter}');
            });

            cy.getByTestId(CyTestId.AppLoader, { timeout: 2000 }).should('be.visible');
            cy.wait('@signInRequest401');

            cy.get(`[id*=${TOAST_MESSAGE.signInError.id}]`, { timeout: 2000 })
                .should('exist')
                .should('be.visible')
                .should('contain', TOAST_MESSAGE.signInError.title)
                .should('contain', TOAST_MESSAGE.signInError.description);
        });

        it('Sign in 500 server error', () => {
            interceptSignInRequest({
                statusCode: 500,
                delay: 1000,
                alias: 'signInRequest500',
            });

            cy.get('@signInForm').within(() => {
                fillSignInForm();

                cy.get('@passwordInput').type('{enter}');
            });

            cy.getByTestId(CyTestId.AppLoader).should('be.visible');
            cy.wait('@signInRequest500');

            cy.getByTestId(CyTestId.Modal.SignInError.Root, { timeout: 2000 })
                .as('SignInErrorModal')
                .should('exist')
                .should('be.visible')
                .within(() => {
                    cy.contains('Вход не выполнен').should('exist');
                    cy.contains('Что-то пошло не так. Попробуйте еще раз').should('exist');

                    cy.getByTestId(CyTestId.Modal.CloseButton).click();
                });

            cy.getByTestId(CyTestId.Modal.SignInError.Root).should('not.exist');

            cy.get('@signInForm').within(() => {
                cy.get('@passwordInput').type('{enter}');
            });

            cy.getByTestId(CyTestId.AppLoader).should('be.visible');
            cy.wait('@signInRequest500');

            cy.get('@SignInErrorModal', { timeout: 2000 }).within(() => {
                interceptSignInRequest({
                    statusCode: 200,
                    body: {
                        accessToken: 'accessToken',
                        refreshToken: 'refreshToken',
                    },
                    delay: 1000,
                    alias: 'signInRequest200',
                });

                cy.getByTestId(CyTestId.Modal.SignInError.RepeatButton).click();
            });

            cy.getByTestId(CyTestId.AppLoader, { timeout: 2000 }).should('be.visible');
            cy.wait('@signInRequest200');
            cy.getByTestId(CyTestId.Breadcrumbs).should('be.visible');
            cy.contains('Главная').should('exist');
        });

        it('Sign in 200 success', () => {
            interceptSignInRequest({
                statusCode: 200,
                delay: 1000,
                alias: 'signInRequest200',
            });

            cy.get('@signInForm').within(() => {
                fillSignInForm();

                cy.get('@passwordInput').type('{enter}');
            });

            cy.getByTestId(CyTestId.AppLoader, { timeout: 2000 }).should('be.visible');
            cy.wait('@signInRequest200');
            cy.getByTestId(CyTestId.Breadcrumbs).should('exist');
            cy.contains('Главная').should('exist');
        });
    });

    describe('Sign up flow', () => {
        beforeEach(() => {
            cy.clearLocalStorage();
            cy.visit('/sign-in');

            cy.contains('Регистрация').click();

            cy.reload();

            cy.getByTestId(CyTestId.Auth.SignUpProgress).as('signUpProgress');
            cy.getByTestId(CyTestId.Auth.SignUpForm, { timeout: 2000 }).as('signUpForm');
            cy.getByTestId(CyTestId.Auth.FirstNameInput).as('firstNameInput');
            cy.getByTestId(CyTestId.Auth.LastNameInput).as('lastNameInput');
            cy.getByTestId(CyTestId.Auth.EmailInput).as('emailInput');
            cy.getByTestId(CyTestId.Auth.SubmitButton).as('submitButton');
        });

        it('Sign up validation', () => {
            cy.get('@signUpForm').within(() => {
                cy.get('@firstNameInput').type('{enter}');

                cy.contains('Введите фамилию').should('exist');
                cy.contains('Введите имя').should('exist');
                cy.contains('Введите email').should('exist');

                cy.get('@firstNameInput').type('firstName');
                cy.get('@lastNameInput').type('lastName');

                cy.get(':contains("Должно начинаться с кириллицы А-Я")').should(
                    'have.length.at.least',
                    2,
                );
            });

            cy.get('@signUpProgress').within(() => {
                cy.get('[aria-valuenow=0]').should('exist');
            });

            cy.get('@signUpForm').within(() => {});
        });
    });
});
