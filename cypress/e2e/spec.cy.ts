/// <reference types="cypress" />
import * as ReactRouter from 'react-router';

const JUICIEST_LINK = 'juiciest-link';
const JUICIEST_LINK_MOB = 'juiciest-link-mobile';
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
const SLIDER_SIZE = '10';
const JUICIEST_LIMIT = '4';
const RELEVANT_KITCHEN_LIMIT = '5';
const CREATED_AT_SORT_PARAM = 'createdAt';
const LIKES_SORT_PARAM = 'likes';
const SORT_QUERY_PARAM = 'sortBy';
const SEARCH_QUERY_PARAM = 'searchString';
const SUBCATEGORIES_QUERY_PARAM = 'subcategoriesIds';
const GARNISH_QUERY_PARAM = 'garnish';
const ALLERGENS_QUERY_PARAM = 'allergens';
const LIMIT_QUERY_PARAM = 'limit';
const DEFAULT_RECIPE_LIMIT = 8;

const SMALL_DELAY_MS = 300;
const LOAD_DELAY_MS = 700;

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
        cy.wait(LOAD_DELAY_MS);
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
            cy.wait(LOAD_DELAY_MS);
            cy.screenshot(`${screenshotName}_${resolution[i].width}x${resolution[i].height}`, {
                capture,
            });
            cy.getByTestId(HEADER).invoke('css', 'position', 'fixed');
            cy.getByTestId(FOOTER).invoke('css', 'position', 'fixed');
        }
    }
}

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

const interceptNewestRecipes = (delay: number = SMALL_DELAY_MS, mockBody: unknown = null) =>
    cy.intercept(
        {
            method: 'GET',
            url: /recipe\?.*/,
            query: {
                [SORT_QUERY_PARAM]: CREATED_AT_SORT_PARAM,
            },
        },
        ({ reply }) => {
            reply({
                statusCode: 200,
                delay,
                body: mockBody ?? {
                    data: allRecipes.slice(0, Number(SLIDER_SIZE)),
                    meta: { ...metaData, limit: Number(SLIDER_SIZE) },
                },
            });
        },
    );

const interceptJuiciestRecipes = (delay: number = SMALL_DELAY_MS, mockBody: unknown = null) =>
    cy.intercept(
        {
            method: 'GET',
            url: /recipe\?.*/,
            query: {
                [SORT_QUERY_PARAM]: LIKES_SORT_PARAM,
            },
        },
        ({ reply }) => {
            reply({
                statusCode: 200,
                delay,
                body: mockBody ?? {
                    data: allRecipes.slice(0, Number(JUICIEST_LIMIT)),
                    meta: { ...metaData, limit: Number(JUICIEST_LIMIT) },
                },
            });
        },
    );

const interceptRecipeWithSearch = (delay: number = SMALL_DELAY_MS, mockBody: unknown = null) =>
    cy.intercept(
        { method: 'GET', url: /recipe\?.*/, query: { [SEARCH_QUERY_PARAM]: /.*/ } },
        {
            delay,
            body: mockBody ?? {
                data: allRecipes,
                meta: metaData,
            },
        },
    );

const interceptRecipesByCategory = (delay: number = SMALL_DELAY_MS, mockBody: unknown = null) =>
    cy.intercept(
        { method: 'GET', url: /recipe\?.*/, query: { [SUBCATEGORIES_QUERY_PARAM]: /.*/ } },
        {
            delay,
            body: mockBody ?? { data: allRecipes.slice(0, DEFAULT_RECIPE_LIMIT), meta: metaData },
        },
    );

const interceptCategories = () => cy.intercept('GET', /category$/, { body: CATEGORIES_RESPONSE });

const interceptRelevantRecipes = (delay: number = SMALL_DELAY_MS, mockBody: unknown = null) =>
    cy.intercept(
        {
            method: 'GET',
            url: /recipe\/category\/*/,
            query: { [LIMIT_QUERY_PARAM]: RELEVANT_KITCHEN_LIMIT },
        },
        ({ reply }) => {
            reply({
                delay,
                body: mockBody ?? {
                    data: allRecipes.slice(0, Number(RELEVANT_KITCHEN_LIMIT)),
                    meta: { ...metaData, limit: Number(RELEVANT_KITCHEN_LIMIT) },
                },
                statusCode: 200,
            });
        },
    );

const interceptRecipesBySubCategory = (delay: number = SMALL_DELAY_MS, mockBody: unknown = null) =>
    cy.intercept('GET', /recipe\/category\/*/, ({ reply }) => {
        reply({
            delay,
            body: mockBody ?? MOCK_RECIPES_BY_CATEGORY,
            statusCode: 200,
        });
    });

describe('All requests wrapper', () => {
    describe('App Component', () => {
        const routerParams = {
            categoryName: 'vegan',
            subCategoryName: 'snacks',
        };
        beforeEach(() => {
            cy.stub(ReactRouter, 'useParams').callsFake(() => routerParams);
            cy.visit('http://localhost:3000');
            interceptNewestRecipes();
            interceptJuiciestRecipes();
            interceptRelevantRecipes();
            interceptRecipesBySubCategory().as('getRecipeByCategory');
        });
        it('should take a screenshot of the app', () => {
            cy.viewport(1920, 750);
            cy.getByTestId(JUICIEST_LINK_MOB).should('not.be.visible');
            cy.getByTestId(JUICIEST_LINK).click();
            cy.getByTestId(HEADER).should('contain', 'Самое сочное');
            cy.scrollTo('top');
            cy.getByTestId(VEGAN).click();
            cy.wait('@getRecipeByCategory');
            cy.getByTestId(HEADER).should('contain', 'Веганская кухня');
        });
    });

    describe('Carousel Functionality', () => {
        beforeEach(() => {
            interceptCategories().as('getCategories');
            interceptNewestRecipes().as('getNewestRecipes');
            interceptJuiciestRecipes().as('getJuiciestRecipes');
            interceptRelevantRecipes().as('getRelevant');
        });
        it('Карусель на 1920px', () => {
            cy.viewport(1920, 750);
            cy.visit('/');
            setElementPosition();
            cy.wait(['@getCategories', '@getNewestRecipes', '@getJuiciestRecipes', '@getRelevant']);
            cy.get(`[data-test-id^=${CAROUSEL_CARD}]`).should('have.length', Number(SLIDER_SIZE));
            for (let i = 0; i < 4; i++) {
                cy.getByTestId(`${CAROUSEL_CARD}-${i}`).should('be.visible');
            }
            cy.getByTestId('carousel-forward').click();
            cy.wait(LOAD_DELAY_MS);
            cy.getByTestId(`${CAROUSEL_CARD}-4`).should('be.visible');
            for (let i = 1; i <= 4; i++) {
                cy.getByTestId(`${CAROUSEL_CARD}-${i}`).should('be.visible');
            }
            cy.getByTestId('carousel-back').click();
            cy.wait(LOAD_DELAY_MS);
            cy.getByTestId(`${CAROUSEL_CARD}-0`).should('be.visible');
            cy.getByTestId('carousel-back').click();
            cy.wait(LOAD_DELAY_MS);
            cy.getByTestId(`${CAROUSEL_CARD}-9`).should('be.visible');
            cy.wait(LOAD_DELAY_MS);
            [1, 2].forEach((index) => {
                cy.getByTestId(`${CAROUSEL_CARD}-${index}`).should('be.visible');
            });
            cy.scrollTo('top');
            cy.screenshot('carousel-1920', { capture: 'viewport' });
        });
        it('Карусель на 360px', () => {
            cy.viewport(360, 600);
            cy.visit('/');
            cy.wait(['@getCategories', '@getNewestRecipes', '@getJuiciestRecipes', '@getRelevant']);
            cy.get(`[data-test-id^=${CAROUSEL_CARD}]`).should('have.length', Number(SLIDER_SIZE));
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
            interceptCategories().as('getCategories');
            interceptNewestRecipes().as('getNewestRecipes');
            interceptJuiciestRecipes().as('getJuiciestRecipes');
            interceptRelevantRecipes().as('getRelevant');
        });
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
        const routerParams = {
            categoryName: 'vegan',
            subCategoryName: 'snacks',
        };
        beforeEach(() => {
            cy.stub(ReactRouter, 'useParams').callsFake(() => routerParams);
            interceptNewestRecipes();
            interceptJuiciestRecipes();
            interceptRelevantRecipes();
        });
        it('Поиск на главной странице', () => {
            const searchWord = 'Кар';
            const recipesBySearch = allRecipes.filter((item) => item.title.includes(searchWord));
            cy.viewport(1920, 750);
            cy.visit('/');
            setElementPosition();
            interceptRecipeWithSearch(SMALL_DELAY_MS, { data: recipesBySearch, meta: metaData }).as(
                'getRecipeWithSearch',
            );
            cy.getByTestId(SEARCH_INPUT).type('Ка');
            cy.getByTestId(SEARCH_BUTTON).should('have.css', 'pointer-events', 'none');
            cy.getByTestId(SEARCH_INPUT).clear().type(searchWord);
            cy.getByTestId(SEARCH_BUTTON).should('be.visible').click();
            cy.wait('@getRecipeWithSearch');
            cy.get(`[data-test-id^=${FOOD_CARD}]`).should('have.length', recipesBySearch.length);
        });
        it('Поиск по категории', () => {
            const searchWord = 'Карт';
            const recipesBySearch = allRecipes.filter((item) => item.title.includes(searchWord));
            cy.viewport(768, 1024);
            cy.visit('/');
            setElementPosition();
            cy.getByTestId(HUMB_ICON).should('be.visible').click();
            cy.getByTestId(VEGAN).click();
            cy.wait(LOAD_DELAY_MS);
            cy.getByTestId(CLOSE_ICON).should('be.visible').click();
            cy.getByTestId(SEARCH_INPUT).type(searchWord);
            interceptRecipesByCategory(SMALL_DELAY_MS, {
                data: recipesBySearch,
                meta: metaData,
            }).as('getRecipeWithSearch');
            cy.getByTestId(SEARCH_BUTTON).should('be.visible').click();
            cy.wait('@getRecipeWithSearch');
            cy.get(`[data-test-id^=${FOOD_CARD}]`).should('have.length', 2);
            cy.screenshot(`search-category-768`, { capture: 'fullPage' });
        });
        it('Ничего не найдено', () => {
            cy.viewport(360, 800);
            cy.visit('/');
            setElementPosition();
            cy.getByTestId(SEARCH_INPUT).type('ооо');
            interceptRecipeWithSearch(SMALL_DELAY_MS, {
                data: [],
                meta: { ...metaData, totalPage: 1, page: 1 },
            }).as('getRecipeWithSearchEmpty');
            cy.getByTestId(SEARCH_BUTTON).should('be.visible').click();
            cy.wait('@getRecipeWithSearchEmpty');
            cy.screenshot(`search-not-found-360`, { capture: 'fullPage' });
        });
    });

    describe('Recipe Functionality', () => {
        beforeEach(() => {
            cy.intercept('GET');
            interceptNewestRecipes();
            interceptJuiciestRecipes();
            interceptRelevantRecipes();
        });
        it('Страница рецепта', () => {
            const juiciestRecipes = allRecipes.slice(0, Number(JUICIEST_LIMIT));
            const { _id, title } = juiciestRecipes[0];
            cy.intercept('GET', `recipe/${_id}`).as('getFirstRecipe');
            cy.visit('/');
            cy.getByTestId('card-link-0').click();
            cy.wait('@getFirstRecipe');
            cy.url().should('include', _id);
            cy.contains(title).should('exist');
            cy.scrollTo('top');
            takeScreenshots('Страница рецепта');
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

    describe('Filters Functionality', () => {
        beforeEach(() => {
            interceptCategories().as('getCategories');
            interceptNewestRecipes().as('getNewestRecipes');
            interceptJuiciestRecipes().as('getJuiciestRecipes');
            interceptRelevantRecipes().as('getRelevant');
        });
        it('Выбраны 3 фильтра, 1920px', () => {
            cy.viewport(1920, 750);
            cy.visit('/');
            setElementPosition();
            cy.wait(['@getCategories', '@getNewestRecipes', '@getJuiciestRecipes', '@getRelevant']);
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
            cy.intercept(
                {
                    method: 'GET',
                    url: /recipe/,
                    query: {
                        [SUBCATEGORIES_QUERY_PARAM]: /.*/,
                        [GARNISH_QUERY_PARAM]: /.*/,
                        [ALLERGENS_QUERY_PARAM]: /.*/,
                    },
                },
                {
                    delay: SMALL_DELAY_MS,
                    statusCode: 200,
                    body: { data: allRecipes.slice(0, 2), meta: metaData },
                },
            ).as('getFilteredRecipes');
            cy.getByTestId(FIND_RECIPE_BUTTON).click();
            cy.wait('@getFilteredRecipes');
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
            cy.intercept(
                {
                    method: 'GET',
                    url: /recipe/,
                    query: {
                        [SUBCATEGORIES_QUERY_PARAM]: /.*/,
                    },
                },
                {
                    delay: SMALL_DELAY_MS,
                    statusCode: 200,
                    body: {
                        data: [...veganSnacks, ...veganDesserts, ...veganGarnish],
                        meta: metaData,
                    },
                },
            ).as('getFilteredRecipes');
            cy.getByTestId(FIND_RECIPE_BUTTON).click();
            cy.get(`[data-test-id^=${FOOD_CARD}]`).should(
                'have.length',
                veganGarnish.length + veganDesserts.length + veganSnacks.length,
            );
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
            cy.intercept(
                {
                    method: 'GET',
                    url: /recipe/,
                    query: {
                        [SEARCH_QUERY_PARAM]: /.*/,
                    },
                },
                {
                    delay: SMALL_DELAY_MS,
                    statusCode: 200,
                    body: {
                        data: [...veganGarnish, ...veganSnacks].slice(0, 2),
                        meta: metaData,
                    },
                },
            ).as('getFilteredRecipes');
            cy.getByTestId(SEARCH_BUTTON).should('be.visible').click();
            cy.wait('@getFilteredRecipes');
            cy.get(`[data-test-id^=${FOOD_CARD}]`).should('have.length', 2);
        });
    });

    describe('Allergens Functionality', () => {
        beforeEach(() => {
            interceptNewestRecipes().as('getNewestRecipes');
            interceptJuiciestRecipes().as('getJuiciestRecipes');
            interceptRelevantRecipes().as('getRelevant');
        });
        it('Нет выбора аллергенов на 768px', () => {
            cy.viewport(768, 1080);
            cy.visit('/');
            cy.wait(['@getNewestRecipes', '@getJuiciestRecipes', '@getRelevant']);
            cy.getByTestId(ALLERGEN_SWITCHER).should('not.exist');
            cy.getByTestId(ALLERGEN_BUTTON).should('not.exist');
        });
        it('Выбор аллергенов по категории', () => {
            cy.viewport(1920, 750);
            cy.visit('/');
            setElementPosition();
            cy.wait(['@getNewestRecipes', '@getJuiciestRecipes', '@getRelevant']);

            cy.getByTestId(ALLERGEN_SWITCHER).should('not.have.attr', 'data-checked');
            cy.getByTestId(ALLERGEN_BUTTON).should('be.disabled');
            cy.getByTestId(VEGAN).click();
            cy.wait(LOAD_DELAY_MS);
            cy.getByTestId(ALLERGEN_SWITCHER).click();
            cy.getByTestId(ALLERGEN_SWITCHER).should('have.attr', 'data-checked');
            cy.getByTestId(ALLERGEN_BUTTON)
                .should('not.be.disabled')
                .contains('Выберите из списка');
            cy.getByTestId(ALLERGEN_BUTTON).click();
            cy.getByTestId('allergens-menu').should('be.visible');
            cy.getByTestId('allergen-1').click();
            cy.getByTestId('allergen-5').click();
            cy.getByTestId(ADD_OTHER_ALLERGEN).type('Гриб{enter}');

            cy.intercept(
                {
                    method: 'GET',
                    url: /recipe/,
                    query: {
                        [ALLERGENS_QUERY_PARAM]: /.*/,
                    },
                },
                {
                    delay: SMALL_DELAY_MS,
                    statusCode: 200,
                    body: {
                        data: allRecipes.slice(0, 3),
                        meta: metaData,
                    },
                },
            ).as('getFilteredRecipes');
            cy.getByTestId(SEARCH_BUTTON).should('be.visible').and('not.be.disabled').click();
            cy.wait('@getFilteredRecipes');
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
            cy.wait(['@getNewestRecipes', '@getJuiciestRecipes', '@getRelevant']);

            cy.getByTestId(VEGAN).click();
            cy.wait(LOAD_DELAY_MS);
            cy.getByTestId(ALLERGEN_SWITCHER).click();
            cy.getByTestId(ALLERGEN_BUTTON).click();
            cy.getByTestId('allergens-menu').should('be.visible');
            cy.getByTestId('allergen-1').click();
            cy.getByTestId('allergen-5').click();
            cy.getByTestId(ADD_OTHER_ALLERGEN).type('Гриб{enter}');
            cy.getByTestId(ALLERGEN_BUTTON).click();
            cy.getByTestId(SEARCH_INPUT).type('Капус');
            cy.intercept(
                {
                    method: 'GET',
                    url: /recipe/,
                    query: {
                        [ALLERGENS_QUERY_PARAM]: /.*/,
                        [SEARCH_QUERY_PARAM]: /.*/,
                    },
                },
                {
                    delay: SMALL_DELAY_MS,
                    statusCode: 200,
                    body: {
                        data: allRecipes.slice(0, 1),
                        meta: metaData,
                    },
                },
            ).as('getFilteredRecipes');
            cy.getByTestId(SEARCH_BUTTON).should('be.visible').click();

            cy.wait('@getFilteredRecipes');
            cy.get(`[data-test-id^=${FOOD_CARD}]`).should('have.length', 1);
        });
    });

    describe('Navigation and Tabs Functionality', () => {
        beforeEach(() => {
            interceptNewestRecipes().as('getNewestRecipes');
            interceptJuiciestRecipes().as('getJuiciestRecipes');
            interceptRelevantRecipes().as('getRelevant');
        });
        it('Связь навигации и табов', () => {
            cy.viewport(1920, 1080);
            cy.visit('/');
            cy.wait(['@getNewestRecipes', '@getJuiciestRecipes', '@getRelevant']);
            interceptRecipesBySubCategory(SMALL_DELAY_MS, {
                data: veganSnacks,
                meta: { page: 1, totalPages: 1, limit: 8 },
            }).as('getVegans');

            cy.getByTestId(VEGAN).click();
            cy.wait('@getVegans');
            cy.getByTestId('tab-snacks-0').should('have.attr', 'aria-selected', 'true');
            cy.url().should('include', '/vegan/snacks');
            cy.getByTestId(`${FOOD_CARD}-0`).contains(veganSnacks[0].title);

            interceptRecipesBySubCategory(SMALL_DELAY_MS, {
                data: veganGarnish,
                meta: { page: 1, totalPages: 1, limit: 8 },
            }).as('getVegansGarnish');
            cy.getByTestId('tab-second-dish-2').click();
            cy.wait('@getVegansGarnish');
            cy.getByTestId(`${FOOD_CARD}-0`).contains(veganGarnish[0].title);
            cy.getByTestId('second-dish-active').should('exist');
            cy.getByTestId('snacks-active').should('not.exist');
        });
    });

    describe('Breadcrumbs Functionality', () => {
        beforeEach(() => {
            interceptNewestRecipes().as('getNewestRecipes');
            interceptJuiciestRecipes().as('getJuiciestRecipes');
            interceptRelevantRecipes().as('getRelevant');
        });
        it('Переход по хлебным крошкам', () => {
            cy.viewport(768, 1080);
            cy.visit('/');
            cy.wait(['@getNewestRecipes', '@getJuiciestRecipes', '@getRelevant']);
            cy.intercept(
                { method: 'GET', url: /recipe\/*/ },
                {
                    delay: SMALL_DELAY_MS,
                    body: meatSnacks[1],
                },
            ).as('getRecipe');
            cy.getByTestId(`${CAROUSEL_CARD}-3`).click();
            cy.wait('@getRecipe');
            cy.url().should('include', `snacks/meat-snacks/${meatSnacks[1]._id}`);
            cy.getByTestId(HUMB_ICON).click();
            cy.getByTestId(BREADCRUMBS).contains(meatSnacks[1].title);
            cy.getByTestId(BREADCRUMBS).contains('Закуски').click();
            cy.url().should('match', /\/meat-snacks$/);
            cy.getByTestId('tab-meat-snacks-0').should('have.attr', 'aria-selected', 'true');
            cy.getByTestId(HUMB_ICON).click();
            cy.getByTestId(BREADCRUMBS).should('not.contain', meatSnacks[1].title);
            cy.getByTestId(BREADCRUMBS).contains('Главная').click();
            cy.getByTestId('carousel').should('exist');
            cy.contains('Приятного аппетита!');
        });
    });
});
