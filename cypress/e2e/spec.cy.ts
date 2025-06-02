/// <reference types="cypress" />
import { RouteMatcherOptions, StaticResponseWithOptions } from 'cypress/types/net-stubbing';

const RESOLUTION = {
    desktop: [1887, 1120],
    tablet: [769, 1024],
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
    (['mobile', 'tablet', 'desktop'] as const).forEach((device) => takeScreenshot(key, device));
};

const API_BASE_URL = 'https://marathon-api.clevertec.ru';
const VERIFICATION_CODE_PIN_ID = [1, 2, 3, 4, 5, 6];
const INPUT_OVER_50 = 'А'.repeat(51);
const VERIFICATION_ROUTE = '/verification';
const ACCESS_TOKEN_HEADER = [
    'Authentication-Access',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWExYmMyM2Y4ZTdkOTAxZjRjM2QyYTEiLCJsb2dpbiI6InVzZXJfdGVzdCIsImlhdCI6MTc0Njk5MTEwOCwiZXhwIjoxNzQ2OTk0NzA4fQ',
];
const SIGN_UP_LOGIN_CONFLICT_MESSAGE = 'Пользователь с таким login уже существует.';
const SIGN_UP_EMAIL_CONFLICT_MESSAGE = 'Пользователь с таким email уже существует.';

const TEST_ID = {
    Header: 'header',
    Footer: 'footer',
    Nav: 'nav',
    AppLoader: 'app-loader',
    SearchBlockLoader: 'loader-search-block',
    Breadcrumbs: 'breadcrumbs',
    HeaderLogo: 'header-logo',
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
        RecipeImageModal: 'recipe-image-modal',
        RecipeImageModalPreviewImage: 'recipe-image-modal-preview-image',
        PreventiveModal: 'recipe-preventive-modal',
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
        ErrorTitle: 'error-notification-title',
        ErrorDescription: 'error-notification-description',
    },
    Recipe: {
        Title: 'recipe-title',
        Description: 'recipe-description',
        Categories: 'recipe-categories',
        Time: 'recipe-time',
        Portions: 'recipe-portions',
        Form: 'recipe-form',
        DeleteButton: 'recipe-delete-button',
        SaveDraftButton: 'recipe-save-draft-button',
        PublishButton: 'recipe-publish-recipe-button',
        ImageBlock: 'recipe-image-block',
        AddRecipeButton: 'add-recipe-button',
        ImageBlockInputFile: 'recipe-image-block-input-file',
        ImageBlockPreviewImage: 'recipe-image-block-preview-image',
        AddIngredientsButton: 'recipe-ingredients-add-ingredients',
    },
    Bloggers: {
        // main page
        MainPageBlogsBox: 'main-page-blogs-box',
        MainPageBlogsButton: 'main-page-blogs-button',
        MainPageBlogsGrid: 'main-page-blogs-grid',
        BlogsCard: 'blogs-card',
        BlogsCardName: 'blogs-card-name',
        BlogsCardLogin: 'blogs-card-login',
        BlogsCardNotesText: 'blogs-card-notes-text',
        BlogsCardNewRecipesBadge: 'blogs-card-new-recipes-badge',
        BlogsCardRecipesButton: 'blogs-card-recipes-button',
        BlogsCardNotesButton: 'blogs-card-notes-button',
        RecipeCardList: 'recipe-card-list',
        BlogNotesBox: 'blog-notes-box',

        // blogs page
        BlogsFavoritesBox: 'blogs-favorites-box',
        BlogsFavoritesGrid: 'blogs-favorites-grid',
        BlogsOthersBox: 'blogs-others-box',
        BlogsOthersGrid: 'blogs-others-grid',
        BlogsOthersButton: 'blogs-others-button',
        BlogToggleSubscribe: 'blog-toggle-subscribe',
        BlogToggleUnsubscribe: 'blog-toggle-unsubscribe',

        // blogger profile
        BloggerUserInfoBox: 'blogger-user-info-box',
        BloggerUserInfoName: 'blogger-user-info-name',
        BloggerUserInfoLogin: 'blogger-user-info-login',

        BloggerFollowersCount: 'blogger-followers-count',
        BloggerFollowersBookmarks: 'blogger-followers-bookmarks',

        BloggerUserNotesCount: 'blogger-user-notes-count',
        BloggerUserNotesGrid: 'blogger-user-notes-grid',
        BloggerUserNotesButton: 'blogger-user-notes-button',

        BloggerUserOtherBlogsButton: 'blogger-user-other-blogs-button',
        BloggerUserOtherBlogsGrid: 'blogger-user-other-blogs-grid',
        BloggerUserBreadcrumbName: 'blogger-user-breadcrumb-name',
        BloggerUserBreadcrumbSection: 'blogger-user-breadcrumb-section',
        NotesCardDate: 'notes-card-date',
        NotesCardText: 'notes-card-text',

        BlogTooltip: 'blog-tooltip',
        MobileLoader: 'mobile-loader',
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
    MeasureUnits: '/measure-units',
    Category: '/category',
    Recipe: '/recipe',
    RecipeDraft: '/recipe/draft',
    RecipeByCategory: '/recipe/category',
    FileUpload: '/file/upload',
    GetBloggerById: '/recipe/user',
    GetBloggers: '/bloggers',
    ToggleSubscription: '/users/toggle-subscription',
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
        cy.getByTestId(TEST_ID.Button.CloseAlert).click({ force: true });
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

            cy.get('@firstNameInput').clear();
            checkProgressBar(0, 0);

            cy.get('@firstNameInput').clear().type(VALIDATION_PASS_VALUE.FirstName);
            cy.get('@lastNameInput').type(VALIDATION_FAIL_VALUE.LastName);
            checkProgressBar(14, 18);
            cy.get('@lastNameInput').clear().type(VALIDATION_PASS_VALUE.LastName);
            checkProgressBar(31, 35);

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
        icon: '/media/icons/d81dc799-aa68-4ae2-8c1b-f3fb6709c1fe.svg',
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
        icon: '/media/icons/b052e552-3f18-46a1-bb67-7664da1f80cb.svg',
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
        icon: '/media/icons/35305129-05b0-49d9-a634-1ca4da7195e5.svg',
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
        _id: '67d5b91fc3df99732a05d344',
        createdAt: '2025-03-15T17:30:07.801Z',
        title: 'Паровой куриный рулет с мандаринами и черносливом',
        description:
            'Главная прелесть этого рулета заключается в том, что начинка в нем может быть какой угодно: овощной, грибной, или как тут — фруктовой.',
        time: 40,
        image: '/media/images/cf402bc3-f9e4-4daa-a01e-6c9824b54bf6.jpg',
        likes: 0,
        views: 0,
        bookmarks: 0,
        portions: 1,
        authorId: '357',
        categoriesIds: ['67c46eb2f51967aa8390beec'],
        steps: [
            {
                stepNumber: 1,
                description:
                    'Чернослив избавить от косточек, залить кипятком и оставить на час-полтора, чтобы он хорошо пропитался. Мандарины тщательно очистить от кожуры и пленок, разделить на дольки.',
                image: '/media/images/ca513d1f-ccc6-4793-9438-b91773418e7a.webp',
            },
            {
                stepNumber: 2,
                description:
                    'Разрезать куриное филе вдоль на две части. Полученные куски выложить внахлест на разделочную доску, покрытую пищевой пленкой, и хорошенько отбить, особенно в местах, где куски соединяются. Слегка посолить и поперчить мясо.',
                image: '/media/images/e3b6791a-4c12-43b7-9f1b-de85619f2325.webp',
            },
            {
                stepNumber: 3,
                description:
                    'Грецкие орехи порубить острым ножом или смолоть в блендере. Половиной получившихся ореховых крошек равномерно посыпать отбитое и приправленное мясо.',
                image: '/media/images/470d144f-ada4-4db8-b041-1a5cd32e10ab.webp',
            },
            {
                stepNumber: 4,
                description:
                    'Сверху на орехи выложить чернослив (его при желании можно измельчить, а можно оставить как есть, чтобы затем на срезе рулета были видны целые фрукты), на чернослив — дольки мандарина. Сверху посыпать оставшимися орехами.',
                image: '/media/images/f4fedd8d-9ae7-4f53-9dc3-649c204f1af0.webp',
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
    {
        _id: '67d5a8bdc3df99732a05d330',
        createdAt: '2025-03-15T16:20:13.090Z',
        title: 'Куриные ножки в соево-медовом соусе',
        description: 'Курица получается очень вкусная даже без предварительного маринования.',
        time: 35,
        image: '/media/images/2c4df20c-0cc0-4a70-8f82-7df32573d6ef.webp',
        likes: 0,
        views: 0,
        bookmarks: 0,
        portions: 3,
        authorId: '6813a97738ff6fb67965a99d',
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
];

const fishSnacks = [
    {
        _id: '67d5a5a2c3df99732a05d32e',
        createdAt: '2025-03-15T16:06:58.955Z',
        title: 'Рулеты с семгой в лаваше',
        description:
            'Тут в лаваш заворачивают конкретно семгу — жирную, чуть сладковатую, очень вкусную.',
        time: 10,
        image: '/media/images/79150e80-36a7-4d7c-9450-e226e96790cd.webp',
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
        image: '/media/images/3497913f-ba9f-494e-81fe-30f21fb82ced.webp',
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
        image: '/media/images/7f1dfc6f-b1d9-44f8-a04f-d7e1c99bc41e.jpg',
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
                image: '/media/images/7f0ec832-52f6-4433-a2f0-20f291a6c7ba.webp',
            },
            {
                stepNumber: 2,
                description:
                    'Помидоры нарезать кубиками с ребром около полсантиметра. Мелко нарубить три зубчика чеснока.',
                image: '/media/images/0fd38d64-c0a1-4987-8a01-571b61a875a9.webp',
            },
            {
                stepNumber: 3,
                description:
                    'Разогреть сковороду, плеснуть в нее немного оливкового масла и высыпать в него помидоры и чеснок. Готовить их минуту-другую, просто чтобы прогреть, не потеряв вкуса свежего помидора. Тогда капнуть в сковороду бальзамического крема, перемешать и снять с огня.',
                image: '/media/images/eae9e53c-383f-40a0-a997-55095f1322d7.webp',
            },
            {
                stepNumber: 4,
                description:
                    'Поджаренный хлеб пропитать оставшимся оливковым маслом, разлив понемногу на каждый ломоть. Сверху выложить теплые помидоры, посолить по вкусу, посыпать свежемолотым черным перцем и мелко нарезанной зеленью — любой, какая окажется под рукой. ',
                image: '/media/images/8594c68d-1d9a-4112-a282-fea8f494a918.webp',
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
        image: '/media/images/c8af83bf-20cc-412a-b0f2-4d17abe0a8e3.webp',
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
                image: '/media/images/44c3ca4c-a642-4b16-8d18-8529e0ceb2bd.webp',
            },
            {
                stepNumber: 2,
                description:
                    'Добавить одну-две столовые ложки воды и сок лайма, чтобы смесь стала более жидкой.',
                image: '/media/images/f76f0840-d0fe-48b5-99b5-79dab7a0c7e4.webp',
            },
            {
                stepNumber: 3,
                description:
                    'Очистить авокадо, удалить косточки, нарезать мякоть небольшими кубиками. Добавить к пасте из чили и помидоров и тщательно все размять. Подавать с кукурузными чипсами',
                image: '/media/images/f1b27c8c-496d-4ba0-8e2a-b1bdd5051c4b.webp',
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
        image: '/media/images/f324c69d-e9c8-4089-a4f6-4408ffc6005b.webp',
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
                image: '/media/images/05b82249-38ad-4636-aea4-1ff6646627a2.webp',
            },
            {
                stepNumber: 2,
                description:
                    'Разложить грибную смесь по формочкам, залить сливками, посыпать тертым сыром и запекать в духовке при 180 градусах 20–25 минут.',
                image: '/media/images/364a87d0-b68a-4145-80de-c8bec91d2bc5.webp',
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
                    'Взять два болгарских перца, красный и желтый, вырезать плодоножку, вычистить семена и на их место вложить по раздавленному зубчику чеснока и веточке тимьяна. Завернуть в фольгу и запекать сорок минут при 180 градусах, после чего сразу окунуть в ледяную воду, снять кожуру — и нарезать в произвольном формате.',
                image: '/media/images/0db72f46-c691-4838-a0d5-47e293c28ba3.webp',
            },
            {
                stepNumber: 2,
                description:
                    'Для домашнего майонеза смешать три желтка с дижонской горчицей и, не спеша постоянно размешивая, влить растительное масло. В конце добавить пару чайных ложек хересного уксуса, соль и перец. Смешать майонез с пробитым в блендере консервированным тунцом.',
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
        image: '/media/images/a754ecaf-9e9a-45d2-8df4-56ea97f43b13.jpg',
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
                image: '/media/images/f6873dcc-2755-4acc-ba56-6f9b39720813.jpg',
            },
            {
                stepNumber: 2,
                description:
                    'Болгарский перец промойте и удалите внутренние перегородки с семенами. Очищенные лук, морковь и болгарский перец нарежьте небольшими кубиками.',
                image: '/media/images/40e9c2fe-9bf2-4dba-85ea-8d4ddd056281.jpg',
            },
            {
                stepNumber: 3,
                description: 'Приятного аппетита!',
                image: '/media/images/cd696a32-05a0-4a95-b2f9-372bbc68b0f7.jpg',
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
        image: '/media/images/00b0f891-a720-4742-84fa-a004ffdf15f2.jpg',
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
                image: '/media/images/bdb03412-2851-4dd9-96ac-8d0f425532f9.jpg',
            },
            {
                stepNumber: 2,
                description: 'Картофель нарезаем кусочками и отправляем его вариться.',
                image: '/media/images/24992e5a-46e3-49ab-ab9c-e300d5b97746.jpg',
            },
            {
                stepNumber: 3,
                description: 'Лук мелко нарезаем.',
                image: '/media/images/4839f466-9604-4db7-8c83-0d3f7c99592a.jpg',
            },
            {
                stepNumber: 4,
                description: 'Нарезаем грибы.',
                image: '/media/images/1aeb1db3-50e6-44c9-b062-65f44164b7c6.jpg',
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
        image: '/media/images/5fd9861e-06b4-4043-99d1-4f2c0b02434f.jpg',
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
                image: '/media/images/af75d303-3599-42e3-90b0-72f5a850d941.jpg',
            },
            {
                stepNumber: 2,
                description: 'Картофель тщательно помойте, обсушите.',
                image: '/media/images/cc186430-481b-4d7b-9f1a-26db4b7fcf8f.jpg',
            },
            {
                stepNumber: 3,
                description:
                    'Добавьте растительное масло, соль, чёрный молотый перец и панировочные сухарики. Все перемешайте так, чтобы специи и сухари равномерно распределились по картофелю.',
                image: '/media/images/f1129db1-0e3c-4b34-9f97-154c80c17f14.jpg',
            },
            {
                stepNumber: 4,
                description:
                    'На край формы для запекания добавьте половинку головки чеснока в кожуре. Запекайте картофель в разогретой до 190 градусов духовке 35-40 минут.',
                image: '/media/images/7d406e43-b386-4b81-b7c5-1b175fb81a05.jpg',
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
        image: '/media/images/45ed37b3-5583-4336-a059-bc9d27183237.jpg',
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
                image: '/media/images/cbea9347-f960-4593-bc69-fde0ca5ac7d6.jpg',
            },
            {
                stepNumber: 2,
                description: 'Нарезать все овощи мелкими кубиками.',
                image: '/media/images/5df90d60-a28d-40a0-bee0-0b4f56cb343c.jpg',
            },
            {
                stepNumber: 3,
                description:
                    'На разогретую сковороду добавить растительное масло и выложить лук. Обжарить лук в течение 1 минуты.',
                image: '/media/images/bc874c99-6588-4a7e-b5a9-72799bb141fd.jpg',
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
        image: '/media/images/88f990b7-ed06-45af-8c1f-9122107f8138.jpg',
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
                    'Как сделать салат с арбузом, Фетой и рукколой. Для начала необходимо подготовить все ингредиенты. Арбуз выбирайте не переспевший, сладкий и, желательно, с минимальным количеством зерен. Для добавления хрустящей текстуры можно добавить к салату свежий огурец.',
                image: '/media/images/93433284-17e6-4b7c-925e-0c367249f575.jpg',
            },
            {
                stepNumber: 2,
                description:
                    'Арбуз нарежьте на куски, а затем разрежьте каждый кусок на квадраты среднего размера. Достаньте из арбуза косточки и переложите нарезанный арбуз в салатник, накройте крышкой или пленкой и отправьте в холодильник (чтобы он слегка охладился, пока подготавливаются остальные ингредиенты). Листочки мяты промойте и мелко нарежьте.',
                image: '/media/images/811e1382-2a75-443b-998f-8d6d6858edc0.jpg',
            },
            {
                stepNumber: 3,
                description:
                    'Сыр фета нарежьте на кусочки одинакового среднего размера. О том, какие виды сыра подойдут в качестве замены, читайте в статье по ссылке в конце рецепта.',
                image: '/media/images/5ed6e475-0a16-4f56-aec6-b3de0a066a0e.jpg',
            },
            {
                stepNumber: 4,
                description:
                    'Рукколу хорошо промойте под проточной водой и обсушите бумажным полотенцем. Достаньте арбуз из холодильника. Добавьте к арбузу сыр, рукколу, мяту, оливковое масло. Посолите и поперчите по вкусу. Тщательно и аккуратно перемешайте салат.',
                image: '/media/images/23fc6f59-a32c-48c9-86d0-a9649d60aef5.jpg',
            },
            {
                stepNumber: 5,
                description:
                    'После приготовления салат с арбузом, Фетой и рукколой можно сразу подавать к столу. Приятного аппетита!',
                image: '/media/images/646e8f62-74d6-45d1-96c0-f176971754b9.jpg',
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
        image: '/media/images/b4568550-60d4-467f-bad5-ed61e2e5c339.jpg',
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
                    'Для этого блюда подходит даже не очень сладкая и не слишком красивая клубника, такая неизбежно попадается, как старательно ни выбирай. Наоборот, чем мягче она будет, тем однороднее пюре и качественней лед получится. Киви тоже лучше выбирать мягкие, очень спелые.',
                image: '/media/images/52461e40-17c0-4c7b-831a-bae4fba8d25d.jpg',
            },
            {
                stepNumber: 2,
                description:
                    'Сахар всыпать в воду, нагреть до полного его растворения. Добавить лимонный сок. Количество сахара и лимонного сока регулируйте по своему вкусу, много еще зависит от сладости ягод и фруктов.',
                image: '/media/images/058de5ad-db3f-409b-9539-388ff4d05d17.jpg',
            },
            {
                stepNumber: 3,
                description: 'Клубнику очистить, растолочь давилкой.',
                image: '/media/images/767e4ebc-fc97-476a-a92f-a5a0ca925ddc.jpg',
            },
            {
                stepNumber: 4,
                description:
                    'Киви очистить, нарезать кусочками и пюрировать. Можно использовать блендер или терку.',
                image: '/media/images/a46c8961-4be8-46fa-a2b3-9fc9e544ba39.jpg',
            },
            {
                stepNumber: 5,
                description: 'В клубничное пюре добавить половину сахарного сиропа.',
                image: '/media/images/05c699d0-6f20-4f38-983a-99b3b80e7ef1.jpg',
            },
            {
                stepNumber: 6,
                description: 'Влить в пюре из киви оставшийся сахарный сироп.',
                image: '/media/images/5f92d664-9ba4-477e-98d0-ffcf480fd0e4.jpg',
            },
            {
                stepNumber: 7,
                description:
                    'В качестве формочек я использовала небольшие пластиковые стаканчики (100 мл) и деревянные палочки для мороженого. А вообще в продаже есть специальные формы для домашнего мороженого.',
                image: '/media/images/2759fa3f-4a63-4997-b86b-2662eb74d28b.jpg',
            },
            {
                stepNumber: 8,
                description:
                    'В один стаканчик влить клубничное пюре, заполнив его до половины. Другой наполовину заполнить пюре из киви. Поставить формы в морозилку на 1 час.',
                image: '/media/images/53657c67-5537-420a-846c-50526f08e5a2.jpg',
            },
            {
                stepNumber: 9,
                description: 'Воткнуть в подмерзшую смесь деревянные палочки.',
                image: '/media/images/f646be37-e941-486b-aad1-b609a2c6617a.jpg',
            },
            {
                stepNumber: 10,
                description:
                    'Залить оставшимся пюре из клубники и киви соответственно. Поставить формы в холодильник до полного замерзания, это займет 2-3 часа. Достать фруктовый лед из формочек. Если он застрял, их можно на пару секунд опустить в горячую воду.',
                image: '/media/images/f7025dc0-346c-475e-af0a-b787ce9e5a5d.jpg',
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
    data: allRecipes.slice(5, 10),
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
                data: allRecipes
                    .slice(0, Number(SLIDER_SIZE))
                    .sort(
                        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
                    ),
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

const interceptGetMyRecipe = () =>
    interceptApi(
        {
            url: `${API_ENDPOINTS.Recipe}/681cbbd4b6c3c1bbdbf32bba`,
            alias: 'getMyRecipe',
            method: 'GET',
        },
        {
            statusCode: 200,
            body: NEW_RECIPE_RESPONSE,
            delay: DELAY.SM,
            withLoader: true,
        },
    );

const interceptGetMeasureUnits = () =>
    interceptApi(
        { url: API_ENDPOINTS.MeasureUnits, alias: 'getMeasureUnits' },
        {
            statusCode: 200,
            body: [
                { id: '1', name: 'г' },
                { id: '2', name: 'кг' },
                { id: '3', name: 'мл' },
                { id: '4', name: 'л' },
                { id: '5', name: 'шт' },
                { id: '6', name: 'столовая ложка' },
                { id: '7', name: 'чайная ложка' },
                { id: '8', name: 'по вкусу' },
            ],
            delay: DELAY.SM,
        },
    );

const interceptUploadFile = () =>
    interceptApi(
        { url: API_ENDPOINTS.FileUpload, alias: 'uploadFile', method: 'POST' },
        {
            statusCode: 200,
            body: {
                name: '9dc4a27e-923f-4e2c-bd86-4246d34408a5.webp',
                url: '/media/images/9dc4a27e-923f-4e2c-bd86-4246d34408a5.webp',
                _id: '681a718cb6c3c1bbdbf32bb8',
            },
            delay: DELAY.SM,
        },
    );

const interceptUpdateRecipe = () =>
    interceptApi(
        {
            url: `${API_ENDPOINTS.Recipe}/681cbbd4b6c3c1bbdbf32bba`,
            alias: 'updateRecipe',
            method: 'PATCH',
        },
        {
            statusCode: 200,
            body: UPDATE_RECIPE_RESPONSE,
            delay: DELAY.SM,
        },
    );

const interceptCreateDraftRecipe = () =>
    interceptApi(
        { url: API_ENDPOINTS.RecipeDraft, alias: 'createDraftRecipe', method: 'POST' },
        {
            statusCode: 200,
            body: {},
            delay: DELAY.SM,
            expectedBody: {
                title: 'Будущий шедевр',
                description: 'Описание будущего шедевра',
            },
        },
    );

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

        interceptBloggers('65a1bc23f8e7d901f4c3d2a1');
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

            cy.getByTestId(TEST_ID.Link.Jusiest).should('not.be.visible');
            cy.getByTestId(TEST_ID.Link.JusiestMob).should('exist').and('be.visible').click();

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
            const { _id, title, authorId } = juiciestRecipes[0];
            interceptApi(
                {
                    url: `${API_ENDPOINTS.Recipe}/${_id}`,
                },
                { body: juiciestRecipes[0] },
            );
            interceptBloggerById(authorId, '65a1bc23f8e7d901f4c3d2a1');

            cy.getByTestId('card-link-0').click();
            cy.url().should('include', _id);
            cy.contains(title).should('exist');
            cy.scrollTo('top');
            cy.getByTestId('ingredient-quantity-0').contains('4');
            cy.getByTestId('ingredient-quantity-1').contains('3');
            cy.getByTestId('increment-stepper').click();
            cy.getByTestId('ingredient-quantity-0').contains('8');
            cy.getByTestId('ingredient-quantity-1').contains('6');
            cy.getByTestId('decrement-stepper').click().click();
            cy.getByTestId('ingredient-quantity-0').contains('4');
            cy.getByTestId('ingredient-quantity-1').contains('3');
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
            interceptBloggerById(meatSnacks[1].authorId, '65a1bc23f8e7d901f4c3d2a1');

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
            cy.getByTestId(TEST_ID.Link.JusiestMob).should('exist').click();

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
            interceptBloggers('65a1bc23f8e7d901f4c3d2a1');

            interceptCategories(2000);
            interceptNewestRecipes();
            interceptJuiciestRecipes();
            interceptRelevantRecipes();
            signIn();
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
                    .click({ force: true });
                cy.getByTestId(TEST_ID.Notification.Error).should('not.exist');
            });
        });
    });
});

const NEW_RECIPE_RESPONSE = {
    title: 'Плов из детства',
    description: 'Супер вкусный и нежный плов по рецепту из вашего детства',
    time: 54,
    image: '/media/images/9dc4a27e-923f-4e2c-bd86-4246d34408a5.webp',
    portions: 5,
    authorId: '65a1bc23f8e7d901f4c3d2a1',
    categoriesIds: [
        '67c46df5f51967aa8390bee7',
        '67c46e19f51967aa8390bee8',
        '67c46e2bf51967aa8390bee9',
        '67c48e627b493acd8a41030c',
        '67c48f60ed67ca980917d64e',
    ],
    steps: [
        {
            stepNumber: 1,
            description: 'Берем сперва укропу',
            image: '/media/images/9dc4a27e-923f-4e2c-bd86-4246d34408a5.webp',
        },
        {
            stepNumber: 2,
            description: 'Потом кошачью ****',
            image: null,
        },
        {
            stepNumber: 3,
            description: 'Дальше сами знаете...',
            image: null,
        },
    ],
    nutritionValue: {
        calories: 1,
        protein: 0,
        fats: 0,
        carbohydrates: 1,
    },
    ingredients: [
        {
            measureUnit: 'г',
            title: 'сахар',
            count: 4,
        },
        {
            measureUnit: 'шт',
            title: 'кот',
            count: 1,
        },
        {
            measureUnit: 'кг',
            title: 'укроп',
            count: 10,
        },
    ],
    views: 0,
    createdAt: '2025-05-08T14:12:36.062Z',
    _id: '681cbbd4b6c3c1bbdbf32bba',
};

const UPDATE_RECIPE_RESPONSE = {
    categoriesIds: [
        '67c46df5f51967aa8390bee7',
        '67c46e19f51967aa8390bee8',
        '67c46e2bf51967aa8390bee9',
    ],
    authorId: '65a1bc23f8e7d901f4c3d2a1',
    nutritionValue: {
        calories: 1,
        protein: 0,
        fats: 0,
        carbohydrates: 1,
    },
    description:
        'Супер вкусный и нежный плов по рецепту из вашего детства, с небольшими но приятными изменениями',
    image: '/media/images/bc0748c4-8d00-4c10-ad8e-534874343d46.webp',
    ingredients: [
        { measureUnit: 'столовая ложка', title: 'дрова', count: 50 },
        { measureUnit: 'кг', title: 'кот', count: '1' },
        { measureUnit: 'шт', title: 'укроп', count: 10 },
    ],
    portions: 7,
    steps: [
        { stepNumber: 1, description: 'Берем сперва укропу', image: null },
        {
            stepNumber: 2,
            description: 'Потом кошачью ****',
            image: '/media/images/bc0748c4-8d00-4c10-ad8e-534874343d46.webp',
        },
        { stepNumber: 3, description: 'охапка дров', image: null },
        {
            stepNumber: 4,
            description: 'и плов готов',
            image: '/media/images/9dc4a27e-923f-4e2c-bd86-4246d34408a5.webp',
        },
    ],
    time: 40,
    title: 'Доработанный плов из детства',
    views: 0,
    createdAt: '2025-05-08T14:12:36.062Z',
    _id: '681cbbd4b6c3c1bbdbf32bba',
};

const NOT_MY_RECIPE = { ...UPDATE_RECIPE_RESPONSE, authorId: '000000000000000' };

const checkBorderColor = (testId: string) =>
    cy.getByTestId(testId).should('have.css', 'border-color', 'rgb(229, 62, 62)');

describe('recipe management', () => {
    beforeEach(() => {
        cy.clearLocalStorage();
        cy.clearAllSessionStorage();

        interceptApi({ url: '/**', alias: 'uncaptured' }, { statusCode: 200, delay: 0 });

        interceptGetMeasureUnits();

        interceptUploadFile();

        interceptUpdateRecipe();

        interceptCreateDraftRecipe();

        interceptGetMyRecipe();

        interceptCategories();

        interceptNewestRecipes();

        interceptBloggers('65a1bc23f8e7d901f4c3d2a1');

        interceptJuiciestRecipes();

        interceptRelevantRecipes();

        interceptRecipesByCategory(DELAY.LG, {
            data: allRecipes.filter((item) => item.title.includes('')),
            meta: metaData,
        });

        signIn();
    });

    describe('create recipe', () => {
        beforeEach(() => {
            cy.viewport(...RESOLUTION.desktop);
            cy.getByTestId(TEST_ID.Recipe.AddRecipeButton).click();
            cy.url().should('include', '/new-recipe');
            cy.wait('@getMeasureUnits');
        });

        it('should display recipe creation form with all required elements', () => {
            takeAllScreenshots('new-recipe-page');
            cy.getByTestId(TEST_ID.Recipe.Form).should('exist');
            cy.getByTestId(TEST_ID.Recipe.Form).within(() => {
                cy.getByTestId(TEST_ID.Recipe.ImageBlock).should('exist');

                cy.getByTestId(TEST_ID.Recipe.Title).should('exist');
                cy.getByTestId(TEST_ID.Recipe.Description).should('exist');
                cy.getByTestId(TEST_ID.Recipe.Time).should('exist');
                cy.getByTestId(TEST_ID.Recipe.Portions).should('exist');
                cy.getByTestId(TEST_ID.Recipe.Categories).should('exist');

                cy.getByTestId('recipe-ingredients-title-0').should('exist');
                cy.getByTestId('recipe-ingredients-count-0').should('exist');
                cy.getByTestId('recipe-ingredients-measureUnit-0').should('exist');

                cy.getByTestId('recipe-steps-image-block-0').should('exist');
                cy.contains('Шаг 1').should('exist');
                cy.getByTestId('recipe-steps-description-0').should('exist');

                cy.getByTestId(TEST_ID.Recipe.SaveDraftButton).should('exist');
                cy.getByTestId(TEST_ID.Recipe.PublishButton).should('exist');
            });
        });

        it('should validate recipe fields properly', () => {
            cy.getByTestId(TEST_ID.Recipe.Form).within(() => {
                const longTitle = 'А'.repeat(51);
                cy.getByTestId(TEST_ID.Recipe.Title).invoke('val', longTitle).trigger('change');
                cy.getByTestId(TEST_ID.Recipe.PublishButton).click();
                checkBorderColor(TEST_ID.Recipe.Title);
                cy.getByTestId(TEST_ID.Recipe.Title).clear().type('Тестовый салат');

                const longDescription = 'А'.repeat(501);
                cy.getByTestId(TEST_ID.Recipe.Description)
                    .invoke('val', longDescription)
                    .trigger('change');
                cy.getByTestId(TEST_ID.Recipe.PublishButton).click();
                checkBorderColor(TEST_ID.Recipe.Description);
                cy.getByTestId(TEST_ID.Recipe.Description)
                    .clear()
                    .type('Описание тестового рецепта');

                cy.getByTestId(TEST_ID.Recipe.Portions).type('-5');
                cy.getByTestId(TEST_ID.Recipe.PublishButton).click();
                checkBorderColor(TEST_ID.Recipe.Portions);
                cy.getByTestId(TEST_ID.Recipe.Portions).clear().type('4');

                cy.getByTestId(TEST_ID.Recipe.Time).type('-30');
                cy.getByTestId(TEST_ID.Recipe.PublishButton).click();
                checkBorderColor(TEST_ID.Recipe.Time);
                cy.getByTestId(TEST_ID.Recipe.Time).clear().type('20000');
                cy.getByTestId(TEST_ID.Recipe.PublishButton).click();
                checkBorderColor(TEST_ID.Recipe.Time);
                cy.getByTestId(TEST_ID.Recipe.Time).clear().type('30');
            });
        });

        it('should handle recipe categories selection', () => {
            cy.getByTestId(TEST_ID.Recipe.Form).within(() => {
                cy.getByTestId(TEST_ID.Recipe.Categories).click();
                ['Мясные салаты', 'Рыбные салаты', 'Овощные салаты', 'Закуски', 'Гарниры'].forEach(
                    (category) => {
                        cy.contains(category).click({ force: true });
                    },
                );
                cy.contains('+3').should('exist');
                cy.contains('Закуски').click({ force: true });
                cy.contains('+2').should('exist');
                cy.contains('Овощные салаты').click({ force: true });
                cy.contains('+1').should('exist');
            });
            takeAllScreenshots('recipe-categories');
            cy.getByTestId(TEST_ID.Recipe.Categories).click();
        });

        it('should handle recipe ingredients properly', () => {
            cy.getByTestId(TEST_ID.Recipe.Form).within(() => {
                Array.from({ length: 5 }).forEach(() => {
                    cy.getByTestId(TEST_ID.Recipe.AddIngredientsButton).click();
                });
                cy.getByTestId(TEST_ID.Recipe.AddIngredientsButton)
                    .should('exist')
                    .and('have.length', 1);
                Array.from({ length: 5 }).forEach((_, index) => {
                    cy.getByTestId(`recipe-ingredients-remove-ingredients-${index}`).should(
                        'exist',
                    );
                });
                Array.from({ length: 5 }).forEach(() => {
                    cy.getByTestId('recipe-ingredients-remove-ingredients-0').click();
                });
                const longTitle = 'А'.repeat(51);
                cy.getByTestId('recipe-ingredients-title-0').type(longTitle);
                cy.getByTestId(TEST_ID.Recipe.PublishButton).click();
                checkBorderColor('recipe-ingredients-title-0');
                cy.getByTestId('recipe-ingredients-title-0').clear().type('Мука');
                cy.getByTestId('recipe-ingredients-count-0').clear().type('-30');
                cy.getByTestId(TEST_ID.Recipe.PublishButton).click();
                checkBorderColor('recipe-ingredients-count-0');
                cy.getByTestId('recipe-ingredients-count-0').clear().type('200');
                cy.getByTestId('recipe-ingredients-measureUnit-0').select('г');
            });
        });

        it('should validate recipe steps properly', () => {
            cy.getByTestId(TEST_ID.Recipe.Form).within(() => {
                const longStepDescription = 'А'.repeat(301);
                cy.getByTestId('recipe-steps-description-0')
                    .invoke('val', longStepDescription)
                    .trigger('change');
                cy.getByTestId(TEST_ID.Recipe.PublishButton).click();
                checkBorderColor('recipe-steps-description-0');
                cy.getByTestId('recipe-steps-description-0')
                    .clear()
                    .type('Смешать все ингредиенты');
            });
        });

        it('should handle recipe image uploads', () => {
            cy.getByTestId(TEST_ID.Recipe.ImageBlock).click();
            cy.getByTestId(TEST_ID.Modal.RecipeImageModal).should('exist');
            takeAllScreenshots('recipe-image-modal');
            cy.getByTestId(TEST_ID.Modal.RecipeImageModal).within(() => {
                cy.contains('Удалить').should('not.exist');
                cy.contains('Сохранить').should('not.exist');
            });

            cy.getByTestId(TEST_ID.Recipe.ImageBlockInputFile).selectFile(
                'cypress/fixtures/meat.webp',
                {
                    force: true,
                },
            );
            cy.getByTestId(TEST_ID.Modal.RecipeImageModalPreviewImage)
                .should('exist')
                .and('have.attr', 'src');

            takeAllScreenshots('recipe-image-modal-with-image');

            cy.getByTestId(TEST_ID.Modal.RecipeImageModal).within(() => {
                cy.contains('Удалить').should('exist');
                cy.contains('Сохранить').should('exist');
                cy.contains('Удалить').click();
            });

            cy.getByTestId(TEST_ID.Recipe.ImageBlock).click();
            cy.getByTestId(TEST_ID.Recipe.ImageBlockInputFile).selectFile(
                'cypress/fixtures/meat.webp',
                {
                    force: true,
                },
            );
            cy.getByTestId(TEST_ID.Modal.RecipeImageModal).within(() => {
                cy.contains('Сохранить').click();
            });
            cy.wait('@uploadFile');
            cy.getByTestId(TEST_ID.Recipe.ImageBlockPreviewImage).should('have.attr', 'src');

            cy.getByTestId('recipe-steps-image-block-0').click();
            cy.getByTestId('recipe-steps-image-block-0-input-file').selectFile(
                'cypress/fixtures/meat.webp',
                { force: true },
            );
            cy.getByTestId(TEST_ID.Modal.RecipeImageModal).within(() => {
                cy.contains('Сохранить').click();
            });
            cy.wait('@uploadFile');
        });

        it('should handle recipe steps management', () => {
            cy.contains('Новый шаг').click();
            cy.contains('Новый шаг').click();

            cy.contains('Шаг 1').should('exist');
            cy.contains('Шаг 2').should('exist');
            cy.contains('Шаг 3').should('exist');

            cy.getByTestId('recipe-steps-remove-button-0').should('not.exist');
            cy.getByTestId('recipe-steps-remove-button-1').should('exist');
            cy.getByTestId('recipe-steps-remove-button-2').should('exist');

            cy.getByTestId('recipe-steps-remove-button-1').click();
            cy.getByTestId('recipe-steps-description-1')
                .clear()
                .type('И еще раз смешать все ингредиенты');

            cy.contains('Шаг 1').should('exist');
            cy.contains('Шаг 2').should('exist');
        });

        it('should successfully publish a recipe', () => {
            cy.getByTestId(TEST_ID.Recipe.Title).clear().type('Плов из детства');
            cy.getByTestId(TEST_ID.Recipe.Description)
                .clear()
                .type('Супер вкусный и нежный плов по рецепту из вашего детства');
            cy.getByTestId(TEST_ID.Recipe.Time).clear().type('54');
            cy.getByTestId(TEST_ID.Recipe.Portions).clear().type('5');

            cy.getByTestId(TEST_ID.Recipe.ImageBlock).click();
            cy.getByTestId(TEST_ID.Recipe.ImageBlockInputFile).selectFile(
                'cypress/fixtures/meat.webp',
                { force: true },
            );
            cy.getByTestId(TEST_ID.Modal.RecipeImageModal).within(() => {
                cy.contains('Сохранить').click();
            });
            cy.wait('@uploadFile');

            cy.getByTestId(TEST_ID.Recipe.Form).within(() => {
                cy.getByTestId(TEST_ID.Recipe.Categories).click();
                ['Мясные салаты', 'Рыбные салаты', 'Овощные салаты', 'Закуски', 'Гарниры'].forEach(
                    (category) => {
                        cy.contains(category).click({ force: true });
                    },
                );
                cy.getByTestId(TEST_ID.Recipe.Categories).click();
            });

            cy.getByTestId('recipe-ingredients-title-0').clear().type('сахар');
            cy.getByTestId('recipe-ingredients-count-0').clear().type('4');
            cy.getByTestId('recipe-ingredients-measureUnit-0').select('г');

            cy.getByTestId(TEST_ID.Recipe.AddIngredientsButton).click();
            cy.getByTestId(TEST_ID.Recipe.AddIngredientsButton).click();

            cy.getByTestId('recipe-ingredients-title-1').clear().type('кот');
            cy.getByTestId('recipe-ingredients-count-1').clear().type('1');
            cy.getByTestId('recipe-ingredients-measureUnit-1').select('шт');

            cy.getByTestId('recipe-ingredients-title-2').clear().type('укроп');
            cy.getByTestId('recipe-ingredients-count-2').clear().type('10');
            cy.getByTestId('recipe-ingredients-measureUnit-2').select('кг');

            cy.contains('Новый шаг').click();
            cy.contains('Новый шаг').click();

            cy.getByTestId('recipe-steps-description-0').clear().type('Берем сперва укропу');
            cy.getByTestId('recipe-steps-description-1').clear().type('Потом кошачью ****');
            cy.getByTestId('recipe-steps-description-2').clear().type('Дальше сами знаете...');

            cy.getByTestId('recipe-steps-image-block-0').click();
            cy.getByTestId('recipe-steps-image-block-0-input-file').selectFile(
                'cypress/fixtures/plov.jpeg',
                { force: true },
            );
            cy.getByTestId(TEST_ID.Modal.RecipeImageModal).within(() => {
                cy.contains('Сохранить').click();
            });
            cy.wait('@uploadFile');

            const createRecipe = interceptApi(
                { url: API_ENDPOINTS.Recipe, alias: 'createRecipe', method: 'POST' },
                {
                    statusCode: 200,
                    body: NEW_RECIPE_RESPONSE,
                    delay: DELAY.SM,
                    expectedBody: {
                        title: NEW_RECIPE_RESPONSE.title,
                        description: NEW_RECIPE_RESPONSE.description,
                        time: NEW_RECIPE_RESPONSE.time,
                        portions: NEW_RECIPE_RESPONSE.portions,
                        categoriesIds: NEW_RECIPE_RESPONSE.categoriesIds,
                        image: NEW_RECIPE_RESPONSE.image,
                        steps: NEW_RECIPE_RESPONSE.steps,
                        ingredients: NEW_RECIPE_RESPONSE.ingredients,
                    },
                },
            );

            interceptBloggerById('65a1bc23f8e7d901f4c3d2a1', '65a1bc23f8e7d901f4c3d2a1');

            cy.getByTestId(TEST_ID.Recipe.PublishButton).click();
            cy.wait('@getMyRecipe');
            createRecipe();

            cy.contains('Рецепт успешно опубликован').should('be.visible');
            takeAllScreenshots('create-recipe-200');
            cy.url().should('include', '/salads/meat-salads/681cbbd4b6c3c1bbdbf32bba');
        });
    });

    describe('preventative modal', () => {
        beforeEach(() => {
            cy.viewport(...RESOLUTION.desktop);
            cy.getByTestId(TEST_ID.Recipe.AddRecipeButton).click();
            cy.url().should('include', '/new-recipe');
            cy.wait('@getMeasureUnits');
        });

        const checkPreventiveModal = () => {
            cy.getByTestId(TEST_ID.Modal.PreventiveModal).should('exist');
            cy.contains('Сохранить черновик').should('exist');
            cy.contains('Выйти без сохранения').should('exist');
        };

        const closePreventiveModal = () => {
            cy.getByTestId('close-button').click();
        };

        const saveDraft = () => {
            cy.getByTestId(TEST_ID.Modal.PreventiveModal).within(() => {
                cy.contains('Сохранить черновик').click();
            });
        };

        const exitWithoutSaving = () => {
            cy.getByTestId(TEST_ID.Modal.PreventiveModal).within(() => {
                cy.contains(/^Выйти без сохранения$/).click();
            });
        };

        it('should show preventative modal when changing basic recipe information', () => {
            cy.getByTestId(TEST_ID.Recipe.Title).clear().type('Внесли изменения');
            cy.getByTestId(TEST_ID.HeaderLogo).click();
            takeAllScreenshots('preventive-modal');
            checkPreventiveModal();
            closePreventiveModal();
            cy.getByTestId(TEST_ID.Recipe.Title).clear();

            cy.getByTestId(TEST_ID.Recipe.Description).clear().type('Внесли изменения');
            cy.contains('Закуски').click();
            checkPreventiveModal();
            closePreventiveModal();
            cy.getByTestId(TEST_ID.Recipe.Description).clear();

            cy.getByTestId(TEST_ID.Recipe.Portions).type('4');
            cy.getByTestId(TEST_ID.HeaderLogo).click();
            checkPreventiveModal();
            closePreventiveModal();
            cy.getByTestId(TEST_ID.Recipe.Portions).clear();

            cy.getByTestId(TEST_ID.Recipe.Time).type('30');
            cy.getByTestId(TEST_ID.HeaderLogo).click();
            checkPreventiveModal();
            closePreventiveModal();
        });

        it('should show preventative modal when modifying recipe images', () => {
            cy.getByTestId(TEST_ID.Recipe.ImageBlock).click();
            cy.getByTestId(TEST_ID.Recipe.ImageBlockInputFile).selectFile(
                'cypress/fixtures/meat.webp',
                {
                    force: true,
                },
            );
            cy.getByTestId(TEST_ID.Modal.RecipeImageModal).within(() => {
                cy.contains('Сохранить').click();
            });
            cy.wait('@uploadFile');

            cy.getByTestId(TEST_ID.HeaderLogo).click();
            checkPreventiveModal();
            closePreventiveModal();

            cy.getByTestId(TEST_ID.Recipe.ImageBlock).click();
            cy.getByTestId(TEST_ID.Modal.RecipeImageModal).should('exist');
            cy.getByTestId(TEST_ID.Modal.RecipeImageModal).within(() => {
                cy.contains('Удалить').click();
            });
        });

        it('should show preventative modal when changing recipe steps and categories', () => {
            cy.getByTestId('recipe-steps-description-0').type('Внесли изменения');
            cy.contains('Главная').click();
            checkPreventiveModal();
            closePreventiveModal();
            cy.getByTestId('recipe-steps-description-0').type('clear');

            cy.getByTestId(TEST_ID.Recipe.Form).within(() => {
                cy.getByTestId(TEST_ID.Recipe.Categories).click();
                ['Закуски', 'Гарниры'].forEach((category) => {
                    cy.contains(category).click({ force: true });
                });
            });

            cy.getByTestId(TEST_ID.HeaderLogo).click();
            checkPreventiveModal();
            closePreventiveModal();
        });

        it('should handle draft saving and cancellation correctly', () => {
            cy.getByTestId(TEST_ID.Recipe.Description).type('Описание будущего шедевра');
            cy.getByTestId(TEST_ID.HeaderLogo).click();
            saveDraft();
            cy.getByTestId(TEST_ID.Modal.PreventiveModal).should('not.exist');
            checkBorderColor(TEST_ID.Recipe.Title);

            cy.getByTestId(TEST_ID.Recipe.Title).type('Будущий шедевр');
            cy.getByTestId(TEST_ID.HeaderLogo).click();
            saveDraft();
            cy.wait('@createDraftRecipe');
            cy.contains('Черновик успешно сохранен').should('exist');

            cy.getByTestId(TEST_ID.Recipe.AddRecipeButton).click();
            cy.getByTestId('recipe-ingredients-measureUnit-0').select('г');
            cy.contains('Закуски').click();
            checkPreventiveModal();
            exitWithoutSaving();
            cy.url().should('include', '/snacks/meat-snacks');
        });
    });

    describe('create draft', () => {
        beforeEach(() => {
            cy.viewport(...RESOLUTION.desktop);
            cy.getByTestId(TEST_ID.Recipe.AddRecipeButton).click();
            cy.url().should('include', '/new-recipe');
            cy.wait('@getMeasureUnits');
        });

        it('should create draft successfully', () => {
            cy.getByTestId(TEST_ID.Recipe.SaveDraftButton).click();
            checkBorderColor(TEST_ID.Recipe.Title);
            cy.getByTestId(TEST_ID.Recipe.Title).clear().type('Будущий шедевр');
            cy.getByTestId(TEST_ID.Recipe.Description).type('Описание будущего шедевра');
            cy.getByTestId(TEST_ID.Recipe.SaveDraftButton).click();
            cy.wait('@createDraftRecipe');
            cy.contains('Черновик успешно сохранен').should('exist');
            takeAllScreenshots('create-draft-recipe');
        });

        it('should handle 409 error when creating draft', () => {
            cy.getByTestId(TEST_ID.Recipe.Title).clear().type('Конфликтующий черновик');

            interceptApi(
                { url: API_ENDPOINTS.RecipeDraft, alias: 'createDraftRecipe409', method: 'POST' },
                {
                    statusCode: 409,
                    delay: DELAY.SM,
                },
            );

            cy.getByTestId(TEST_ID.Recipe.SaveDraftButton).click();
            cy.wait('@createDraftRecipe409');

            takeAllScreenshots('create-draft-recipe-409');
            cy.contains('Ошибка').should('be.visible');
            cy.contains('Рецепт с таким названием уже существует').should('be.visible');
        });

        it('should handle 500 error when creating draft', () => {
            cy.getByTestId(TEST_ID.Recipe.Title).clear().type('Черновик с серверной ошибкой');

            interceptApi(
                { url: API_ENDPOINTS.RecipeDraft, alias: 'createDraftRecipe500', method: 'POST' },
                {
                    statusCode: 500,
                    delay: DELAY.SM,
                },
            );

            cy.getByTestId(TEST_ID.Recipe.SaveDraftButton).click();
            cy.wait('@createDraftRecipe500');
            takeAllScreenshots('create-draft-recipe-500');
            cy.contains('Ошибка сервера').should('be.visible');
            cy.contains('Не удалось сохранить черновик рецепта').should('be.visible');
        });
    });

    describe('edit recipe', () => {
        beforeEach(() => {
            cy.viewport(...RESOLUTION.desktop);
            cy.visit('/salads/meat-salads/681cbbd4b6c3c1bbdbf32bba');
            cy.wait('@getMyRecipe');

            interceptBloggerById('65a1bc23f8e7d901f4c3d2a1', '65a1bc23f8e7d901f4c3d2a1');

            interceptApi(
                {
                    url: `${API_ENDPOINTS.Recipe}/681cbbd4b6c3c1bbdbf32bba`,
                    alias: 'getRecipeAfterUpdate',
                    method: 'GET',
                },
                {
                    statusCode: 200,
                    body: UPDATE_RECIPE_RESPONSE,
                    delay: DELAY.SM,
                },
            );
        });

        it('should navigate to edit recipe page and show form with correct data', () => {
            cy.contains('Редактировать рецепт').should('exist').click();

            cy.url().should('include', 'edit-recipe/salads/meat-salads/681cbbd4b6c3c1bbdbf32bba');

            takeAllScreenshots('edit-recipe-page');
            cy.getByTestId(TEST_ID.Recipe.Form).within(() => {
                cy.getByTestId(TEST_ID.Recipe.Title)
                    .invoke('val')
                    .should('eq', NEW_RECIPE_RESPONSE.title);
                cy.getByTestId(TEST_ID.Recipe.Description)
                    .invoke('val')
                    .should('eq', NEW_RECIPE_RESPONSE.description);
                cy.getByTestId(TEST_ID.Recipe.Time)
                    .invoke('val')
                    .should('eq', String(NEW_RECIPE_RESPONSE.time));
                cy.getByTestId(TEST_ID.Recipe.Portions)
                    .invoke('val')
                    .should('eq', String(NEW_RECIPE_RESPONSE.portions));

                cy.getByTestId(TEST_ID.Recipe.Categories)
                    .contains('Мясные салаты')
                    .should('be.visible');
                cy.getByTestId(TEST_ID.Recipe.Categories)
                    .contains('Рыбные салаты')
                    .should('be.visible');
                cy.getByTestId(TEST_ID.Recipe.Categories).contains('+3').should('be.visible');

                cy.getByTestId(TEST_ID.Recipe.ImageBlockPreviewImage)
                    .should('have.attr', 'src')
                    .and('include', NEW_RECIPE_RESPONSE.image);
            });
        });

        it('should show correct ingredients in edit form', () => {
            cy.contains('Редактировать рецепт').click();

            cy.getByTestId(TEST_ID.Recipe.Form).within(() => {
                NEW_RECIPE_RESPONSE.ingredients.forEach((item, index) => {
                    cy.getByTestId(`recipe-ingredients-title-${index}`)
                        .invoke('val')
                        .should('eq', item.title);
                    cy.getByTestId(`recipe-ingredients-count-${index}`)
                        .invoke('val')
                        .should('eq', String(item.count));
                    cy.getByTestId(`recipe-ingredients-measureUnit-${index}`)
                        .invoke('val')
                        .should('eq', item.measureUnit);
                });
            });
        });

        it('should show correct steps in edit form', () => {
            cy.contains('Редактировать рецепт').click();

            cy.getByTestId(TEST_ID.Recipe.Form).within(() => {
                NEW_RECIPE_RESPONSE.steps.forEach((item, index) => {
                    cy.getByTestId(`recipe-steps-description-${index}`)
                        .invoke('val')
                        .should('eq', item.description);
                    cy.contains(`Шаг ${item.stepNumber}`).should('exist').should('be.visible');

                    if (item.image) {
                        cy.getByTestId(`recipe-steps-image-block-${index}-preview-image`)
                            .should('have.attr', 'src')
                            .and('include', item.image);
                    }
                });
            });
        });

        it('should edit recipe basic information successfully', () => {
            cy.contains('Редактировать рецепт').click();

            cy.getByTestId(TEST_ID.Recipe.Form).within(() => {
                cy.getByTestId(TEST_ID.Recipe.Title).clear().type('Доработанный плов из детства');
                cy.getByTestId(TEST_ID.Recipe.Description)
                    .clear()
                    .type(
                        'Супер вкусный и нежный плов по рецепту из вашего детства, с небольшими но приятными изменениями',
                        { timeout: 10000 },
                    );
                cy.getByTestId(TEST_ID.Recipe.Time).clear().type('40');
                cy.getByTestId(TEST_ID.Recipe.Portions).clear().type('7');
            });

            cy.getByTestId(TEST_ID.Recipe.PublishButton).click();

            cy.wait('@updateRecipe');
            cy.wait('@getRecipeAfterUpdate');
        });

        it('should modify recipe ingredients successfully', () => {
            cy.contains('Редактировать рецепт').click();

            cy.getByTestId(TEST_ID.Recipe.Form).within(() => {
                cy.getByTestId(`recipe-ingredients-title-0`).clear().type('дрова');
                cy.getByTestId(`recipe-ingredients-count-0`).clear().type('50');
            });

            cy.getByTestId(TEST_ID.Recipe.PublishButton).click();

            cy.wait('@updateRecipe');
            cy.wait('@getRecipeAfterUpdate');
        });

        it('should edit recipe steps successfully', () => {
            cy.contains('Редактировать рецепт').click();

            cy.getByTestId(TEST_ID.Recipe.Form).within(() => {
                cy.getByTestId(`recipe-steps-description-2`).clear().type('охапка дров');

                cy.contains('Новый шаг').click();
                cy.getByTestId(`recipe-steps-description-3`).type('и плов готов');
            });

            cy.getByTestId(TEST_ID.Recipe.PublishButton).click();

            cy.wait('@updateRecipe');
            cy.wait('@getRecipeAfterUpdate');
        });

        it('should handle recipe images modification correctly', () => {
            cy.contains('Редактировать рецепт').click();

            cy.getByTestId(TEST_ID.Recipe.Form).within(() => {
                cy.getByTestId('recipe-steps-image-block-0-preview-image').click();
            });

            cy.getByTestId(TEST_ID.Modal.RecipeImageModalPreviewImage)
                .should('be.visible')
                .should('have.attr', 'src')
                .and('include', NEW_RECIPE_RESPONSE.steps[0].image);

            cy.contains('Удалить').click();

            cy.getByTestId('recipe-steps-image-block-2').click();
            cy.getByTestId('recipe-steps-image-block-2-input-file').selectFile(
                'cypress/fixtures/plov.jpeg',
                { force: true },
            );

            cy.getByTestId(TEST_ID.Modal.RecipeImageModal).within(() => {
                cy.contains('Сохранить').click();
            });

            cy.wait('@uploadFile');

            cy.getByTestId(TEST_ID.Recipe.PublishButton).click();
            cy.wait('@updateRecipe');
            cy.wait('@getRecipeAfterUpdate');
        });

        it('should save all changes in recipe successfully', () => {
            cy.contains('Редактировать рецепт').click();

            cy.getByTestId(TEST_ID.Recipe.Form).within(() => {
                cy.getByTestId(TEST_ID.Recipe.Title).clear().type('Доработанный плов из детства');
                cy.getByTestId(TEST_ID.Recipe.Description)
                    .clear()
                    .type(
                        'Супер вкусный и нежный плов по рецепту из вашего детства, с небольшими но приятными изменениями',
                        { timeout: 10000 },
                    );
                cy.getByTestId(TEST_ID.Recipe.Time).clear().type('40');
                cy.getByTestId(TEST_ID.Recipe.Portions).clear().type('7');

                cy.getByTestId(`recipe-ingredients-title-0`).clear().type('дрова');
                cy.getByTestId(`recipe-ingredients-count-0`).clear().type('50');

                cy.getByTestId(`recipe-steps-description-2`).clear().type('охапка дров');
                cy.contains('Новый шаг').click();
                cy.getByTestId(`recipe-steps-description-3`).type('и плов готов');
            });

            cy.getByTestId('recipe-steps-image-block-0-preview-image').click();
            cy.contains('Удалить').click();

            cy.getByTestId('recipe-steps-image-block-3').click();
            cy.getByTestId('recipe-steps-image-block-3-input-file').selectFile(
                'cypress/fixtures/plov.jpeg',
                { force: true },
            );
            cy.getByTestId(TEST_ID.Modal.RecipeImageModal).within(() => {
                cy.contains('Сохранить').click();
            });
            cy.wait('@uploadFile');

            cy.getByTestId(TEST_ID.Recipe.PublishButton).click();
            cy.wait('@updateRecipe');
            cy.wait('@getRecipeAfterUpdate');
            cy.contains('Рецепт успешно опубликован').should('be.visible');
        });

        it('should handle 409 error when update recipe', () => {
            cy.contains('Редактировать рецепт').click();

            cy.getByTestId(TEST_ID.Recipe.Title).clear().type('Конфликтующее обновленное название');

            interceptApi(
                {
                    url: `${API_ENDPOINTS.Recipe}/681cbbd4b6c3c1bbdbf32bba`,
                    alias: 'updateRecipe409',
                    method: 'PATCH',
                },
                {
                    statusCode: 409,
                    delay: DELAY.SM,
                },
            );

            cy.getByTestId(TEST_ID.Recipe.PublishButton).click();
            cy.wait('@updateRecipe409');
            takeAllScreenshots('edit-recipe-page-409');

            cy.contains('Ошибка').should('be.visible');
            cy.contains('Рецепт с таким названием уже существует').should('be.visible');
        });

        it('should handle 500 error when update recipe', () => {
            cy.contains('Редактировать рецепт').click();

            cy.getByTestId(TEST_ID.Recipe.Title).clear().type('Конфликтующее обновленное название');

            interceptApi(
                {
                    url: `${API_ENDPOINTS.Recipe}/681cbbd4b6c3c1bbdbf32bba`,
                    alias: 'updateRecipe500',
                    method: 'PATCH',
                },
                {
                    statusCode: 500,
                    delay: DELAY.SM,
                },
            );
            cy.getByTestId(TEST_ID.Recipe.PublishButton).click();
            cy.wait('@updateRecipe500');
            takeAllScreenshots('edit-recipe-page-500');

            cy.contains('Ошибка сервера').should('be.visible');
            cy.contains('Попробуйте пока сохранить в черновик').should('be.visible');
        });
    });

    describe('delete recipe', () => {
        beforeEach(() => {
            cy.viewport(...RESOLUTION.desktop);
            cy.visit('/salads/meat-salads/681cbbd4b6c3c1bbdbf32bba');
            cy.wait('@getMyRecipe');
            interceptBloggerById('65a1bc23f8e7d901f4c3d2a1', '65a1bc23f8e7d901f4c3d2a1');

            interceptApi(
                {
                    url: `${API_ENDPOINTS.Recipe}/681cbbd4b6c3c1bbdbf32bba`,
                    alias: 'deleteRecipe',
                    method: 'DELETE',
                },
                {
                    statusCode: 200,
                    delay: DELAY.SM,
                },
            );
        });

        it('should delete recipe', () => {
            cy.getByTestId(TEST_ID.Recipe.DeleteButton).should('be.visible');
            cy.getByTestId(TEST_ID.Recipe.DeleteButton).click();

            cy.wait('@deleteRecipe');

            cy.contains('Рецепт успешно удален').should('be.visible');
        });

        it('should handle 500 error when delete recipe', () => {
            cy.getByTestId(TEST_ID.Recipe.DeleteButton).should('be.visible');

            interceptApi(
                {
                    url: `${API_ENDPOINTS.Recipe}/681cbbd4b6c3c1bbdbf32bba`,
                    alias: 'deleteRecipe500',
                    method: 'DELETE',
                },
                {
                    statusCode: 500,
                    delay: DELAY.SM,
                },
            );

            cy.getByTestId(TEST_ID.Recipe.DeleteButton).click();

            cy.wait('@deleteRecipe500');

            cy.contains('Ошибка сервера').should('be.visible');
            cy.contains('Не удалось удалить рецепт').should('be.visible');
        });
    });

    describe('like and save recipe', () => {
        beforeEach(() => {
            interceptBloggers('65a1bc23f8e7d901f4c3d2a1');
            cy.viewport(...RESOLUTION.desktop);

            interceptApi(
                {
                    url: `${API_ENDPOINTS.Recipe}/000000000000000`,
                    alias: 'getNotMyRecipe',
                    method: 'GET',
                },
                {
                    statusCode: 200,
                    body: NOT_MY_RECIPE,
                    delay: DELAY.SM,
                    withLoader: true,
                },
            );

            cy.visit('/salads/meat-salads/000000000000000');

            cy.wait('@getNotMyRecipe');

            interceptApi(
                {
                    url: `${API_ENDPOINTS.Recipe}/000000000000000/like`,
                    alias: 'likeRecipe',
                    method: 'POST',
                },
                {
                    statusCode: 200,
                    delay: DELAY.SM,
                },
            );

            interceptApi(
                {
                    url: `${API_ENDPOINTS.Recipe}/000000000000000/bookmark`,
                    alias: 'saveRecipe',
                    method: 'POST',
                },
                {
                    statusCode: 200,
                    delay: DELAY.SM,
                },
            );
        });

        it('should like recipe', () => {
            interceptBloggerById('000000000000000', '65a1bc23f8e7d901f4c3d2a1');
            cy.contains('Оценить рецепт').should('be.visible').click();

            cy.wait('@likeRecipe');

            cy.contains('Оценить рецепт').should('be.visible').click();

            cy.wait('@likeRecipe');
        });

        it('should save recipe', () => {
            interceptBloggerById('000000000000000', '65a1bc23f8e7d901f4c3d2a1');
            cy.contains('Сохранить').should('be.visible').click();

            cy.wait('@saveRecipe');

            cy.contains('Сохранить').should('be.visible').click();

            cy.wait('@saveRecipe');
        });

        it('should handle 500 error when like recipe', () => {
            interceptApi(
                {
                    url: `${API_ENDPOINTS.Recipe}/000000000000000/like`,
                    alias: 'likeRecipe500',
                    method: 'POST',
                },
                {
                    statusCode: 500,
                    delay: DELAY.SM,
                },
            );
            interceptBloggerById('000000000000000', '65a1bc23f8e7d901f4c3d2a1');

            cy.contains('Оценить рецепт').should('be.visible').click();

            cy.wait('@likeRecipe500');

            cy.contains('Ошибка сервера').should('be.visible');
            cy.contains('Попробуйте немного позже').should('be.visible');
        });

        it('should handle 500 error when save recipe', () => {
            interceptApi(
                {
                    url: `${API_ENDPOINTS.Recipe}/000000000000000/bookmark`,
                    alias: 'saveRecipe500',
                    method: 'POST',
                },
                {
                    statusCode: 500,
                    delay: DELAY.SM,
                },
            );
            interceptBloggerById('000000000000000', '65a1bc23f8e7d901f4c3d2a1');

            cy.contains('Сохранить').should('be.visible').click();

            cy.wait('@saveRecipe500');

            cy.contains('Ошибка сервера').should('be.visible');
            cy.contains('Попробуйте немного позже').should('be.visible');
        });
    });
});

// bloggers
const MOCK_PREVIEW_BLOGGERS = {
    favorites: [],
    others: [
        {
            _id: 'testId1',
            firstName: 'Test FirstName 1',
            lastName: 'test LastName 1',
            login: 'test_login_1',
            subscribersCount: 36,
            bookmarksCount: 943,
            isFavorite: true,
            notes: [
                {
                    date: '2025-03-26T15:27:16.066Z',
                    text: ' 1 acs nidc nisjdc sdnnjkcx ajksnx jisjdxoic xm',
                },
                {
                    date: '2025-03-26T15:27:16.066Z',
                    text: 'Random text 2',
                },
            ],
            newRecipesCount: 3,
        },
        {
            _id: 'testId2',
            firstName: 'Test FirstName 2',
            lastName: 'test LastName 2',
            login: 'test_login_2',
            subscribersCount: 0,
            bookmarksCount: 0,
            isFavorite: false,
            notes: [],
            newRecipesCount: 0,
        },
        {
            _id: 'testId3',
            firstName: 'Test FirstName 3',
            lastName: 'test LastName 3',
            login: 'test_login_3',
            subscribersCount: 366,
            bookmarksCount: 9,
            isFavorite: false,
            notes: [
                {
                    date: '2025-03-26T15:27:16.066Z',
                    text: ' test test test test test test test test test test test test test test test test test test test ',
                },
            ],
            newRecipesCount: 0,
        },
    ],
};

const MOCK_ALL_BLOGGERS = {
    favorites: [
        {
            _id: 'testIdFav1',
            firstName: 'Test Fav FirstName 1',
            lastName: 'test Fav LastName 1',
            login: 'test_fav_login_1',
            subscribersCount: 36,
            bookmarksCount: 943,
            isFavorite: true,
            notes: [
                {
                    date: '2025-03-26T15:27:16.066Z',
                    text: ' 1 acs nidc nisjdc sdnnjkcx ajksnx jisjdxoic xm',
                },
                {
                    date: '2025-03-26T15:27:16.066Z',
                    text: 'Random text 2',
                },
                {
                    date: '2025-03-26T15:27:16.066Z',
                    text: 'Random text 4',
                },
                {
                    date: '2025-03-26T15:27:16.066Z',
                    text: 'Random text 5',
                },
                {
                    date: '2025-03-26T15:27:16.066Z',
                    text: 'Random text 6',
                },
            ],
            newRecipesCount: 3,
        },
    ],
    others: [
        {
            _id: 'test_id_1',
            firstName: 'Test FirstName 1',
            lastName: 'test LastName 1',
            login: 'test_login_1',
            subscribersCount: 0,
            bookmarksCount: 0,
            isFavorite: false,
            notes: [],
            newRecipesCount: 5,
        },
        {
            _id: 'testId2',
            firstName: 'Test FirstName 2',
            lastName: 'test LastName 2',
            login: 'test_login_2',
            subscribersCount: 366,
            bookmarksCount: 9,
            isFavorite: false,
            notes: [
                {
                    date: '2025-03-26T15:27:16.066Z',
                    text: ' test test test test test test test test test test test test test test test test test test test ',
                },
            ],
            newRecipesCount: 0,
        },
        {
            _id: 'testId3',
            firstName: 'Test FirstName 3',
            lastName: 'test LastName 3',
            login: 'test_login_3',
            subscribersCount: 23,
            bookmarksCount: 0,
            isFavorite: false,
            notes: [],
            newRecipesCount: 0,
        },
        {
            _id: 'testId4',
            firstName: 'Test FirstName 4',
            lastName: 'test LastName 4',
            login: 'test_login_4',
            subscribersCount: 222,
            bookmarksCount: 111,
            isFavorite: false,
            notes: [],
            newRecipesCount: 2,
        },
        {
            _id: 'testId5',
            firstName: 'Test FirstName 5',
            lastName: 'test LastName 5',
            login: 'test_login_5',
            subscribersCount: 0,
            bookmarksCount: 0,
            isFavorite: false,
            notes: [],
            newRecipesCount: 2,
        },
        {
            _id: 'testId6',
            firstName: 'Test FirstName 6',
            lastName: 'test LastName 6',
            login: 'test_login_6',
            subscribersCount: 0,
            bookmarksCount: 0,
            isFavorite: false,
            notes: [],
            newRecipesCount: 2,
        },
        {
            _id: 'testId7',
            firstName: 'Test FirstName 7',
            lastName: 'test LastName 7',
            login: 'test_login_7',
            subscribersCount: 0,
            bookmarksCount: 0,
            isFavorite: false,
            notes: [],
            newRecipesCount: 2,
        },
        {
            _id: 'testId8',
            firstName: 'Test FirstName 8',
            lastName: 'test LastName 8',
            login: 'test_login_8',
            subscribersCount: 0,
            bookmarksCount: 0,
            isFavorite: false,
            notes: [],
            newRecipesCount: 2,
        },
        {
            _id: 'testId9',
            firstName: 'Test FirstName 9',
            lastName: 'test LastName 9',
            login: 'test_login_9',
            subscribersCount: 10,
            bookmarksCount: 10,
            isFavorite: false,
            notes: [],
            newRecipesCount: 2,
        },
    ],
};

const MOCK_ALL_BLOGGERS_SUBSCRIBED = {
    favorites: [
        {
            _id: 'testIdFav1',
            firstName: 'Test Fav FirstName 1',
            lastName: 'test Fav LastName 1',
            login: 'test_fav_login_1',
            subscribersCount: 36,
            bookmarksCount: 943,
            isFavorite: true,
            notes: [
                {
                    date: '2025-03-26T15:27:16.066Z',
                    text: ' 1 acs nidc nisjdc sdnnjkcx ajksnx jisjdxoic xm',
                },
                {
                    date: '2025-03-26T15:27:16.066Z',
                    text: 'Random text 2',
                },
            ],
            newRecipesCount: 3,
        },
        {
            _id: 'testId1',
            firstName: 'Test FirstName 1',
            lastName: 'test LastName 1',
            login: 'test_login_1',
            subscribersCount: 0,
            bookmarksCount: 0,
            isFavorite: true,
            notes: [],
            newRecipesCount: 5,
        },
    ],
    others: [
        {
            _id: 'testId2',
            firstName: 'Test FirstName 2',
            lastName: 'test LastName 2',
            login: 'test_login_2',
            subscribersCount: 366,
            bookmarksCount: 9,
            isFavorite: false,
            notes: [
                {
                    date: '2025-03-26T15:27:16.066Z',
                    text: ' test test test test test test test test test test test test test test test test test test test ',
                },
            ],
            newRecipesCount: 0,
        },
        {
            _id: 'testId3',
            firstName: 'Test FirstName 3',
            lastName: 'test LastName 3',
            login: 'test_login_3',
            subscribersCount: 23,
            bookmarksCount: 0,
            isFavorite: false,
            notes: [],
            newRecipesCount: 0,
        },
        {
            _id: 'testId4',
            firstName: 'Test FirstName 4',
            lastName: 'test LastName 4',
            login: 'test_login_4',
            subscribersCount: 222,
            bookmarksCount: 111,
            isFavorite: false,
            notes: [],
            newRecipesCount: 2,
        },
        {
            _id: 'testId5',
            firstName: 'Test FirstName 5',
            lastName: 'test LastName 5',
            login: 'test_login_5',
            subscribersCount: 0,
            bookmarksCount: 0,
            isFavorite: false,
            notes: [],
            newRecipesCount: 2,
        },
        {
            _id: 'testId6',
            firstName: 'Test FirstName 6',
            lastName: 'test LastName 6',
            login: 'test_login_6',
            subscribersCount: 0,
            bookmarksCount: 0,
            isFavorite: false,
            notes: [],
            newRecipesCount: 2,
        },
        {
            _id: 'testId7',
            firstName: 'Test FirstName 7',
            lastName: 'test LastName 7',
            login: 'test_login_7',
            subscribersCount: 0,
            bookmarksCount: 0,
            isFavorite: false,
            notes: [],
            newRecipesCount: 2,
        },
        {
            _id: 'testId8',
            firstName: 'Test FirstName 8',
            lastName: 'test LastName 8',
            login: 'test_login_8',
            subscribersCount: 0,
            bookmarksCount: 0,
            isFavorite: false,
            notes: [],
            newRecipesCount: 2,
        },
        {
            _id: 'testId9',
            firstName: 'Test FirstName 9',
            lastName: 'test LastName 9',
            login: 'test_login_9',
            subscribersCount: 10,
            bookmarksCount: 10,
            isFavorite: false,
            notes: [],
            newRecipesCount: 2,
        },
    ],
};

const MOCK_ALL_BLOGGERS_EXPANDED = {
    favorites: MOCK_ALL_BLOGGERS.favorites,
    others: [
        ...MOCK_ALL_BLOGGERS.others,
        {
            _id: 'testId10',
            firstName: 'Test FirstName 10',
            lastName: 'test LastName 10',
            login: 'test_login_10',
            subscribersCount: 10,
            bookmarksCount: 10,
            isFavorite: false,
            notes: [],
            newRecipesCount: 2,
        },
        {
            _id: 'testId11',
            firstName: 'Test FirstName 11',
            lastName: 'test LastName 11',
            login: 'test_login_11',
            subscribersCount: 10,
            bookmarksCount: 10,
            isFavorite: false,
            notes: [],
            newRecipesCount: 2,
        },
    ],
};

const MOCK_BLOGGER_PROFILE = {
    bloggerInfo: {
        _id: 'testIdFav1',
        email: 'test@test.com',
        login: 'test_login_1',
        firstName: 'Test FirstName 1',
        lastName: 'Test LastName 1',
        recipesIds: ['1'],
        subscribers: ['2'],
        notes: [
            {
                date: '2025-03-26T15:27:16.066Z',
                text: 'Паназиатская кухня — это настоящий праздник для вашего здоровья и вкусовых рецепторов. Присоединяйтесь ко мне, и мы создадим новые кулинарные шедевры!',
            },
            {
                date: '2025-03-26T15:27:16.066Z',
                text: 'Random text 2',
            },
            {
                date: '2025-03-26T15:27:16.066Z',
                text: 'Random text 3',
            },
            {
                date: '2025-03-26T15:27:16.066Z',
                text: 'Random text 3 Random text 3 Random text 3 Random text 3 Random text 3 Random text 3 Random text 3 ',
            },
        ],
    },
    totalSubscribers: 13,
    totalBookmarks: 338,
    isFavorite: true,
};

const MOCK_BLOGGER_RECIPE = {
    recipes: allRecipes.slice(0, 10),
    notes: [
        {
            date: '2025-03-26T15:27:16.066Z',
            text: 'Паназиатская кухня — это настоящий праздник для вашего здоровья и вкусовых рецепторов. Присоединяйтесь ко мне, и мы создадим новые кулинарные шедевры!',
        },
        {
            date: '2025-03-26T15:27:16.066Z',
            text: 'Random text 2',
        },
        {
            date: '2025-03-26T15:27:16.066Z',
            text: 'Random text 3',
        },
        {
            date: '2025-03-26T15:27:16.066Z',
            text: 'Random text 3 Random text 3 Random text 3 Random text 3 Random text 3 Random text 3 Random text 3 ',
        },
    ],
    totalBookmarks: 2,
    totalSubscribers: 1,
    userId: 'test_id_1',
};

const loadUser = (bloggerId: string, currentUserId: string) => {
    interceptBloggerById(bloggerId, currentUserId);
    interceptBloggerRecipesById(bloggerId);
};

const interceptBloggers = (
    currentUserId = '',
    limit = '',
    code = 200,
    delay: number = DELAY.SM,
    mockBody = null,
) =>
    interceptApi(
        {
            url: `${API_ENDPOINTS.GetBloggers}?currentUserId=${currentUserId}&limit=${limit}`,
            alias: 'getBloggers',
        },
        {
            statusCode: code ?? 200,
            delay,
            body: mockBody ?? MOCK_PREVIEW_BLOGGERS,
        },
    );

const interceptToggleSubscription = (code = 200, delay: number = DELAY.SM, mockBody = null) =>
    interceptApi(
        {
            url: `${API_ENDPOINTS.ToggleSubscription}`,
            method: 'PATCH',
            alias: 'toggleSubscription',
        },
        {
            statusCode: code ?? 200,
            delay,
            body: {
                message: mockBody ?? 'Подписка произведена успешно',
            },
        },
    );

const interceptBloggerRecipesById = (
    bloggerId = '',
    code = 200,
    delay: number = DELAY.SM,
    mockBody = null,
) => {
    interceptApi(
        {
            url: `${API_ENDPOINTS.GetBloggerById}/${bloggerId}`,
            alias: 'getBloggerRecipesById',
        },
        {
            statusCode: code ?? 200,
            delay,
            body: mockBody ?? MOCK_BLOGGER_RECIPE,
        },
    );
};

const interceptBloggerById = (
    bloggerId = '',
    currentUserId = '',
    code = 200,
    delay: number = DELAY.SM,
    mockBody = null,
) => {
    interceptApi(
        {
            url: `${API_ENDPOINTS.GetBloggers}/${bloggerId}?currentUserId=${currentUserId}`,
            alias: 'getBloggerById',
        },
        {
            statusCode: code ?? 200,
            delay,
            body: mockBody ?? MOCK_BLOGGER_PROFILE,
        },
    );
};

describe('bloggers', () => {
    describe('main page bloggers section', () => {
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

            interceptBloggers('65a1bc23f8e7d901f4c3d2a1');

            interceptCategories();
            interceptNewestRecipes();
            interceptJuiciestRecipes();
            interceptRelevantRecipes();
            signIn();
        });

        it('the bloggers box is being filled correctly', () => {
            interceptBloggers('65a1bc23f8e7d901f4c3d2a1');
            cy.wait(1000);

            cy.viewport(1920, 750);
            cy.getByTestId(TEST_ID.Bloggers.MainPageBlogsBox)
                .should('exist')
                .and('be.visible')
                .scrollIntoView();
            cy.getByTestId(TEST_ID.Bloggers.MainPageBlogsButton).should('exist');

            cy.getByTestId(TEST_ID.Bloggers.MainPageBlogsGrid).should('exist').and('be.visible');
            cy.getByTestId(TEST_ID.Bloggers.MainPageBlogsGrid).children().should('have.length', 3);
            cy.getByTestId(TEST_ID.Bloggers.MainPageBlogsGrid)
                .children()
                .first()
                .within(() => {
                    const { firstName, lastName, login, notes } = MOCK_PREVIEW_BLOGGERS.others[0];
                    cy.getByTestId(TEST_ID.Bloggers.BlogsCardName).should(
                        'have.text',
                        `${firstName} ${lastName}`,
                    );
                    cy.getByTestId(TEST_ID.Bloggers.BlogsCardLogin).should(
                        'have.text',
                        `@${login}`,
                    );
                    cy.getByTestId(TEST_ID.Bloggers.BlogsCardNotesText).should(
                        'have.text',
                        notes[0].text,
                    );
                });

            cy.wait(2000);
            takeAllScreenshots('bloggers-box');
        });

        it('the bloggers box is not being filled on API error', () => {
            interceptBloggers('65a1bc23f8e7d901f4c3d2a1', '', 500);

            cy.viewport(1920, 750);
            cy.getByTestId(TEST_ID.Bloggers.MainPageBlogsBox).should('not.exist');
            cy.getByTestId(TEST_ID.Notification.Error).should('exist').and('be.visible');
            cy.getByTestId(TEST_ID.Notification.ErrorTitle).should('have.text', 'Ошибка сервера');
            cy.getByTestId(TEST_ID.Notification.ErrorDescription).should(
                'have.text',
                'Попробуйте немного позже.',
            );
        });

        it('the button "Все авторы" reroutes to the /blogs route', () => {
            interceptBloggers('65a1bc23f8e7d901f4c3d2a1');

            cy.viewport(1920, 750);

            cy.getByTestId(TEST_ID.Bloggers.MainPageBlogsButton).should('exist').click();
            cy.url().should('contain', '/blogs');
        });
    });

    describe('blogs page', () => {
        const currentUserId = '65a1bc23f8e7d901f4c3d2a1';
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
            interceptBloggers(currentUserId);
            interceptCategories();
            interceptNewestRecipes();
            interceptJuiciestRecipes();
            interceptRelevantRecipes();
            signIn();
        });

        it('the page is being filled correctly', () => {
            interceptBloggers(currentUserId, '9', 200, DELAY.SM, MOCK_ALL_BLOGGERS);
            cy.visit('/blogs');
            cy.viewport(1920, 750);

            cy.getByTestId(TEST_ID.Bloggers.BlogsFavoritesBox).should('exist').should('be.visible');
            cy.getByTestId(TEST_ID.Bloggers.BlogsOthersBox).should('exist').should('be.visible');

            cy.getByTestId(TEST_ID.Bloggers.BlogsFavoritesGrid)
                .should('exist')
                .should('be.visible')
                .children()
                .should('have.length', 1);
            cy.getByTestId(TEST_ID.Bloggers.BlogsOthersGrid)
                .should('exist')
                .should('be.visible')
                .children()
                .should('have.length', 9);

            cy.getByTestId(TEST_ID.Bloggers.BlogsFavoritesGrid)
                .should('exist')
                .should('be.visible')
                .children()
                .first()
                .within(() => {
                    cy.getByTestId(TEST_ID.Bloggers.BlogsCardNewRecipesBadge)
                        .should('exist')
                        .should('be.visible')
                        .should('contain.text', '3 новых рецепта');
                });

            cy.get('html, body').invoke('attr', 'style', 'height: auto; scroll-behavior: auto;');
            cy.wait(2000);
            takeAllScreenshots('blogs-page');
        });

        it('redirect to the main page on fetch error', () => {
            cy.visit('/blogs');
            interceptBloggers(currentUserId, '9', 500);
            cy.viewport(1920, 750);

            cy.getByTestId(TEST_ID.Bloggers.BlogsFavoritesBox).should('not.exist');
            cy.getByTestId(TEST_ID.Bloggers.BlogsOthersBox).should('not.exist');
            cy.getByTestId(TEST_ID.Notification.Error).should('exist').and('be.visible');
            cy.getByTestId(TEST_ID.Notification.ErrorTitle).should('have.text', 'Ошибка сервера');
            cy.getByTestId(TEST_ID.Notification.ErrorDescription).should(
                'have.text',
                'Попробуйте немного позже.',
            );
            cy.url().should('not.contain', '/blogs');
        });

        it('should correctly open the other blogs box', () => {
            cy.visit('/blogs');
            interceptBloggers(currentUserId, '9', 200, DELAY.SM, MOCK_ALL_BLOGGERS);
            cy.viewport(1920, 750);

            interceptBloggers(currentUserId, 'all', 200, DELAY.SM, MOCK_ALL_BLOGGERS_EXPANDED);
            cy.getByTestId(TEST_ID.Bloggers.BlogsOthersButton).click();

            cy.getByTestId(TEST_ID.Bloggers.BlogsOthersGrid)
                .should('exist')
                .should('be.visible')
                .children()
                .should('have.length', 11);
            cy.getByTestId(TEST_ID.Bloggers.BlogsOthersButton).click();
        });

        it('should correctly subscribe the user and move the newly subscribed user card to the favorites', () => {
            cy.visit('/blogs');
            interceptBloggers(currentUserId, '9', 200, DELAY.SM, MOCK_ALL_BLOGGERS);
            cy.viewport(1920, 750);

            cy.getByTestId(TEST_ID.Bloggers.BlogsOthersGrid)
                .children()
                .first()
                .within(() => {
                    cy.getByTestId(TEST_ID.Bloggers.BlogsCardNewRecipesBadge).should('not.exist');
                });
            interceptToggleSubscription();
            interceptBloggers(currentUserId, '9', 200, DELAY.SM, MOCK_ALL_BLOGGERS_SUBSCRIBED);
            cy.getByTestId(TEST_ID.Bloggers.BlogToggleSubscribe).first().click();
            cy.getByTestId(TEST_ID.Bloggers.BlogsFavoritesGrid).children().should('have.length', 2);
            cy.getByTestId(TEST_ID.Bloggers.BlogsOthersGrid).children().should('have.length', 8);
            cy.getByTestId(TEST_ID.Bloggers.BlogsFavoritesGrid)
                .children()
                .eq(1)
                .within(() => {
                    cy.getByTestId(TEST_ID.Bloggers.BlogsCardNewRecipesBadge)
                        .should('exist')
                        .should('contain.text', '5 новых рецептов');
                });
        });

        it('should correctly unsubscribe the user and move the unsubscribed user card to the other blogs', () => {
            cy.visit('/blogs');
            interceptBloggers(currentUserId, '9', 200, DELAY.SM, MOCK_ALL_BLOGGERS_SUBSCRIBED);
            cy.viewport(1920, 750);

            interceptBloggers(currentUserId, '9', 200, DELAY.SM, MOCK_ALL_BLOGGERS);
            interceptToggleSubscription();
            cy.getByTestId(TEST_ID.Bloggers.BlogToggleSubscribe).eq(1).click();
            cy.getByTestId(TEST_ID.Bloggers.BlogsFavoritesGrid).children().should('have.length', 1);
            cy.getByTestId(TEST_ID.Bloggers.BlogsOthersGrid).children().should('have.length', 9);
        });

        it('button "Рецепты" should route to the blogger\'s profile page', () => {
            cy.visit('/blogs');
            interceptBloggers(currentUserId, '9', 200, DELAY.SM, MOCK_ALL_BLOGGERS);
            cy.viewport(1920, 750);
            const { _id: bloggerId } = MOCK_ALL_BLOGGERS.favorites[0];

            loadUser(bloggerId, currentUserId);
            cy.getByTestId(TEST_ID.Bloggers.BlogsCardRecipesButton).first().click();
            cy.url().should('contain', `/blogs/${bloggerId}`);
            cy.getByTestId(TEST_ID.Bloggers.RecipeCardList).should('exist').should('be.visible');
        });

        it('button "Читать" should route to the blogger\'s prorile page to the anchor #notes', () => {
            cy.visit('/blogs');
            interceptBloggers(currentUserId, '9', 200, DELAY.SM, MOCK_ALL_BLOGGERS);
            cy.viewport(1920, 750);
            const { _id: bloggerId } = MOCK_ALL_BLOGGERS.favorites[0];

            loadUser(bloggerId, currentUserId);
            cy.getByTestId(TEST_ID.Bloggers.BlogsCardNotesButton).first().click();
            cy.url().should('contain', `/blogs/${bloggerId}#notes`);
            cy.getByTestId(TEST_ID.Bloggers.BlogNotesBox).should('exist').should('be.visible');
        });

        it('should display loader in card while the request is loading', () => {
            cy.visit('/blogs');
            interceptBloggers(currentUserId, '9', 200, DELAY.SM, MOCK_ALL_BLOGGERS);
            cy.viewport(1920, 750);

            interceptToggleSubscription(200, 1000);
            cy.getByTestId(TEST_ID.Bloggers.BlogToggleSubscribe).first().click();
            cy.getByTestId(TEST_ID.Bloggers.MobileLoader).should('exist').should('be.visible');
            cy.wait(1000);
            cy.getByTestId(TEST_ID.Bloggers.MobileLoader).should('not.exist');
        });
    });

    describe('blogger profile page', () => {
        const currentUserId = '65a1bc23f8e7d901f4c3d2a1';
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
            interceptBloggers(currentUserId);
            interceptCategories();
            interceptNewestRecipes();
            interceptJuiciestRecipes();
            interceptRelevantRecipes();
            signIn();
        });

        it('should load the blogger profile on visit by link', () => {
            interceptBloggers(currentUserId, '9', 200, DELAY.SM, MOCK_ALL_BLOGGERS);
            cy.visit('/blogs');
            cy.viewport(1920, 750);
            const { _id: bloggerId } = MOCK_BLOGGER_PROFILE.bloggerInfo;

            loadUser(bloggerId, currentUserId);
            cy.getByTestId(TEST_ID.Bloggers.BlogsCardRecipesButton).first().click();

            cy.url().should('contain', `/blogs/${bloggerId}`);
            cy.wait('@getBloggerById');
            cy.wait('@getBloggerRecipesById');

            cy.getByTestId(TEST_ID.Bloggers.BloggerUserInfoBox)
                .should('exist')
                .should('be.visible');
            cy.getByTestId(TEST_ID.Bloggers.RecipeCardList).should('exist').should('be.visible');
            cy.getByTestId(TEST_ID.Bloggers.BlogNotesBox).should('exist').should('be.visible');
            cy.getByTestId(TEST_ID.Bloggers.BloggerUserOtherBlogsGrid)
                .should('exist')
                .should('be.visible');

            cy.get('html, body').invoke('attr', 'style', 'height: auto; scroll-behavior: auto;');
            cy.wait(2000);
            takeAllScreenshots('blogger-profile');
        });

        it('should load the blogger profile on visit from the address bar', () => {
            const { _id: bloggerId } = MOCK_BLOGGER_PROFILE.bloggerInfo;
            cy.viewport(1920, 750);
            loadUser(bloggerId, currentUserId);
            cy.visit(`/blogs/${bloggerId}`);

            cy.getByTestId(TEST_ID.Bloggers.BloggerUserInfoBox)
                .should('exist')
                .should('be.visible');
            cy.getByTestId(TEST_ID.Bloggers.RecipeCardList).should('exist').should('be.visible');
            cy.getByTestId(TEST_ID.Bloggers.BlogNotesBox).should('exist').should('be.visible');
            cy.getByTestId(TEST_ID.Bloggers.BloggerUserOtherBlogsGrid)
                .should('exist')
                .should('be.visible');
        });

        it('should correctly fill all the sections', () => {
            const { _id: bloggerId, login, firstName, lastName } = MOCK_BLOGGER_PROFILE.bloggerInfo;
            const { totalBookmarks, totalSubscribers } = MOCK_BLOGGER_PROFILE;
            const { notes } = MOCK_BLOGGER_RECIPE;
            cy.viewport(1920, 750);
            loadUser(bloggerId, currentUserId);
            cy.visit(`/blogs/${bloggerId}`);

            cy.getByTestId(TEST_ID.Bloggers.BloggerUserInfoBox)
                .should('exist')
                .should('be.visible')
                .within(() => {
                    cy.getByTestId(TEST_ID.Bloggers.BloggerUserInfoName).should(
                        'have.text',
                        `${firstName} ${lastName}`,
                    );
                    cy.getByTestId(TEST_ID.Bloggers.BloggerUserInfoLogin).should(
                        'have.text',
                        `@${login}`,
                    );
                    cy.getByTestId(TEST_ID.Bloggers.BloggerFollowersCount).should(
                        'have.text',
                        `${totalSubscribers}`,
                    );
                    cy.getByTestId(TEST_ID.Bloggers.BloggerFollowersBookmarks).should(
                        'have.text',
                        `${totalBookmarks}`,
                    );
                });

            cy.getByTestId(TEST_ID.Bloggers.RecipeCardList)
                .should('exist')
                .should('be.visible')
                .children()
                .should('have.length', 8);

            cy.getByTestId(TEST_ID.Bloggers.BlogNotesBox)
                .should('exist')
                .should('be.visible')
                .within(() => {
                    cy.getByTestId(TEST_ID.Bloggers.BloggerUserNotesCount).should(
                        'have.text',
                        '(4)',
                    );
                    cy.getByTestId(TEST_ID.Bloggers.BloggerUserNotesGrid)
                        .children()
                        .should('have.length', 4);
                    cy.getByTestId(TEST_ID.Bloggers.BloggerUserNotesGrid)
                        .children()
                        .first()
                        .within(() => {
                            cy.getByTestId(TEST_ID.Bloggers.NotesCardText).should(
                                'have.text',
                                notes[0].text,
                            );
                        });
                });

            cy.getByTestId(TEST_ID.Bloggers.BloggerUserOtherBlogsGrid)
                .children()
                .should('have.length', 3);
            cy.getByTestId(TEST_ID.Bloggers.BloggerUserOtherBlogsButton).should('exist');
        });

        it('should show tooltip on hover', () => {
            const { _id: bloggerId } = MOCK_BLOGGER_PROFILE.bloggerInfo;
            cy.viewport(1920, 750);
            loadUser(bloggerId, currentUserId);
            cy.visit(`/blogs/${bloggerId}`);
            cy.scrollTo('top');
            cy.getByTestId(TEST_ID.Bloggers.BloggerUserInfoBox).within(() => {
                cy.getByTestId(TEST_ID.Bloggers.BlogToggleUnsubscribe).rightclick();
            });
            cy.getByTestId(TEST_ID.Bloggers.BlogTooltip)
                .should('be.visible')
                .should('contain.text', 'Нажмите, если хотите отписаться');
            cy.get('html, body').invoke('attr', 'style', 'height: auto; scroll-behavior: auto;');
            cy.wait(2000);
            takeAllScreenshots('blogger-profile-with-tooltip');
        });

        it('should correctly expand recipes section', () => {
            const { _id: bloggerId } = MOCK_BLOGGER_PROFILE.bloggerInfo;
            cy.viewport(1920, 750);
            loadUser(bloggerId, currentUserId);
            cy.visit(`/blogs/${bloggerId}`);
            cy.getByTestId(TEST_ID.Bloggers.RecipeCardList)
                .should('exist')
                .should('be.visible')
                .children()
                .should('have.length', 8);
            cy.getByTestId(TEST_ID.Button.LoadMore).click();
            cy.getByTestId(TEST_ID.Bloggers.RecipeCardList)
                .should('exist')
                .should('be.visible')
                .children()
                .should('have.length', 10);
        });

        it('should correctly expand notes section', () => {
            const { _id: bloggerId } = MOCK_BLOGGER_PROFILE.bloggerInfo;
            cy.viewport(1920, 750);
            loadUser(bloggerId, currentUserId);
            cy.visit(`/blogs/${bloggerId}`);
            cy.getByTestId(TEST_ID.Bloggers.BloggerUserNotesGrid)
                .children()
                .should('have.length', 4);
            cy.getByTestId(TEST_ID.Bloggers.BloggerUserNotesGrid)
                .children()
                .eq(3)
                .should('not.be.visible');
            cy.getByTestId(TEST_ID.Bloggers.BloggerUserNotesButton)
                .should('have.text', 'Показать больше')
                .click();
            cy.getByTestId(TEST_ID.Bloggers.BloggerUserNotesGrid)
                .children()
                .eq(3)
                .should('be.visible');
            cy.getByTestId(TEST_ID.Bloggers.BloggerUserNotesButton).should('have.text', 'Свернуть');
        });

        it('button "Все авторы" should route to the /blogs route', () => {
            const { _id: bloggerId } = MOCK_BLOGGER_PROFILE.bloggerInfo;
            cy.viewport(1920, 750);
            loadUser(bloggerId, currentUserId);
            cy.visit(`/blogs/${bloggerId}`);
            cy.getByTestId(TEST_ID.Bloggers.BloggerUserOtherBlogsButton)
                .should('contain', 'Всe авторы')
                .click();
            cy.url().should('match', /.*\/blogs$/);
        });

        it('should correctly subscribe/unsubscribe', () => {
            const { _id: bloggerId } = MOCK_BLOGGER_PROFILE.bloggerInfo;
            cy.viewport(1920, 750);
            loadUser(bloggerId, currentUserId);
            cy.visit(`/blogs/${bloggerId}`);

            cy.getByTestId(TEST_ID.Bloggers.BloggerUserInfoBox).within(() => {
                interceptToggleSubscription(200, DELAY.SM, 'Отписка произведена успешно');
                cy.wait(1000);
                cy.getByTestId(TEST_ID.Bloggers.BlogToggleUnsubscribe).should('exist').click();
                cy.getByTestId(TEST_ID.Bloggers.BlogToggleSubscribe)
                    .should('exist')
                    .should('contain', 'Подписаться');
            });
        });

        it('should correctly process 404 on user-related request', () => {
            const { _id: bloggerId } = MOCK_BLOGGER_PROFILE.bloggerInfo;
            cy.viewport(1920, 750);
            interceptBloggerById(bloggerId, currentUserId, 404);
            interceptBloggerRecipesById(bloggerId, 404);
            cy.visit(`/blogs/${bloggerId}`);

            cy.wait(500);
            cy.url().should('contain', '/not-found');
        });

        it('should correctly process 500 on any request', () => {
            const { _id: bloggerId } = MOCK_BLOGGER_PROFILE.bloggerInfo;
            cy.viewport(1920, 750);
            interceptBloggerById(bloggerId, currentUserId, 500);
            interceptBloggerRecipesById(bloggerId);
            cy.visit(`/blogs/${bloggerId}`);
            cy.wait(500);
            cy.url().should('not.contain', '/not-found');
            cy.url().should('not.contain', `/blogs/${bloggerId}`);
            cy.getByTestId(TEST_ID.Notification.Error).should('exist').and('be.visible');
            cy.getByTestId(TEST_ID.Notification.ErrorTitle).should('have.text', 'Ошибка сервера');
            cy.getByTestId(TEST_ID.Notification.ErrorDescription).should(
                'have.text',
                'Попробуйте немного позже.',
            );
        });

        it('should display loader in card while the request is loading', () => {
            const { _id: bloggerId } = MOCK_BLOGGER_PROFILE.bloggerInfo;
            cy.viewport(1920, 750);
            loadUser(bloggerId, currentUserId);
            cy.visit(`/blogs/${bloggerId}`);
            cy.getByTestId(TEST_ID.Bloggers.BloggerUserInfoBox).within(() => {
                interceptToggleSubscription(200, 1000);
                cy.getByTestId(TEST_ID.Bloggers.BlogToggleUnsubscribe).click();
                cy.getByTestId(TEST_ID.Bloggers.MobileLoader).should('exist').should('be.visible');
                cy.wait(1000);
                cy.getByTestId(TEST_ID.Bloggers.MobileLoader).should('not.exist');
            });
        });
    });
});
