/// <reference types="cypress" />

const JUISIEST_LINK = 'juiciest-link';
const JUISIEST_LINK_MOB = 'juiciest-link-mobile';
const VEGAN = 'vegan-cuisine';
const HEADER = 'header';
const FOOTER = 'footer';
const NAV = 'nav';
const BREADCRUMBS = 'breadcrumbs';
const HUMB_ICON = 'hamburger-icon';
const CLOSE_ICON = 'close-icon';
const SEARCH_INPUT = 'search-input';
const SEARCH_BUTTON = 'search-button';
const FOOD_CARD = 'food-card';
const CAROUSEL_CARD = 'carousel-card';
const ALLERGEN_SWITCHER = 'allergens-switcher';
const ALLERGEN_BUTTON = 'allergens-menu-button';
const FILTER_DRAWER = 'filter-drawer';
const FILTER_BUTTON = 'filter-button';
const FIND_RECIPE_BUTTON = 'find-recipe-button';
const FILTER_CATEGORY = 'filter-menu-button-категория';
const VEGAN_CHECKBOX = 'checkbox-веганская кухня';
const ALLERGEN_SWITCHER_FILTER = 'allergens-switcher-filter';
const ALLERGEN_BUTTON_FILTER = 'allergens-menu-button-filter';
const ADD_OTHER_ALLERGEN = 'add-other-allergen';
const ADD_ALLERGEN_BUTTON = 'add-allergen-button';
const FILTER_TAG = 'filter-tag';

const RESOLUTION = {
    desktop: [1920, 1120],
    tablet: [768, 1024],
    mobile: [360, 800],
} as const;

const setElementPosition = () => {
    cy.getByTestId(HEADER).invoke('css', 'position', 'absolute');
    cy.getByTestId(FOOTER).invoke('css', 'position', 'absolute');
};

function takeScreenshots(screenshotName: string, resolution = RESOLUTION) {
    for (const [width, height] of Object.values(resolution)) {
        const capture = width < 1920 ? 'fullPage' : 'viewport';
        cy.viewport(width, height);
        cy.wait(700);
        if (width === 1920) {
            cy.screenshot(`${screenshotName}_${width}x${height}`, {
                capture,
            });
            cy.scrollTo('bottom');
            cy.screenshot(`${screenshotName}_${width}x${height}`, {
                capture,
            });
            cy.scrollTo('top');
        } else {
            setElementPosition();
            cy.wait(700);
            cy.screenshot(`${screenshotName}_${width}x${height}`, {
                capture,
            });
            cy.getByTestId(HEADER).invoke('css', 'position', 'fixed');
            cy.getByTestId(FOOTER).invoke('css', 'position', 'fixed');
        }
    }
}

function takeScreenshot(screenshotName: string, device: keyof typeof RESOLUTION = 'desktop') {
    const [width, height] = RESOLUTION[device];

    cy.viewport(width, height);
    cy.wait(1500);

    cy.screenshot(`${screenshotName}_${width}x${height}`, {
        capture: 'fullPage',
    });
}

const signIn = () => {
    interceptRequest({
        endpoint: ApiEndpoints.RefreshToken,
        method: 'GET',
        statusCode: 500,
        alias: 'refreshToken500',
    });

    cy.visit('/');

    const waitSignIn200 = interceptRequest({
        endpoint: ApiEndpoints.SignIn,
        statusCode: 200,
        alias: 'signInRequest200',
        headers: {
            [ACCESS_TOKEN_HEADER[0]]: ACCESS_TOKEN_HEADER[1],
        },
        expectedBody: {
            login: VALIDATION_PASS_VALUE.Login,
            password: VALIDATION_PASS_VALUE.Password,
        },
    });

    cy.getByTestId(CyTestId.Form.SignIn).within(() => {
        fillSignInForm();
        cy.getByTestId(CyTestId.Button.Submit).click();
    });

    waitSignIn200();
};

describe('App Component', () => {
    beforeEach(() => {
        signIn();
    });

    it('should take a screenshot of the app', () => {
        cy.viewport(1920, 750);
        cy.getByTestId(JUISIEST_LINK_MOB).should('not.be.visible');
        cy.getByTestId(JUISIEST_LINK).click();
        cy.getByTestId(HEADER).should('contain', 'Самое сочное');
        cy.scrollTo('top');
        cy.getByTestId(VEGAN).click();
        cy.getByTestId(HEADER).should('contain', 'Веганская кухня');
    });
});

describe('Carousel Functionality', () => {
    beforeEach(() => {
        signIn();
    });

    it('Карусель на 1920px', () => {
        cy.viewport(1920, 750);
        cy.wait(700);
        setElementPosition();

        cy.get(`[data-test-id^=${CAROUSEL_CARD}]`).should('have.length', 10);

        for (let i = 0; i < 4; i++) {
            cy.getByTestId(`${CAROUSEL_CARD}-${i}`).should('be.visible');
        }

        cy.getByTestId('carousel-forward').click();
        cy.wait(700);
        cy.getByTestId(`${CAROUSEL_CARD}-4`).should('be.visible');
        for (let i = 1; i <= 4; i++) {
            cy.getByTestId(`${CAROUSEL_CARD}-${i}`).should('be.visible');
        }

        cy.getByTestId('carousel-back').click();
        cy.wait(700);
        cy.getByTestId(`${CAROUSEL_CARD}-0`).should('be.visible');

        cy.getByTestId('carousel-back').click();
        cy.wait(700);
        cy.getByTestId(`${CAROUSEL_CARD}-9`).should('be.visible');

        cy.wait(700);
        [1, 2].forEach((index) => {
            cy.getByTestId(`${CAROUSEL_CARD}-${index}`).should('be.visible');
        });

        cy.scrollTo('top');
        cy.screenshot('carousel-1920', { capture: 'viewport' });
    });

    it('Карусель на 360px', () => {
        cy.viewport(360, 600);
        setElementPosition();
        cy.wait(700);

        cy.get(`[data-test-id^=${CAROUSEL_CARD}]`).should('have.length', 10);

        cy.getByTestId('carousel-forward').should('not.be.visible');
        cy.getByTestId('carousel-back').should('not.be.visible');

        cy.getByTestId('carousel')
            .trigger('pointerdown', { which: 1 })
            .trigger('pointermove', 'right')
            .trigger('pointerup', { force: true })

            .trigger('pointerdown', { which: 1 })
            .trigger('pointermove', 'left')
            .trigger('pointerup', { force: true });

        cy.scrollTo('top');
        cy.screenshot('carousel-360', { capture: 'viewport' });
    });
});

describe('Burger Menu Functionality', () => {
    beforeEach(() => {
        signIn();
    });

    it('Бургер-меню отсутствует на 1440px', () => {
        cy.viewport(1440, 1024);
        cy.getByTestId(HUMB_ICON).should('not.be.visible');
        cy.getByTestId(NAV).should('exist');
    });

    it('Бургер-меню на 768px', () => {
        cy.viewport(768, 1024);

        setElementPosition();

        cy.getByTestId(NAV).should('not.exist');
        cy.getByTestId(CLOSE_ICON).should('not.exist');
        cy.getByTestId(HUMB_ICON).should('exist').click();

        cy.getByTestId(HUMB_ICON).should('not.exist');
        cy.getByTestId(CLOSE_ICON).should('exist');
        cy.getByTestId(NAV).should('be.visible');
        cy.getByTestId(VEGAN).click();
        cy.getByTestId(CLOSE_ICON).scrollIntoView();
        cy.getByTestId(BREADCRUMBS).should('contain.text', 'Закуски');
        cy.screenshot('open-hamburger-768', { capture: 'fullPage' });

        cy.get('body').click(100, 200);
        cy.getByTestId(NAV).should('not.exist');
    });

    it('Бургер-меню на 360px', () => {
        cy.viewport(360, 800);
        cy.visit('/the-juiciest');

        setElementPosition();

        cy.getByTestId(NAV).should('not.exist');
        cy.getByTestId(CLOSE_ICON).should('not.exist');
        cy.getByTestId(HUMB_ICON).should('exist').click();

        cy.getByTestId(HUMB_ICON).should('not.exist');
        cy.getByTestId(CLOSE_ICON).should('exist');
        cy.getByTestId(NAV).should('be.visible');
        cy.getByTestId(CLOSE_ICON).scrollIntoView();
        cy.getByTestId(BREADCRUMBS).should('contain.text', 'Самое сочное');

        cy.screenshot('open-hamburger-360', { capture: 'fullPage' });

        cy.getByTestId(CLOSE_ICON).click();
        cy.getByTestId(NAV).should('not.exist');
    });
});

describe('Search Functionality', () => {
    beforeEach(() => {
        signIn();
    });

    it('Поиск на главной странице', () => {
        cy.viewport(1920, 750);
        setElementPosition();

        cy.getByTestId(SEARCH_INPUT).type('Ка');
        cy.getByTestId(SEARCH_BUTTON).should('have.css', 'pointer-events', 'none');

        cy.getByTestId(SEARCH_INPUT).clear().type('Кар');
        cy.getByTestId(SEARCH_BUTTON).should('be.visible').click();

        cy.get(`[data-test-id^=${FOOD_CARD}]`).should('have.length', 3);
    });

    it('Поиск по категории', () => {
        cy.viewport(768, 1024);
        setElementPosition();

        cy.getByTestId(HUMB_ICON).should('be.visible').click();
        cy.getByTestId(VEGAN).click();
        cy.wait(700);
        cy.getByTestId(CLOSE_ICON).should('be.visible').click();

        cy.getByTestId(SEARCH_INPUT).type('Карт');
        cy.getByTestId(SEARCH_BUTTON).should('be.visible').click();

        cy.get(`[data-test-id^=${FOOD_CARD}]`).should('have.length', 2);
        cy.screenshot(`search-category-768`, { capture: 'fullPage' });
    });

    it('Ничего не найдено', () => {
        cy.viewport(360, 800);
        setElementPosition();

        cy.getByTestId(SEARCH_INPUT).type('ооо');
        cy.getByTestId(SEARCH_BUTTON).should('be.visible').click();

        cy.screenshot(`search-not-found-360`, { capture: 'fullPage' });
    });
});

describe('Recipe Functionality', () => {
    beforeEach(() => {
        signIn();
    });

    it('Страница рецепта', () => {
        cy.getByTestId('card-link-0').click();
        cy.contains('Лапша с курицей и шафраном').should('exist');
        cy.scrollTo('top');
        takeScreenshots('Страница рецепта');

        cy.getByTestId('increment-stepper').click();
        cy.getByTestId('ingredient-quantity-0').contains('250');
        cy.getByTestId('ingredient-quantity-1').contains('375');

        cy.getByTestId('decrement-stepper').click();
        cy.getByTestId('ingredient-quantity-0').contains('200');
        cy.getByTestId('ingredient-quantity-1').contains('300');
    });
});

describe('Filters Functionality', () => {
    beforeEach(() => {
        signIn();
    });

    it('Выбраны 3 фильтра, 1920px', () => {
        cy.viewport(1920, 750);
        setElementPosition();

        cy.getByTestId(FILTER_DRAWER).should('not.exist');
        cy.getByTestId(FILTER_BUTTON).should('be.visible').click();
        cy.getByTestId(FILTER_DRAWER).should('exist').contains('Фильтр');
        cy.getByTestId(FIND_RECIPE_BUTTON).should('have.css', 'pointer-events', 'none');

        cy.getByTestId(FILTER_CATEGORY).click();
        cy.getByTestId(VEGAN_CHECKBOX).click();
        cy.scrollTo('top');
        cy.screenshot('filter-open-1920', { capture: 'viewport' });
        cy.getByTestId(FILTER_CATEGORY).click();

        cy.getByTestId('checkbox-картошка').click();

        cy.getByTestId(ALLERGEN_SWITCHER_FILTER).click();
        cy.getByTestId(ALLERGEN_BUTTON_FILTER).click();
        cy.getByTestId(ADD_OTHER_ALLERGEN).type('лук');
        cy.getByTestId(ADD_ALLERGEN_BUTTON).click();
        cy.getByTestId(ALLERGEN_BUTTON_FILTER).click();

        cy.getByTestId(FILTER_TAG).should('have.length', 3);

        cy.getByTestId(FIND_RECIPE_BUTTON).click();
        cy.get(`[data-test-id^=${FOOD_CARD}]`).should('have.length', 2);
    });

    it('Выбор и очистка фильтров, 768px', () => {
        cy.viewport(768, 1120);
        setElementPosition();

        cy.getByTestId(FILTER_DRAWER).should('not.exist');

        cy.getByTestId(FILTER_BUTTON).should('be.visible').click();
        cy.get('body').click(100, 200);
        cy.getByTestId(FILTER_DRAWER).should('not.exist');

        cy.getByTestId(FILTER_BUTTON).should('be.visible').click();
        cy.getByTestId(FILTER_DRAWER).should('exist').contains('Фильтр');

        cy.getByTestId(FILTER_CATEGORY).click();
        cy.getByTestId(VEGAN_CHECKBOX).click();
        cy.getByTestId(FILTER_CATEGORY).click();

        cy.getByTestId(FILTER_TAG).should('have.length', 1);

        cy.getByTestId(FIND_RECIPE_BUTTON).click();
        cy.get(`[data-test-id^=${FOOD_CARD}]`).should('have.length', 7);

        cy.getByTestId(FILTER_BUTTON).should('be.visible').click();

        cy.getByTestId(FILTER_CATEGORY).click();
        cy.getByTestId(VEGAN_CHECKBOX).click();
        cy.getByTestId(FILTER_CATEGORY).click();

        cy.getByTestId('checkbox-картошка').click();

        cy.getByTestId(ALLERGEN_SWITCHER_FILTER).click();
        cy.getByTestId(ALLERGEN_BUTTON_FILTER).click();
        cy.getByTestId('allergen-5').click();
        cy.getByTestId(ALLERGEN_BUTTON_FILTER).click();

        cy.getByTestId(FILTER_TAG).should('have.length', 3);
        cy.screenshot('filter-before-clear-768', { capture: 'viewport' });

        cy.getByTestId('clear-filter-button').should('be.visible').click();
        cy.getByTestId(FILTER_TAG).should('have.length', 0);
        cy.getByTestId(FIND_RECIPE_BUTTON).should('have.css', 'pointer-events', 'none');
    });

    it('Закрытие фильтра, поиск отфильтрованных карточек, 360px', () => {
        cy.viewport(360, 800);
        setElementPosition();

        cy.getByTestId(FILTER_DRAWER).should('not.exist');

        cy.getByTestId(FILTER_BUTTON).should('be.visible').click();
        cy.getByTestId(FILTER_DRAWER).should('exist');

        cy.getByTestId('close-filter-drawer').click();
        cy.getByTestId(FILTER_DRAWER).should('not.exist');

        cy.getByTestId(FILTER_BUTTON).should('be.visible').click();
        cy.getByTestId(FILTER_DRAWER).should('be.visible');
        cy.screenshot('open-drawer-360', { capture: 'viewport' });

        cy.getByTestId(FILTER_CATEGORY).click();
        cy.getByTestId(VEGAN_CHECKBOX).click();
        cy.getByTestId(FILTER_CATEGORY).click();

        cy.getByTestId(FIND_RECIPE_BUTTON).click();

        cy.getByTestId(SEARCH_INPUT).type('овощ');
        cy.getByTestId(SEARCH_BUTTON).should('be.visible').click();

        cy.get(`[data-test-id^=${FOOD_CARD}]`).should('have.length', 2);
    });
});

describe('Allergens Functionality', () => {
    beforeEach(() => {
        signIn();
    });

    it('Нет выбора аллергенов на 768px', () => {
        cy.viewport(768, 1080);

        cy.getByTestId(ALLERGEN_SWITCHER).should('not.exist');
        cy.getByTestId(ALLERGEN_BUTTON).should('not.exist');
    });

    it('Выбор аллергенов по категории', () => {
        cy.viewport(1920, 750);
        setElementPosition();

        cy.getByTestId(ALLERGEN_SWITCHER).should('not.have.attr', 'data-checked');
        cy.getByTestId(ALLERGEN_BUTTON).should('be.disabled');

        cy.getByTestId(VEGAN).click();
        cy.wait(700);
        cy.getByTestId(ALLERGEN_SWITCHER).click();
        cy.getByTestId(ALLERGEN_SWITCHER).should('have.attr', 'data-checked');
        cy.getByTestId(ALLERGEN_BUTTON).should('not.be.disabled').contains('Выберите из списка');
        cy.getByTestId(ALLERGEN_BUTTON).click();
        cy.getByTestId('allergens-menu').should('be.visible');
        cy.getByTestId('allergen-1').click();
        cy.getByTestId('allergen-5').click();
        cy.getByTestId(ADD_OTHER_ALLERGEN).type('Гриб{enter}');
        cy.get(`[data-test-id^=${FOOD_CARD}]`).should('have.length', 3);

        cy.scrollTo('top');
        cy.screenshot('allergens-1920', { capture: 'viewport' });

        cy.getByTestId(ALLERGEN_SWITCHER).click();
        cy.scrollTo('top');
        cy.getByTestId(ALLERGEN_BUTTON).should('be.disabled').contains('Выберите из списка');
    });

    it('Поиск после фильтрации по аллергенам', () => {
        cy.viewport(1920, 750);
        setElementPosition();

        cy.getByTestId(VEGAN).click();
        cy.wait(700);
        cy.getByTestId(ALLERGEN_SWITCHER).click();
        cy.getByTestId(ALLERGEN_BUTTON).click();
        cy.getByTestId('allergens-menu').should('be.visible');
        cy.getByTestId('allergen-1').click();
        cy.getByTestId('allergen-5').click();
        cy.getByTestId(ADD_OTHER_ALLERGEN).type('Гриб{enter}');
        cy.getByTestId(ALLERGEN_BUTTON).click();

        cy.getByTestId(SEARCH_INPUT).type('Капус');
        cy.getByTestId(SEARCH_BUTTON).should('be.visible').click();

        cy.get(`[data-test-id^=${FOOD_CARD}]`).should('have.length', 1);
    });
});

describe('Navigation and Tabs Functionality', () => {
    beforeEach(() => {
        signIn();
    });

    it('Связь навигации и табов', () => {
        cy.viewport(1920, 1080);

        cy.getByTestId(VEGAN).click();
        cy.getByTestId('tab-snacks-0').should('have.attr', 'aria-selected', 'true');
        cy.url().should('include', '/vegan/snacks');
        cy.getByTestId(`${FOOD_CARD}-0`).contains(
            'Картошка, тушенная с болгарским перцем и фасолью в томатном соусе',
        );
        cy.getByTestId('tab-second-dish-2').click();
        cy.wait(500);
        cy.getByTestId(`${FOOD_CARD}-0`).contains('Овощная лазанья из лаваша');
        cy.getByTestId('second-dish-active').should('exist');
        cy.getByTestId('snacks-active').should('not.exist');
    });
});

describe('Breadcrumbs Functionality', () => {
    beforeEach(() => {
        signIn();
    });

    it('Переход по хлебным крошкам', () => {
        cy.viewport(768, 1080);

        cy.getByTestId(`${CAROUSEL_CARD}-0`).click();
        cy.url().should('include', '/vegan/snacks/0');
        cy.getByTestId(HUMB_ICON).click();
        cy.getByTestId(BREADCRUMBS).contains(
            'Картошка, тушенная с болгарским перцем и фасолью в томатном соусе',
        );

        cy.getByTestId(BREADCRUMBS).contains('Закуски').click();
        cy.url().should('match', /\/snacks$/);
        cy.getByTestId('tab-snacks-0').should('have.attr', 'aria-selected', 'true');

        cy.getByTestId(HUMB_ICON).click();
        cy.getByTestId(BREADCRUMBS).should(
            'not.contain',
            'Картошка, тушенная с болгарским перцем и фасолью в томатном соусе',
        );

        cy.getByTestId(BREADCRUMBS).contains('Главная').click();
        cy.getByTestId('carousel').should('exist');
        cy.contains('Приятного аппетита!');
    });
});

// SPRINT 4

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
    delay = 2000,
    body = {},
    expectedBody = null,
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

const checkToastMessage = ({
    id,
    title,
    description = '',
}: {
    id: string;
    title: string;
    description?: string;
}) => {
    cy.wait(300);
    cy.get(`[id=toast-${id}]`, { timeout: 2000 })
        .should('have.length', 1)
        .should('exist')
        .should('be.visible')
        .should('contain', title)
        .should('contain', description)
        .within(() => {
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
        });

        interceptRequest({
            endpoint: ApiEndpoints.RefreshToken,
            method: 'GET',
            statusCode: 500,
            alias: 'refreshToken500',
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

                const passwordToggleVisibility = cy.getByTestId(CyTestId.Button.PasswordVisibility);

                passwordToggleVisibility.then(($toggle) => {
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

            checkAppLoader();

            cy.wait('@signInRequest401');
            cy.get('@passwordInput').type('{enter}');
            cy.wait('@signInRequest401');

            takeScreenshot('sign-in-invalid-credentials');
            takeScreenshot('sign-in-invalid-credentials', 'mobile');

            checkToastMessage(TOAST_MESSAGE.SignInToast[401]);
        });

        it('should display error message for 403 email is not verified', () => {
            interceptRequest({
                endpoint: ApiEndpoints.SignIn,
                statusCode: 403,
                alias: 'signInRequest403',
            });

            cy.get('@signInForm').within(() => {
                fillSignInForm();
                cy.get('@passwordInput').type('{enter}');
            });

            takeScreenshot('sign-in-loader');
            checkAppLoader();

            cy.wait('@signInRequest403');
            cy.get('@passwordInput').type('{enter}');
            cy.wait('@signInRequest403');

            takeScreenshot('sign-in-email-not-verified', 'tablet');

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

            checkAppLoader();
            wait500();

            takeScreenshot('sign-in-server-error');

            withModal('SignInError')
                .should('exist')
                .should('be.visible')
                .within(() => {
                    cy.contains('Вход не выполнен').should('be.visible');
                    cy.contains('Что-то пошло не так.').should('be.visible');
                    cy.contains('Попробуйте еще раз').should('be.visible');

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
            });

            cy.get('@signInForm').within(() => {
                fillSignInForm();
                cy.get('@passwordInput').type('{enter}');
            });

            cy.getByTestId(CyTestId.AppLoader).should('be.visible');
            wait500();

            takeScreenshot('sign-in-retry', 'mobile');

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
            checkAppLoader();
            wait200();

            cy.wait('@all');

            cy.contains('Приятного аппетита!').should('be.visible');
        });

        it('should navigate to main page on sign in success', () => {
            const wait200 = interceptRequest({
                endpoint: ApiEndpoints.SignIn,
                statusCode: 200,
                alias: 'signInRequest200',
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

            checkAppLoader();
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
            cy.get('@signUpForm').within(() => {
                validateFirstNameField();
                validateLastNameField();
                validateEmailField();
            });
        });

        it('should validate sign up form fields step 2', () => {
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

            cy.getByTestId(CyTestId.Input.Login).as('loginInput');
            cy.getByTestId(CyTestId.Input.Password).as('passwordInput');
            cy.getByTestId(CyTestId.Input.PasswordConfirm).as('passwordConfirmInput');

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

            interceptRequest({
                endpoint: ApiEndpoints.SignUp,
                statusCode: 500,
                alias: 'signUpRequest500',
            });

            cy.getByTestId(CyTestId.Button.Submit).click();

            checkAppLoader();
            cy.wait('@signUpRequest500');
            cy.getByTestId(CyTestId.Input.Login).type('{enter}');
            cy.wait('@signUpRequest500');

            checkToastMessage(TOAST_MESSAGE.ServerErrorToast);
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
            });

            cy.getByTestId(CyTestId.Button.Submit).click();
            waitLogin400();

            checkToastMessage({
                ...TOAST_MESSAGE.SignUpToast[400],
                title: SIGN_UP_LOGIN_CONFLICT_MESSAGE,
            });

            const waitEmail400 = interceptRequest({
                endpoint: ApiEndpoints.SignUp,
                statusCode: 400,
                alias: 'signUpRequest400',
                body: {
                    message: SIGN_UP_EMAIL_CONFLICT_MESSAGE,
                    statusCode: 400,
                },
            });

            cy.getByTestId(CyTestId.Button.Submit).click();
            waitEmail400();

            checkToastMessage({
                ...TOAST_MESSAGE.SignUpToast[400],
                title: SIGN_UP_EMAIL_CONFLICT_MESSAGE,
            });
        });

        it('should display success modal on sign up success 200', () => {
            fillSignUpForm();

            interceptRequest({
                endpoint: ApiEndpoints.SignUp,
                statusCode: 200,
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

            checkAppLoader();
            cy.wait('@signUpRequest200');

            withModal('SignUpSuccess', () => {
                cy.contains('Остался последний шаг.').should('be.visible');
                cy.contains('Нужно верифицировать ваш e-mail').should('be.visible');
                cy.contains('Мы отправили вам на почту').should('be.visible');
                cy.contains(VALIDATION_PASS_VALUE.Email).should('be.visible');
                cy.contains('ссылку для верификации.').should('be.visible');

                cy.getByTestId(CyTestId.Button.Close).click();
            });

            cy.getByTestId(CyTestId.Modal.SignUpSuccess).should('not.exist');
            cy.getByTestId(CyTestId.Form.SignIn).should('be.visible');
        });
    });

    describe('email verification flow', () => {
        it('should show success message on email verification success', () => {
            cy.visit(`${VERIFICATION_ROUTE}?emailVerified=true`);

            checkToastMessage(TOAST_MESSAGE.EmailVerificationToast[200]);
            cy.getByTestId(CyTestId.Form.SignIn).should('be.visible');
        });

        it('should show error modal on email verification failure', () => {
            cy.visit(`${VERIFICATION_ROUTE}?emailVerified=false`);

            withModal('EmailVerificationFailed', () => {
                cy.contains('Упс! Что-то пошло не так').should('be.visible');
                cy.contains('Ваша ссылка для верификации недействительна.').should('be.visible');
                cy.contains('Попробуйте зарегистрироваться снова.').should('be.visible');

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
            cy.get('@SendEmailModal', { timeout: 2000 }).should('be.visible');

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

            checkAppLoader();
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

            checkAppLoader();
            wait();

            cy.getByTestId(CyTestId.Input.Email).should('have.value', '');
            checkToastMessage(TOAST_MESSAGE.SendVerificationCodeToast[403]);
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

            checkAppLoader();
            wait();
            cy.getByTestId(CyTestId.Input.Email).type(`${VALIDATION_PASS_VALUE.Email}{enter}`);
            wait();

            checkToastMessage(TOAST_MESSAGE.ServerErrorToast);
        });

        it('should open validate verification code modal', () => {
            goToCheckVerificationCode();

            withModal('VerificationCodeModal', () => {
                cy.contains('Мы отправили вам на e-mail').should('be.visible');
                cy.contains(VALIDATION_PASS_VALUE.Email).should('be.visible');
                cy.contains('шестизначный код.').should('be.visible');
                cy.contains('Введите его ниже.').should('be.visible');

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

            checkAppLoader();
            wait403();

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

            checkAppLoader();
            wait500();

            checkToastMessage(TOAST_MESSAGE.ServerErrorToast);

            const wait200 = interceptRequest({
                endpoint: ApiEndpoints.CheckVerificationCode,
                statusCode: 200,
                alias: 'checkVerificationCode200',
            });

            withModal('VerificationCodeModal', () => {
                cy.contains('Неверный код').should('not.exist');
                checkPinReset();
                fillVerificationCode();
            });

            checkAppLoader();
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

            checkAppLoader();
            wait200();
            cy.get('@ResetCredentialsModal').should('not.be.visible');
            checkToastMessage(TOAST_MESSAGE.RestoreCredentials[200]);
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

            checkAppLoader();
            wait500();
            cy.get('@ResetCredentialsModal').should('not.be.visible');
            checkToastMessage(TOAST_MESSAGE.ServerErrorToast);
        });
    });
});
