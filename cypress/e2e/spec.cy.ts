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

const resolutionFull = [
    { width: 360, height: 1080 },
    { width: 768, height: 1080 },
    { width: 1920, height: 750 },
];

const setElementPosition = () => {
    cy.getByTestId(HEADER).invoke('css', 'position', 'absolute');
    cy.getByTestId(FOOTER).invoke('css', 'position', 'absolute');
};

function takeScreenshots(screenshotName: string, resolution = resolutionFull) {
    for (let i = 0; i < resolution.length; i++) {
        const capture = resolution[i].width < 1920 ? 'fullPage' : 'viewport';
        cy.viewport(resolution[i].width, resolution[i].height);
        cy.wait(700);
        if (resolution[i].width === 1920) {
            cy.screenshot(`${screenshotName}_${resolution[i].width}x${resolution[i].height}`, {
                capture,
            });
            cy.scrollTo('bottom');
            cy.screenshot(`${screenshotName}_${resolution[i].width}x${resolution[i].height}`, {
                capture,
            });
            cy.scrollTo('top');
        } else {
            setElementPosition();
            cy.wait(700);
            cy.screenshot(`${screenshotName}_${resolution[i].width}x${resolution[i].height}`, {
                capture,
            });
            cy.getByTestId(HEADER).invoke('css', 'position', 'fixed');
            cy.getByTestId(FOOTER).invoke('css', 'position', 'fixed');
        }
    }
}

describe('Carousel Functionality', () => {
    it('Карусель на 1920px', () => {
        cy.viewport(1920, 750);
        cy.visit('/');
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
        cy.visit('/');
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

describe('App Component', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000');
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

describe('Burger Menu Functionality', () => {
    it('Бургер-меню отсутствует на 1440px', () => {
        cy.viewport(1440, 1024);
        cy.visit('/');
        cy.getByTestId(HUMB_ICON).should('not.be.visible');
        cy.getByTestId(NAV).should('exist');
    });

    it('Бургер-меню на 768px', () => {
        cy.viewport(768, 1024);
        cy.visit('/');

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
    it('Поиск на главной странице', () => {
        cy.viewport(1920, 750);
        cy.visit('/');
        setElementPosition();

        cy.getByTestId(SEARCH_INPUT).type('Ка');
        cy.getByTestId(SEARCH_BUTTON).should('have.css', 'pointer-events', 'none');

        cy.getByTestId(SEARCH_INPUT).clear().type('Кар');
        cy.getByTestId(SEARCH_BUTTON).should('be.visible').click();

        cy.get(`[data-test-id^=${FOOD_CARD}]`).should('have.length', 3);
    });

    it('Поиск по категории', () => {
        cy.viewport(768, 1024);
        cy.visit('/');
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
        cy.visit('/');
        setElementPosition();

        cy.getByTestId(SEARCH_INPUT).type('ооо');
        cy.getByTestId(SEARCH_BUTTON).should('be.visible').click();

        cy.screenshot(`search-not-found-360`, { capture: 'fullPage' });
    });
});

describe('Recipe Functionality', () => {
    it('Страница рецепта', () => {
        cy.visit('/');
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
    it('Выбраны 3 фильтра, 1920px', () => {
        cy.viewport(1920, 750);
        cy.visit('/');
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
        cy.visit('/');
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
        cy.visit('/');
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
    it('Нет выбора аллергенов на 768px', () => {
        cy.viewport(768, 1080);
        cy.visit('/');

        cy.getByTestId(ALLERGEN_SWITCHER).should('not.exist');
        cy.getByTestId(ALLERGEN_BUTTON).should('not.exist');
    });

    it('Выбор аллергенов по категории', () => {
        cy.viewport(1920, 750);
        cy.visit('/');
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
        cy.visit('/');
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
    it('Связь навигации и табов', () => {
        cy.viewport(1920, 1080);
        cy.visit('/');

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
    it('Переход по хлебным крошкам', () => {
        cy.viewport(768, 1080);
        cy.visit('/');

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
