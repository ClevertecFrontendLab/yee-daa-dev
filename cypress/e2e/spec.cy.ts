/// <reference types="cypress" />

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
const ERROR_PAGE_GO_HOME = 'error-page-go-home';
const APP_LOADER = 'app-loader';
const LOADER_SEARCH_BLOCK = 'loader-search-block';
const ERROR_NOTIFICATION = 'error-notification';
const CLOSE_ALERT_BUTTON = 'close-alert-button';
const LOAD_MORE_BUTTON = 'load-more-button';
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
const LONG_DELAY_MS = 1000;
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
const interceptJuiciestPage = (page: number = 1, mockData = juiciestData) =>
    cy.intercept(
        {
            method: 'GET',
            url: /recipe\?.*/,
            query: {
                [SORT_QUERY_PARAM]: LIKES_SORT_PARAM,
                [LIMIT_QUERY_PARAM]: String(DEFAULT_RECIPE_LIMIT),
                page: String(page),
            },
        },
        {
            delay: SMALL_DELAY_MS,
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
                    data: allRecipes
                        .slice(0, Number(SLIDER_SIZE))
                        .sort(
                            (a, b) =>
                                new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
                        ),
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

describe('Test cases for YeeDaa application', () => {
    describe('рендер App компоненты', () => {
        beforeEach(() => {
            interceptCategories();
            interceptNewestRecipes();
            interceptJuiciestRecipes();
            interceptRelevantRecipes();
            interceptRecipesBySubCategory().as('getRecipeByCategory');
            cy.visit('http://localhost:3000');
        });
        it('Take a screenshot of the app components', () => {
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
    describe('Carousel functionality', () => {
        beforeEach(() => {
            interceptCategories().as('getCategories');
            interceptNewestRecipes().as('getNewestRecipes');
            interceptJuiciestRecipes().as('getJuiciestRecipes');
            interceptRelevantRecipes().as('getRelevant');
        });
        it('Carousel on screen 1920px', () => {
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
                cy.getByTestId(`${CAROUSEL_CARD}-${i}`).scrollIntoView().should('be.visible');
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
        it('Carousel on screen 360px', () => {
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
        it('Burger does not exist on 1440px', () => {
            cy.viewport(1440, 1024);
            cy.visit('/');
            cy.wait(['@getCategories', '@getNewestRecipes', '@getJuiciestRecipes', '@getRelevant']);

            cy.getByTestId(HUMB_ICON).should('not.be.visible');
            cy.getByTestId(NAV).should('exist');
        });
        it('Burger menu on screen 768px', () => {
            cy.viewport(768, 1024);
            cy.visit('/');
            cy.wait(['@getNewestRecipes', '@getJuiciestRecipes', '@getRelevant', '@getCategories']);
            interceptJuiciestPage().as('juiciestPageRecipes');

            cy.getByTestId(JUICIEST_LINK).should('not.be.visible');
            cy.getByTestId(JUICIEST_LINK_MOB).should('exist').and('be.visible').click();
            cy.wait('@juiciestPageRecipes');

            setElementPosition();
            cy.getByTestId(NAV).should('not.exist');
            cy.getByTestId(CLOSE_ICON).should('not.exist');
            cy.getByTestId(HUMB_ICON).should('exist').click();
            cy.getByTestId(HUMB_ICON).should('not.exist');
            cy.getByTestId(CLOSE_ICON).should('exist');
            cy.getByTestId(NAV).should('be.visible');
            interceptRecipesBySubCategory().as('getRecipe');
            cy.getByTestId(VEGAN).click();
            cy.getByTestId(CLOSE_ICON).scrollIntoView();
            cy.getByTestId(BREADCRUMBS).should('contain.text', 'Закуски');
            cy.screenshot('open-hamburger-768', { capture: 'fullPage' });
            cy.get('body').click(100, 200);
            cy.getByTestId(NAV).should('not.exist');
        });
        it('Burger menu on screen 360px', () => {
            cy.viewport(360, 800);
            cy.visit('/');
            cy.wait(['@getCategories', '@getNewestRecipes', '@getJuiciestRecipes', '@getRelevant']);

            interceptJuiciestPage().as('juiciestPageRecipes');

            cy.getByTestId(JUICIEST_LINK_MOB).should('exist').click();
            cy.wait('@juiciestPageRecipes');

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
            interceptCategories();
            interceptNewestRecipes();
            interceptJuiciestRecipes();
            interceptRelevantRecipes();
        });
        it('Home page search', () => {
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
        it('Search flow on category page', () => {
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
        it('Not found recipes', () => {
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
        it('Check loader during search process. Screen 1440px', () => {
            const searchWord = 'Сала';
            const recipesBySearch = allRecipes.filter((item) => item.title.includes(searchWord));
            cy.viewport(1440, 1024);
            cy.visit('/');
            setElementPosition();
            cy.getByTestId(SEARCH_INPUT).type(searchWord);
            interceptRecipesByCategory(LONG_DELAY_MS, {
                data: recipesBySearch,
                meta: metaData,
            }).as('getRecipeWithSearch');
            cy.contains('Приятного аппетита').as('titleSearch').should('exist');
            cy.getByTestId(SEARCH_BUTTON).should('be.visible').click();
            cy.getByTestId(LOADER_SEARCH_BLOCK).should('exist').and('be.visible');
            cy.contains('Приятного аппетита').as('titleSearch').should('exist');
            cy.scrollTo(0, 0);
            cy.screenshot(`search-loader-1440`, { capture: 'fullPage' });
            cy.wait('@getRecipeWithSearch');
            cy.get(`[data-test-id^=${FOOD_CARD}]`).should('have.length', recipesBySearch.length);
        });
    });
    describe('Recipe Functionality', () => {
        beforeEach(() => {
            interceptCategories();
            interceptNewestRecipes();
            interceptJuiciestRecipes();
            interceptRelevantRecipes();
        });
        it('Recipe page render', () => {
            const juiciestRecipes = allRecipes.slice(0, Number(JUICIEST_LIMIT));
            const { _id, title } = juiciestRecipes[0];
            cy.intercept('GET', `recipe/${_id}`, {
                delay: SMALL_DELAY_MS,
                statusCode: 200,
                body: juiciestRecipes[0],
            }).as('getFirstRecipe');

            cy.visit('/');
            cy.getByTestId('card-link-0').click();
            cy.wait('@getFirstRecipe');
            cy.url().should('include', _id);
            cy.contains(title).should('exist');
            cy.scrollTo('top');
            takeScreenshots('Страница рецепта');
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
    describe('Filters Functionality', () => {
        beforeEach(() => {
            interceptCategories().as('getCategories');
            interceptNewestRecipes().as('getNewestRecipes');
            interceptJuiciestRecipes().as('getJuiciestRecipes');
            interceptRelevantRecipes().as('getRelevant');
        });
        it('Select 3 filters on screen 1920px', () => {
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
        it('Set and clear filters on screen 768px', () => {
            cy.viewport(768, 1120);
            cy.visit('/');
            setElementPosition();
            cy.getByTestId(FILTER_DRAWER).should('not.exist');
            cy.getByTestId(FILTER_BUTTON).should('be.visible').click();
            cy.get('body').click(100, 200);
            cy.getByTestId(FILTER_DRAWER).should('not.exist');
            cy.getByTestId(FILTER_BUTTON).should('be.visible').click();
            cy.getByTestId(FILTER_DRAWER).should('exist').contains('Фильтр');
            interceptRecipesByCategory();
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
        it('Close filter and search filtered cards on screen 360px', () => {
            cy.viewport(360, 800);
            cy.visit('/');
            setElementPosition();
            interceptRecipesByCategory();
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
            interceptCategories();
            interceptNewestRecipes().as('getNewestRecipes');
            interceptJuiciestRecipes().as('getJuiciestRecipes');
            interceptRelevantRecipes().as('getRelevant');
        });
        it('Without allergens on 768px', () => {
            cy.viewport(768, 1080);
            cy.visit('/');
            cy.wait(['@getNewestRecipes', '@getJuiciestRecipes', '@getRelevant']);
            cy.getByTestId(ALLERGEN_SWITCHER).should('not.exist');
            cy.getByTestId(ALLERGEN_BUTTON).should('not.exist');
        });
        it('Select allergens by category', () => {
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
        it('Seacrch after allergens filter', () => {
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
            interceptRecipesByCategory();
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
            interceptCategories().as('getCategories');
            interceptNewestRecipes().as('getNewestRecipes');
            interceptJuiciestRecipes().as('getJuiciestRecipes');
            interceptRelevantRecipes().as('getRelevant');
        });
        it('Check navigation and tabs', () => {
            cy.viewport(1920, 1080);
            cy.visit('/');
            cy.wait(['@getCategories', '@getNewestRecipes', '@getJuiciestRecipes', '@getRelevant']);
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
            cy.getByTestId('tab-side-dishes-1').click();
            cy.wait('@getVegansGarnish');
            cy.getByTestId(`${FOOD_CARD}-0`).contains(veganGarnish[0].title);
            cy.getByTestId('side-dishes-active').should('exist');
            cy.getByTestId('snacks-active').should('not.exist');
        });
    });
    describe('Breadcrumbs Functionality', () => {
        beforeEach(() => {
            interceptCategories().as('getCategories');
            interceptNewestRecipes().as('getNewestRecipes');
            interceptJuiciestRecipes().as('getJuiciestRecipes');
            interceptRelevantRecipes().as('getRelevant');
        });
        it('Transfer on breadcrumbs', () => {
            cy.viewport(768, 1080);
            cy.visit('/');
            cy.wait(['@getCategories', '@getNewestRecipes', '@getJuiciestRecipes', '@getRelevant']);
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
    describe('Error page functionality', () => {
        beforeEach(() => {
            interceptCategories().as('getCategories');
            interceptNewestRecipes().as('getNewestRecipes');
            interceptJuiciestRecipes().as('getJuiciestRecipes');
            interceptRelevantRecipes().as('getRelevant');
        });
        it('Render error page via redirect if category and subcategory is not exist. Screen 1920px width.', () => {
            cy.viewport(1920, 750);
            cy.visit('some-path/not-exist');
            cy.url().should('contain', 'not-found');
            cy.getByTestId(ERROR_PAGE_GO_HOME).should('exist');
            cy.get('h1').contains('Такой страницы нет').should('exist').and('be.visible');
            cy.contains('Можете поискать другой').should('exist');
        });
        it('Go back to home page. Screen 360px.', () => {
            cy.viewport(360, 800);
            cy.visit('some-path/not-exist');
            cy.url().should('contain', 'not-found');
            cy.screenshot('error-page-360', { capture: 'fullPage' });
            cy.getByTestId(ERROR_PAGE_GO_HOME).should('exist').click();
            cy.url().should('not.contain', 'not-found');
            cy.url().should('contain', '/');
        });
    });

    describe('Check apploader and error notification', () => {
        beforeEach(() => {
            interceptCategories().as('getCategories');
            interceptNewestRecipes().as('getNewestRecipes');
            interceptJuiciestRecipes().as('getJuiciestRecipes');
        });
        context('apploader flow', () => {
            beforeEach(() => interceptRelevantRecipes().as('getRelevant'));
            it('Apploader should exist when app is loading screnn 1920px', () => {
                cy.viewport(1920, 750);
                cy.visit('/');
                cy.getByTestId(APP_LOADER).should('exist').and('be.visible');
                cy.screenshot('app-loader-1920', { capture: 'fullPage' });
                cy.wait([
                    '@getCategories',
                    '@getNewestRecipes',
                    '@getJuiciestRecipes',
                    '@getRelevant',
                ]);
                cy.getByTestId(APP_LOADER).should('not.exist');
            });
            it('Apploader should exist when app is loading screnn 360px', () => {
                cy.viewport(360, 800);
                cy.visit('/');
                cy.getByTestId(APP_LOADER).should('exist').and('be.visible');
                cy.screenshot('app-loader-360', { capture: 'fullPage' });
                cy.wait([
                    '@getCategories',
                    '@getNewestRecipes',
                    '@getJuiciestRecipes',
                    '@getRelevant',
                ]);
                cy.getByTestId(APP_LOADER).should('not.exist');
            });
        });
        context('Error notification', () => {
            beforeEach(() => {
                cy.intercept(
                    {
                        method: 'GET',
                        url: /recipe\/category\/.*/,
                        query: { [LIMIT_QUERY_PARAM]: RELEVANT_KITCHEN_LIMIT },
                    },
                    { body: {}, delay: SMALL_DELAY_MS, statusCode: 404 },
                ).as('getRelevant');
            });
            it('Error notification should be visible when the request error occured screen 768px', () => {
                cy.viewport(768, 1080);
                cy.visit('/');
                cy.wait(['@getCategories', '@getNewestRecipes', '@getJuiciestRecipes']);
                cy.screenshot('error-notification-768', { capture: 'fullPage' });
                cy.getByTestId(ERROR_NOTIFICATION).should('exist').and('be.visible');
                cy.contains('Ошибка сервера').should('exist').and('be.visible');
                cy.contains('Попробуйте поискать снова попозже').and('be.visible');
                cy.getByTestId(CLOSE_ALERT_BUTTON).should('exist').and('not.be.disabled');
            });
            it('Error notification should be visible when the request error occured and screen 360px. Close alert', () => {
                cy.viewport(360, 800);
                cy.visit('/');
                cy.wait(['@getCategories', '@getNewestRecipes', '@getJuiciestRecipes']);
                cy.screenshot('error-notification-360', { capture: 'fullPage' });
                cy.getByTestId(ERROR_NOTIFICATION).should('exist').and('be.visible');
                cy.getByTestId(CLOSE_ALERT_BUTTON).should('exist').and('not.be.disabled').click();
                cy.screenshot('error-notification-360-not-visible', { capture: 'fullPage' });
                cy.getByTestId(ERROR_NOTIFICATION).should('not.exist');
            });
        });
    });

    describe('Juiciest page', () => {
        beforeEach(() => {
            interceptCategories().as('getCategories');
            interceptNewestRecipes().as('getNewestRecipes');
            interceptJuiciestRecipes().as('getJuiciestRecipes');
            interceptRelevantRecipes().as('getRelevant');
        });
        it('Go to juiciest page. Render elements. Screen 1920px', () => {
            cy.viewport(1920, 750);
            cy.visit('/');
            cy.wait(['@getCategories', '@getNewestRecipes', '@getJuiciestRecipes']);
            cy.contains('Приятного аппетита').as('homeHeding').should('exist');
            cy.contains('Самое сочное').should('exist').and('be.visible');
            interceptJuiciestPage().as('juiciestPageRecipes');
            cy.getByTestId(JUICIEST_LINK).should('exist').click();
            cy.getByTestId(APP_LOADER).should('exist');
            cy.wait('@juiciestPageRecipes');
            cy.getByTestId(APP_LOADER).should('not.exist');
            cy.screenshot('juiciest-page-1920', { capture: 'fullPage' });
            cy.get('@homeHeding').should('not.exist');
            cy.contains('Самое сочное').should('exist').and('be.visible');
            cy.get(`[data-test-id^=${FOOD_CARD}]`).should('have.length', DEFAULT_RECIPE_LIMIT);
            cy.getByTestId(LOAD_MORE_BUTTON)
                .scrollIntoView()
                .should('exist')
                .and('not.be.disabled');
        });
        it('Check load more button functionality. Screen 768px and 360px.', () => {
            cy.viewport(768, 1024);
            cy.visit('/');
            cy.wait(['@getCategories', '@getNewestRecipes', '@getJuiciestRecipes']);
            cy.contains('Самое сочное').should('exist').and('be.visible');
            interceptJuiciestPage().as('juiciestRecipesPage1');
            cy.getByTestId(JUICIEST_LINK_MOB).should('exist').click();
            cy.wait('@juiciestRecipesPage1');
            cy.get(`[data-test-id^=${FOOD_CARD}]`).should('have.length', DEFAULT_RECIPE_LIMIT);
            cy.screenshot('juiciest-page-768', { capture: 'fullPage' });
            interceptJuiciestPage(2).as('juiciestRecipesPage2');
            cy.getByTestId(LOAD_MORE_BUTTON).scrollIntoView().should('not.be.disabled').click();
            cy.getByTestId(LOAD_MORE_BUTTON).should('include.text', 'Загрузка');
            cy.screenshot('juiciest-page-768-loading', { capture: 'fullPage' });
            cy.wait('@juiciestRecipesPage2');
            cy.get(`[data-test-id^=${FOOD_CARD}]`).should('have.length', DEFAULT_RECIPE_LIMIT * 2);
            cy.viewport(360, 600);
            interceptJuiciestPage(3).as('juiciestRecipesPage3');
            cy.getByTestId(LOAD_MORE_BUTTON).scrollIntoView().should('not.be.disabled').click();
            cy.wait('@juiciestRecipesPage3');
            cy.get(`[data-test-id^=${FOOD_CARD}]`).should('have.length', DEFAULT_RECIPE_LIMIT * 3);
            cy.getByTestId(LOAD_MORE_BUTTON).should('not.exist');
        });
    });
});
