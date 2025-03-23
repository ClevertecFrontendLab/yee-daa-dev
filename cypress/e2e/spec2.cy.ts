import { Paths } from '~/constants/path';
import { TOAST_MESSAGE } from '~/constants/toast';
import { CyTestId } from '~/cy-test-id';
import { API_BASE_URL } from '~/redux/api/constants';

//FIXME: убрать ссылки в финальном варианте тестов

const INPUT_OVER_100 = 'А'.repeat(101);

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

const validateField = (inputAlias, value, expectedError, submitAlias = '@submitButton') => {
    cy.get(inputAlias).clear().type(value);
    cy.get(submitAlias).click();
    cy.contains(expectedError).should('be.visible');
};

describe('sprint 4', () => {
    describe('sign in flow', () => {
        beforeEach(() => {
            cy.clearLocalStorage();
            cy.visit('/sign-in');
            cy.getByTestId(CyTestId.Auth.SignInForm).as('signInForm');
            cy.getByTestId(CyTestId.Auth.LoginInput).as('loginInput');
            cy.getByTestId(CyTestId.Auth.PasswordInput).as('passwordInput');
            cy.getByTestId(CyTestId.Auth.SubmitButton).as('submitButton');
        });

        it('should validate sign in form fields', () => {
            cy.get('@signInForm').within(() => {
                cy.get('@submitButton').click();
                cy.contains('Введите логин').should('be.visible');
                cy.contains('Введите пароль').should('be.visible');

                validateField('@loginInput', INPUT_OVER_100, 'Максимум 100 символов');

                cy.get('@loginInput').clear().type('login');

                validateField('@passwordInput', INPUT_OVER_100, 'Максимум 100 символов');
            });
        });

        it('should show password only while mouse is holding on visibility button', () => {
            cy.get('@signInForm').within(() => {
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
            });
        });

        it('should display error message for 401 invalid credentials', () => {
            cy.get('@signInForm').within(() => {
                fillSignInForm();

                interceptSignInRequest({
                    statusCode: 401,
                    delay: 2000,
                    alias: 'signInRequest401',
                });

                cy.get('@passwordInput').type('{enter}');
            });

            cy.getByTestId(CyTestId.AppLoader, { timeout: 2000 }).should('be.visible');
            cy.wait('@signInRequest401');

            cy.get(`[id*=${TOAST_MESSAGE.SignInToast[401].id}]`, { timeout: 2000 })
                .should('exist')
                .should('be.visible')
                .should('contain', TOAST_MESSAGE.SignInToast[401].title)
                .should('contain', TOAST_MESSAGE.SignInToast[401].description);
        });

        it('should display error modal for 500 server error', () => {
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
                .should('exist')
                .should('be.visible')
                .within(() => {
                    cy.contains('Вход не выполнен').should('be.visible');
                    cy.contains('Что-то пошло не так. Попробуйте еще раз').should('be.visible');

                    cy.getByTestId(CyTestId.Modal.CloseButton).click();
                });

            cy.getByTestId(CyTestId.Modal.SignInError.Root).should('not.exist');
        });

        it('should send new request on server error retry button', () => {
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

            cy.getByTestId(CyTestId.Modal.SignInError.Root, { timeout: 2000 }).within(() => {
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
            cy.contains('Главная').should('be.visible');
        });

        it('should navigate to main page on sign in success', () => {
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
            cy.contains('Главная').should('be.visible');
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

        describe('should validate sign up form fields', () => {
            describe('should validate step 1', () => {
                it('should validate first name field', () => {
                    cy.get('@signUpForm').within(() => {
                        cy.get('@lastNameInput').type('Петров');
                        cy.get('@emailInput').type('example@mail.com{enter}');
                        cy.contains('Введите имя').should('be.visible');

                        validateField(
                            '@firstNameInput',
                            'firstName',
                            'Должно начинаться с кириллицы А-Я',
                        );
                        validateField('@firstNameInput', INPUT_OVER_100, 'Максимум 100 символов');
                        validateField(
                            '@firstNameInput',
                            'Василий   -Ибн- Петр',
                            'Только кириллица А-Я, и "-"',
                        );
                        validateField(
                            '@firstNameInput',
                            '-Василий',
                            'Должно начинаться с кириллицы А-Я',
                        );
                        validateField(
                            '@firstNameInput',
                            'ВасилийEnglish',
                            'Только кириллица А-Я, и "-"',
                        );

                        cy.get('@firstNameInput').clear().type('  Василий   ');
                        cy.get('@submitButton').click();
                        cy.get('@firstNameInput').should('have.value', 'Василий');

                        cy.contains('Максимум 100 символов').should('not.exist');
                        cy.contains('Только кириллица А-Я, и "-"').should('not.exist');
                        cy.contains('Должно начинаться с кириллицы А-Я').should('not.exist');
                    });
                });

                it('should validate last name field', () => {
                    cy.get('@signUpForm').within(() => {
                        cy.get('@firstNameInput').type('Василий');
                        cy.get('@emailInput').type('example@mail.com{enter}');
                        cy.contains('Введите фамилию').should('be.visible');

                        validateField(
                            '@lastNameInput',
                            'lastName',
                            'Должно начинаться с кириллицы А-Я',
                        );
                        validateField('@lastNameInput', INPUT_OVER_100, 'Максимум 100 символов');
                        validateField(
                            '@lastNameInput',
                            '    Комаров   -Петров   ',
                            'Только кириллица А-Я, и "-"',
                        );
                        validateField(
                            '@lastNameInput',
                            '-Василий',
                            'Должно начинаться с кириллицы А-Я',
                        );
                        validateField(
                            '@lastNameInput',
                            'ВасилийEnglish',
                            'Только кириллица А-Я, и "-"',
                        );

                        cy.get('@lastNameInput').clear().type('  Петров   ');
                        cy.get('@submitButton').click();
                        cy.get('@lastNameInput').should('have.value', 'Петров');

                        cy.contains('Максимум 100 символов').should('not.exist');
                        cy.contains('Только кириллица А-Я, и "-"').should('not.exist');
                        cy.contains('Должно начинаться с кириллицы А-Я').should('not.exist');
                    });
                });

                it('should validate email field', () => {
                    cy.get('@signUpForm').within(() => {
                        cy.get('@firstNameInput').type('Василий');
                        cy.get('@lastNameInput').type('Петров{enter}');
                        cy.contains('Введите email').should('be.visible');

                        validateField('@emailInput', 'email', 'Введите корректный e-mail');
                        validateField('@emailInput', 'email@', 'Введите корректный e-mail');
                        validateField('@emailInput', 'email@mail', 'Введите корректный e-mail');
                        validateField(
                            '@emailInput',
                            'пример@mail.com',
                            'Введите корректный e-mail',
                        );
                        validateField(
                            '@emailInput',
                            'example@имейл.com',
                            'Введите корректный e-mail',
                        );
                        validateField('@emailInput', 'email@имейл.ру', 'Введите корректный e-mail');
                        validateField(
                            '@emailInput',
                            'email @имейл.ru',
                            'Введите корректный e-mail',
                        );
                        validateField('@emailInput', INPUT_OVER_100, 'Максимум 100 символов');

                        cy.get('@emailInput').clear().type('  example@mail.com   ');
                        cy.get('@submitButton').click();
                        cy.get('@emailInput').should('have.value', 'example@mail.com');

                        cy.contains('Введите корректный e-mail').should('not.exist');
                        cy.contains('Максимум 100 символов').should('not.exist');
                    });
                });
            });

            describe('should validate step 2', () => {
                beforeEach(() => {
                    cy.get('@firstNameInput').type('Василий');
                    cy.get('@lastNameInput').type('Петров');
                    cy.get('@emailInput').type('example@mail.com{enter}');

                    cy.getByTestId(CyTestId.Auth.LoginInput).as('loginInput');
                    cy.getByTestId(CyTestId.Auth.PasswordInput).as('passwordInput');
                    cy.getByTestId(CyTestId.Auth.RepeatPasswordInput).as('repeatPasswordInput');
                    cy.getByTestId(CyTestId.Auth.SubmitButton).as('submitButton');
                });

                it('should validate login field', () => {
                    cy.get('@signUpForm').within(() => {
                        cy.get('@passwordInput').type('Password123');
                        cy.get('@repeatPasswordInput').type('Password123{enter}');
                        cy.contains('Введите логин').should('be.visible');

                        validateField('@loginInput', 'logi', 'Не соответствует формату');
                        validateField('@loginInput', 'логин', 'Не соответствует формату');
                        validateField('@loginInput', 'log in', 'Не соответствует формату');
                        validateField('@loginInput', 'login<', 'Не соответствует формату');
                        validateField('@loginInput', 'login[', 'Не соответствует формату');
                        validateField('@loginInput', INPUT_OVER_100, 'Максимум 100 символов');

                        cy.get('@loginInput').clear().type('  login!@#$&_+-.   ');
                        cy.get('@submitButton').click();
                        cy.get('@emailInput').should('have.value', 'login!@#$&_+-.');

                        cy.contains('Не соответствует формату').should('not.exist');
                        cy.contains('Максимум 100 символов').should('not.exist');
                    });
                });

                it('should validate password field', () => {
                    cy.get('@signUpForm').within(() => {
                        cy.get('@loginInput').type('login!{enter}');
                        cy.contains('Введите пароль').should('be.visible');

                        validateField('@paswordInput', 'PerovVa', 'Не соответствует формату');
                        validateField('@paswordInput', 'perovvasia123', 'Не соответствует формату');
                        validateField('@paswordInput', 'PetrovVasia', 'Не соответствует формату');
                        validateField('@paswordInput', '12345678', 'Не соответствует формату');
                        validateField('@paswordInput', 'ПетровВася123', 'Не соответствует формату');
                        validateField('@paswordInput', 'ПетровВася123', 'Не соответствует формату');
                        validateField('@paswordInput', INPUT_OVER_100, 'Максимум 100 символов');

                        cy.get('@loginInput').clear().type('  PerovVasia123   ');
                        cy.get('@submitButton').click();
                        cy.get('@emailInput').should('have.value', 'PerovVasia123');

                        cy.contains('Не соответствует формату').should('not.exist');
                        cy.contains('Максимум 100 символов').should('not.exist');
                    });
                });
            });

            it('progress bar shows validation progress', () => {});
        });
    });
});
