/// <reference types="cypress" />
import { RouteMatcherOptions, StaticResponseWithOptions } from 'cypress/types/net-stubbing';

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
            overwrite: true,
            scale: false,
        });
        cy.get('body').then(($body) => {
            $body[0].style.setProperty('margin-right', 'auto');
        });
    });
}

const takeAllScreenshots = (key: string) => {
    (['desktop', 'tablet', 'mobile'] as const).forEach((device) => takeScreenshot(key, device));
};

const API_BASE_URL = 'https://marathon-api.clevertec.ru';
const VERIFICATION_CODE_PIN_ID = [1, 2, 3, 4, 5, 6];
const INPUT_OVER_50 = 'А'.repeat(51);
const VERIFICATION_ROUTE = '/verification';
const ACCESS_TOKEN_HEADER = ['Authentication-Access', 'access_token'];
const SIGN_UP_LOGIN_CONFLICT_MESSAGE = 'Пользователь с таким login уже существует.';
const SIGN_UP_EMAIL_CONFLICT_MESSAGE = 'Пользователь с таким email уже существует.';

const TEST_ID = {
    Header: 'header',
    Footer: 'footer',
    Nav: 'nav',
    AppLoader: 'app-loader',
    SearchBlockLoader: 'loader-search-block',
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
        Search: 'search-input',
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
        Submit: 'submit-button',
        Repeat: 'repeat-button',
        Close: 'close-button',
        Search: 'search-button',
        Filter: 'filter-button',

        BurgerOpen: 'hamburger-icon',
        BurgerClose: 'close-icon',

        ForgotPassword: 'forgot-password',
        PasswordVisibility: 'password-visibility-button',

        AlergenMenu: 'allergens-menu-button',
        FilterCategory: 'filter-menu-button-категория',
        FindRecipe: 'find-recipe-button',
        AddAlergen: 'add-allergen-button',
        AddOtherAlergen: 'add-other-allergen',
        FilterAlergen: 'allergens-menu-button-filter',
        CloseAlert: 'close-alert-button',
        LoadMore: 'load-more-button',
    },
    Link: {
        Jusiest: 'juiciest-link',
        JusiestMob: 'juiciest-link-mobile',
        Vegan: 'vegan-cuisine',
        ErrorHomePage: 'error-page-go-home',
    },
    Drawer: {
        Filter: 'filter-drawer',
    },
    Card: {
        Food: 'food-card',
        Carousel: 'carousel-card',
    },
    Switch: {
        AlergenSwitcher: 'allergens-switcher',
        AlergenSwitchFilter: 'allergens-switcher-filter',
    },
    Checkbox: {
        Vegan: 'checkbox-веганская кухня',
    },
    Tag: {
        Filter: 'filter-tag',
    },
    Notification: {
        Error: 'error-notification',
    },
} as const;

export const API_ENDPOINTS = {
    SignIn: '/auth/login',
    SignUp: '/auth/signup',
    RefreshToken: '/auth/refresh',
    SendVerificationCode: '/auth/forgot-password',
    CheckVerificationCode: '/auth/verify-otp',
    ResetCredentials: '/auth/reset-password',
    CheckAuth: '/auth/check-auth',

    Category: '/category',
    Recipe: '/recipe',
    RecipeByCategory: '/recipe/category',
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

const interceptApi = (
    {
        method = 'GET',
        url,
        alias = 'nameless',
        ...restMatcher
    }: RouteMatcherOptions & { alias?: string },
    {
        statusCode,
        body = {},
        expectedBody,
        withLoader = false,
        delay = withLoader ? 5000 : 1000,
        ...restResponse
    }: StaticResponseWithOptions & { withLoader?: boolean; expectedBody?: object },
) => {
    cy.intercept(
        {
            url: `${API_BASE_URL}${url}`,
            method,
            ...restMatcher,
        },
        {
            statusCode,
            body,
            delay,
            ...restResponse,
        },
    ).as(alias);

    if (expectedBody) {
        return () => {
            const wait = () =>
                cy.wait(`@${alias}`).then((interception) => {
                    expect(interception.request.body).to.deep.equal(expectedBody);
                });

            if (withLoader) {
                cy.getByTestId(TEST_ID.AppLoader, { timeout: 5000 }).should('be.visible');
                wait();
                cy.getByTestId(TEST_ID.AppLoader).should('not.exist');
            } else {
                wait();
            }
        };
    }

    return () => {
        const wait = () => cy.wait(`@${alias}`);

        if (withLoader) {
            cy.getByTestId(TEST_ID.AppLoader, { timeout: 5000 }).should('be.visible');
            wait();
            cy.getByTestId(TEST_ID.AppLoader).should('not.exist');
        } else {
            wait();
        }
    };
};

const checkToastMessage = ({
    title,
    description = '',
    callback = () => {},
}: {
    id: string;
    title: string;
    description?: string;
    callback?: () => void;
}) => {
    cy.getByTestId(TEST_ID.Notification.Error, { timeout: 5000 })
        .as('toastMessage')
        .should('have.length', 1)
        .should('exist')
        .should('be.visible')
        .should('contain', title)
        .should('contain', description);

    callback();

    cy.get('@toastMessage').within(() => {
        cy.getByTestId(TEST_ID.Button.CloseAlert).click();
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
    cy.getByTestId(TEST_ID.Input.FirstName).as('firstNameInput');
    cy.getByTestId(TEST_ID.Input.LastName).as('lastNameInput').type(VALIDATION_PASS_VALUE.LastName);

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
    cy.getByTestId(TEST_ID.Input.LastName).as('lastNameInput');
    cy.getByTestId(TEST_ID.Input.FirstName)
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
    cy.getByTestId(TEST_ID.Input.Email).as('emailInput');

    EMAIL_VALIDATION.forEach(([value, message]) => validateField('@emailInput', value, message));

    cy.get('@emailInput').clear().type(VALIDATION_TO_TRIM_VALUE.Email).blur();
    cy.get('@emailInput').should('have.value', VALIDATION_PASS_VALUE.Email);

    cy.get('@submitButton').click();
    cy.contains(VALIDATION_MESSAGE.Email.Pattern).should('not.exist');
    cy.contains(VALIDATION_MESSAGE.MaxLength).should('not.exist');
};

const validateLoginField = () => {
    cy.getByTestId(TEST_ID.Input.Login).as('loginInput');
    cy.getByTestId(TEST_ID.Input.Password).as('passwordInput').type(VALIDATION_PASS_VALUE.Password);

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
    cy.getByTestId(TEST_ID.Input.Password).as('passwordInput');
    cy.getByTestId(TEST_ID.Input.Login).type(VALIDATION_PASS_VALUE.Login);

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
    cy.getByTestId(TEST_ID.Input.PasswordConfirm).as('passwordConfirmInput');
    cy.getByTestId(TEST_ID.Input.Password).type(VALIDATION_PASS_VALUE.Password);

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
    login: string = VALIDATION_TO_TRIM_VALUE.Login,
    password = VALIDATION_PASS_VALUE.Password,
) => {
    cy.getByTestId(TEST_ID.Input.Login).type(login);
    cy.getByTestId(TEST_ID.Input.Password).type(password);
};

const fillPersonalInfoForm = (
    firstName = VALIDATION_TO_TRIM_VALUE.FirstName,
    lastName = VALIDATION_TO_TRIM_VALUE.LastName,
    email = VALIDATION_TO_TRIM_VALUE.Email,
) => {
    cy.getByTestId(TEST_ID.Input.FirstName).type(firstName);
    cy.getByTestId(TEST_ID.Input.LastName).type(lastName);
    cy.getByTestId(TEST_ID.Input.Email).type(email);
};

const fillCredentialsForm = (
    login = VALIDATION_TO_TRIM_VALUE.Login,
    password = VALIDATION_PASS_VALUE.Password,
    confirmPassword = password,
) => {
    cy.getByTestId(TEST_ID.Input.Login).type(login);
    cy.getByTestId(TEST_ID.Input.Password).type(password);
    cy.getByTestId(TEST_ID.Input.PasswordConfirm).type(confirmPassword);
};

const fillSignUpForm = () => {
    fillPersonalInfoForm();
    cy.getByTestId(TEST_ID.Button.Submit).click();
    fillCredentialsForm();
};

const fillVerificationCode = () => {
    VERIFICATION_CODE_PIN_ID.forEach((id) =>
        cy
            .getByTestId(`${TEST_ID.Input.VerificationCode}-${id}`)
            .as(`verificationCodeFirst_${id}`)
            .type(String(id)),
    );
};

const withModal = (modalKey: keyof typeof TEST_ID.Modal, callback = () => {}) => {
    cy.wait(2000);
    return cy
        .getByTestId(TEST_ID.Modal[modalKey], { timeout: 5000 })
        .as(`${modalKey}`)
        .within(callback);
};

const goToCheckVerificationCode = () => {
    const wait = interceptApi(
        {
            url: API_ENDPOINTS.SendVerificationCode,
            method: 'POST',
            alias: 'sendVerificationCode200',
        },
        { statusCode: 200 },
    );

    withModal('SendEmailModal', () => {
        cy.getByTestId(TEST_ID.Input.Email).type(`${VALIDATION_PASS_VALUE.Email}{enter}`);
    });

    wait();
};

const goToRestoreCredentialsForm = () => {
    goToCheckVerificationCode();

    const wait = interceptApi(
        {
            url: API_ENDPOINTS.CheckVerificationCode,
            method: 'POST',
            alias: 'checkVerificationCode200',
        },
        {
            statusCode: 200,
        },
    );

    withModal('VerificationCodeModal', () => {
        fillVerificationCode();
    });

    wait();
};

describe('authorization', () => {
    beforeEach(() => {
        cy.clearLocalStorage();
        cy.clearAllSessionStorage();
        interceptApi({ url: '/**', alias: 'uncaptured' }, { statusCode: 200, delay: 0 });

        interceptApi(
            { url: API_ENDPOINTS.RefreshToken, alias: 'refreshToken500' },
            { statusCode: 500, delay: 0 },
        );

        interceptApi(
            { url: API_ENDPOINTS.CheckAuth, alias: 'checkAuth403' },
            { statusCode: 403, delay: 0 },
        );

        cy.visit('/');
    });

    describe('sign in flow', () => {
        beforeEach(() => {
            cy.getByTestId(TEST_ID.Form.SignIn).as('signInForm');
            cy.getByTestId(TEST_ID.Input.Login).as('loginInput');
            cy.getByTestId(TEST_ID.Input.Password).as('passwordInput');
            cy.getByTestId(TEST_ID.Button.Submit).as('submitButton');
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

                cy.getByTestId(TEST_ID.Button.PasswordVisibility).then(($toggle) => {
                    cy.wrap($toggle).trigger('mousedown');
                    cy.get('@passwordInput').should('have.attr', 'type', 'text');
                    cy.wrap($toggle).trigger('mouseup');
                    cy.get('@passwordInput').should('have.attr', 'type', 'password');
                });
            });
        });

        it('should display error message for 401 invalid credentials', () => {
            cy.viewport(...RESOLUTION.mobile);

            interceptApi(
                {
                    url: API_ENDPOINTS.SignIn,
                    method: 'POST',
                    alias: 'signInRequest401',
                },
                {
                    statusCode: 401,
                },
            );

            cy.get('@signInForm').within(() => {
                fillSignInForm();
                cy.get('@passwordInput').type('{enter}');
            });
            cy.wait('@signInRequest401');

            checkToastMessage({
                ...TOAST_MESSAGE.SignInToast[401],
                callback: () => takeAllScreenshots('sign-in-invalid-credentials'),
            });
        });

        it('should display error message for 403 email is not verified', () => {
            interceptApi(
                {
                    url: API_ENDPOINTS.SignIn,
                    method: 'POST',
                    alias: 'signInRequest403',
                },
                {
                    statusCode: 403,
                },
            );

            cy.get('@signInForm').within(() => {
                fillSignInForm();
                cy.get('@passwordInput').type('{enter}');
            });
            cy.wait('@signInRequest403');

            checkToastMessage(TOAST_MESSAGE.SignInToast[403]);
        });

        it('should display error modal for 500 server error', () => {
            const wait500 = interceptApi(
                {
                    url: API_ENDPOINTS.SignIn,
                    method: 'POST',
                    alias: 'signInRequest500',
                },
                {
                    statusCode: 500,
                },
            );

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
                cy.getByTestId(TEST_ID.Button.Close).click();
            });

            cy.getByTestId(TEST_ID.Modal.SignInError).should('not.exist');
        });

        it('should send new request on server error retry button', () => {
            cy.viewport(...RESOLUTION.mobile);

            const wait500 = interceptApi(
                {
                    url: API_ENDPOINTS.SignIn,
                    method: 'POST',
                    alias: 'signInRequest500',
                },
                {
                    statusCode: 500,
                    delay: 0,
                },
            );

            cy.get('@signInForm').within(() => {
                fillSignInForm();
                cy.get('@passwordInput').type('{enter}');
            });
            wait500();

            const wait200 = interceptApi(
                {
                    url: API_ENDPOINTS.SignIn,
                    method: 'POST',
                    alias: 'signInRequest200',
                },
                {
                    statusCode: 200,
                    headers: {
                        'Access-Control-Expose-Headers': ACCESS_TOKEN_HEADER[0],
                        [ACCESS_TOKEN_HEADER[0]]: ACCESS_TOKEN_HEADER[1],
                    },
                },
            );

            withModal('SignInError', () => {
                cy.getByTestId(TEST_ID.Button.Repeat).click();
            });
            wait200();

            cy.wait('@uncaptured');
            cy.contains('Приятного аппетита!').should('be.visible');
        });

        it('should navigate to main page on sign in success', () => {
            const wait200 = interceptApi(
                {
                    url: API_ENDPOINTS.SignIn,
                    method: 'POST',
                    alias: 'signInRequest200',
                },
                {
                    statusCode: 200,
                    withLoader: true,
                    headers: {
                        'Access-Control-Expose-Headers': ACCESS_TOKEN_HEADER[0],
                        [ACCESS_TOKEN_HEADER[0]]: ACCESS_TOKEN_HEADER[1],
                    },
                    expectedBody: {
                        login: VALIDATION_PASS_VALUE.Login,
                        password: VALIDATION_PASS_VALUE.Password,
                    },
                },
            );

            cy.get('@signInForm').within(() => {
                fillSignInForm();
                cy.get('@passwordInput').type('{enter}');
            });
            cy.wait(500);
            takeScreenshot('sign-in-loader');
            wait200();
            cy.wait('@uncaptured');
            cy.contains('Приятного аппетита!').should('be.visible');
        });
    });

    describe('sign up flow', () => {
        beforeEach(() => {
            cy.contains('Регистрация').click();
            cy.reload();

            cy.getByTestId(TEST_ID.Form.SignUp).as('signUpForm');
            cy.getByTestId(TEST_ID.Button.Submit).as('submitButton');
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
            cy.getByTestId(TEST_ID.Progress.SignUp).as('signUpProgress');
            cy.getByTestId(TEST_ID.Input.FirstName).as('firstNameInput');
            cy.getByTestId(TEST_ID.Input.LastName).as('lastNameInput');
            cy.getByTestId(TEST_ID.Input.Email).as('emailInput');

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

            cy.getByTestId(TEST_ID.Input.Login).as('loginInput');
            cy.getByTestId(TEST_ID.Input.Password).as('passwordInput');
            cy.getByTestId(TEST_ID.Input.PasswordConfirm).as('passwordConfirmInput');

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

            interceptApi(
                {
                    url: API_ENDPOINTS.SignUp,
                    method: 'POST',
                    alias: 'signUpRequest500',
                },
                {
                    statusCode: 500,
                },
            );

            cy.getByTestId(TEST_ID.Button.Submit).click();
            cy.wait('@signUpRequest500');

            checkToastMessage({
                ...TOAST_MESSAGE.ServerErrorToast,
                callback: () => takeAllScreenshots('sign-up-server-error'),
            });
        });

        it('should display errors messages on email and login conflicts', () => {
            fillSignUpForm();

            const waitLogin400 = interceptApi(
                {
                    url: API_ENDPOINTS.SignUp,
                    method: 'POST',
                    alias: 'signUpRequest400',
                },
                {
                    statusCode: 400,
                    body: {
                        message: SIGN_UP_LOGIN_CONFLICT_MESSAGE,
                        statusCode: 400,
                    },
                    delay: 0,
                },
            );

            cy.getByTestId(TEST_ID.Button.Submit).click();
            waitLogin400();

            checkToastMessage({
                ...TOAST_MESSAGE.SignUpToast[400],
                title: SIGN_UP_LOGIN_CONFLICT_MESSAGE,
                callback: () => takeScreenshot('sign-up-login-conflict', 'tablet'),
            });

            const waitEmail400 = interceptApi(
                {
                    url: API_ENDPOINTS.SignUp,
                    method: 'POST',
                    alias: 'signUpRequest400',
                },
                {
                    statusCode: 400,
                    body: {
                        message: SIGN_UP_EMAIL_CONFLICT_MESSAGE,
                        statusCode: 400,
                    },
                    delay: 0,
                },
            );

            cy.getByTestId(TEST_ID.Button.Submit).click();
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

            interceptApi(
                {
                    url: API_ENDPOINTS.SignUp,
                    method: 'POST',
                    alias: 'signUpRequest200',
                },
                {
                    statusCode: 200,
                    withLoader: true,
                    expectedBody: {
                        login: VALIDATION_PASS_VALUE.Login,
                        password: VALIDATION_PASS_VALUE.Password,
                        confirmPassword: VALIDATION_PASS_VALUE.Password,
                        firstName: VALIDATION_PASS_VALUE.FirstName,
                        lastName: VALIDATION_PASS_VALUE.LastName,
                        email: VALIDATION_PASS_VALUE.Email,
                    },
                },
            );

            cy.getByTestId(TEST_ID.Button.Submit).click();
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
                cy.getByTestId(TEST_ID.Button.Close).click();
            });

            cy.getByTestId(TEST_ID.Modal.SignUpSuccess).should('not.exist');
            cy.getByTestId(TEST_ID.Form.SignIn).should('be.visible');
        });
    });

    describe('email verification flow', () => {
        it('should show success message on email verification success', () => {
            cy.visit(`${VERIFICATION_ROUTE}?emailVerified=true`);

            checkToastMessage({
                ...TOAST_MESSAGE.EmailVerificationToast[200],
                callback: () => takeAllScreenshots('verificate-email-success'),
            });
            cy.getByTestId(TEST_ID.Form.SignIn).should('be.visible');
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
                cy.getByTestId(TEST_ID.Button.Close).click();
            });

            cy.getByTestId(TEST_ID.Modal.EmailVerificationFailed).should('not.exist');
            cy.getByTestId(TEST_ID.Form.SignUp).should('be.visible');
        });
    });

    describe('restore credentials flow', () => {
        beforeEach(() => {
            cy.getByTestId(TEST_ID.Button.ForgotPassword).as('forgotPasswordButton').click();
        });

        it('should open send verification email modal', () => {
            withModal('SendEmailModal', () => {
                cy.contains(
                    'Для восстановления входа введите ваш e-mail, куда можно отправить уникальный код',
                ).should('be.visible');
                cy.contains('Получить код').should('be.visible');
                cy.getByTestId(TEST_ID.Input.Email).type(VALIDATION_PASS_VALUE.Email);
                cy.getByTestId(TEST_ID.Button.Close).click();
            });

            cy.get('@SendEmailModal').should('not.exist');
            cy.get('@forgotPasswordButton').click();
            cy.get('@SendEmailModal', { timeout: 5000 }).should('be.visible');

            withModal('SendEmailModal', () => {
                cy.getByTestId(TEST_ID.Input.Email).should('have.value', '');
            });
        });

        it('should validate send verification form email field', () => {
            const wait = interceptApi(
                {
                    url: API_ENDPOINTS.SendVerificationCode,
                    method: 'POST',
                    alias: 'sendVerificationCode200',
                },
                {
                    statusCode: 200,
                },
            );

            withModal('SendEmailModal', () => {
                cy.getByTestId(TEST_ID.Button.Submit).as('submitButton');
                validateEmailField();
            });
            wait();
        });

        it('should show error message on email 403 existance fail', () => {
            const wait = interceptApi(
                {
                    url: API_ENDPOINTS.SendVerificationCode,
                    method: 'POST',
                    alias: 'sendVerificationCode403',
                },
                {
                    statusCode: 403,
                },
            );

            withModal('SendEmailModal', () => {
                cy.getByTestId(TEST_ID.Input.Email).type(`${VALIDATION_PASS_VALUE.Email}{enter}`);
            });
            wait();

            cy.getByTestId(TEST_ID.Input.Email).should('have.value', '');
            checkToastMessage({
                ...TOAST_MESSAGE.SendVerificationCodeToast[403],
                callback: () => takeAllScreenshots('send-email-modal-not-exist'),
            });
        });

        it('should show error message on send code 500 server error', () => {
            const wait = interceptApi(
                {
                    url: API_ENDPOINTS.SendVerificationCode,
                    method: 'POST',
                    alias: 'sendVerificationCode500',
                },
                {
                    statusCode: 500,
                },
            );

            withModal('SendEmailModal', () => {
                cy.getByTestId(TEST_ID.Input.Email).type(`${VALIDATION_PASS_VALUE.Email}{enter}`);
            });
            wait();
            cy.getByTestId(TEST_ID.Input.Email).type(`${VALIDATION_PASS_VALUE.Email}{enter}`);
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
                cy.getByTestId(TEST_ID.Button.Close).click();
            });

            cy.get('@VerificationCodeModal').should('not.exist');
            cy.get('@forgotPasswordButton').click();

            withModal('SendEmailModal', () => {
                cy.getByTestId(TEST_ID.Input.Email).should('have.value', '');
            });
        });

        it('should handle verification code validation', () => {
            goToCheckVerificationCode();

            const wait403 = interceptApi(
                {
                    url: API_ENDPOINTS.CheckVerificationCode,
                    method: 'POST',
                    alias: 'checkVerificationCode403',
                },
                { statusCode: 403 },
            );

            withModal('VerificationCodeModal', () => {
                fillVerificationCode();
            });

            takeScreenshot('verification-code-modal', 'tablet');
            wait403();
            takeScreenshot('verification-code-modal', 'mobile');

            const wait500 = interceptApi(
                {
                    url: API_ENDPOINTS.CheckVerificationCode,
                    method: 'POST',
                    alias: 'checkVerificationCode500',
                },
                { statusCode: 500 },
            );

            const checkPinReset = () => {
                VERIFICATION_CODE_PIN_ID.forEach((id) => {
                    cy.getByTestId(`${TEST_ID.Input.VerificationCode}-${id}`).should(
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

            const wait200 = interceptApi(
                {
                    url: API_ENDPOINTS.CheckVerificationCode,
                    method: 'POST',
                    alias: 'checkVerificationCode200',
                },
                {
                    statusCode: 200,
                    withLoader: true,
                },
            );

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
                cy.getByTestId(TEST_ID.Button.Submit).as('submitButton');
                validateLoginField();
                validatePasswordField();
                validateConfirmPasswordField();
                cy.getByTestId(TEST_ID.Button.Close).click();
            });

            cy.get('@ResetCredentialsModal').should('not.exist');
        });

        it('should show success message on reset success 200', () => {
            goToRestoreCredentialsForm();

            const wait200 = interceptApi(
                {
                    url: API_ENDPOINTS.ResetCredentials,
                    method: 'POST',
                    alias: 'resetCredentials200',
                },
                {
                    statusCode: 200,
                    withLoader: true,
                    expectedBody: {
                        email: VALIDATION_PASS_VALUE.Email,
                        login: VALIDATION_PASS_VALUE.Login,
                        password: VALIDATION_PASS_VALUE.Password,
                        passwordConfirm: VALIDATION_PASS_VALUE.Password,
                    },
                },
            );

            withModal('ResetCredentialsModal', () => {
                fillCredentialsForm();
                cy.getByTestId(TEST_ID.Input.PasswordConfirm).type('{enter}');
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

            const wait500 = interceptApi(
                {
                    url: API_ENDPOINTS.ResetCredentials,
                    method: 'POST',
                    alias: 'resetCredentials500',
                },
                { statusCode: 500 },
            );

            withModal('ResetCredentialsModal', () => {
                fillCredentialsForm();
                cy.getByTestId(TEST_ID.Button.Submit).click();
            });
            wait500();

            checkToastMessage({
                ...TOAST_MESSAGE.ServerErrorToast,
                callback: () => takeAllScreenshots('reset-credentials-modal-server-error'),
            });
        });
    });
});

const SEARCH_PARAMS = {
    CREATED_AT_SORT: 'createdAt',
    LIKES_SORT: 'likes',
    SORT_QUERY: 'sortBy',
    SEARCH_QUERY: 'searchString',
    SUBCATEGORIES_QUERY: 'subcategoriesIds',
    GARNISH_QUERY: 'garnish',
    ALLERGENS_QUERY: 'allergens',
    LIMIT_QUERY: 'limit',
};

const DELAY = {
    SM: 300,
    LG: 1000,
    LOAD: 700,
};

const SLIDER_SIZE = '10';
const DEFAULT_RECIPE_LIMIT = 8;
const JUICIEST_LIMIT = '4';
const RELEVANT_KITCHEN_LIMIT = '5';

const setElementPosition = () => {
    cy.getByTestId(TEST_ID.Header).invoke('css', 'position', 'absolute');
    cy.getByTestId(TEST_ID.Footer).invoke('css', 'position', 'absolute');
};

const CATEGORIES_RESPONSE = [
    {
        _id: '67c46e93f51967aa8390beeb',
        title: 'Закуски',
        description:
            'Небольшое вступление к основным блюдам, основная роль которого — возбудить аппетит, — вот классическое определение закуски. Но для русского стола закуска — это нечто большее.',
        category: 'snacks',
        icon: '/media/icons/f3c309e1-b701-4ebc-bdf3-f388f51e8d67.svg',
        subCategories: [
            {
                _id: '67c46eb2f51967aa8390beec',
                title: 'Мясные закуски',
                category: 'meat-snacks',
                rootCategoryId: '67c46e93f51967aa8390beeb',
            },
            {
                _id: '67c46ec4f51967aa8390beed',
                title: 'Рыбные закуски',
                category: 'fish-snacks',
                rootCategoryId: '67c46e93f51967aa8390beeb',
            },
            {
                _id: '67c46ed2f51967aa8390beee',
                title: 'Овощные закуски',
                category: 'vegetables-snacks',
                rootCategoryId: '67c46e93f51967aa8390beeb',
            },
        ],
    },
    {
        _id: '67c46eb2f51967aa8390beec',
        title: 'Мясные закуски',
        category: 'meat-snacks',
        rootCategoryId: '67c46e93f51967aa8390beeb',
    },
    {
        _id: '67c46ec4f51967aa8390beed',
        title: 'Рыбные закуски',
        category: 'fish-snacks',
        rootCategoryId: '67c46e93f51967aa8390beeb',
    },
    {
        _id: '67c46ed2f51967aa8390beee',
        title: 'Овощные закуски',
        category: 'vegetables-snacks',
        rootCategoryId: '67c46e93f51967aa8390beeb',
    },
    {
        _id: '67c46dc5f51967aa8390bee6',
        title: 'Салаты',
        description:
            'В том виде и разнообразии, к которому мы привыкли, салаты существуют только в России и нигде больше. Чем закусывать первую рюмку?',
        category: 'salads',
        icon: '/media/icons/3580fd20-e2dd-469c-b886-652c00d35c37.svg',
        subCategories: [
            {
                _id: '67c46df5f51967aa8390bee7',
                title: 'Мясные салаты',
                category: 'meat-salads',
                rootCategoryId: '67c46dc5f51967aa8390bee6',
            },
            {
                _id: '67c46e19f51967aa8390bee8',
                title: 'Рыбные салаты',
                category: 'fish-salads',
                rootCategoryId: '67c46dc5f51967aa8390bee6',
            },
            {
                _id: '67c46e2bf51967aa8390bee9',
                title: 'Овощные салаты',
                category: 'vegetables-salads',
                rootCategoryId: '67c46dc5f51967aa8390bee6',
            },
        ],
    },
    {
        _id: '67c46df5f51967aa8390bee7',
        title: 'Мясные салаты',
        category: 'meat-salads',
        rootCategoryId: '67c46dc5f51967aa8390bee6',
    },
    {
        _id: '67c46e19f51967aa8390bee8',
        title: 'Рыбные салаты',
        category: 'fish-salads',
        rootCategoryId: '67c46dc5f51967aa8390bee6',
    },
    {
        _id: '67c46e2bf51967aa8390bee9',
        title: 'Овощные салаты',
        category: 'vegetables-salads',
        rootCategoryId: '67c46dc5f51967aa8390bee6',
    },
    {
        _id: '67c48d99d02fb83fc3d8100f',
        title: 'Веганская кухня',
        description:
            'Веганская кухня предлагает бесчисленное множество вариантов блюд, включая разнообразные супы, салаты, гарниры, основные блюда и десерты, приготовленные из самых разнообразных растительных ингредиентов.',
        category: 'vegan',
        icon: '/media/icons/008376c0-9516-4e38-993d-f2a19b32c78c.svg',
        subCategories: [
            {
                _id: '67c48e627b493acd8a41030c',
                title: 'Закуски',
                category: 'snacks',
                rootCategoryId: '67c48d99d02fb83fc3d8100f',
            },

            {
                _id: '67c48f60ed67ca980917d64e',
                title: 'Гарниры',
                category: 'side-dishes',
                rootCategoryId: '67c48d99d02fb83fc3d8100f',
            },
            {
                _id: '67c48f6ded67ca980917d64f',
                title: 'Десерты',
                category: 'desserts',
                rootCategoryId: '67c48d99d02fb83fc3d8100f',
            },
        ],
    },
    {
        _id: '67c48e627b493acd8a41030c',
        title: 'Закуски',
        category: 'snacks',
        rootCategoryId: '67c48d99d02fb83fc3d8100f',
    },

    {
        _id: '67c48f60ed67ca980917d64e',
        title: 'Гарниры',
        category: 'side-dishes',
        rootCategoryId: '67c48d99d02fb83fc3d8100f',
    },
    {
        _id: '67c48f6ded67ca980917d64f',
        title: 'Десерты',
        category: 'desserts',
        rootCategoryId: '67c48d99d02fb83fc3d8100f',
    },
];

const meatSnacks = [
    {
        _id: '67d5a8bdc3df99732a05d330',
        createdAt: '2025-03-15T16:20:13.090Z',
        title: 'Куриные ножки в соево-медовом соусе',
        description: 'Курица получается очень вкусная даже без предварительного маринования.',
        time: 35,
        image: '/media/images/0b088a8a-69e5-472c-8ffc-83a90f382bd1.webp',
        likes: 0,
        views: 0,
        bookmarks: 0,
        portions: 3,
        authorId: '357',
        categoriesIds: ['67c46eb2f51967aa8390beec', '67c46ee5f51967aa8390beef'],
        steps: [
            {
                stepNumber: 1,
                description: 'Обжариваем слегка ножки на среднем огне.',
                image: '',
            },
            {
                stepNumber: 2,
                description: 'Готовим соус, смешав все ингредиенты.',
                image: '',
            },
            {
                stepNumber: 3,
                description: 'Заливаем ножки соусом.',
                image: '',
            },
            {
                stepNumber: 4,
                description: 'Тушим на маленьком огне минут десять, не забывая перевернуть мясо.',
                image: '',
            },
        ],
        nutritionValue: {
            calories: 339,
            protein: 31,
            fats: 16,
            carbohydrates: 21,
        },
        ingredients: [
            {
                title: 'Куриные ножки',
                count: 3,
                measureUnit: 'шт',
            },
            {
                title: 'Соевый соус',
                count: 6,
                measureUnit: 'столовых ложек',
            },
            {
                title: 'Кетчуп',
                count: 4,
                measureUnit: 'столовые ложки',
            },
            {
                title: 'Чеснок',
                count: 4,
                measureUnit: 'зубчика',
            },
            {
                title: 'Соль',
                count: 1,
                measureUnit: 'г',
            },
            {
                title: 'Молотый черный перец',
                count: 1,
                measureUnit: 'г',
            },
        ],
    },
    {
        _id: '67d5b91fc3df99732a05d344',
        createdAt: '2025-03-15T17:30:07.801Z',
        title: 'Паровой куриный рулет с мандаринами и черносливом',
        description:
            'Главная прелесть этого рулета заключается в том, что начинка в нем может быть какой угодно: овощной, грибной, или как тут — фруктовой.',
        time: 40,
        image: '/media/images/0163d6a5-07ba-4838-997c-abad3d3b4aa4.jpg',
        likes: 0,
        views: 0,
        bookmarks: 0,
        portions: 10,
        authorId: '357',
        categoriesIds: ['67c46eb2f51967aa8390beec'],
        steps: [
            {
                stepNumber: 1,
                description:
                    'Чернослив избавить от косточек, залить кипятком и оставить на час-полтора, чтобы он хорошо пропитался. Мандарины тщательно очистить от кожуры и пленок, разделить на дольки.',
                image: '/media/images/81b315d9-fe55-4970-9098-83de6e301233.webp',
            },
            {
                stepNumber: 2,
                description:
                    'Разрезать куриное филе вдоль на две части. Полученные куски выложить внахлест на разделочную доску, покрытую пищевой пленкой, и хорошенько отбить, особенно в местах, где куски соединяются. Слегка посолить и поперчить мясо.',
                image: '/media/images/44ac5c0d-2af8-449a-8d9d-fd26f361ddb3.webp',
            },
            {
                stepNumber: 3,
                description:
                    'Грецкие орехи порубить острым ножом или смолоть в блендере. Половиной получившихся ореховых крошек равномерно посыпать отбитое и приправленное мясо.',
                image: '/media/images/0fdf2848-78cd-45b4-a5bb-3c95942a7386.webp',
            },
        ],
        nutritionValue: {
            calories: 185,
            protein: 20,
            fats: 8,
            carbohydrates: 8,
        },
        ingredients: [
            {
                title: 'Куриное филе',
                count: 4,
                measureUnit: 'шт',
            },
            {
                title: 'Мандарины',
                count: 3,
                measureUnit: 'шт',
            },
            {
                title: 'Толченые грецкие орехи',
                count: 100,
                measureUnit: 'г',
            },
        ],
    },
];

const fishSnacks = [
    {
        _id: '67d5a5a2c3df99732a05d32e',
        createdAt: '2025-03-15T16:06:58.955Z',
        title: 'Рулеты с семгой в лаваше',
        description:
            'Тут в лаваш заворачивают конкретно семгу — жирную, чуть сладковатую, очень вкусную.',
        time: 10,
        image: '/media/images/f0330098-14b5-4485-9e1d-256d1a3f8882.jpg',
        likes: 0,
        views: 0,
        bookmarks: 0,
        portions: 4,
        authorId: '357',
        categoriesIds: ['67c46ec4f51967aa8390beed'],
        steps: [
            {
                stepNumber: 1,
                description: 'Мелко порубить зеленый лук и укроп.',
                image: '',
            },
            {
                stepNumber: 2,
                description:
                    'Сливочный сыр переложить в миску и смешать с луком, укропом и лимонным соком.',
                image: '',
            },
            {
                stepNumber: 3,
                description: 'Семгу (рыба должна быть слабосоленой) нарезать тонкими пластами.',
                image: '',
            },
            {
                stepNumber: 4,
                description:
                    'Раскатать пласт лаваша, смазать его полученной пастой из сыра, а сверху выложить плотным слоем нарезанную семгу.',
                image: '',
            },
        ],
        nutritionValue: {
            calories: 260,
            protein: 16,
            fats: 21,
            carbohydrates: 13,
        },
        ingredients: [
            {
                title: 'Семга',
                count: 200,
                measureUnit: 'г',
            },
            {
                title: 'Сливочный сыр',
                count: 250,
                measureUnit: 'г',
            },
            {
                title: 'Укроп',
                count: 1,
                measureUnit: 'пучок',
            },
            {
                title: 'Зеленый лук',
                count: 1,
                measureUnit: 'пучок',
            },
            {
                title: 'Лимонный сок',
                count: 1,
                measureUnit: 'столовая ложка',
            },
            {
                title: 'Армянский лаваш',
                count: 1,
                measureUnit: 'штука',
            },
        ],
    },
    {
        _id: '67d5b511c3df99732a05d339',
        createdAt: '2025-03-15T17:12:49.299Z',
        title: 'Бутербродная паста из тунца',
        description: 'Такую пасту удобно брать с собой - на работу или на пикник.',
        time: 20,
        image: '/media/images/afed880a-d832-45cf-906a-76f9fff1eb1a.webp',
        likes: 0,
        views: 0,
        bookmarks: 0,
        portions: 2,
        authorId: '357',
        categoriesIds: ['67c46ec4f51967aa8390beed'],
        steps: [
            {
                stepNumber: 1,
                description: 'Смешать майонез, горчицу, сахар.',
                image: '',
            },
            {
                stepNumber: 2,
                description:
                    'Тунец вынуть из рассола, размять вилкой. Если он слишком сухой, добавить чуть-чуть рассола.',
                image: '',
            },
        ],
        nutritionValue: {
            calories: 124,
            protein: 17,
            fats: 4,
            carbohydrates: 5,
        },
        ingredients: [
            {
                title: 'Консервированный тунец в собственном соку',
                count: 1,
                measureUnit: 'банка',
            },
            {
                title: 'Легкий майонез',
                count: 3,
                measureUnit: 'столовые ложки',
            },
        ],
    },
];

const vegetablesSnacks = [
    {
        _id: '67d599d0c3df99732a05d328',
        createdAt: '2025-03-15T15:16:32.102Z',
        title: 'Брускетта с помидорами',
        description:
            'Брускетта с помидорами – вкусная итальянская закуска, а также простейший способ положить что-то на зуб, почувствовать легкую сытость, но обойтись при этом без переедания. ',
        time: 10,
        image: '/media/images/3eceebf2-850b-41b4-b6da-789fa1b2c291.jpg',
        likes: 0,
        views: 0,
        bookmarks: 0,
        portions: 4,
        authorId: '357',
        categoriesIds: ['67c46ed2f51967aa8390beee', '67c46efbf51967aa8390bef0'],
        steps: [
            {
                stepNumber: 1,
                description:
                    'Поджарить хлеб на сухой сковородке или в духовке до золотистой корочки. В духовке это займет три-пять минут (в зависимости от размера ломтя хлеба) при температуре 200 градусов.',
                image: '/media/images/dff2b8a4-5910-4a34-a272-d62a9a59e8b4.webp',
            },
            {
                stepNumber: 2,
                description:
                    'Помидоры нарезать кубиками с ребром около полсантиметра. Мелко нарубить три зубчика чеснока.',
                image: '/media/images/115aba7f-32a7-41bf-91d9-a84f84f3f06f.webp',
            },
            {
                stepNumber: 3,
                description:
                    'Разогреть сковороду, плеснуть в нее немного оливкового масла и высыпать в него помидоры и чеснок. Готовить их минуту-другую, просто чтобы прогреть, не потеряв вкуса свежего помидора. Тогда капнуть в сковороду бальзамического крема, перемешать и снять с огня.',
                image: '/media/images/3d669318-421d-403f-955f-d7c87b1e20a4.web',
            },
            {
                stepNumber: 4,
                description:
                    'Поджаренный хлеб пропитать оставшимся оливковым маслом, разлив понемногу на каждый ломоть. Сверху выложить теплые помидоры, посолить по вкусу, посыпать свежемолотым черным перцем и мелко нарезанной зеленью — любой, какая окажется под рукой. ',
                image: '/media/images/1d13f250-f5a1-4f1c-9b82-6a6298c32d12.webp',
            },
        ],
        nutritionValue: {
            calories: 132,
            protein: 2,
            fats: 8,
            carbohydrates: 13,
        },
        ingredients: [
            {
                title: 'Белый хлеб',
                count: 4,
                measureUnit: 'куска',
            },
            {
                title: 'Помидоры',
                count: 3,
                measureUnit: 'шт',
            },
            {
                title: 'Оливковое масло',
                count: 30,
                measureUnit: 'мл',
            },
            {
                title: 'Чеснок',
                count: 3,
                measureUnit: 'зубчика',
            },
            {
                title: 'Бальзамический крем',
                count: 10,
                measureUnit: 'г',
            },
        ],
    },
    {
        _id: '67d5a3a5c3df99732a05d32d',
        createdAt: '2025-03-15T15:58:29.712Z',
        title: 'Гуакамоле',
        description:
            'Гуакамоле как закуска, — или как соус, кому что ближе — традиционно известна в мексиканской кухне, но очень популярна во всем мире. Главное, найти хороший спелый авокадо и непременно размять мякоть с соком лимона',
        time: 20,
        image: '/media/images/f0330098-14b5-4485-9e1d-256d1a3f8882.jpg',
        likes: 0,
        views: 0,
        bookmarks: 0,
        portions: 4,
        authorId: '357',
        categoriesIds: ['67c46ed2f51967aa8390beee'],
        steps: [
            {
                stepNumber: 1,
                description:
                    'Помидоры очистить и мелко нарезать. Чили избавить от семян и измельчить вместе с луком, чесноком и кинзой. В большой ступке пестиком превратить чили, кинзу, помидоры и цедру лайма и лук в однородную пасту. Слегка посолить и снова перемешать.',
                image: '/media/images/845f506d-43ea-42f4-aba8-89fe1f81caaa.webp',
            },
            {
                stepNumber: 2,
                description:
                    'Добавить одну-две столовые ложки воды и сок лайма, чтобы смесь стала более жидкой.',
                image: '/media/images/a181a7a4-f962-46b9-9c70-01064295657d.webp',
            },
            {
                stepNumber: 3,
                description:
                    'Очистить авокадо, удалить косточки, нарезать мякоть небольшими кубиками. Добавить к пасте из чили и помидоров и тщательно все размять. Подавать с кукурузными чипсами',
                image: '/media/images/f06fabd5-d5d4-4569-9755-d91ac995b0b4.webp',
            },
        ],
        nutritionValue: {
            calories: 162,
            protein: 3,
            fats: 12,
            carbohydrates: 8,
        },
        ingredients: [
            {
                title: 'Перец чили',
                count: 1,
                measureUnit: 'шт',
            },
            {
                title: 'Авокадо',
                count: 3,
                measureUnit: 'шт',
            },
            {
                title: 'Помидоры',
                count: 2,
                measureUnit: 'шт',
            },
        ],
    },
    {
        _id: '67d5b32ec3df99732a05d337',
        createdAt: '2025-03-15T17:04:46.059Z',
        title: 'Классический грибной жюльен',
        description:
            'Классический грибной жюльен — еще один результат недопонимания русскими поварами французской кухни. То, что у нас считается блюдом, французы на самом деле называют способом нарезки овощей.',
        time: 40,
        image: '/media/images/9cfad38a-bd0b-46ea-bd49-788bf3782e61.jpg',
        likes: 0,
        views: 0,
        bookmarks: 0,
        portions: 1,
        authorId: '357',
        categoriesIds: ['67c46ed2f51967aa8390beee'],
        steps: [
            {
                stepNumber: 1,
                description:
                    'Измельчить лук и грибы, обжарить с солью и перцем на сливочном масле. Добавить муку и перемешать.',
                image: '/media/images/74d011ce-39ae-4552-9c24-1abf1284e1bc.webp',
            },
            {
                stepNumber: 2,
                description:
                    'Разложить грибную смесь по формочкам, залить сливками, посыпать тертым сыром и запекать в духовке при 180 градусах 20–25 минут.',
                image: '/media/images/e05b690a-6ecf-4c35-8115-eb0a6278a7eb.webp',
            },
        ],
        nutritionValue: {
            calories: 746,
            protein: 22,
            fats: 59,
            carbohydrates: 36,
        },
        ingredients: [
            {
                title: 'Шампиньоны',
                count: 100,
                measureUnit: 'г',
            },
            {
                title: 'Репчатый лук',
                count: 2,
                measureUnit: 'шт',
            },
            {
                title: 'Пшеничная мука',
                count: 1,
                measureUnit: 'чайная ложка',
            },
            {
                title: 'Сливочное масло',
                count: 2,
                measureUnit: 'столовые ложки',
            },
            {
                title: 'Сливки',
                count: 50,
                measureUnit: 'мл',
            },
            {
                title: 'Твердый сыр',
                count: 50,
                measureUnit: 'г',
            },
            {
                title: 'Соль',
                count: 1,
                measureUnit: 'г',
            },
            {
                title: 'Молотый черный перец',
                count: 1,
                measureUnit: 'г',
            },
        ],
    },
];

const meatSalads = [
    {
        _id: '67e6d4d5fb9d51eeb7a96ffe',
        createdAt: '2025-03-28T16:56:53.588Z',
        title: 'Теплый салат с креветками и артишоками',
        description:
            'Этот рецепт как раз для тех, кому вечером хочется перекусить, но съесть что-то существенное совесть или фигура не позволяет. Лёгкий, но сытный салат в помощь худеющим.',
        time: 20,
        image: '/media/images/c5513425-5bef-4142-a9ea-083cb983db4d.jpeg',
        likes: 0,
        views: 0,
        bookmarks: 0,
        portions: 2,
        authorId: '2',
        categoriesIds: ['67c46dc5f51967aa8390bee6', '67c46df5f51967aa8390bee7'],
        steps: [
            {
                stepNumber: 1,
                description:
                    'Очищенные и размороженные креветки переложите в миску, добавьте приправу и оставьте на 10 минут мариноваться.',
                image: '/media/images/017d754a-7151-4a7e-bacd-7189844cb332.webp',
            },
            {
                stepNumber: 2,
                description:
                    'На смеси сливочного и оливкового масла или просто на оливковом обжарьте креветки с каждой стороны по минуте.',
                image: '/media/images/96db057f-77cc-4aac-b499-d6a95ea60dff.webp',
            },
            {
                stepNumber: 3,
                description:
                    'Разрежьте помидоры черри пополам, выложите микс салата, креветки и артишоки.',
                image: '/media/images/f0ebf8e0-a376-45e7-8a8d-4f7c712dbf22.webp',
            },
            {
                stepNumber: 4,
                description:
                    'Заправьте бальзамическим соусом и оливковым маслом. По желанию добавьте сок лайма.',
                image: '/media/images/de06a470-82e3-4cda-896c-4bf6ebc42b16.webp',
            },
        ],
        nutritionValue: {
            calories: 420,
            protein: 27,
            fats: 28,
            carbohydrates: 12,
        },
        ingredients: [
            {
                title: 'Микс салата',
                count: '30',
                measureUnit: 'г',
            },
            {
                title: 'Креветки',
                count: '5',
                measureUnit: 'шт.',
            },
            {
                title: 'Помидоры черри',
                count: '3',
                measureUnit: 'шт.',
            },
            {
                title: 'Артишоки гриль (стебли)',
                count: '5',
                measureUnit: 'шт.',
            },
        ],
    },
];

const fishSalads = [
    {
        _id: '67e6d538fb9d51eeb7a97004',
        createdAt: '2025-03-28T16:58:32.986Z',
        title: 'Салат нисуаз с базиликом',
        description:
            '"Нисуаз" - классика французской кухни, салат назван в честь Ниццы для того, чтобы закрепить за этим городом авторское право. Но рецепт пошел в народ.',
        time: 20,
        image: '/media/images/8e3eed22-9e4f-4dac-8206-c1d9a9fb2127.webp',
        likes: 0,
        views: 0,
        bookmarks: 0,
        portions: 4,
        authorId: '2',
        categoriesIds: ['67c46dc5f51967aa8390bee6', '67c46e19f51967aa8390bee8'],
        steps: [
            {
                stepNumber: 1,
                description:
                    'Взять два болгарских перца, красный и желтый, вырезать плодоножку, вычистить семена и на их место вложить по раздавленному зубчику чеснока и веточке тимьяна. ',
                image: '/media/images/0db72f46-c691-4838-a0d5-47e293c28ba3.webp',
            },
            {
                stepNumber: 2,
                description: 'Для домашнего майонеза смешать три желтка с дижонской горчицей',
                image: '/media/images/548f2a07-851f-4a9e-80eb-fda2e5509a8a.webp',
            },
            {
                stepNumber: 3,
                description:
                    'Для дрессинга выпарить в четыре раза бальзамический уксус, добавить мед и 3–4 ложки оливкового масла, перемешать.',
                image: '/media/images/fc115cfc-92b1-4c66-a9c3-fef453861267.webp',
            },
        ],
        nutritionValue: {
            calories: 810,
            protein: 23,
            fats: 68,
            carbohydrates: 28,
        },
        ingredients: [
            {
                title: 'Тунец',
                count: '200',
                measureUnit: 'г',
            },
            {
                title: 'Консервированный тунец',
                count: '50',
                measureUnit: 'г',
            },
            {
                title: 'Перепелиное яйцо',
                count: '4',
                measureUnit: 'штуки',
            },
            {
                title: 'Маринованные мини-артишоки',
                count: '160',
                measureUnit: 'г',
            },
        ],
    },
    {
        _id: '67e6d549fb9d51eeb7a97005',
        createdAt: '2025-03-28T16:58:49.180Z',
        title: 'Салат с тунцом и молодым сыром',
        description: 'Интересный, яркий, свежий, красивый и вкусный салат с тунцом и сыром.',
        time: 20,
        image: '/media/images/a8de59cc-6b5c-4031-9b51-6f478f7f37a4.jpg',
        likes: 0,
        views: 0,
        bookmarks: 0,
        portions: 4,
        authorId: '2',
        categoriesIds: ['67c46dc5f51967aa8390bee6', '67c46e19f51967aa8390bee8'],
        steps: [
            {
                stepNumber: 1,
                description: 'Моцареллу и лайм разрезать пополам, черри - на четвертинки.',
                image: '/media/images/002685fa-7ddd-4cf7-aa41-412922691c94.webp',
            },
            {
                stepNumber: 2,
                description:
                    'Оливковое масло смешать с соком лайма, солью и перцем. Отдельно соевый соус смешать с соком лайма.',
                image: '/media/images/2ccccf10-c292-4d07-8e66-785d48010d09.webp',
            },
            {
                stepNumber: 3,
                description:
                    'Тунец обвалять в кунжуте, поперчить, посолить и обжарить на оливковом масле на раскаленной сковороде.',
                image: '/media/images/53c403c4-96ed-4c7b-a0f4-edba9ee47277.webp',
            },
            {
                stepNumber: 4,
                description:
                    'В отдельной чаше смешать помидоры и моцареллу, посолить по вкусу. Добавить Микс салатных листьев.',
                image: '/media/images/54fe5688-68f1-48f5-ba2c-caba08ecd1f0.webp',
            },
            {
                stepNumber: 5,
                description:
                    'На тарелку выложить ломтики тунца по кругу, полить соевым соусом с лаймом. В середину через кулинарное кольцо.',
                image: '/media/images/30c6cad7-c4c4-4f2b-be56-3134dbcd924f.webp',
            },
        ],
        nutritionValue: {
            calories: 613,
            protein: 53,
            fats: 46,
            carbohydrates: 10,
        },
        ingredients: [
            {
                title: 'Тунец',
                count: '500',
                measureUnit: 'г',
            },
            {
                title: 'Сыр мини-моцарелла',
                count: '400',
                measureUnit: 'г',
            },
            {
                title: 'Помидоры черри',
                count: '500',
                measureUnit: 'г',
            },
            {
                title: 'Смесь салатных листьев',
                count: '100',
                measureUnit: 'г',
            },
        ],
    },
];

const veganSnacks = [
    {
        _id: '67d2a46ac3df99732a05d2d9',
        createdAt: '2025-03-13T09:24:58.638Z',
        title: 'Картошка, тушенная с болгарским перцем и фасолью в томатном соусе',
        description: 'Картошка, тушенная с болгарским перцем, фасолью, морковью и луком',
        time: 35,
        image: '/media/images/1bb65f74-c472-48ac-8070-b8662ee4a6da.jpg',
        likes: 152,
        views: 180,
        bookmarks: 25,
        garnish: 'Картошка',
        portions: 2,
        authorId: '27',
        categoriesIds: ['67c48e627b493acd8a41030c', '67c47222f51967aa8390befb'],
        steps: [
            {
                stepNumber: 1,
                description:
                    'Подготовьте необходимые ингредиенты. Из ёмкости с консервированной фасолью слейте маринад. Вскипятите любым способом 60 мл воды.',
                image: '/media/images/de0d84c8-ef34-4638-89f1-d9439a556675.jpg',
            },
            {
                stepNumber: 2,
                description:
                    'Болгарский перец промойте и удалите внутренние перегородки с семенами. Очищенные лук, морковь и болгарский перец нарежьте небольшими кубиками.',
                image: '/media/images/1fdde382-b7e1-4235-8fa3-b28833965ea0.jpg',
            },
            {
                stepNumber: 12,
                description: 'Приятного аппетита!',
                image: '/media/images/aa02178e-c001-4670-81eb-5e6cf0f9665d.jpg',
            },
        ],
        nutritionValue: {
            calories: 250,
            fats: 8,
            carbohydrates: 40,
            protein: 5,
        },
        ingredients: [
            {
                title: 'Картошка',
                count: '350',
                measureUnit: 'г',
            },
            {
                title: 'Болгарский перец',
                count: '80',
                measureUnit: 'г',
            },
            {
                title: 'Фасоль консервированная красная',
                count: '150',
                measureUnit: 'г',
            },
        ],
    },
    {
        _id: '67d310fbc3df99732a05d2e8',
        createdAt: '2025-03-13T17:08:11.096Z',
        title: 'Картофельные рулетики с грибами',
        description:
            'Рекомендую всем приготовить постное блюдо из картофеля и грибов. Готовится это блюдо без яиц, без мяса и без сыра, из самых простых ингредиентов!',
        time: 60,
        image: '/media/images/735078bc-01ee-4df7-b5cb-83e65f8c4d9d.jpg',
        likes: 120,
        views: 193,
        bookmarks: 10,
        garnish: 'Картошка',
        portions: 4,
        authorId: '27',
        categoriesIds: ['67c48e627b493acd8a41030c', '67c46ee5f51967aa8390beef'],
        steps: [
            {
                stepNumber: 1,
                description: 'Подготавливаем необходимые ингредиенты.',
                image: '/media/images/d20a4177-e940-4222-a4b4-e0611013a607.jpg',
            },
            {
                stepNumber: 2,
                description: 'Картофель нарезаем кусочками и отправляем его вариться.',
                image: '/media/images/b9bfd6ac-c1b4-4af2-adb2-7359840111b7.jpg',
            },
            {
                stepNumber: 3,
                description: 'Лук мелко нарезаем.',
                image: '/media/images/2575bf4c-446f-40bd-86ef-92182e7292b0.jpg',
            },
            {
                stepNumber: 4,
                description: 'Нарезаем грибы.',
                image: '/media/images/f56d5c51-59ae-47f0-89ee-b06bb034281d.jpg',
            },
        ],
        nutritionValue: {
            calories: 180,
            fats: 6,
            carbohydrates: 28,
            protein: 4,
        },
        ingredients: [
            {
                title: 'Картошка',
                count: '400',
                measureUnit: 'г',
            },
            {
                title: 'Грибы шампиньоны',
                count: '300',
                measureUnit: 'г',
            },
            {
                title: 'Лук репчатый',
                count: '1',
                measureUnit: 'шт.',
            },
            {
                title: 'Мука',
                count: '300',
                measureUnit: 'г',
            },
        ],
    },
];

const veganGarnish = [
    {
        _id: '67d3273cc3df99732a05d31a',
        createdAt: '2025-03-13T18:43:08.940Z',
        title: 'Чесночная картошка',
        description:
            'Такая картошечка украсит любой семейный обед! Все будут в полном восторге, очень вкусно! Аромат чеснока, хрустящая корочка на картошечке - просто объедение! Отличная идея для обеда или ужина, готовится просто!',
        time: 50,
        image: '/media/images/b2f35118-262f-408c-8364-07285ba41580.jpg',
        likes: 55,
        views: 78,
        bookmarks: 6,
        garnish: 'Картошка',
        portions: 2,
        authorId: '27',
        categoriesIds: [
            '67c47222f51967aa8390befb',
            '67c472b5f51967aa8390bf02',
            '67c48f28ed67ca980917d64d',
            '67c48f60ed67ca980917d64e',
        ],
        steps: [
            {
                stepNumber: 1,
                description: 'Подготовьте все ингредиенты.',
                image: '/media/images/743768d9-edb2-42cb-889c-6930001cd3fd.jpg',
            },
            {
                stepNumber: 2,
                description: 'Картофель тщательно помойте, обсушите.',
                image: '/media/images/144e0ad8-c982-4b0e-a65b-aaa0646060f5.jpg',
            },
            {
                stepNumber: 3,
                description:
                    'Добавьте растительное масло, соль, чёрный молотый перец и панировочные сухарики. Все перемешайте так, чтобы специи и сухари равномерно распределились по картофелю.',
                image: '/media/images/6b17d657-aed1-41ff-868e-b357f04e2a3b.jpg',
            },
            {
                stepNumber: 4,
                description:
                    'На край формы для запекания добавьте половинку головки чеснока в кожуре. Запекайте картофель в разогретой до 190 градусов духовке 35-40 минут.',
                image: '/media/images/84cdc854-d04d-47e0-a58d-260087fec65f.jpg',
            },
        ],
        nutritionValue: {
            calories: 220,
            fats: 7,
            carbohydrates: 35,
            protein: 4,
        },
        ingredients: [
            {
                title: 'Картошка',
                count: '500',
                measureUnit: 'г',
            },
            {
                title: 'Панировочные сухари',
                count: '2',
                measureUnit: 'ст.л.',
            },
            {
                title: 'Масло растительное',
                count: '30',
                measureUnit: 'мл',
            },
        ],
    },
    {
        _id: '67d70945c3df99732a05d3b4',
        createdAt: '2025-03-16T17:24:21.276Z',
        title: 'Овощное рагу',
        description:
            'Есть такие блюда, которые актуальны в любое время года. Приготовьте по нашему рецепту овощное рагу с кабачками, и наслаждайтесь вкусом и богатым ароматом приготовленных овощей.',
        time: 50,
        image: '/media/images/d74c3805-d534-45a9-9a60-ef232dfb07d8.jpg',
        likes: 258,
        views: 400,
        bookmarks: 342,
        portions: 4,
        authorId: '27',
        categoriesIds: [
            '67c48e627b493acd8a41030c',
            '67c48f60ed67ca980917d64e',
            '67c47222f51967aa8390befb',
        ],
        steps: [
            {
                stepNumber: 1,
                description:
                    'Нарезать мелко петрушку и базилик, добавить соль, перец и 1 размолотый зубчик чеснока, все хорошо перемешать.',
                image: '/media/images/e1805fd7-87bf-43fd-890e-d21ce8fbe980.jpg',
            },
            {
                stepNumber: 2,
                description: 'Нарезать все овощи мелкими кубиками.',
                image: '/media/images/679348be-1e0b-47e2-a7c2-d55a320c2ada.jpg',
            },
            {
                stepNumber: 3,
                description:
                    'На разогретую сковороду добавить растительное масло и выложить лук. Обжарить лук в течение 1 минуты.',
                image: '/media/images/6d29497b-da4a-4fc4-9ab9-4dc1171e81cb.jpg',
            },
        ],
        nutritionValue: {
            calories: 200,
            proteins: 5,
            fats: 8,
            carbohydrates: 30,
        },
        ingredients: [
            {
                title: 'Картошка',
                count: '2',
                measureUnit: 'шт.',
            },
            {
                title: 'Кабачок',
                count: '1',
                measureUnit: 'шт.',
            },
            {
                title: 'Томаты',
                count: '2',
                measureUnit: 'шт.',
            },
            {
                title: 'Перец болгарский',
                count: '1',
                measureUnit: 'шт.',
            },
            {
                title: 'Лук репчатый',
                count: '1',
                measureUnit: 'шт.',
            },
        ],
    },
    {
        _id: '67e00fcb2b2249549c68de10',
        createdAt: '2025-03-23T13:42:35.302Z',
        title: 'Салат с арбузом, фетой и рукколой',
        description:
            'Освежающий, яркий и легкий - лучший для летних посиделок! Салат с арбузом, Фетой и рукколой - это контраст сочного и сладкого арбуза с соленой и нежной Фетой.',
        time: 15,
        image: '/media/images/dbec4e25-6eee-443d-b67f-35ed16c72c2a.jpg',
        likes: 40,
        views: 254,
        bookmarks: 33,
        portions: 2,
        authorId: '27',
        categoriesIds: ['67c46e2bf51967aa8390bee9', '67c48f60ed67ca980917d64e'],
        steps: [
            {
                stepNumber: 1,
                description:
                    'Как сделать салат с арбузом, Фетой и рукколой? Для начала необходимо подготовить все ингредиенты. Арбуз выбирайте не переспевший, сладкий и, желательно, с минимальным количеством зерен. Арбуз, перед тем как разрезать тщательно вымойте в теплой воде.',
                image: '/media/images/facc029e-04a4-4e38-a138-bbe7fa66e521.jpg',
            },
            {
                stepNumber: 2,
                description:
                    'Арбуз нарежьте на куски, а затем разрежьте каждый кусок на квадраты среднего размера. Достаньте из арбуза косточки и переложите нарезанный арбуз в салатник',
                image: '/media/images/7f629449-9a03-486b-babb-619e170b4af8.jpg',
            },
            {
                stepNumber: 3,
                description:
                    'Сыр фета нарежьте на кусочки одинакового среднего размера. О том, какие виды сыра подойдут в качестве замены, читайте в статье по ссылке в конце рецепта.',
                image: '/media/images/82d14cd4-e8c4-4ce7-9073-06188045d311.jpg',
            },
            {
                stepNumber: 4,
                description:
                    'Рукколу хорошо промойте под проточной водой и обсушите бумажным полотенцем. Достаньте арбуз из холодильника. ',
                image: '/media/images/8e5bb352-6cbc-41d9-a1d8-f18051ec7668.jpg',
            },
            {
                stepNumber: 5,
                description:
                    'После приготовления салат с арбузом, Фетой и рукколой можно сразу подавать к столу. Приятного аппетита!',
                image: '/media/images/49362b13-2091-45d3-8a00-d1c48c2dd407.jpg',
            },
        ],
        nutritionValue: {
            calories: 95,
            protein: 4,
            fats: 7,
            carbohydrates: 4,
        },
        ingredients: [
            {
                title: 'Арбуз',
                count: '300',
                measureUnit: 'г',
            },
            {
                title: 'Фета',
                count: '100',
                measureUnit: 'г',
            },
            {
                title: 'Руккола',
                count: '60',
                measureUnit: 'г',
            },
        ],
    },
];

const veganDesserts = [
    {
        _id: '67e002fb2b2249549c68de09',
        createdAt: '2025-03-23T12:47:55.847Z',
        title: 'Фруктовый лёд',
        description:
            'Даже летний зной с таким освежителем окажется раем! Что может быть лучше, чем освежающий, кисло-сладкий, ароматный фруктовый лед, в котором нет ни грамма химии? В отличие от покупного фруктового мороженого в таком замороженном фруктовом пюре содержатся только натуральные компоненты.',
        time: 180,
        image: '/media/images/8fd43f81-f395-4af1-8109-2137d5715914.jpg',
        likes: 49,
        views: 207,
        bookmarks: 61,
        portions: 5,
        authorId: '27',
        categoriesIds: ['67c48f6ded67ca980917d64f'],
        steps: [
            {
                stepNumber: 1,
                description:
                    'Для этого блюда подходит даже не очень сладкая и не слишком красивая клубника, такая неизбежно попадается, как старательно ни выбирай.',
                image: '/media/images/277f896f-0d23-4add-834b-8c319275deea.jpg',
            },
            {
                stepNumber: 2,
                description:
                    'Сахар всыпать в воду, нагреть до полного его растворения. Добавить лимонный сок. Количество сахара и лимонного сока регулируйте по своему вкусу, много еще зависит от сладости ягод и фруктов.',
                image: '/media/images/92bdba7b-0b37-4214-bc0f-1041c07e8493.jpg',
            },
            {
                stepNumber: 3,
                description: 'Клубнику очистить, растолочь давилкой.',
                image: '/media/images/1cc1950f-6392-49b9-8faf-d7cf308c6810.jpg',
            },
            {
                stepNumber: 4,
                description:
                    'Киви очистить, нарезать кусочками и пюрировать. Можно использовать блендер или терку.',
                image: '/media/images/08de3f74-02c8-438a-9a6b-9c82d91396ef.jpg',
            },
            {
                stepNumber: 5,
                description: 'В клубничное пюре добавить половину сахарного сиропа.',
                image: '/media/images/85faf462-a4bc-48fa-ac6c-8224a87755ea.jpg',
            },
            {
                stepNumber: 6,
                description: 'Влить в пюре из киви оставшийся сахарный сироп.',
                image: '/media/images/80c3c498-19f7-476e-9ef6-921363308fa9.jpg',
            },
            {
                stepNumber: 7,
                description:
                    'В качестве формочек я использовала небольшие пластиковые стаканчики (100 мл) и деревянные палочки для мороженого.',
                image: '/media/images/a79f37ea-5e87-486d-aae0-3b7011383295.jpg',
            },
            {
                stepNumber: 8,
                description:
                    'В один стаканчик влить клубничное пюре, заполнив его до половины. Другой наполовину заполнить пюре из киви.',
                image: '/media/images/ac52d330-91ef-4a39-bd5d-c4ed97f01776.jpg',
            },
            {
                stepNumber: 9,
                description: 'Воткнуть в подмерзшую смесь деревянные палочки.',
                image: '/media/images/2b1f0431-050c-4965-be25-51ce118c2321.jpg',
            },
            {
                stepNumber: 10,
                description:
                    'Залить оставшимся пюре из клубники и киви соответственно. Поставить формы в холодильник до полного замерзания, это займет 2-3 часа.',
                image: '/media/images/b343212a-c8ca-4329-8e8b-77eccff4f759.jpg',
            },
        ],
        nutritionValue: {
            calories: 53,
            fats: 0,
            carbohydrates: 12,
            protein: 1,
        },
        ingredients: [
            {
                title: 'Клубника',
                count: '200',
                measureUnit: 'г',
            },
            {
                title: 'Киви',
                count: '3',
                measureUnit: 'шт.',
            },
            {
                title: 'Сахар',
                count: '2',
                measureUnit: 'ст.л.',
            },
            {
                title: 'Вода',
                count: '150',
                measureUnit: 'мл',
            },
            {
                title: 'Лимонный сок',
                count: '2',
                measureUnit: 'ч.л.',
            },
        ],
    },
];

const allRecipes = [
    ...meatSnacks,
    ...fishSnacks,
    ...vegetablesSnacks,
    ...meatSalads,
    ...fishSalads,
    ...veganSnacks,
    ...veganGarnish,
    ...veganDesserts,
];

const metaData = {
    total: allRecipes.length,
    page: 1,
    limit: Number(DEFAULT_RECIPE_LIMIT),
    totalPages: allRecipes.length / DEFAULT_RECIPE_LIMIT,
};

const MOCK_RECIPES_BY_CATEGORY = {
    data: [allRecipes.slice(5, 10)],
    meta: { total: 5, limit: RELEVANT_KITCHEN_LIMIT, page: 1, totalPages: 1 },
};

const juiciestData = {
    data: [...allRecipes].sort((a, b) => a.likes - b.likes).slice(0, DEFAULT_RECIPE_LIMIT),
};
const interceptJuiciestPage = (page: number = 1, delay = DELAY.SM, mockData = juiciestData) =>
    interceptApi(
        {
            url: `${API_ENDPOINTS.Recipe}*`,
            query: {
                [SEARCH_PARAMS.SORT_QUERY]: SEARCH_PARAMS.LIKES_SORT,
                [SEARCH_PARAMS.LIMIT_QUERY]: String(DEFAULT_RECIPE_LIMIT),
                page: String(page),
            },
            alias: 'juiciestPageRecipes',
        },
        {
            delay,
            statusCode: 200,
            body: {
                ...mockData,
                meta: {
                    total: DEFAULT_RECIPE_LIMIT * 3,
                    page: page,
                    limit: DEFAULT_RECIPE_LIMIT,
                    totalPages: 3,
                },
            },
        },
    );

const interceptNewestRecipes = (delay: number = DELAY.SM, mockBody = null) =>
    interceptApi(
        {
            url: `${API_ENDPOINTS.Recipe}*`,
            query: {
                [SEARCH_PARAMS.SORT_QUERY]: SEARCH_PARAMS.CREATED_AT_SORT,
            },
            alias: 'getNewestRecipes',
        },
        {
            statusCode: 200,
            delay,
            body: mockBody ?? {
                data: allRecipes.slice(0, Number(SLIDER_SIZE)),
                meta: { ...metaData, limit: Number(SLIDER_SIZE) },
            },
        },
    );

const interceptJuiciestRecipes = (delay: number = DELAY.SM, mockBody = null) =>
    interceptApi(
        {
            url: `${API_ENDPOINTS.Recipe}*`,
            query: {
                [SEARCH_PARAMS.SORT_QUERY]: SEARCH_PARAMS.LIKES_SORT,
            },
            alias: 'getJuiciestRecipes',
        },
        {
            statusCode: 200,
            delay,
            body: mockBody ?? {
                data: allRecipes.slice(0, Number(JUICIEST_LIMIT)),
                meta: { ...metaData, limit: Number(JUICIEST_LIMIT) },
            },
        },
    );

const interceptRecipeWithSearch = (delay: number = DELAY.SM, mockBody = null) =>
    interceptApi(
        {
            url: `${API_ENDPOINTS.Recipe}*`,
            query: { [SEARCH_PARAMS.SEARCH_QUERY]: /.*/ },
            alias: 'getRecipeWithSearchEmpty',
        },
        {
            delay,
            body: mockBody ?? {
                data: allRecipes,
                meta: metaData,
            },
        },
    );

const interceptRecipesByCategory = (delay: number = DELAY.SM, mockBody = null) =>
    interceptApi(
        { url: `${API_ENDPOINTS.Recipe}*`, query: { [SEARCH_PARAMS.SUBCATEGORIES_QUERY]: /.*/ } },
        {
            delay,
            body: mockBody ?? { data: allRecipes.slice(0, DEFAULT_RECIPE_LIMIT), meta: metaData },
        },
    );

const interceptCategories = (delay = 0) =>
    interceptApi(
        { url: API_ENDPOINTS.Category, alias: 'getCategories' },
        { body: CATEGORIES_RESPONSE, delay },
    );

const interceptRelevantRecipes = (delay: number = DELAY.SM, mockBody = null) =>
    interceptApi(
        {
            url: `${API_ENDPOINTS.RecipeByCategory}/*`,
            query: { [SEARCH_PARAMS.LIMIT_QUERY]: RELEVANT_KITCHEN_LIMIT },
            alias: 'getRelevant',
        },
        {
            statusCode: 200,
            delay,
            body: mockBody ?? {
                data: allRecipes.slice(0, Number(RELEVANT_KITCHEN_LIMIT)),
                meta: { ...metaData, limit: Number(RELEVANT_KITCHEN_LIMIT) },
            },
        },
    );

const interceptRecipesBySubCategory = (delay: number = DELAY.SM, mockBody = null) =>
    interceptApi(
        { url: `${API_ENDPOINTS.RecipeByCategory}/*`, alias: 'getVegansGarnish' },
        {
            statusCode: 200,
            delay,
            body: mockBody ?? MOCK_RECIPES_BY_CATEGORY,
        },
    );

const signIn = () => {
    interceptApi(
        {
            url: API_ENDPOINTS.RefreshToken,
            alias: 'refreshToken500',
        },
        {
            statusCode: 500,
            delay: 0,
        },
    );

    interceptApi(
        {
            url: API_ENDPOINTS.CheckAuth,
            alias: 'checkAuth403',
        },
        {
            statusCode: 403,
            delay: 0,
        },
    );

    cy.visit('/');

    const waitSignIn200 = interceptApi(
        {
            url: API_ENDPOINTS.SignIn,
            method: 'POST',
            alias: 'signInRequest200',
        },
        {
            statusCode: 200,
            delay: 0,
            headers: {
                'Access-Control-Expose-Headers': ACCESS_TOKEN_HEADER[0],
                [ACCESS_TOKEN_HEADER[0]]: ACCESS_TOKEN_HEADER[1],
            },
        },
    );

    cy.getByTestId(TEST_ID.Form.SignIn).within(() => {
        fillSignInForm(VALIDATION_PASS_VALUE.Login);
        cy.getByTestId(TEST_ID.Button.Submit).click();
    });

    waitSignIn200();

    interceptApi(
        {
            url: API_ENDPOINTS.RefreshToken,
            alias: 'refreshToken200',
        },
        {
            statusCode: 200,
            delay: 0,
            headers: {
                'Access-Control-Expose-Headers': ACCESS_TOKEN_HEADER[0],
                [ACCESS_TOKEN_HEADER[0]]: ACCESS_TOKEN_HEADER[1],
            },
        },
    );
};

describe('application', () => {
    beforeEach(() => {
        cy.clearLocalStorage();
        cy.clearAllSessionStorage();
        interceptApi(
            { url: '/**', alias: 'uncaptured' },
            {
                statusCode: 200,
                delay: 0,
            },
        );

        interceptCategories();
        interceptNewestRecipes();
        interceptJuiciestRecipes();
        interceptRelevantRecipes();
        signIn();
    });

    describe('carousel functionality', () => {
        it('carousel on screen 1920px', () => {
            cy.viewport(1920, 750);
            setElementPosition();

            cy.get(`[data-test-id^=${TEST_ID.Card.Carousel}]`).should(
                'have.length',
                Number(SLIDER_SIZE),
            );
            for (let i = 0; i < 4; i++) {
                cy.getByTestId(`${TEST_ID.Card.Carousel}-${i}`).should('be.visible');
            }
            cy.getByTestId('carousel-forward').click();
            cy.wait(DELAY.LOAD);
            cy.getByTestId(`${TEST_ID.Card.Carousel}-4`).should('be.visible');
            for (let i = 1; i <= 4; i++) {
                cy.getByTestId(`${TEST_ID.Card.Carousel}-${i}`)
                    .scrollIntoView()
                    .should('be.visible');
            }
            cy.getByTestId('carousel-back').click();
            cy.wait(DELAY.LOAD);
            cy.getByTestId(`${TEST_ID.Card.Carousel}-0`).should('be.visible');
            cy.getByTestId('carousel-back').click();
            cy.wait(DELAY.LOAD);
            cy.getByTestId(`${TEST_ID.Card.Carousel}-9`).should('be.visible');
            cy.wait(DELAY.LOAD);
            [1, 2].forEach((index) => {
                cy.getByTestId(`${TEST_ID.Card.Carousel}-${index}`).should('be.visible');
            });
        });

        it('carousel on screen 360px', () => {
            cy.viewport(360, 600);
            cy.get(`[data-test-id^=${TEST_ID.Card.Carousel}]`).should(
                'have.length',
                Number(SLIDER_SIZE),
            );
            cy.getByTestId('carousel-forward').should('not.be.visible');
            cy.getByTestId('carousel-back').should('not.be.visible');
            cy.getByTestId('carousel')
                .trigger('pointerdown', { which: 1 })
                .trigger('pointermove', 'right')
                .trigger('pointerup', { force: true })
                .trigger('pointerdown', { which: 1 })
                .trigger('pointermove', 'left')
                .trigger('pointerup', { force: true });
        });
    });

    describe('burger Menu Functionality', () => {
        it('burger does not exist on 1440px', () => {
            cy.viewport(1440, 1024);
            cy.getByTestId(TEST_ID.Button.BurgerOpen).should('not.be.visible');
            cy.getByTestId(TEST_ID.Nav).should('exist');
        });

        it('burger menu on screen 768px', () => {
            cy.viewport(768, 1024);
            interceptJuiciestPage();

            cy.getByTestId(TEST_ID.Link.Jusiest).should('exist').click();

            setElementPosition();
            cy.getByTestId(TEST_ID.Nav).should('not.exist');
            cy.getByTestId(TEST_ID.Button.BurgerClose).should('not.exist');
            cy.getByTestId(TEST_ID.Button.BurgerOpen).should('exist').click();
            cy.getByTestId(TEST_ID.Button.BurgerOpen).should('not.exist');
            cy.getByTestId(TEST_ID.Button.BurgerClose).should('exist');
            cy.getByTestId(TEST_ID.Nav).should('be.visible');
            cy.getByTestId(TEST_ID.Link.Vegan).click();

            cy.getByTestId(TEST_ID.Button.BurgerClose).scrollIntoView();
            cy.getByTestId(TEST_ID.Breadcrumbs).should('contain.text', 'Закуски');
            cy.get('body').click(100, 200);
            cy.getByTestId(TEST_ID.Nav).should('not.exist');
        });

        it('burger menu on screen 360px', () => {
            cy.viewport(360, 800);
            interceptJuiciestPage();

            cy.getByTestId(TEST_ID.Link.JusiestMob).should('exist').click();

            setElementPosition();
            cy.getByTestId(TEST_ID.Nav).should('not.exist');
            cy.getByTestId(TEST_ID.Button.BurgerClose).should('not.exist');
            cy.getByTestId(TEST_ID.Button.BurgerOpen).should('exist').click();
            cy.getByTestId(TEST_ID.Button.BurgerOpen).should('not.exist');
            cy.getByTestId(TEST_ID.Button.BurgerClose).should('exist');
            cy.getByTestId(TEST_ID.Nav).should('be.visible');
            cy.getByTestId(TEST_ID.Button.BurgerClose).scrollIntoView();
            cy.getByTestId(TEST_ID.Breadcrumbs).should('contain.text', 'Самое сочное');
            cy.getByTestId(TEST_ID.Button.BurgerClose).click();
            cy.getByTestId(TEST_ID.Nav).should('not.exist');
        });
    });

    describe('search Functionality', () => {
        it('home page search', () => {
            const searchWord = 'Кар';
            const recipesBySearch = allRecipes.filter((item) => item.title.includes(searchWord));
            cy.viewport(1920, 750);
            setElementPosition();

            interceptRecipeWithSearch(DELAY.SM, {
                data: recipesBySearch,
                meta: metaData,
            });
            cy.getByTestId(TEST_ID.Input.Search).type('Ка');
            cy.getByTestId(TEST_ID.Button.Search).should('have.css', 'pointer-events', 'none');
            cy.getByTestId(TEST_ID.Input.Search).clear().type(searchWord);
            cy.getByTestId(TEST_ID.Button.Search).should('be.visible').click();

            cy.get(`[data-test-id^=${TEST_ID.Card.Food}]`).should(
                'have.length',
                recipesBySearch.length,
            );
        });

        it('search flow on category page', () => {
            const searchWord = 'Карт';
            const recipesBySearch = allRecipes.filter((item) => item.title.includes(searchWord));
            cy.viewport(768, 1024);
            setElementPosition();
            cy.getByTestId(TEST_ID.Button.BurgerOpen).should('be.visible').click();
            cy.getByTestId(TEST_ID.Link.Vegan).click();
            cy.wait(DELAY.LOAD);
            cy.getByTestId(TEST_ID.Button.BurgerClose).should('be.visible').click();
            cy.getByTestId(TEST_ID.Input.Search).type(searchWord);

            interceptRecipesByCategory(DELAY.SM, {
                data: recipesBySearch,
                meta: metaData,
            });
            cy.getByTestId(TEST_ID.Button.Search).should('be.visible').click();

            cy.get(`[data-test-id^=${TEST_ID.Card.Food}]`).should('have.length', 2);
        });

        it('not found recipes', () => {
            cy.viewport(360, 800);
            setElementPosition();
            cy.getByTestId(TEST_ID.Input.Search).type('ооо');
            interceptRecipeWithSearch(DELAY.SM, {
                data: [],
                meta: { ...metaData, totalPage: 1, page: 1 },
            });
            cy.getByTestId(TEST_ID.Button.Search).should('be.visible').click();
        });

        it('check loader during search process. Screen 1440px', () => {
            const searchWord = 'Сала';
            const recipesBySearch = allRecipes.filter((item) => item.title.includes(searchWord));
            cy.viewport(1440, 1024);
            setElementPosition();
            cy.getByTestId(TEST_ID.Input.Search).type(searchWord);

            interceptRecipesByCategory(DELAY.LG, {
                data: recipesBySearch,
                meta: metaData,
            });
            cy.contains('Приятного аппетита').as('titleSearch').should('exist');
            cy.getByTestId(TEST_ID.Button.Search).should('be.visible').click();
            cy.getByTestId(TEST_ID.SearchBlockLoader).should('exist').and('be.visible');
            cy.contains('Приятного аппетита').as('titleSearch').should('exist');
            cy.scrollTo(0, 0);

            cy.get(`[data-test-id^=${TEST_ID.Card.Food}]`).should(
                'have.length',
                recipesBySearch.length,
            );
        });
    });

    describe('recipe Functionality', () => {
        it('recipe page render', () => {
            const juiciestRecipes = allRecipes.slice(0, Number(JUICIEST_LIMIT));
            const { _id, title } = juiciestRecipes[0];
            interceptApi(
                {
                    url: `${API_ENDPOINTS.Recipe}/${juiciestRecipes[0]._id}`,
                },
                { body: juiciestRecipes[0] },
            );

            cy.getByTestId('card-link-0').click();
            cy.url().should('include', _id);
            cy.contains(title).should('exist');
            cy.scrollTo('top');
            cy.getByTestId('ingredient-quantity-0').contains('3');
            cy.getByTestId('ingredient-quantity-1').contains('6');
            cy.getByTestId('increment-stepper').click();
            cy.getByTestId('ingredient-quantity-0').contains('4');
            cy.getByTestId('ingredient-quantity-1').contains('8');
            cy.getByTestId('decrement-stepper').click().click();
            cy.getByTestId('ingredient-quantity-0').contains('2');
            cy.getByTestId('ingredient-quantity-1').contains('4');
        });
    });

    describe('filters Functionality', () => {
        it('select 3 filters on screen 1920px', () => {
            cy.viewport(1920, 750);
            setElementPosition();
            cy.getByTestId(TEST_ID.Drawer.Filter).should('not.exist');
            cy.getByTestId(TEST_ID.Button.Filter).should('be.visible').click();
            cy.getByTestId(TEST_ID.Drawer.Filter).should('exist').contains('Фильтр');
            cy.getByTestId(TEST_ID.Button.FindRecipe).should('have.css', 'pointer-events', 'none');
            cy.getByTestId(TEST_ID.Button.FilterCategory).click();
            cy.getByTestId(TEST_ID.Checkbox.Vegan).click();
            cy.scrollTo('top');
            cy.getByTestId(TEST_ID.Button.FilterCategory).click();
            cy.getByTestId('checkbox-картошка').click();
            cy.getByTestId(TEST_ID.Switch.AlergenSwitchFilter).click();
            cy.getByTestId(TEST_ID.Button.FilterAlergen).click();
            cy.getByTestId(TEST_ID.Button.AddOtherAlergen).type('лук');
            cy.getByTestId(TEST_ID.Button.AddAlergen).click();
            cy.getByTestId(TEST_ID.Button.FilterAlergen).click();
            cy.getByTestId(TEST_ID.Tag.Filter).should('have.length', 3);
            interceptApi(
                {
                    url: `${API_ENDPOINTS.Recipe}*`,
                    query: {
                        [SEARCH_PARAMS.SUBCATEGORIES_QUERY]: /.*/,
                        [SEARCH_PARAMS.GARNISH_QUERY]: /.*/,
                        [SEARCH_PARAMS.ALLERGENS_QUERY]: /.*/,
                    },
                },
                {
                    statusCode: 200,
                    delay: DELAY.SM,
                    body: { data: allRecipes.slice(0, 2), meta: metaData },
                },
            );

            cy.getByTestId(TEST_ID.Button.FindRecipe).click();

            cy.get(`[data-test-id^=${TEST_ID.Card.Food}]`).should('have.length', 2);
        });

        it('set and clear filters on screen 768px', () => {
            cy.viewport(768, 1120);
            setElementPosition();
            cy.getByTestId(TEST_ID.Drawer.Filter).should('not.exist');
            cy.getByTestId(TEST_ID.Button.Filter).should('be.visible').click();
            cy.get('body').click(100, 200);
            cy.getByTestId(TEST_ID.Drawer.Filter).should('not.exist');
            cy.getByTestId(TEST_ID.Button.Filter).should('be.visible').click();
            cy.getByTestId(TEST_ID.Drawer.Filter).should('exist').contains('Фильтр');
            cy.getByTestId(TEST_ID.Button.FilterCategory).click();
            cy.getByTestId(TEST_ID.Checkbox.Vegan).click();
            cy.getByTestId(TEST_ID.Button.FilterCategory).click();
            cy.getByTestId(TEST_ID.Tag.Filter).should('have.length', 1);

            interceptApi(
                {
                    url: `${API_ENDPOINTS.Recipe}*`,
                    query: {
                        [SEARCH_PARAMS.SUBCATEGORIES_QUERY]: /.*/,
                    },
                },
                {
                    delay: DELAY.SM,
                    statusCode: 200,
                    body: {
                        data: [...veganSnacks, ...veganDesserts, ...veganGarnish],
                        meta: metaData,
                    },
                },
            );

            cy.getByTestId(TEST_ID.Button.FindRecipe).click();
            cy.get(`[data-test-id^=${TEST_ID.Card.Food}]`).should(
                'have.length',
                veganGarnish.length + veganDesserts.length + veganSnacks.length,
            );
            cy.getByTestId(TEST_ID.Button.Filter).should('be.visible').click();
            cy.getByTestId(TEST_ID.Button.FilterCategory).click();
            cy.getByTestId(TEST_ID.Checkbox.Vegan).click();
            cy.getByTestId(TEST_ID.Button.FilterCategory).click();
            cy.getByTestId('checkbox-картошка').click();
            cy.getByTestId(TEST_ID.Switch.AlergenSwitchFilter).click();
            cy.getByTestId(TEST_ID.Button.FilterAlergen).click();
            cy.getByTestId('allergen-5').click();
            cy.getByTestId(TEST_ID.Button.FilterAlergen).click();
            cy.getByTestId(TEST_ID.Tag.Filter).should('have.length', 3);
            cy.getByTestId('clear-filter-button').should('be.visible').click();
            cy.getByTestId(TEST_ID.Tag.Filter).should('have.length', 0);
            cy.getByTestId(TEST_ID.Button.FindRecipe).should('have.css', 'pointer-events', 'none');
        });

        it('close filter and search filtered cards on screen 360px', () => {
            cy.viewport(360, 800);
            setElementPosition();
            cy.getByTestId(TEST_ID.Drawer.Filter).should('not.exist');
            cy.getByTestId(TEST_ID.Button.Filter).should('be.visible').click();
            cy.getByTestId(TEST_ID.Drawer.Filter).should('exist');
            cy.getByTestId('close-filter-drawer').click();
            cy.getByTestId(TEST_ID.Drawer.Filter).should('not.exist');
            cy.getByTestId(TEST_ID.Button.Filter).should('be.visible').click();
            cy.getByTestId(TEST_ID.Drawer.Filter).should('be.visible');
            cy.getByTestId(TEST_ID.Button.FilterCategory).click();
            cy.getByTestId(TEST_ID.Checkbox.Vegan).click();
            cy.getByTestId(TEST_ID.Button.FilterCategory).click();
            cy.getByTestId(TEST_ID.Button.FindRecipe).click();
            cy.getByTestId(TEST_ID.Input.Search).type('овощ');

            interceptApi(
                {
                    url: `${API_ENDPOINTS.Recipe}*`,
                    query: {
                        [SEARCH_PARAMS.SEARCH_QUERY]: /.*/,
                    },
                },
                {
                    statusCode: 200,
                    delay: DELAY.SM,
                    body: {
                        data: [...veganGarnish, ...veganSnacks].slice(0, 2),
                        meta: metaData,
                    },
                },
            );
            cy.getByTestId(TEST_ID.Button.Search).should('be.visible').click();

            cy.get(`[data-test-id^=${TEST_ID.Card.Food}]`).should('have.length', 2);
        });
    });

    describe('allergens Functionality', () => {
        it('without allergens on 768px', () => {
            cy.viewport(768, 1080);
            cy.getByTestId(TEST_ID.Switch.AlergenSwitcher).should('not.exist');
            cy.getByTestId(TEST_ID.Button.AlergenMenu).should('not.exist');
        });

        it('select allergens by category', () => {
            cy.viewport(1920, 750);
            setElementPosition();
            cy.getByTestId(TEST_ID.Switch.AlergenSwitcher).should('not.have.attr', 'data-checked');
            cy.getByTestId(TEST_ID.Button.AlergenMenu).should('be.disabled');
            cy.getByTestId(TEST_ID.Link.Vegan).click();
            cy.wait(DELAY.LOAD);
            cy.getByTestId(TEST_ID.Switch.AlergenSwitcher).click();
            cy.getByTestId(TEST_ID.Switch.AlergenSwitcher).should('have.attr', 'data-checked');
            cy.getByTestId(TEST_ID.Button.AlergenMenu)
                .should('not.be.disabled')
                .contains('Выберите из списка');
            cy.getByTestId(TEST_ID.Button.AlergenMenu).click();
            cy.getByTestId('allergens-menu').should('be.visible');
            cy.getByTestId('allergen-1').click();
            cy.getByTestId('allergen-5').click();
            cy.getByTestId(TEST_ID.Button.AddOtherAlergen).type('Гриб{enter}');

            interceptApi(
                {
                    url: `${API_ENDPOINTS.Recipe}*`,
                    query: {
                        [SEARCH_PARAMS.ALLERGENS_QUERY]: /.*/,
                    },
                },
                {
                    statusCode: 200,
                    delay: DELAY.SM,
                    body: {
                        data: allRecipes.slice(0, 3),
                        meta: metaData,
                    },
                },
            );

            cy.getByTestId(TEST_ID.Button.Search)
                .should('be.visible')
                .and('not.be.disabled')
                .click();

            cy.get(`[data-test-id^=${TEST_ID.Card.Food}]`).should('have.length', 3);
            cy.scrollTo('top');
            cy.getByTestId(TEST_ID.Switch.AlergenSwitcher).click();
            cy.scrollTo('top');
            cy.getByTestId(TEST_ID.Button.AlergenMenu)
                .should('be.disabled')
                .contains('Выберите из списка');
        });

        it('seacrch after allergens filter', () => {
            cy.viewport(1920, 750);
            setElementPosition();
            cy.getByTestId(TEST_ID.Link.Vegan).click();
            cy.wait(DELAY.LOAD);
            cy.getByTestId(TEST_ID.Switch.AlergenSwitcher).click();
            cy.getByTestId(TEST_ID.Button.AlergenMenu).click();
            cy.getByTestId('allergens-menu').should('be.visible');
            cy.getByTestId('allergen-1').click();
            cy.getByTestId('allergen-5').click();
            cy.getByTestId(TEST_ID.Button.AddOtherAlergen).type('Гриб{enter}');
            cy.getByTestId(TEST_ID.Button.AlergenMenu).click();
            cy.getByTestId(TEST_ID.Input.Search).type('Капус');

            interceptApi(
                {
                    url: `${API_ENDPOINTS.Recipe}*`,
                    query: {
                        [SEARCH_PARAMS.ALLERGENS_QUERY]: /.*/,
                        [SEARCH_PARAMS.SEARCH_QUERY]: /.*/,
                    },
                },
                {
                    statusCode: 200,
                    delay: DELAY.SM,
                    body: {
                        data: allRecipes.slice(0, 1),
                        meta: metaData,
                    },
                },
            );

            cy.getByTestId(TEST_ID.Button.Search).should('be.visible').click();

            cy.get(`[data-test-id^=${TEST_ID.Card.Food}]`).should('have.length', 1);
        });
    });

    describe('navigation and Tabs Functionality', () => {
        it('check navigation and tabs', () => {
            cy.viewport(1920, 1080);
            interceptRecipesBySubCategory(DELAY.SM, {
                data: veganSnacks,
                meta: { page: 1, totalPages: 1, limit: 8 },
            });
            cy.getByTestId(TEST_ID.Link.Vegan).click();

            cy.getByTestId('tab-snacks-0').should('have.attr', 'aria-selected', 'true');
            cy.url().should('include', '/vegan/snacks');
            cy.getByTestId(`${TEST_ID.Card.Food}-0`).contains(veganSnacks[0].title);
            interceptRecipesBySubCategory(DELAY.SM, {
                data: veganGarnish,
                meta: { page: 1, totalPages: 1, limit: 8 },
            });
            cy.getByTestId('tab-side-dishes-1').click();
            cy.getByTestId(`${TEST_ID.Card.Food}-0`).contains(veganGarnish[0].title);
            cy.getByTestId('side-dishes-active').should('exist');
            cy.getByTestId('snacks-active').should('not.exist');
        });

        it('when click on tab request occures and loader exist. Screen 768px', () => {
            cy.viewport(768, 1080);
            interceptRecipesBySubCategory(DELAY.SM, {
                data: veganSnacks,
                meta: { page: 1, totalPages: 1, limit: 8 },
            });

            cy.getByTestId(TEST_ID.Button.BurgerOpen).should('exist').click();
            cy.getByTestId(TEST_ID.Nav).should('be.visible');
            cy.getByTestId(TEST_ID.Link.Vegan).click();

            cy.getByTestId(TEST_ID.Button.BurgerClose).should('exist').click();

            cy.getByTestId('tab-snacks-0').should('have.attr', 'aria-selected', 'true');

            interceptRecipesBySubCategory(2000, {
                data: veganGarnish,
                meta: { page: 1, totalPages: 1, limit: 8 },
            });
            cy.getByTestId('tab-side-dishes-1').click();
            cy.getByTestId(TEST_ID.AppLoader).should('exist').and('be.visible');
            cy.getByTestId('tab-side-dishes-1').should('have.attr', 'aria-selected', 'true');
            cy.getByTestId('tab-snacks-0').should('have.attr', 'aria-selected', 'false');
            cy.getByTestId(TEST_ID.AppLoader).should('not.exist');

            interceptRecipesBySubCategory(2000, {
                data: veganDesserts,
                meta: { page: 1, totalPages: 1, limit: 8 },
            });
            cy.getByTestId('tab-desserts-2').click();
            cy.getByTestId(TEST_ID.AppLoader).should('exist').and('be.visible');

            cy.getByTestId('tab-desserts-2').should('have.attr', 'aria-selected', 'true');
            cy.getByTestId('tab-side-dishes-1').should('have.attr', 'aria-selected', 'false');
            cy.getByTestId('tab-snacks-0').should('have.attr', 'aria-selected', 'false');
            cy.getByTestId(TEST_ID.AppLoader).should('not.exist');
        });
    });

    describe('breadcrumbs Functionality', () => {
        it('transfer on breadcrumbs', () => {
            cy.viewport(768, 1080);
            interceptApi(
                { url: `${API_ENDPOINTS.Recipe}/*` },
                { statusCode: 200, delay: DELAY.SM, body: meatSnacks[1] },
            );

            cy.getByTestId(`${TEST_ID.Card.Carousel}-3`).click();

            cy.url().should('include', `snacks/meat-snacks/${meatSnacks[1]._id}`);
            cy.getByTestId(TEST_ID.Button.BurgerOpen).click();
            cy.getByTestId(TEST_ID.Breadcrumbs).contains(meatSnacks[1].title);
            cy.getByTestId(TEST_ID.Breadcrumbs).contains('Закуски').click();
            cy.url().should('match', /\/meat-snacks$/);
            cy.getByTestId('tab-meat-snacks-0').should('have.attr', 'aria-selected', 'true');
            cy.getByTestId(TEST_ID.Button.BurgerOpen).click();
            cy.getByTestId(TEST_ID.Breadcrumbs).should('not.contain', meatSnacks[1].title);
            cy.getByTestId(TEST_ID.Breadcrumbs).contains('Главная').click();
            cy.getByTestId('carousel').should('exist');
            cy.contains('Приятного аппетита!');
        });
    });

    describe('juiciest page', () => {
        it('go to juiciest page. Render elements. Screen 1920px', () => {
            cy.viewport(1920, 750);
            cy.contains('Приятного аппетита').as('homeHeding').should('exist');
            cy.contains('Самое сочное').should('exist').and('be.visible');
            interceptJuiciestPage();
            cy.getByTestId(TEST_ID.Link.Jusiest).should('exist').click();
            cy.getByTestId(TEST_ID.AppLoader).should('exist');
            cy.getByTestId(TEST_ID.AppLoader).should('not.exist');
            cy.get('@homeHeding').should('not.exist');
            cy.contains('Самое сочное').should('exist').and('be.visible');
            cy.get(`[data-test-id^=${TEST_ID.Card.Food}]`).should(
                'have.length',
                DEFAULT_RECIPE_LIMIT,
            );
            cy.getByTestId(TEST_ID.Button.LoadMore)
                .scrollIntoView()
                .should('exist')
                .and('not.be.disabled');
        });

        it('check load more button functionality. Screen 768px and 360px.', () => {
            cy.viewport(768, 1024);
            cy.contains('Самое сочное').should('exist').and('be.visible');

            interceptJuiciestPage();
            cy.getByTestId(TEST_ID.Link.Jusiest).should('exist').click();

            cy.get(`[data-test-id^=${TEST_ID.Card.Food}]`).should(
                'have.length',
                DEFAULT_RECIPE_LIMIT,
            );

            interceptJuiciestPage(2, 2000);
            cy.getByTestId(TEST_ID.Button.LoadMore)
                .scrollIntoView()
                .should('not.be.disabled')
                .click();
            cy.getByTestId(TEST_ID.Button.LoadMore).should('include.text', 'Загрузка');

            cy.get(`[data-test-id^=${TEST_ID.Card.Food}]`).should(
                'have.length',
                DEFAULT_RECIPE_LIMIT * 2,
            );
            cy.viewport(360, 600);

            interceptJuiciestPage(3);
            cy.getByTestId(TEST_ID.Button.LoadMore)
                .scrollIntoView()
                .should('not.be.disabled')
                .click();

            cy.get(`[data-test-id^=${TEST_ID.Card.Food}]`).should(
                'have.length',
                DEFAULT_RECIPE_LIMIT * 3,
            );
            cy.getByTestId(TEST_ID.Button.LoadMore).should('not.exist');
        });
    });

    describe('error page functionality', () => {
        it('render error page via redirect if category and subcategory is not exist. Screen 1920px width.', () => {
            cy.viewport(1920, 750);
            cy.visit('some-path/not-exist');
            cy.url().should('contain', 'not-found');
            cy.getByTestId(TEST_ID.Link.ErrorHomePage).should('exist');
            cy.get('h1').contains('Такой страницы нет').should('exist').and('be.visible');
            cy.contains('Можете поискать другой').should('exist');
        });

        it('go back to home page. Screen 360px.', () => {
            cy.viewport(360, 800);
            cy.visit('some-path/not-exist');
            cy.url().should('contain', 'not-found');
            cy.getByTestId(TEST_ID.Link.ErrorHomePage).should('exist').click();
            cy.url().should('not.contain', 'not-found');
            cy.url().should('contain', '/');
        });
    });
});

describe('app loader and error notification', () => {
    beforeEach(() => {
        cy.clearLocalStorage();
        cy.clearAllSessionStorage();
        interceptApi(
            { url: '/**', alias: 'uncaptured' },
            {
                statusCode: 200,
                delay: 0,
            },
        );
        interceptCategories(2000);
        interceptNewestRecipes();
        interceptJuiciestRecipes();
        interceptRelevantRecipes();
        signIn();
    });

    context('apploader flow', () => {
        it('apploader should exist when app is loading screnn 1920px', () => {
            cy.viewport(1920, 750);
            cy.getByTestId(TEST_ID.AppLoader).should('exist').and('be.visible');
            cy.getByTestId(TEST_ID.AppLoader).should('not.exist');
        });

        it('apploader should exist when app is loading screen 360px', () => {
            cy.viewport(360, 800);
            cy.getByTestId(TEST_ID.AppLoader).should('exist').and('be.visible');
            cy.getByTestId(TEST_ID.AppLoader).should('exist').and('be.visible');
            cy.getByTestId(TEST_ID.AppLoader).should('not.exist');
        });
    });

    context('error notification', () => {
        beforeEach(() => {
            interceptApi(
                {
                    url: `${API_ENDPOINTS.RecipeByCategory}/*`,
                    query: { [SEARCH_PARAMS.LIMIT_QUERY]: RELEVANT_KITCHEN_LIMIT },
                },
                { statusCode: 404, body: {}, delay: DELAY.SM },
            );
        });

        it('error notification should be visible when the request error occured screen 768px', () => {
            cy.viewport(768, 1080);
            cy.getByTestId(TEST_ID.Notification.Error).should('exist').and('be.visible');
            cy.contains('Ошибка сервера').should('exist').and('be.visible');
            cy.contains('Попробуйте поискать снова попозже').and('be.visible');
            cy.getByTestId(TEST_ID.Button.CloseAlert).should('exist').and('not.be.disabled');
        });

        it('error notification should be visible when the request error occured and screen 360px. Close alert', () => {
            cy.viewport(360, 800);
            cy.getByTestId(TEST_ID.Notification.Error).should('exist').and('be.visible');
            cy.getByTestId(TEST_ID.Button.CloseAlert)
                .should('exist')
                .and('not.be.disabled')
                .click();
            cy.getByTestId(TEST_ID.Notification.Error).should('not.exist');
        });
    });
});
