const RESOLUTION = {
    desktop: [1887, 1120],
    tablet: [768, 1024],
    mobile: [360, 800],
} as const;

function takeScreenshot(screenshotName: string, device: keyof typeof RESOLUTION = 'desktop') {
    const [width, height] = RESOLUTION[device];

    cy.viewport(width, height).then(() => {
        cy.get('body').then(($body) => {
            $body[0].style.setProperty('margin-right', '0', 'important');
        });
        cy.wait(1000);
        cy.screenshot(`${screenshotName}_${width}x${height}`, {
            capture: 'fullPage',
        });
        cy.get('body').then(($body) => {
            $body[0].style.setProperty('margin-right', 'auto');
        });
    });
}

const takeAllScreenshots = (key: string) => {
    (['desktop', 'tablet', 'mobile'] as const).forEach((device) => takeScreenshot(key, device));
};

// const signIn = () => {
//     interceptRequest({
//         endpoint: ApiEndpoints.RefreshToken,
//         method: 'GET',
//         statusCode: 500,
//         alias: 'refreshToken500',
//     });

//     cy.visit('/');

//     const waitSignIn200 = interceptRequest({
//         endpoint: ApiEndpoints.SignIn,
//         statusCode: 200,
//         alias: 'signInRequest200',
//         headers: {
//             [ACCESS_TOKEN_HEADER[0]]: ACCESS_TOKEN_HEADER[1],
//         },
//         expectedBody: {
//             login: VALIDATION_PASS_VALUE.Login,
//             password: VALIDATION_PASS_VALUE.Password,
//         },
//     });

//     cy.getByTestId(CyTestId.Form.SignIn).within(() => {
//         fillSignInForm();
//         cy.getByTestId(CyTestId.Button.Submit).click();
//     });

//     waitSignIn200();
// };

export const API_BASE_URL = 'https://marathon-api.clevertec.ru/';
const VERIFICATION_CODE_PIN_ID = [1, 2, 3, 4, 5, 6];
const INPUT_OVER_50 = 'А'.repeat(51);
const VERIFICATION_ROUTE = '/verification';
const ACCESS_TOKEN_HEADER = ['Authentication-Access', 'access_token'];
const SIGN_UP_LOGIN_CONFLICT_MESSAGE = 'Пользователь с таким login уже существует.';
const SIGN_UP_EMAIL_CONFLICT_MESSAGE = 'Пользователь с таким email уже существует.';

export const enum ApiEndpoints {
    SignIn = 'auth/login',
    SignUp = '/auth/signup',
    RefreshToken = '/auth/refresh',
    SendVerificationCode = '/auth/forgot-password',
    CheckVerificationCode = '/auth/verify-otp',
    ResetCredentials = '/auth/reset-password',
    CheckAuth = '/auth/check-auth',

    Category = 'category',
    Recipe = 'recipe',
    RecipeByCategory = 'recipe/category',
}

export const CyTestId = {
    AppLoader: 'app-loader',
    Breadcrumbs: 'breadcrumbs',
    Progress: {
        SignUp: 'sign-up-progress',
    },
    Form: {
        SignIn: 'sign-in-form',
        SignUp: 'sign-up-form',
    },
    Input: {
        Login: 'login-input',
        Password: 'password-input',
        PasswordConfirm: 'confirm-password-input',
        Email: 'email-input',
        FirstName: 'first-name-input',
        LastName: 'last-name-input',
        VerificationCode: 'verification-code-input',
    },
    Modal: {
        SignInError: 'sign-in-error-modal',
        SignUpSuccess: 'sign-up-success-modal',
        EmailVerificationFailed: 'email-verification-failed-modal',
        SendEmailModal: 'send-email-modal',
        VerificationCodeModal: 'verification-code-modal',
        ResetCredentialsModal: 'reset-credentials-modal',
    },
    Button: {
        ForgotPassword: 'forgot-password',
        PasswordVisibility: 'password-visibility-button',
        Submit: 'submit-button',
        Repeat: 'repeat-button',
        Close: 'close-button',
    },
} as const;

export const TOAST_MESSAGE = {
    SignUpToast: {
        [400]: {
            id: 'sign-up-error-conflict',
        },
    },
    SignInToast: {
        [401]: {
            id: 'sign-in-error-credentials',
            title: 'Неверный логин или пароль',
            description: 'Попробуйте снова',
        },
        [403]: {
            id: 'sign-in-error-not-verified',
            title: 'E-mail не верифицирован',
            description: 'Проверьте почту и перейдите по ссылке',
        },
    },
    EmailVerificationToast: {
        [200]: {
            id: 'sign-up-verified-ok',
            title: 'Верификация прошла успешно',
        },
    },
    SendVerificationCodeToast: {
        [403]: {
            id: 'send-verification-code-not-exist',
            title: 'Такого e-mail нет',
            description: 'Попробуйте другой e-mail или проверьте правильность его написания',
        },
    },
    RestoreCredentials: {
        [200]: {
            id: 'restore-credentials-ok',
            title: 'Восстановление данных успешно',
        },
    },
    ServerErrorToast: {
        id: 'server-error',
        title: 'Ошибка сервера',
        description: 'Попробуйте немного позже',
    },
} as const;

const VALIDATION_MESSAGE = {
    Login: {
        Required: 'Введите логин',
        Pattern: 'Не соответствует формату',
    },
    Password: {
        Required: 'Введите пароль',
        Pattern: 'Не соответствует формату',
    },
    ConfirmPassword: {
        Required: 'Повторите пароль',
        Equal: 'Пароли должны совпадать',
    },
    Email: {
        Required: 'Введите e-mail',
        Pattern: 'Введите корректный e-mail',
    },
    FirstName: {
        Required: 'Введите имя',
    },
    LastName: {
        Required: 'Введите фамилию',
    },
    MaxLength: 'Максимальная длина 50 символов',
    RussianOnly: 'Только кириллица А-Я, и "-"',
    FirstRussianLetter: 'Должно начинаться с кириллицы А-Я',
} as const;

const VALIDATION_PASS_VALUE = {
    FirstName: 'Иван',
    LastName: 'Петров',
    Login: 'Vano!@#$&_+-.',
    Email: 'vano666@mail.com',
    Password: 'SecretPass123!@#$&_+-.',
    VerificationCode: '123456',
} as const;

const VALIDATION_FAIL_VALUE = {
    FirstName: 'Ivan',
    LastName: 'Petrov',
    Login: 'Vano<>',
    Email: 'vano666@mail',
    Password: 'Пароль',
    ConfirmPassword: 'Пароль123',
    VerificationCode: '12',
} as const;

const VALIDATION_TO_TRIM_VALUE = {
    FirstName: '   Иван   ',
    LastName: '   Петров   ',
    Login: '   Vano!@#$&_+-.   ',
    Email: '   vano666@mail.com   ',
    Password: '   SecretPass123!@#$&_+-.   ',
    ConfirmPassword: '   SecretPass123!@#$&_+-.   ',
} as const;

const FIRST_NAME_VALIDATION = [
    ['{enter}', VALIDATION_MESSAGE.FirstName.Required],
    ['firstName', VALIDATION_MESSAGE.FirstRussianLetter],
    ['-Василий', VALIDATION_MESSAGE.FirstRussianLetter],
    ['Василий   -Ибн- Петр', VALIDATION_MESSAGE.RussianOnly],
    ['ВасилийEnglish', VALIDATION_MESSAGE.RussianOnly],
    [INPUT_OVER_50, VALIDATION_MESSAGE.MaxLength],
];

const LAST_NAME_VALIDATION = [
    ['{enter}', VALIDATION_MESSAGE.LastName.Required],
    ['lastName', VALIDATION_MESSAGE.FirstRussianLetter],
    ['-Петров', VALIDATION_MESSAGE.FirstRussianLetter],
    ['    Комаров   -Петров   ', VALIDATION_MESSAGE.RussianOnly],
    ['ВасилийEnglish', VALIDATION_MESSAGE.RussianOnly],
    [INPUT_OVER_50, VALIDATION_MESSAGE.MaxLength],
];

const EMAIL_VALIDATION = [
    ['{enter}', VALIDATION_MESSAGE.Email.Required],
    ['email', VALIDATION_MESSAGE.Email.Pattern],
    ['email@', VALIDATION_MESSAGE.Email.Pattern],
    ['email@mail', VALIDATION_MESSAGE.Email.Pattern],
    ['пример@mail.com', VALIDATION_MESSAGE.Email.Pattern],
    ['example@имейл.com', VALIDATION_MESSAGE.Email.Pattern],
    ['email@имейл.ру', VALIDATION_MESSAGE.Email.Pattern],
    ['email @имейл.ru', VALIDATION_MESSAGE.Email.Pattern],
    [INPUT_OVER_50, VALIDATION_MESSAGE.MaxLength],
] as const;

const LOGIN_VALIDATION = [
    ['{enter}', VALIDATION_MESSAGE.Login.Required],
    ['logi', VALIDATION_MESSAGE.Login.Pattern],
    ['логин', VALIDATION_MESSAGE.Login.Pattern],
    ['log in', VALIDATION_MESSAGE.Login.Pattern],
    ['login<', VALIDATION_MESSAGE.Login.Pattern],
    [INPUT_OVER_50, VALIDATION_MESSAGE.MaxLength],
];

const PASSWORD_VALIDATION = [
    ['{enter}', VALIDATION_MESSAGE.Password.Required],
    ['PerovVa', VALIDATION_MESSAGE.Password.Pattern],
    ['perovvasia123', VALIDATION_MESSAGE.Password.Pattern],
    ['PetrovVasia', VALIDATION_MESSAGE.Password.Pattern],
    ['12345678', VALIDATION_MESSAGE.Password.Pattern],
    ['ПетровВася123', VALIDATION_MESSAGE.Password.Pattern],
    ['Perov Vasia123', VALIDATION_MESSAGE.Password.Pattern],
    ['PetrovVasia123<', VALIDATION_MESSAGE.Password.Pattern],
    [INPUT_OVER_50, VALIDATION_MESSAGE.MaxLength],
];

const CONFIRM_PASSWORD_VALIDATION = [
    ['{enter}', VALIDATION_MESSAGE.ConfirmPassword.Required],
    ['PerovVa', VALIDATION_MESSAGE.ConfirmPassword.Equal],
];

const interceptRequest = ({
    endpoint,
    statusCode,
    alias,
    method = 'POST',
    delay = 1000,
    body = {},
    expectedBody = null,
    withLoader = false,
    ...rest
}) => {
    cy.intercept(
        {
            url: `${API_BASE_URL}${endpoint}`,
            method,
        },
        {
            statusCode,
            body,
            delay,
            ...rest,
        },
    ).as(alias);

    if (expectedBody) {
        return () => {
            if (withLoader) {
                cy.getByTestId(CyTestId.AppLoader, { timeout: 5000 }).should('be.visible');
            }

            cy.wait(`@${alias}`).then((interception) => {
                expect(interception.request.body).to.deep.equal(expectedBody);
            });
            cy.getByTestId(CyTestId.AppLoader).should('not.exist');
        };
    }

    return () => {
        if (withLoader) {
            cy.getByTestId(CyTestId.AppLoader, { timeout: 5000 }).should('be.visible');
        }

        cy.wait(`@${alias}`);
        cy.getByTestId(CyTestId.AppLoader).should('not.exist');
    };
};

const checkToastMessage = ({
    id,
    title,
    description = '',
    callback = () => {},
}: {
    id: string;
    title: string;
    description?: string;
    callback?: () => void;
}) => {
    cy.get(`[id=toast-${id}]`, { timeout: 5000 })
        .as('toastMessage')
        .should('have.length', 1)
        .should('exist')
        .should('be.visible')
        .should('contain', title)
        .should('contain', description);

    callback();

    cy.get('@toastMessage').within(() => {
        cy.get('button').click();
    });
};

const validateField = (
    inputAlias: string,
    value: string,
    expectedError: string,
    submitAlias = '@submitButton',
) => {
    cy.get(inputAlias).clear().type(value);
    cy.get(submitAlias).click();
    cy.contains(expectedError).should('be.visible');
};

const validateFirstNameField = () => {
    cy.getByTestId(CyTestId.Input.FirstName).as('firstNameInput');
    cy.getByTestId(CyTestId.Input.LastName)
        .as('lastNameInput')
        .type(VALIDATION_PASS_VALUE.LastName);

    FIRST_NAME_VALIDATION.forEach(([value, message]) =>
        validateField('@firstNameInput', value, message),
    );

    cy.get('@firstNameInput').clear().type(VALIDATION_TO_TRIM_VALUE.FirstName).blur();
    cy.get('@firstNameInput').should('have.value', VALIDATION_PASS_VALUE.FirstName);

    cy.get('@submitButton').click();
    cy.contains(VALIDATION_MESSAGE.RussianOnly).should('not.exist');
    cy.contains(VALIDATION_MESSAGE.FirstRussianLetter).should('not.exist');
    cy.contains(VALIDATION_MESSAGE.MaxLength).should('not.exist');
    cy.get('@firstNameInput').clear();
    cy.get('@lastNameInput').clear();
};

const validateLastNameField = () => {
    cy.getByTestId(CyTestId.Input.LastName).as('lastNameInput');
    cy.getByTestId(CyTestId.Input.FirstName)
        .as('firstNameInput')
        .type(VALIDATION_PASS_VALUE.FirstName);

    LAST_NAME_VALIDATION.forEach(([value, message]) =>
        validateField('@lastNameInput', value, message),
    );

    cy.get('@lastNameInput').clear().type(VALIDATION_TO_TRIM_VALUE.LastName).blur();
    cy.get('@lastNameInput').should('have.value', VALIDATION_PASS_VALUE.LastName);

    cy.get('@submitButton').click();
    cy.contains(VALIDATION_MESSAGE.RussianOnly).should('not.exist');
    cy.contains(VALIDATION_MESSAGE.FirstRussianLetter).should('not.exist');
    cy.contains(VALIDATION_MESSAGE.MaxLength).should('not.exist');
    cy.get('@firstNameInput').clear();
    cy.get('@lastNameInput').clear();
};

const validateEmailField = () => {
    cy.getByTestId(CyTestId.Input.Email).as('emailInput');

    EMAIL_VALIDATION.forEach(([value, message]) => validateField('@emailInput', value, message));

    cy.get('@emailInput').clear().type(VALIDATION_TO_TRIM_VALUE.Email).blur();
    cy.get('@emailInput').should('have.value', VALIDATION_PASS_VALUE.Email);

    cy.get('@submitButton').click();
    cy.contains(VALIDATION_MESSAGE.Email.Pattern).should('not.exist');
    cy.contains(VALIDATION_MESSAGE.MaxLength).should('not.exist');
};

const validateLoginField = () => {
    cy.getByTestId(CyTestId.Input.Login).as('loginInput');
    cy.getByTestId(CyTestId.Input.Password)
        .as('passwordInput')
        .type(VALIDATION_PASS_VALUE.Password);

    LOGIN_VALIDATION.forEach(([value, message]) => validateField('@loginInput', value, message));

    cy.get('@loginInput').clear().type(VALIDATION_PASS_VALUE.Login).blur();
    cy.get('@loginInput').should('have.value', VALIDATION_PASS_VALUE.Login);

    cy.get('@submitButton').click();
    cy.contains(VALIDATION_MESSAGE.Login.Pattern).should('not.exist');
    cy.contains(VALIDATION_MESSAGE.MaxLength).should('not.exist');
    cy.get('@loginInput').clear();
    cy.get('@passwordInput').clear();
};

const validatePasswordField = () => {
    cy.getByTestId(CyTestId.Input.Password).as('passwordInput');
    cy.getByTestId(CyTestId.Input.Login).type(VALIDATION_PASS_VALUE.Login);

    PASSWORD_VALIDATION.forEach(([value, message]) =>
        validateField('@passwordInput', value, message),
    );

    cy.get('@passwordInput').clear().type(VALIDATION_PASS_VALUE.Password);
    cy.get('@submitButton').click();
    cy.contains(VALIDATION_MESSAGE.Password.Pattern).should('not.exist');
    cy.contains(VALIDATION_MESSAGE.MaxLength).should('not.exist');
    cy.get('@loginInput').clear();
    cy.get('@passwordInput').clear();
};

const validateConfirmPasswordField = () => {
    cy.getByTestId(CyTestId.Input.PasswordConfirm).as('passwordConfirmInput');
    cy.getByTestId(CyTestId.Input.Password).type(VALIDATION_PASS_VALUE.Password);

    CONFIRM_PASSWORD_VALIDATION.forEach(([value, message]) =>
        validateField('@passwordConfirmInput', value, message),
    );

    cy.get('@passwordConfirmInput').clear().type(VALIDATION_PASS_VALUE.Password);
    cy.get('@submitButton').click();
    cy.contains(VALIDATION_MESSAGE.ConfirmPassword.Equal).should('not.exist');
    cy.get('@loginInput').clear();
    cy.get('@passwordInput').clear();
    cy.get('@passwordConfirmInput').clear();
};

const fillSignInForm = (
    login = VALIDATION_TO_TRIM_VALUE.Login,
    password = VALIDATION_PASS_VALUE.Password,
) => {
    cy.getByTestId(CyTestId.Input.Login).type(login);
    cy.getByTestId(CyTestId.Input.Password).type(password);
};

const fillPersonalInfoForm = (
    firstName = VALIDATION_TO_TRIM_VALUE.FirstName,
    lastName = VALIDATION_TO_TRIM_VALUE.LastName,
    email = VALIDATION_TO_TRIM_VALUE.Email,
) => {
    cy.getByTestId(CyTestId.Input.FirstName).type(firstName);
    cy.getByTestId(CyTestId.Input.LastName).type(lastName);
    cy.getByTestId(CyTestId.Input.Email).type(email);
};

const fillCredentialsForm = (
    login = VALIDATION_TO_TRIM_VALUE.Login,
    password = VALIDATION_PASS_VALUE.Password,
    confirmPassword = password,
) => {
    cy.getByTestId(CyTestId.Input.Login).type(login);
    cy.getByTestId(CyTestId.Input.Password).type(password);
    cy.getByTestId(CyTestId.Input.PasswordConfirm).type(confirmPassword);
};

const fillSignUpForm = () => {
    fillPersonalInfoForm();
    cy.getByTestId(CyTestId.Button.Submit).click();
    fillCredentialsForm();
};

const fillVerificationCode = () => {
    VERIFICATION_CODE_PIN_ID.forEach((id) =>
        cy
            .getByTestId(`${CyTestId.Input.VerificationCode}-${id}`)
            .as(`verificationCodeFirst_${id}`)
            .type(String(id)),
    );
};

const withModal = (modalKey: keyof typeof CyTestId.Modal, callback = () => {}) => {
    cy.wait(2000);
    return cy
        .getByTestId(CyTestId.Modal[modalKey], { timeout: 5000 })
        .as(`${modalKey}`)
        .within(callback);
};

const goToCheckVerificationCode = () => {
    const wait = interceptRequest({
        endpoint: ApiEndpoints.SendVerificationCode,
        statusCode: 200,
        alias: 'sendVerificationCode200',
    });

    withModal('SendEmailModal', () => {
        cy.getByTestId(CyTestId.Input.Email).type(`${VALIDATION_PASS_VALUE.Email}{enter}`);
    });

    wait();
};

const goToRestoreCredentialsForm = () => {
    goToCheckVerificationCode();

    const wait = interceptRequest({
        endpoint: ApiEndpoints.CheckVerificationCode,
        statusCode: 200,
        alias: 'checkVerificationCode200',
    });

    withModal('VerificationCodeModal', () => {
        fillVerificationCode();
    });

    wait();
};

describe('sprint 4', () => {
    beforeEach(() => {
        cy.clearLocalStorage();
        cy.clearAllSessionStorage();
        interceptRequest({
            endpoint: '**',
            method: 'GET',
            statusCode: 200,
            alias: 'all',
            delay: 0,
        });

        interceptRequest({
            endpoint: ApiEndpoints.RefreshToken,
            method: 'GET',
            statusCode: 500,
            alias: 'refreshToken500',
            delay: 0,
        });

        interceptRequest({
            endpoint: ApiEndpoints.CheckAuth,
            method: 'GET',
            statusCode: 403,
            alias: 'checkAuth403',
            delay: 0,
        });

        cy.visit('/');
    });

    describe('sign in flow', () => {
        beforeEach(() => {
            cy.getByTestId(CyTestId.Form.SignIn).as('signInForm');
            cy.getByTestId(CyTestId.Input.Login).as('loginInput');
            cy.getByTestId(CyTestId.Input.Password).as('passwordInput');
            cy.getByTestId(CyTestId.Button.Submit).as('submitButton');
        });

        it('should validate sign in form fields', () => {
            cy.get('@signInForm').within(() => {
                cy.get('@submitButton').click();
                cy.contains(VALIDATION_MESSAGE.Login.Required).should('be.visible');
                cy.contains(VALIDATION_MESSAGE.Password.Required).should('be.visible');

                validateField('@loginInput', INPUT_OVER_50, VALIDATION_MESSAGE.MaxLength);
                cy.get('@loginInput').clear().type('login');
                validateField('@passwordInput', INPUT_OVER_50, VALIDATION_MESSAGE.MaxLength);

                cy.get('@loginInput').clear().type(VALIDATION_TO_TRIM_VALUE.Login).blur();
                cy.get('@loginInput').should('have.value', VALIDATION_PASS_VALUE.Login);
            });
        });

        it('should show password only while mouse is holding on visibility button', () => {
            cy.viewport(...RESOLUTION.tablet);

            cy.get('@signInForm').within(() => {
                fillSignInForm();

                cy.get('@passwordInput').should('have.attr', 'type', 'password');

                cy.getByTestId(CyTestId.Button.PasswordVisibility).then(($toggle) => {
                    cy.wrap($toggle).trigger('mousedown');
                    cy.get('@passwordInput').should('have.attr', 'type', 'text');
                    cy.wrap($toggle).trigger('mouseup');
                    cy.get('@passwordInput').should('have.attr', 'type', 'password');
                });
            });
        });

        it('should display error message for 401 invalid credentials', () => {
            cy.viewport(...RESOLUTION.mobile);

            interceptRequest({
                endpoint: ApiEndpoints.SignIn,
                statusCode: 401,
                alias: 'signInRequest401',
            });

            cy.get('@signInForm').within(() => {
                fillSignInForm();
                cy.get('@passwordInput').type('{enter}');
            });
            cy.wait('@signInRequest401');
            cy.get('@passwordInput').type('{enter}');
            cy.wait('@signInRequest401');

            checkToastMessage({
                ...TOAST_MESSAGE.SignInToast[401],
                callback: () => takeAllScreenshots('sign-in-invalid-credentials'),
            });
        });

        it('should display error message for 403 email is not verified', () => {
            interceptRequest({
                endpoint: ApiEndpoints.SignIn,
                statusCode: 403,
                alias: 'signInRequest403',
                delay: 4000,
            });

            cy.get('@signInForm').within(() => {
                fillSignInForm();
                cy.get('@passwordInput').type('{enter}');
            });
            cy.wait('@signInRequest403');
            cy.get('@passwordInput').type('{enter}');
            cy.wait('@signInRequest403');

            checkToastMessage(TOAST_MESSAGE.SignInToast[403]);
        });

        it('should display error modal for 500 server error', () => {
            const wait500 = interceptRequest({
                endpoint: ApiEndpoints.SignIn,
                statusCode: 500,
                alias: 'signInRequest500',
            });

            cy.get('@signInForm').within(() => {
                fillSignInForm();
                cy.get('@passwordInput').type('{enter}');
            });
            wait500();

            withModal('SignInError', () => {
                cy.contains('Вход не выполнен').should('be.visible');
                cy.contains('Что-то пошло не так.').should('be.visible');
                cy.contains('Попробуйте еще раз').should('be.visible');
            });
            takeAllScreenshots('sign-in-server-error');
            withModal('SignInError', () => {
                cy.getByTestId(CyTestId.Button.Close).click();
            });

            cy.getByTestId(CyTestId.Modal.SignInError).should('not.exist');
        });

        it('should send new request on server error retry button', () => {
            cy.viewport(...RESOLUTION.mobile);

            const wait500 = interceptRequest({
                endpoint: ApiEndpoints.SignIn,
                statusCode: 500,
                alias: 'signInRequest500',
                delay: 0,
            });

            cy.get('@signInForm').within(() => {
                fillSignInForm();
                cy.get('@passwordInput').type('{enter}');
            });
            wait500();

            const wait200 = interceptRequest({
                endpoint: ApiEndpoints.SignIn,
                statusCode: 200,
                alias: 'signInRequest200',
                headers: {
                    [ACCESS_TOKEN_HEADER[0]]: ACCESS_TOKEN_HEADER[1],
                },
            });

            withModal('SignInError', () => {
                cy.getByTestId(CyTestId.Button.Repeat).click();
            });
            wait200();

            cy.wait('@all');
            cy.contains('Приятного аппетита!').should('be.visible');
        });

        it('should navigate to main page on sign in success', () => {
            const wait200 = interceptRequest({
                endpoint: ApiEndpoints.SignIn,
                statusCode: 200,
                alias: 'signInRequest200',
                delay: 4000,
                withLoader: true,
                headers: {
                    [ACCESS_TOKEN_HEADER[0]]: ACCESS_TOKEN_HEADER[1],
                },
                expectedBody: {
                    login: VALIDATION_PASS_VALUE.Login,
                    password: VALIDATION_PASS_VALUE.Password,
                },
            });

            cy.get('@signInForm').within(() => {
                fillSignInForm();
                cy.get('@passwordInput').type('{enter}');
            });
            cy.wait(500);
            takeScreenshot('sign-in-loader');
            wait200();
            cy.wait('@all');
            cy.contains('Приятного аппетита!').should('be.visible');
        });
    });

    describe('sign up flow', () => {
        beforeEach(() => {
            cy.contains('Регистрация').click();
            cy.reload();

            cy.getByTestId(CyTestId.Form.SignUp).as('signUpForm');
            cy.getByTestId(CyTestId.Button.Submit).as('submitButton');
        });

        it('should validate sign up form fields step 1', () => {
            cy.viewport(...RESOLUTION.tablet);
            cy.get('@signUpForm').within(() => {
                validateFirstNameField();
                validateLastNameField();
                validateEmailField();
            });
        });

        it('should validate sign up form fields step 2', () => {
            cy.viewport(...RESOLUTION.mobile);
            cy.get('@signUpForm').within(() => {
                fillPersonalInfoForm();
                cy.get('@submitButton').click();
            });

            cy.get('@signUpForm').within(() => {
                validateLoginField();
                validatePasswordField();
                validateConfirmPasswordField();
            });
        });

        it('progress bar shows validation progress', () => {
            cy.getByTestId(CyTestId.Progress.SignUp).as('signUpProgress');
            cy.getByTestId(CyTestId.Input.FirstName).as('firstNameInput');
            cy.getByTestId(CyTestId.Input.LastName).as('lastNameInput');
            cy.getByTestId(CyTestId.Input.Email).as('emailInput');

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

            cy.get('@firstNameInput').type(VALIDATION_FAIL_VALUE.FirstName);
            checkProgressBar(0, 0);
            cy.get('@firstNameInput').clear().type(VALIDATION_PASS_VALUE.FirstName);
            checkProgressBar(14, 18);

            takeScreenshot('sign-up-progress-bar');

            cy.get('@firstNameInput').clear();
            checkProgressBar(0, 0);

            cy.get('@firstNameInput').clear().type(VALIDATION_PASS_VALUE.FirstName);
            cy.get('@lastNameInput').type(VALIDATION_FAIL_VALUE.LastName);
            checkProgressBar(14, 18);
            cy.get('@lastNameInput').clear().type(VALIDATION_PASS_VALUE.LastName);
            checkProgressBar(31, 35);

            takeScreenshot('sign-up-progress-bar', 'tablet');

            cy.get('@emailInput').type(VALIDATION_FAIL_VALUE.Email);
            checkProgressBar(31, 35);
            cy.get('@emailInput').clear().type(VALIDATION_PASS_VALUE.Email);
            checkProgressBar(48, 52);

            cy.get('@submitButton').click();

            cy.getByTestId(CyTestId.Input.Login).as('loginInput');
            cy.getByTestId(CyTestId.Input.Password).as('passwordInput');
            cy.getByTestId(CyTestId.Input.PasswordConfirm).as('passwordConfirmInput');

            cy.get('@loginInput').type(VALIDATION_FAIL_VALUE.Login);
            checkProgressBar(48, 52);
            cy.get('@loginInput').clear().type(VALIDATION_PASS_VALUE.Login);
            checkProgressBar(65, 69);

            takeScreenshot('sign-up-progress-bar', 'mobile');

            cy.get('@passwordInput').type(VALIDATION_FAIL_VALUE.Password);
            checkProgressBar(65, 69);
            cy.get('@passwordInput').clear().type(VALIDATION_PASS_VALUE.Password);
            checkProgressBar(81, 85);

            cy.get('@passwordConfirmInput').type(VALIDATION_FAIL_VALUE.ConfirmPassword);
            checkProgressBar(81, 85);
            cy.get('@passwordConfirmInput').clear().type(VALIDATION_PASS_VALUE.Password);
            checkProgressBar(98, 100);
        });

        it('should display error message on sign up 500 server error', () => {
            fillSignUpForm();

            interceptRequest({
                endpoint: ApiEndpoints.SignUp,
                statusCode: 500,
                alias: 'signUpRequest500',
            });

            cy.getByTestId(CyTestId.Button.Submit).click();
            cy.wait('@signUpRequest500');
            cy.getByTestId(CyTestId.Input.Login).type('{enter}');
            cy.wait('@signUpRequest500');

            checkToastMessage({
                ...TOAST_MESSAGE.ServerErrorToast,
                callback: () => takeAllScreenshots('sign-up-server-error'),
            });
        });

        it('should display errors messages on email and login conflicts', () => {
            fillSignUpForm();

            const waitLogin400 = interceptRequest({
                endpoint: ApiEndpoints.SignUp,
                statusCode: 400,
                alias: 'signUpRequest400',
                body: {
                    message: SIGN_UP_LOGIN_CONFLICT_MESSAGE,
                    statusCode: 400,
                },
                delay: 0,
            });

            cy.getByTestId(CyTestId.Button.Submit).click();
            waitLogin400();

            checkToastMessage({
                ...TOAST_MESSAGE.SignUpToast[400],
                title: SIGN_UP_LOGIN_CONFLICT_MESSAGE,
                callback: () => takeScreenshot('sign-up-login-conflict', 'tablet'),
            });

            const waitEmail400 = interceptRequest({
                endpoint: ApiEndpoints.SignUp,
                statusCode: 400,
                alias: 'signUpRequest400',
                body: {
                    message: SIGN_UP_EMAIL_CONFLICT_MESSAGE,
                    statusCode: 400,
                },
                delay: 0,
            });

            cy.getByTestId(CyTestId.Button.Submit).click();
            waitEmail400();

            checkToastMessage({
                ...TOAST_MESSAGE.SignUpToast[400],
                title: SIGN_UP_EMAIL_CONFLICT_MESSAGE,
                callback: () => takeScreenshot('sign-up-email-conflict', 'mobile'),
            });
        });

        it('should display success modal on sign up success 200', () => {
            cy.viewport(...RESOLUTION.mobile);
            fillSignUpForm();

            interceptRequest({
                endpoint: ApiEndpoints.SignUp,
                statusCode: 200,
                delay: 4000,
                withLoader: true,
                alias: 'signUpRequest200',
                expectedBody: {
                    login: VALIDATION_PASS_VALUE.Login,
                    password: VALIDATION_PASS_VALUE.Password,
                    confirmPassword: VALIDATION_PASS_VALUE.Password,
                    firstName: VALIDATION_PASS_VALUE.FirstName,
                    lastName: VALIDATION_PASS_VALUE.LastName,
                    email: VALIDATION_PASS_VALUE.Email,
                },
            });

            cy.getByTestId(CyTestId.Button.Submit).click();
            cy.wait('@signUpRequest200');

            withModal('SignUpSuccess', () => {
                cy.contains('Остался последний шаг.').should('be.visible');
                cy.contains('Нужно верифицировать ваш e-mail').should('be.visible');
                cy.contains('Мы отправили вам на почту').should('be.visible');
                cy.contains(VALIDATION_PASS_VALUE.Email).should('be.visible');
                cy.contains('ссылку для верификации.').should('be.visible');
            });
            takeAllScreenshots('sign-up-success');
            withModal('SignUpSuccess', () => {
                cy.getByTestId(CyTestId.Button.Close).click();
            });

            cy.getByTestId(CyTestId.Modal.SignUpSuccess).should('not.exist');
            cy.getByTestId(CyTestId.Form.SignIn).should('be.visible');
        });
    });

    describe('email verification flow', () => {
        it('should show success message on email verification success', () => {
            cy.visit(`${VERIFICATION_ROUTE}?emailVerified=true`);

            checkToastMessage({
                ...TOAST_MESSAGE.EmailVerificationToast[200],
                callback: () => takeAllScreenshots('verificate-email-success'),
            });
            cy.getByTestId(CyTestId.Form.SignIn).should('be.visible');
        });

        it('should show error modal on email verification failure', () => {
            cy.visit(`${VERIFICATION_ROUTE}?emailVerified=false`);

            withModal('EmailVerificationFailed', () => {
                cy.contains('Упс! Что-то пошло не так').should('be.visible');
                cy.contains('Ваша ссылка для верификации недействительна.').should('be.visible');
                cy.contains('Попробуйте зарегистрироваться снова.').should('be.visible');
            });
            takeAllScreenshots('verificate-email-failure');
            withModal('EmailVerificationFailed', () => {
                cy.getByTestId(CyTestId.Button.Close).click();
            });

            cy.getByTestId(CyTestId.Modal.EmailVerificationFailed).should('not.exist');
            cy.getByTestId(CyTestId.Form.SignUp).should('be.visible');
        });
    });

    describe('restore credentials flow', () => {
        beforeEach(() => {
            cy.getByTestId(CyTestId.Button.ForgotPassword).as('forgotPasswordButton').click();
        });

        it('should open send verification email modal', () => {
            withModal('SendEmailModal', () => {
                cy.contains(
                    'Для восстановления входа введите ваш e-mail, куда можно отправить уникальный код',
                ).should('be.visible');
                cy.contains('Получить код').should('be.visible');
                cy.getByTestId(CyTestId.Input.Email).type(VALIDATION_PASS_VALUE.Email);
                cy.getByTestId(CyTestId.Button.Close).click();
            });

            cy.get('@SendEmailModal').should('not.exist');
            cy.get('@forgotPasswordButton').click();
            cy.get('@SendEmailModal', { timeout: 5000 }).should('be.visible');

            withModal('SendEmailModal', () => {
                cy.getByTestId(CyTestId.Input.Email).should('have.value', '');
            });
        });

        it('should validate send verification form email field', () => {
            const wait = interceptRequest({
                endpoint: ApiEndpoints.SendVerificationCode,
                statusCode: 200,
                alias: 'sendVerificationCode200',
            });

            withModal('SendEmailModal', () => {
                cy.getByTestId(CyTestId.Button.Submit).as('submitButton');
                validateEmailField();
            });
            wait();
        });

        it('should show error message on email 403 existance fail', () => {
            const wait = interceptRequest({
                endpoint: ApiEndpoints.SendVerificationCode,
                statusCode: 403,
                alias: 'sendVerificationCode403',
            });

            withModal('SendEmailModal', () => {
                cy.getByTestId(CyTestId.Input.Email).type(`${VALIDATION_PASS_VALUE.Email}{enter}`);
            });
            wait();

            cy.getByTestId(CyTestId.Input.Email).should('have.value', '');
            checkToastMessage({
                ...TOAST_MESSAGE.SendVerificationCodeToast[403],
                callback: () => takeAllScreenshots('send-email-modal-not-exist'),
            });
        });

        it('should show error message on send code 500 server error', () => {
            const wait = interceptRequest({
                endpoint: ApiEndpoints.SendVerificationCode,
                statusCode: 500,
                alias: 'sendVerificationCode500',
            });

            withModal('SendEmailModal', () => {
                cy.getByTestId(CyTestId.Input.Email).type(`${VALIDATION_PASS_VALUE.Email}{enter}`);
            });
            wait();
            cy.getByTestId(CyTestId.Input.Email).type(`${VALIDATION_PASS_VALUE.Email}{enter}`);
            wait();

            checkToastMessage({
                ...TOAST_MESSAGE.ServerErrorToast,
                callback: () => takeAllScreenshots('send-email-modal-server-error'),
            });
        });

        it('should open validate verification code modal', () => {
            goToCheckVerificationCode();

            withModal('VerificationCodeModal', () => {
                cy.contains('Мы отправили вам на e-mail').should('be.visible');
                cy.contains(VALIDATION_PASS_VALUE.Email).should('be.visible');
                cy.contains('шестизначный код.').should('be.visible');
                cy.contains('Введите его ниже.').should('be.visible');
            });
            takeScreenshot('verification-code-modal');
            withModal('VerificationCodeModal', () => {
                cy.getByTestId(CyTestId.Button.Close).click();
            });

            cy.get('@VerificationCodeModal').should('not.exist');
            cy.get('@forgotPasswordButton').click();

            withModal('SendEmailModal', () => {
                cy.getByTestId(CyTestId.Input.Email).should('have.value', '');
            });
        });

        it('should handle verification code validation', () => {
            goToCheckVerificationCode();

            const wait403 = interceptRequest({
                endpoint: ApiEndpoints.CheckVerificationCode,
                statusCode: 403,
                alias: 'checkVerificationCode403',
            });

            withModal('VerificationCodeModal', () => {
                fillVerificationCode();
            });

            takeScreenshot('verification-code-modal', 'tablet');
            wait403();
            takeScreenshot('verification-code-modal', 'mobile');

            const wait500 = interceptRequest({
                endpoint: ApiEndpoints.CheckVerificationCode,
                statusCode: 500,
                alias: 'checkVerificationCode500',
            });

            const checkPinReset = () => {
                VERIFICATION_CODE_PIN_ID.forEach((id) => {
                    cy.getByTestId(`${CyTestId.Input.VerificationCode}-${id}`).should(
                        'have.value',
                        '',
                    );
                });
            };

            withModal('VerificationCodeModal', () => {
                cy.contains('Неверный код').should('be.visible');
                checkPinReset();
                fillVerificationCode();
            });
            wait500();

            checkToastMessage({
                ...TOAST_MESSAGE.ServerErrorToast,
                callback: () => takeAllScreenshots('verification-code-modal-server-error'),
            });

            const wait200 = interceptRequest({
                endpoint: ApiEndpoints.CheckVerificationCode,
                statusCode: 200,
                delay: 4000,
                withLoader: true,
                alias: 'checkVerificationCode200',
            });

            withModal('VerificationCodeModal', () => {
                cy.contains('Неверный код').should('not.exist');
                checkPinReset();
                fillVerificationCode();
            });
            wait200();
            withModal('ResetCredentialsModal').should('be.visible');
        });

        it('should validate restore credentials form', () => {
            goToRestoreCredentialsForm();

            withModal('ResetCredentialsModal', () => {
                cy.getByTestId(CyTestId.Button.Submit).as('submitButton');
                validateLoginField();
                validatePasswordField();
                validateConfirmPasswordField();
                cy.getByTestId(CyTestId.Button.Close).click();
            });

            cy.get('@ResetCredentialsModal').should('not.exist');
        });

        it('should show success message on reset success 200', () => {
            goToRestoreCredentialsForm();

            const wait200 = interceptRequest({
                endpoint: ApiEndpoints.ResetCredentials,
                statusCode: 200,
                alias: 'resetCredentials200',
                delay: 4000,
                withLoader: true,
                expectedBody: {
                    email: VALIDATION_PASS_VALUE.Email,
                    login: VALIDATION_PASS_VALUE.Login,
                    password: VALIDATION_PASS_VALUE.Password,
                    passwordConfirm: VALIDATION_PASS_VALUE.Password,
                },
            });

            withModal('ResetCredentialsModal', () => {
                fillCredentialsForm();
                cy.getByTestId(CyTestId.Input.PasswordConfirm).type('{enter}');
            });
            wait200();
            cy.get('@ResetCredentialsModal').should('not.exist');

            checkToastMessage({
                ...TOAST_MESSAGE.RestoreCredentials[200],
                callback: () => takeAllScreenshots('reset-credentials-modal-success'),
            });
        });

        it('should show error message on reset credentials 500 server error', () => {
            goToRestoreCredentialsForm();

            const wait500 = interceptRequest({
                endpoint: ApiEndpoints.ResetCredentials,
                statusCode: 500,
                alias: 'resetCredentials500',
            });

            withModal('ResetCredentialsModal', () => {
                fillCredentialsForm();
                cy.getByTestId(CyTestId.Button.Submit).click();
            });
            wait500();

            checkToastMessage({
                ...TOAST_MESSAGE.ServerErrorToast,
                callback: () => takeAllScreenshots('reset-credentials-modal-server-error'),
            });
        });
    });
});
