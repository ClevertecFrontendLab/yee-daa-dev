import { TOAST_MESSAGE } from '~/constants/toast';
import { CyTestId } from '~/cy-test-id';
import { API_BASE_URL, ApiEndpoints } from '~/redux/api/constants';

//FIXME: убрать ссылки в финальном варианте тестов
const VERIFICATION_CODE_PIN_ID = [1, 2, 3, 4, 5, 6];
const INPUT_OVER_100 = 'А'.repeat(101);

//FIXME: проверять intercept body, прокидывать в тело строки типа "     login     " и проверять, что в запросе они приходят без пробелов
// cy.wait('@sendVerificationCode200').then((interception) => {
//     expect(interception.request.body).to.deep.equal({
//         email: 'test@example.com',
//         action: 'send-code',
//     });
// });

const interceptSignInRequest = ({
    statusCode,
    body = {},
    delay = 1000,
    alias = 'signInRequest',
    expectedBody = null,
}) => {
    cy.intercept(
        {
            method: 'POST',
            url: `${API_BASE_URL}${ApiEndpoints.SignIn}`,
        },
        {
            statusCode,
            body,
            delay,
        },
    ).as(alias);

    if (expectedBody) {
        return () =>
            cy.wait(`@${alias}`).then((interception) => {
                expect(interception.request.body).to.deep.equal(expectedBody);
            });
    }

    return () => cy.wait(`@${alias}`);
};

const interceptSignUpRequest = ({
    statusCode,
    body = {},
    delay = 1000,
    alias = 'signInRequest',
    expectedBody = null,
}) => {
    cy.intercept(
        {
            method: 'POST',
            url: `${API_BASE_URL}${ApiEndpoints.SignUp}`,
        },
        {
            statusCode,
            body,
            delay,
        },
    ).as(alias);

    if (expectedBody) {
        return () =>
            cy.wait(`@${alias}`).then((interception) => {
                expect(interception.request.body).to.deep.equal(expectedBody);
            });
    }

    return () => cy.wait(`@${alias}`);
};

const interceptSendCodeRequest = ({
    statusCode,
    body = {},
    delay = 1000,
    alias = 'sendVerificationCode',
    expectedBody = null,
}) => {
    cy.intercept(
        {
            method: 'POST',
            url: `${API_BASE_URL}${ApiEndpoints.SendVerificationCode}`,
        },
        {
            statusCode,
            body,
            delay,
        },
    ).as(alias);

    if (expectedBody) {
        return () =>
            cy.wait(`@${alias}`).then((interception) => {
                expect(interception.request.body).to.deep.equal(expectedBody);
            });
    }

    return () => cy.wait(`@${alias}`);
};

const interceptCheckCodeRequest = ({
    statusCode,
    body = {},
    delay = 1000,
    alias = 'checkVerificationCode',
    expectedBody = null,
}) => {
    cy.intercept(
        {
            method: 'POST',
            url: `${API_BASE_URL}${ApiEndpoints.CheckVerificationCode}`,
        },
        {
            statusCode,
            body,
            delay,
        },
    ).as(alias);

    if (expectedBody) {
        return () =>
            cy.wait(`@${alias}`).then((interception) => {
                expect(interception.request.body).to.deep.equal(expectedBody);
            });
    }

    return () => cy.wait(`@${alias}`);
};

const interceptResetCredentialsRequest = ({
    statusCode,
    body = {},
    delay = 1000,
    alias = 'restoreCredentials',
    expectedBody = null,
}) => {
    cy.intercept(
        {
            method: 'POST',
            url: `${API_BASE_URL}${ApiEndpoints.ResetCredentials}`,
        },
        {
            statusCode,
            body,
            delay,
        },
    ).as(alias);

    if (expectedBody) {
        return () =>
            cy.wait(`@${alias}`).then((interception) => {
                expect(interception.request.body).to.deep.equal(expectedBody);
            });
    }

    return () => cy.wait(`@${alias}`);
};

const checkAppLoader = () => {
    cy.getByTestId(CyTestId.AppLoader, { timeout: 2000 }).should('be.visible');
};

const fillSignInForm = (login = 'username', password = 'password') => {
    cy.getByTestId(CyTestId.Auth.LoginInput).type(login);
    cy.getByTestId(CyTestId.Auth.PasswordInput).type(password);
};

const fillPersonalInfoForm = () => {
    cy.getByTestId(CyTestId.Auth.FirstNameInput).type('Василий');
    cy.getByTestId(CyTestId.Auth.LastNameInput).type('Петров');
    cy.getByTestId(CyTestId.Auth.EmailInput).type('example@mail.com');
};

const fillCredentialsForm = () => {
    cy.getByTestId(CyTestId.Auth.LoginInput).type('login!');
    cy.getByTestId(CyTestId.Auth.PasswordInput).type('PetrovVasiliy123');
    cy.getByTestId(CyTestId.Auth.RepeatPasswordInput).type('PetrovVasiliy123');
};

const fillSignUpForm = () => {
    cy.getByTestId(CyTestId.Auth.SignUpForm).within(() => {
        fillPersonalInfoForm();
    });

    cy.getByTestId(CyTestId.Auth.SubmitButton).click();

    cy.getByTestId(CyTestId.Auth.SignUpForm).within(() => {
        fillCredentialsForm();
    });
};

const validateField = (inputAlias, value, expectedError, submitAlias = '@submitButton') => {
    cy.get(inputAlias).clear().type(value);
    cy.get(submitAlias).click();
    cy.contains(expectedError).should('be.visible');
};

const validateEmailField = () => {
    cy.getByTestId(CyTestId.Auth.EmailInput).as('emailInput').type('{enter}');
    cy.contains('Введите email').should('be.visible');

    validateField('@emailInput', 'email', 'Введите корректный e-mail');
    validateField('@emailInput', 'email@', 'Введите корректный e-mail');
    validateField('@emailInput', 'email@mail', 'Введите корректный e-mail');
    validateField('@emailInput', 'пример@mail.com', 'Введите корректный e-mail');
    validateField('@emailInput', 'example@имейл.com', 'Введите корректный e-mail');
    validateField('@emailInput', 'email@имейл.ру', 'Введите корректный e-mail');
    validateField('@emailInput', 'email @имейл.ru', 'Введите корректный e-mail');
    validateField('@emailInput', INPUT_OVER_100, 'Максимум 100 символов');

    cy.get('@emailInput').clear().type('  example@mail.com   ').blur();
    cy.get('@emailInput').should('have.value', 'example@mail.com');
};

const validateLoginField = () => {
    cy.getByTestId(CyTestId.Auth.LoginInput).as('loginInput');
    cy.getByTestId(CyTestId.Auth.PasswordInput).as('passwordInput').type('Password123{enter}');
    cy.contains('Введите логин').should('be.visible');

    validateField('@loginInput', 'logi', 'Не соответствует формату');
    validateField('@loginInput', 'логин', 'Не соответствует формату');
    validateField('@loginInput', 'log in', 'Не соответствует формату');
    validateField('@loginInput', 'login<', 'Не соответствует формату');
    validateField('@loginInput', INPUT_OVER_100, 'Максимум 100 символов');

    cy.get('@loginInput').clear().type('  login!@#$&_+-.   ').blur();
    cy.get('@loginInput').should('have.value', 'login!@#$&_+-.');

    cy.get('@submitButton').click();
    cy.contains('Не соответствует формату').should('not.exist');
    cy.contains('Максимум 100 символов').should('not.exist');

    cy.get('@loginInput').clear();
    cy.get('@passwordInput').clear();
};

const validatePasswordField = () => {
    cy.getByTestId(CyTestId.Auth.PasswordInput).as('passwordInput');
    cy.getByTestId(CyTestId.Auth.LoginInput).type('login!{enter}');
    cy.contains('Введите пароль').should('be.visible');

    validateField('@passwordInput', 'PerovVa', 'Не соответствует формату');
    validateField('@passwordInput', 'perovvasia123', 'Не соответствует формату');
    validateField('@passwordInput', 'PetrovVasia', 'Не соответствует формату');
    validateField('@passwordInput', '12345678', 'Не соответствует формату');
    validateField('@passwordInput', 'ПетровВася123', 'Не соответствует формату');
    validateField('@passwordInput', 'Perov Vasia123', 'Не соответствует формату');
    validateField('@passwordInput', 'PetrovVasia123<', 'Не соответствует формату');
    validateField('@passwordInput', INPUT_OVER_100, 'Максимум 100 символов');

    cy.get('@passwordInput').clear().type('PerovVasia123!@#$&_+-.');
    cy.get('@submitButton').click();
    cy.contains('Не соответствует формату').should('not.exist');
    cy.contains('Максимум 100 символов').should('not.exist');

    cy.get('@loginInput').clear();
    cy.get('@passwordInput').clear();
};

const validateConfirmPasswordField = () => {
    cy.getByTestId(CyTestId.Auth.RepeatPasswordInput).as('repeatPasswordInput');
    cy.getByTestId(CyTestId.Auth.PasswordInput).type('PerovVasia123{enter}');
    cy.contains('Повторите пароль').should('be.visible');

    validateField('@repeatPasswordInput', 'PerovVasia', 'Пароли должны совпадать');

    cy.get('@repeatPasswordInput').clear().type('PerovVasia123');
    cy.get('@submitButton').click();
    cy.contains('Пароли должны совпадать').should('not.exist');
};

const goToCheckVerificationCode = () => {
    const wait = interceptSendCodeRequest({
        statusCode: 200,
        delay: 2000,
        alias: 'sendVerificationCode200',
    });

    cy.wait(300);
    cy.getByTestId(CyTestId.Modal.RestoreCredentialsEmailModal.Root).within(() => {
        cy.getByTestId(CyTestId.Auth.EmailInput).type('example@mail.com{enter}');
    });

    wait();
};

const goToRestoreCredentialsForm = () => {
    goToCheckVerificationCode();

    const wait = interceptCheckCodeRequest({
        statusCode: 200,
        delay: 2000,
        alias: 'checkVerificationCode200',
    });

    cy.wait(300);
    cy.getByTestId(CyTestId.Modal.VerificationCodeModal.Root, { timeout: 2000 }).within(() => {
        cy.getByTestId(`${CyTestId.Auth.VerificationCodeInput}-1`).type('123456');
    });

    wait();
};

describe('sprint 4', () => {
    beforeEach(() => {
        cy.clearLocalStorage();
        cy.clearAllSessionStorage();
    });

    describe('sign in flow', () => {
        beforeEach(() => {
            //FIXME: убрать роутирование в финальном варианте тестов
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

                cy.get('@loginInput').clear().type('    login   ').blur();
                cy.get('@loginInput').should('have.value', 'login');
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

            checkAppLoader();
            cy.wait('@signInRequest401');
            cy.get('@passwordInput').type('{enter}');
            cy.wait('@signInRequest401');

            cy.get(`[id=toast-${TOAST_MESSAGE.SignInToast[401].id}]`, { timeout: 2000 })
                .should('have.length', 1)
                .should('exist')
                .should('be.visible')
                .should('contain', TOAST_MESSAGE.SignInToast[401].title)
                .should('contain', TOAST_MESSAGE.SignInToast[401].description);
        });

        it('should display error message for 403 email is not verified', () => {
            cy.get('@signInForm').within(() => {
                fillSignInForm();

                interceptSignInRequest({
                    statusCode: 403,
                    delay: 2000,
                    alias: 'signInRequest403',
                });

                cy.get('@passwordInput').type('{enter}');
            });

            checkAppLoader();
            cy.wait('@signInRequest403');
            cy.get('@passwordInput').type('{enter}');
            cy.wait('@signInRequest403');

            cy.get(`[id=toast-${TOAST_MESSAGE.SignInToast[403].id}]`, { timeout: 2000 })
                .should('have.length', 1)
                .should('exist')
                .should('be.visible')
                .should('contain', TOAST_MESSAGE.SignInToast[403].title)
                .should('contain', TOAST_MESSAGE.SignInToast[403].description);
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

            cy.wait(300);
            cy.getByTestId(CyTestId.Modal.SignInError.Root, { timeout: 2000 })
                .should('exist')
                .should('be.visible')
                .within(() => {
                    cy.contains('Вход не выполнен').should('be.visible');
                    cy.contains('Что-то пошло не так.').should('be.visible');
                    cy.contains('Попробуйте еще раз').should('be.visible');

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

            cy.wait(300);
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

            checkAppLoader();
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

            checkAppLoader();
            cy.wait('@signInRequest200');
            cy.getByTestId(CyTestId.Breadcrumbs).should('exist');
            cy.contains('Главная').should('be.visible');
        });
    });

    describe('sign up flow', () => {
        beforeEach(() => {
            //FIXME: убрать роутирование в финальном варианте тестов
            cy.visit('/sign-in');

            cy.contains('Регистрация').click();

            cy.reload();

            cy.getByTestId(CyTestId.Auth.SignUpProgress).as('signUpProgress');
            cy.getByTestId(CyTestId.Auth.SignUpForm).as('signUpForm');
            cy.getByTestId(CyTestId.Auth.FirstNameInput).as('firstNameInput');
            cy.getByTestId(CyTestId.Auth.LastNameInput).as('lastNameInput');
            cy.getByTestId(CyTestId.Auth.EmailInput).as('emailInput');
            cy.getByTestId(CyTestId.Auth.SubmitButton).as('submitButton');
        });

        describe('should validate sign up form fields', () => {
            describe('should validate step 1', () => {
                it('should validate first name field', () => {
                    cy.get('@signUpForm').within(() => {
                        cy.get('@lastNameInput').type('Петров{enter}');
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

                        cy.get('@firstNameInput').clear().type('  Василий   ').blur();
                        cy.get('@firstNameInput').should('have.value', 'Василий');

                        cy.get('@submitButton').click();
                        cy.contains('Максимум 100 символов').should('not.exist');
                        cy.contains('Только кириллица А-Я, и "-"').should('not.exist');
                        cy.contains('Должно начинаться с кириллицы А-Я').should('not.exist');
                    });
                });

                it('should validate last name field', () => {
                    cy.get('@signUpForm').within(() => {
                        cy.get('@firstNameInput').type('Василий{enter}');
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

                        cy.get('@lastNameInput').clear().type('  Петров   ').blur();
                        cy.get('@lastNameInput').should('have.value', 'Петров');

                        cy.get('@submitButton').click();
                        cy.contains('Максимум 100 символов').should('not.exist');
                        cy.contains('Только кириллица А-Я, и "-"').should('not.exist');
                        cy.contains('Должно начинаться с кириллицы А-Я').should('not.exist');
                    });
                });

                it('should validate email field', () => {
                    cy.get('@signUpForm').within(() => {
                        validateEmailField();

                        cy.get('@firstNameInput').clear();
                        cy.get('@submitButton').click();

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
                        validateLoginField();
                    });
                });

                it('should validate password field', () => {
                    cy.get('@signUpForm').within(() => {
                        validatePasswordField();
                    });
                });

                it('should validate repeat password field', () => {
                    cy.get('@signUpForm').within(() => {
                        validateConfirmPasswordField();
                    });
                });
            });
        });

        it('progress bar shows validation progress', () => {
            const checkProgressBar = (min: number, max: number) => {
                cy.get('@signUpProgress')
                    .find('[role=progressbar]')
                    .then(($el) => {
                        const numericValue = parseFloat($el.attr('aria-valuenow'));
                        const roundedValue = Math.round(numericValue);
                        expect(roundedValue).to.be.within(min, max);
                    });
            };

            checkProgressBar(0, 0);

            cy.get('@firstNameInput').type('Vasiliy');
            checkProgressBar(0, 0);
            cy.get('@firstNameInput').clear().type('Василий');
            checkProgressBar(14, 18);

            cy.get('@firstNameInput').clear();
            checkProgressBar(0, 0);

            cy.get('@firstNameInput').clear().type('Василий');
            cy.get('@lastNameInput').type('Petrov');
            checkProgressBar(14, 18);
            cy.get('@lastNameInput').clear().type('Петров');
            checkProgressBar(31, 35);

            cy.get('@emailInput').type('example@mail');
            checkProgressBar(31, 35);
            cy.get('@emailInput').clear().type('example@mail.com');
            checkProgressBar(48, 52);

            cy.get('@submitButton').click();

            cy.getByTestId(CyTestId.Auth.LoginInput).as('loginInput');
            cy.getByTestId(CyTestId.Auth.PasswordInput).as('passwordInput');
            cy.getByTestId(CyTestId.Auth.RepeatPasswordInput).as('repeatPasswordInput');

            cy.get('@loginInput').type('login>');
            checkProgressBar(48, 52);
            cy.get('@loginInput').clear().type('login!@#$&_+-.');
            checkProgressBar(65, 69);

            cy.get('@passwordInput').type('petrovvasia');
            checkProgressBar(65, 69);
            cy.get('@passwordInput').clear().type('PetrovVasia123!@#$&_+-.');
            checkProgressBar(81, 85);

            cy.get('@repeatPasswordInput').type('PetrovVasia');
            checkProgressBar(81, 85);
            cy.get('@repeatPasswordInput').clear().type('PetrovVasia123!@#$&_+-.');
            checkProgressBar(98, 100);
        });

        it('should display error message on sign up 500 server error', () => {
            fillSignUpForm();

            interceptSignUpRequest({
                statusCode: 500,
                delay: 2000,
                alias: 'signUpRequest500',
            });

            cy.getByTestId(CyTestId.Auth.SubmitButton).click();

            checkAppLoader();
            cy.wait('@signUpRequest500');
            cy.getByTestId(CyTestId.Auth.LoginInput).type('{enter}');
            cy.wait('@signUpRequest500');

            cy.get(`[id=toast-${TOAST_MESSAGE.ServerErrorToast.id}]`, { timeout: 2000 })
                .should('have.length', 1)
                .should('exist')
                .should('be.visible')
                .should('contain', TOAST_MESSAGE.ServerErrorToast.title)
                .should('contain', TOAST_MESSAGE.ServerErrorToast.description);
        });

        it('should display success modal on sign up success 200', () => {
            fillSignUpForm();

            interceptSignUpRequest({
                statusCode: 200,
                delay: 2000,
                alias: 'signUpRequest200',
            });

            cy.getByTestId(CyTestId.Auth.SubmitButton).click();

            checkAppLoader();
            cy.wait('@signUpRequest200');

            cy.wait(300);
            cy.getByTestId(CyTestId.Modal.SignUpSuccess.Root, { timeout: 2000 })
                .should('exist')
                .should('be.visible')
                .within(() => {
                    cy.contains('Остался последний шаг.').should('be.visible');
                    cy.contains('Нужно верифицировать ваш e-mail').should('be.visible');
                    cy.contains('Мы отправили вам на почту').should('be.visible');
                    cy.contains('example@mail.com').should('be.visible');
                    cy.contains('ссылку для верификации.').should('be.visible');

                    cy.getByTestId(CyTestId.Modal.CloseButton).click();
                });

            cy.getByTestId(CyTestId.Modal.SignUpSuccess.Root).should('not.exist');
            cy.getByTestId(CyTestId.Auth.SignInForm).should('be.visible');
        });
    });

    describe('email verification flow', () => {
        it('should show success message on email verification success', () => {
            //FIXME: убрать роутирование в финальном варианте тестов
            cy.visit('/verification?emailVerified=true');

            cy.get(`[id=toast-${TOAST_MESSAGE.EmailVerificationToast[200].id}]`, { timeout: 2000 })
                .should('exist')
                .should('be.visible')
                .should('contain', TOAST_MESSAGE.EmailVerificationToast[200].title);

            cy.getByTestId(CyTestId.Auth.SignInForm).should('be.visible');
        });

        it('should show error modal on email verification failure', () => {
            //FIXME: убрать роутирование в финальном варианте тестов
            cy.visit('/verification?emailVerified=false');

            cy.wait(300);
            cy.getByTestId(CyTestId.Modal.EmailVerificationFailed.Root, { timeout: 2000 })
                .should('exist')
                .should('be.visible')
                .within(() => {
                    cy.contains('Упс! Что-то пошло не так').should('be.visible');
                    cy.contains('Ваша ссылка для верификации недействительна.').should(
                        'be.visible',
                    );
                    cy.contains('Попробуйте зарегистрироваться снова.').should('be.visible');

                    cy.getByTestId(CyTestId.Modal.CloseButton).click();
                });

            cy.getByTestId(CyTestId.Modal.EmailVerificationFailed.Root).should('not.exist');
            cy.getByTestId(CyTestId.Auth.SignUpForm).should('be.visible');
        });
    });

    describe('restore credentials flow', () => {
        beforeEach(() => {
            //FIXME: убрать роутирование в финальном варианте тестов
            cy.visit('/sign-in');
            cy.getByTestId(CyTestId.Auth.RestoreCredentialsButton)
                .click()
                .as('restoreCredentialsButton');

            cy.wait(300);
            cy.getByTestId(CyTestId.Modal.RestoreCredentialsEmailModal.Root, { timeout: 2000 }).as(
                'restoreEmailModal',
            );
        });

        it('should open send verification email modal', () => {
            cy.get('@restoreEmailModal').within(() => {
                cy.contains(
                    'Для восстановления входа введите ваш e-mail, куда можно отправить уникальный код',
                ).should('be.visible');
                cy.contains('Получить код').should('be.visible');

                cy.getByTestId(CyTestId.Modal.CloseButton).click();
            });

            cy.get('@restoreEmailModal').should('not.exist');
            cy.get('@restoreCredentialsButton').click();
            cy.get('@restoreEmailModal', { timeout: 2000 }).should('be.visible');
        });

        it('should validate send verification form email field', () => {
            const wait = interceptSendCodeRequest({
                statusCode: 200,
                delay: 2000,
                alias: 'sendVerificationCode200',
            });

            cy.get('@restoreEmailModal', { timeout: 2000 }).within(() => {
                cy.getByTestId(CyTestId.Auth.SubmitButton).as('submitButton');

                validateEmailField();
                cy.get('@submitButton').click();
            });

            checkAppLoader();
            wait();
        });

        it('should show error message on email 403 existance fail', () => {
            const wait = interceptSendCodeRequest({
                statusCode: 403,
                delay: 2000,
                alias: 'sendVerificationCode403',
            });

            cy.get('@restoreEmailModal').within(() => {
                cy.getByTestId(CyTestId.Auth.EmailInput).type('example@mail.com{enter}');
            });

            checkAppLoader();
            wait();

            cy.getByTestId(CyTestId.Auth.EmailInput).should('have.value', '');

            cy.get(`[id=toast-${TOAST_MESSAGE.SendVerificationCodeToast[403].id}]`, {
                timeout: 2000,
            })
                .should('exist')
                .should('be.visible')
                .should('contain', TOAST_MESSAGE.SendVerificationCodeToast[403].title)
                .should('contain', TOAST_MESSAGE.SendVerificationCodeToast[403].description);
        });

        it('should show error message on send code 500 server error', () => {
            const wait = interceptSendCodeRequest({
                statusCode: 500,
                delay: 2000,
                alias: 'sendVerificationCode500',
            });

            cy.get('@restoreEmailModal').within(() => {
                cy.getByTestId(CyTestId.Auth.EmailInput).type('example@mail.com{enter}');
            });

            checkAppLoader();
            wait();
            cy.getByTestId(CyTestId.Auth.EmailInput).type('example@mail.com{enter}');
            wait();

            cy.get(`[id=toast-${TOAST_MESSAGE.ServerErrorToast.id}]`, {
                timeout: 2000,
            })
                .should('have.length', 1)
                .should('exist')
                .should('be.visible')
                .should('contain', TOAST_MESSAGE.ServerErrorToast.title)
                .should('contain', TOAST_MESSAGE.ServerErrorToast.description);
        });

        it('should open validate verification code modal', () => {
            goToCheckVerificationCode();

            cy.wait(300);
            cy.getByTestId(CyTestId.Modal.VerificationCodeModal.Root, { timeout: 2000 }).within(
                () => {
                    cy.contains('Мы отправили вам на e-mail').should('be.visible');
                    cy.contains('example@mail.com').should('be.visible');
                    cy.contains('шестизначный код.').should('be.visible');
                    cy.contains('Введите его ниже.').should('be.visible');

                    cy.getByTestId(CyTestId.Modal.CloseButton).click();
                },
            );

            cy.get('@restoreEmailModal').should('not.exist');
            cy.get('@restoreCredentialsButton').click();
            cy.get('@restoreEmailModal', { timeout: 2000 })
                .should('be.visible')
                .within(() => {
                    cy.getByTestId(CyTestId.Auth.EmailInput).should('have.value', '');
                });
        });

        it('should handle verification code validation', () => {
            goToCheckVerificationCode();

            const wait403 = interceptCheckCodeRequest({
                statusCode: 403,
                delay: 2000,
                alias: 'sendVerificationCode403',
            });

            cy.wait(300);
            cy.getByTestId(CyTestId.Modal.VerificationCodeModal.Root, { timeout: 2000 }).within(
                () => {
                    cy.getByTestId(`${CyTestId.Auth.VerificationCodeInput}-1`)
                        .as('verificationCodeFirstPin')
                        .type('123456');
                },
            );

            checkAppLoader();
            wait403();

            const wait500 = interceptCheckCodeRequest({
                statusCode: 500,
                delay: 2000,
                alias: 'sendVerificationCode500',
            });

            const checkPinReset = () => {
                VERIFICATION_CODE_PIN_ID.forEach((id) => {
                    cy.getByTestId(`${CyTestId.Auth.VerificationCodeInput}-${id}`).should(
                        'have.value',
                        '',
                    );
                });
            };

            cy.wait(300);
            cy.getByTestId(CyTestId.Modal.VerificationCodeModal.Root, { timeout: 2000 }).within(
                () => {
                    cy.contains('Неверный код').should('be.visible');
                    checkPinReset();
                    cy.get('@verificationCodeFirstPin').type('123456');
                },
            );

            checkAppLoader();
            wait500();

            cy.get(`[id=toast-${TOAST_MESSAGE.ServerErrorToast.id}]`, {
                timeout: 2000,
            })
                .should('have.length', 1)
                .should('exist')
                .should('be.visible')
                .should('contain', TOAST_MESSAGE.ServerErrorToast.title)
                .should('contain', TOAST_MESSAGE.ServerErrorToast.description);

            const wait200 = interceptCheckCodeRequest({
                statusCode: 200,
                delay: 2000,
                alias: 'sendVerificationCode200',
            });

            cy.wait(300);
            cy.getByTestId(CyTestId.Modal.VerificationCodeModal.Root, { timeout: 2000 }).within(
                () => {
                    cy.contains('Неверный код').should('not.exist');
                    checkPinReset();
                    cy.get('@verificationCodeFirstPin').type('123456');
                },
            );

            checkAppLoader();
            wait200();

            cy.wait(300);
            cy.getByTestId(CyTestId.Modal.RestoreFormModal.Root, { timeout: 2000 }).should(
                'be.visible',
            );
        });

        it('should validate restore credentials form', () => {
            goToRestoreCredentialsForm();

            cy.wait(300);
            cy.getByTestId(CyTestId.Modal.RestoreFormModal.Root, { timeout: 2000 })
                .as('restoreFormModal')
                .within(() => {
                    cy.getByTestId(CyTestId.Auth.SubmitButton).as('submitButton');
                    validateLoginField();
                    validatePasswordField();
                    validateConfirmPasswordField();

                    cy.getByTestId(CyTestId.Modal.CloseButton).click();
                });

            cy.get('@restoreFormModal').should('not.exist');
        });

        it('should show success message on reset success 200', () => {
            goToRestoreCredentialsForm();

            const wait200 = interceptResetCredentialsRequest({
                statusCode: 200,
                delay: 2000,
                alias: 'resetCredentials200',
            });

            cy.wait(300);
            cy.getByTestId(CyTestId.Modal.RestoreFormModal.Root, { timeout: 2000 })
                .as('restoreFormModal')
                .within(() => {
                    fillCredentialsForm();

                    cy.getByTestId(CyTestId.Auth.RepeatPasswordInput).type('{enter}');
                });

            checkAppLoader();
            wait200();

            cy.get('@restoreFormModal').should('not.be.visible');

            cy.get(`[id=toast-${TOAST_MESSAGE.RestoreCredentials[200].id}]`, {
                timeout: 2000,
            })
                .should('have.length', 1)
                .should('exist')
                .should('be.visible')
                .should('contain', TOAST_MESSAGE.RestoreCredentials[200].title);
        });

        it('should show error message on reset credentials 500 server error', () => {
            goToRestoreCredentialsForm();

            const wait500 = interceptResetCredentialsRequest({
                statusCode: 500,
                delay: 2000,
                alias: 'resetCredentials500',
            });

            cy.wait(300);
            cy.getByTestId(CyTestId.Modal.RestoreFormModal.Root, { timeout: 2000 })
                .as('restoreFormModal')
                .within(() => {
                    fillCredentialsForm();

                    cy.getByTestId(CyTestId.Auth.SubmitButton).click();
                });

            checkAppLoader();
            wait500();

            cy.get('@restoreFormModal').should('not.be.visible');

            cy.get(`[id=toast-${TOAST_MESSAGE.ServerErrorToast.id}]`, {
                timeout: 2000,
            })
                .should('have.length', 1)
                .should('exist')
                .should('be.visible')
                .should('contain', TOAST_MESSAGE.ServerErrorToast.title)
                .should('contain', TOAST_MESSAGE.ServerErrorToast.description);
        });
    });
});
