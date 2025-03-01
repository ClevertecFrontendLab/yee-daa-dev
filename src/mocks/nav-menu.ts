import { MenuItem } from '~/types/category';

export const navMenu: MenuItem[] = [
    {
        title: 'Салаты',
        category: 'salads',
        description: 'Разнообразные рецепты свежих и вкусных салатов.',
        subItems: [
            {
                title: 'Мясные салаты',
                category: 'meat-salads',
                description: 'Салаты с добавлением мяса для сытного ужина.',
            },
            {
                title: 'Рыбные салаты',
                category: 'fish-salads',
                description: 'Легкие салаты с рыбой и морепродуктами.',
            },
            {
                title: 'Овощные салаты',
                category: 'vegetables-salads',
                description: 'Салаты из свежих овощей для здорового питания.',
            },
            {
                title: 'Теплые салаты',
                category: 'warm-salads',
                description: 'Салаты с теплой подачей, которые согреют вас.',
            },
        ],
    },
    {
        title: 'Закуски',
        category: 'snacks',
        description: 'Вкусные закуски для любого случая.',
        subItems: [
            {
                title: 'Мясные закуски',
                category: 'meat-snacks',
                description: 'Закуски, основанные на мясных ингредиентах.',
            },
            {
                title: 'Рыбные закуски',
                category: 'fish-snacks',
                description: 'Закуски с рыбой и морепродуктами.',
            },
            {
                title: 'Овощные закуски',
                category: 'vegetables-snacks',
                description: 'Легкие закуски из овощей.',
            },
            {
                title: 'Теплые закуски',
                category: 'warm-snacks',
                description: 'Сытные теплые закуски для компании.',
            },
            {
                title: 'Бутерброды',
                category: 'warm-sandwiches',
                description: 'Разнообразные варианты вкусных бутербродов.',
            },
            {
                title: 'Фастфуд',
                category: 'fast-food',
                description: 'Быстрые закуски на любой вкус.',
            },
        ],
    },
    {
        title: 'Первые блюда',
        category: 'first-dish',
        description: 'Сытные и ароматные первые блюда.',
        subItems: [
            {
                title: 'Мясные супы',
                category: 'meat-soups',
                description: 'Супы на мясном бульоне.',
            },
            {
                title: 'Овощные супы',
                category: 'vegetables-soups',
                description: 'Легкие и полезные овощные супы.',
            },
            {
                title: 'Бульоны',
                category: 'bouillons',
                description: 'Ароматные бульоны для здоровья.',
            },
            {
                title: 'Холодные супы',
                category: 'cold-soups',
                description: 'Освежающие холодные супы для летних дней.',
            },
            {
                title: 'Диетические супы',
                category: 'warm-soups',
                description: 'Легкие супы для диетического питания.',
            },
        ],
    },
    {
        title: 'Вторые блюда',
        category: 'second-dish',
        description: 'Разнообразие вторых блюд на любой вкус.',
        subItems: [
            {
                title: 'Мясные',
                category: 'meat',
                description: 'Сытные мясные блюда для настоящих гурманов.',
            },
            {
                title: 'Рыбные',
                category: 'fish',
                description: 'Вторые блюда с рыбой и морепродуктами.',
            },
            {
                title: 'Овощные',
                category: 'vegetables',
                description: 'Полезные и вкусные овощные блюда.',
            },
            {
                title: 'Из птицы',
                category: 'poultry-dish',
                description: 'Блюда из курицы и другой птицы.',
            },
            {
                title: 'Из грибов',
                category: 'mushroom-dish',
                description: 'Блюда с ароматными грибами.',
            },
            {
                title: 'Из субпродуктов',
                category: 'offal-dish',
                description: 'Блюда из субпродуктов для настоящих гурманов.',
            },
            {
                title: 'На пару',
                category: 'steamed-soups',
                description: 'Полезные блюда, приготовленные на пару.',
            },
            {
                title: 'Пельмени, вареники',
                category: 'dumplings',
                description: 'Традиционные пельмени и вареники.',
            },
            {
                title: 'Мучные гарниры',
                category: 'flour-side-dishes',
                description: 'Вкусные мучные гарниры к вашим блюдам.',
            },
            {
                title: 'Овощные гарниры',
                category: 'vegetable-side-dishes',
                description: 'Полезные овощные гарниры.',
            },
            {
                title: 'Пицца',
                category: 'pizza',
                description: 'Домашняя пицца на любой вкус.',
            },
            {
                title: 'Суши',
                category: 'sushi',
                description: 'Вкусные суши для любителей японской кухни.',
            },
        ],
    },
    {
        title: 'Десерты, выпечка',
        category: 'dessert',
        description:
            'Без них невозможно представить себе ни современную, ни традиционную  кулинарию. Пироги и печенья, блины, пончики, вареники и, конечно, хлеб - рецепты изделий из теста многообразны и невероятно популярны.',
        subItems: [
            {
                title: 'Блины и оладьи',
                category: 'pancakes',
                description: 'Вкусные блины и оладьи с разнообразными начинками.',
            },
            {
                title: 'Пироги и пончики',
                category: 'pies',
                description: 'Сочные пироги и сладкие пончики.',
            },
            {
                title: 'Торты',
                category: 'cakes',
                description: 'Разнообразные торты на любой праздник.',
            },
            {
                title: 'Рулеты',
                category: 'rolls',
                description: 'Вкусные рулеты с различными начинками.',
            },
            {
                title: 'Кексы и маффины',
                category: 'cupcakes',
                description: 'Сладкие кексы и маффины для чая.',
            },
            {
                title: 'Сырники и ватрушки',
                category: 'cottage-cheese-pancakes',
                description: 'Нежные сырники и ватрушки с творогом.',
            },
            {
                title: 'Из слоеного теста',
                category: 'puff-pastry',
                description: 'Сладости из слоеного теста для настоящих гурманов.',
            },
            {
                title: 'Из заварного теста',
                category: 'choux-pastry',
                description: 'Пирожные из заварного теста с разными начинками.',
            },
            {
                title: 'Из дрожжевого теста',

                category: 'yeast-dough',
                description: 'Сладости из дрожжевого теста, которые тают во рту.',
            },
            {
                title: 'Булочки и сдоба',

                category: 'bun',
                description: 'Мягкие булочки и сдоба к чаю.',
            },
            {
                title: 'Хлеб',
                category: 'bread',
                description: 'Домашний хлеб с ароматом свежести.',
            },
            {
                title: 'Тесто на пиццу',
                category: 'pizza-dough',
                description: 'Рецепты теста для идеальной пиццы.',
            },
            {
                title: 'Кремы',
                category: 'creams',
                description: 'Разнообразные кремы для ваших десертов.',
            },
        ],
    },
    {
        title: 'Блюда на гриле',

        category: 'grilled-dishes',
        description: 'Сочные блюда, приготовленные на гриле.',
        subItems: [
            {
                title: 'Говядина',

                category: 'grilled-beef',
                description: 'Вкусные блюда из говядины на гриле.',
            },
            {
                title: 'Свинина',

                category: 'grilled-pork',
                description: 'Сочные блюда из свинины с дымком.',
            },
            {
                title: 'Птица',

                category: 'grilled-poultry',
                description: 'Блюда из птицы, приготовленные на гриле.',
            },
            {
                title: 'Рыба',

                category: 'grilled-fish',
                description: 'Ароматные блюда из рыбы на гриле.',
            },
            {
                title: 'Грибы',

                category: 'grilled-mushrooms',
                description: 'Вкусные грибы, запеченные на гриле.',
            },
            {
                title: 'Овощи',

                category: 'grilled-vegetables',
                description: 'Запеченные овощи на гриле для любителей растительной еды.',
            },
        ],
    },
    {
        title: 'Веганская кухня',

        category: 'vegan',
        description:
            'Интересны не только убеждённым вегетарианцам, но и тем, кто хочет  попробовать вегетарианскую диету и готовить вкусные  вегетарианские блюда.',
        subItems: [
            {
                title: 'Закуски',

                category: 'snacks',
                description: 'Веганские закуски для перекуса.',
            },
            {
                title: 'Первые блюда',

                category: 'first-dish',
                description: 'Веганские супы и бульоны.',
            },
            {
                title: 'Вторые блюда',

                category: 'second-dish',
                description: 'Сытные веганские вторые блюда.',
            },
            {
                title: 'Гарниры',

                category: 'side-dishes',
                description: 'Разнообразные гарниры для веганских блюд.',
            },
            {
                title: 'Десерты',

                category: 'desserts',
                description: 'Сладкие веганские десерты.',
            },
            {
                title: 'Выпечка',

                category: 'bakery',
                description: 'Веганская выпечка для настоящих гурманов.',
            },
            {
                title: 'Сыроедческие блюда',

                category: 'row-food-dishes',
                description: 'Блюда для сыроедов.',
            },
            {
                title: 'Напитки',

                category: 'drinks',
                description: 'Веганские напитки для здоровья.',
            },
        ],
    },
    {
        title: 'Детские блюда',

        category: 'children-dishes',
        description: 'Вкусные и полезные блюда для детей.',
        subItems: [
            {
                title: 'Первые блюда',

                category: 'first-dish',
                description: 'Супы, которые понравятся детям.',
            },
            {
                title: 'Вторые блюда',

                category: 'second-dish',
                description: 'Вторые блюда, которые дети будут есть с удовольствием.',
            },
            {
                title: 'Гарниры',

                category: 'side-dishes',
                description: 'Полезные гарниры для рациона детей.',
            },
            {
                title: 'Выпечка',

                category: 'bakery',
                description: 'Сладости, которые порадуют детей.',
            },
            {
                title: 'Без глютена',

                category: 'gluten-dish',
                description: 'Блюда без глютена для чувствительных детей.',
            },
            {
                title: 'Без сахара',

                category: 'sugar-dish',
                description: 'Полезные блюда без добавленного сахара.',
            },
            {
                title: 'Без аллергенов',

                category: 'allergen-dishes',
                description: 'Блюда, не содержащие распространенные аллергены.',
            },
            {
                title: 'Блюда для прикорма',

                category: 'for-baby',
                description: 'Рецепты для прикорма малышей.',
            },
        ],
    },
    {
        title: 'Лечебное питание',

        category: 'healthy-food',
        description: 'Блюда для поддержания здоровья.',
        subItems: [
            {
                title: 'Детская диета',

                category: 'children-diet',
                description: 'Специальные блюда для детей с учетом их потребностей.',
            },
            {
                title: 'Диета №1',

                category: 'diet-1',
                description: 'Лечебная диета для восстановления.',
            },
            {
                title: 'Диета №2',

                category: 'diet-2',
                description: 'Диета для поддержания здоровья.',
            },
            {
                title: 'Диета №3',

                category: 'diet-3',
                description: 'Диета для улучшения обмена веществ.',
            },
            {
                title: 'Диета №4',

                category: 'diet-4',
                description: 'Лечебная диета для восстановления после заболеваний.',
            },
            {
                title: 'Диета №5',

                category: 'diet-5',
                description: 'Диета для улучшения пищеварения.',
            },
            {
                title: 'Диета №6',

                category: 'diet-6',
                description: 'Диета для сердечно-сосудистой системы.',
            },
            {
                title: 'Диета №7',

                category: 'diet-7',
                description: 'Диета для нормализации обмена веществ.',
            },
            {
                title: 'Диета №8',

                category: 'diet-8',
                description: 'Лечебная диета для профилактики заболеваний.',
            },
            {
                title: 'Диета №9',

                category: 'diet-9',
                description: 'Диета для поддержания иммунной системы.',
            },
            {
                title: 'Диета №10',

                category: 'diet-10',
                description: 'Специальная диета для диабетиков.',
            },
            {
                title: 'Диета №11',

                category: 'diet-11',
                description: 'Лечебная диета для пожилых людей.',
            },
            {
                title: 'Диета №12',

                category: 'diet-12',
                description: 'Диета для нормализации артериального давления.',
            },
            {
                title: 'Диета №13',

                category: 'diet-13',
                description: 'Специальная диета для людей с аллергиями.',
            },
            {
                title: 'Без глютена',

                category: 'gluten-free-diet',
                description: 'Диета без глютена для чувствительных людей.',
            },
            {
                title: 'Без аллергенов',

                category: 'allergen-free-diet',
                description: 'Лечебная диета без аллергенов.',
            },
        ],
    },
    {
        title: 'Национальные',

        category: 'national',
        description: 'Блюда разных национальных кухонь мира.',
        subItems: [
            {
                title: 'Американская кухня',

                category: 'american',
                description: 'Популярные блюда американской кухни.',
            },
            {
                title: 'Армянская кухня',

                category: 'armenians',
                description: 'Традиционные армянские блюда.',
            },
            {
                title: 'Греческая кухня',

                category: 'greek',
                description: 'Аутентичные греческие блюда.',
            },
            {
                title: 'Грузинская кухня',

                category: 'georgian',
                description: 'Вкусные грузинские блюда с уникальными специями.',
            },
            {
                title: 'Итальянская кухня',

                category: 'italian',
                description: 'Итальянские блюда, полные свежих ингредиентов.',
            },
            {
                title: 'Испанская кухня',

                category: 'spanish',
                description: 'Ароматные и насыщенные испанские блюда.',
            },
            {
                title: 'Китайская кухня',

                category: 'chinese',
                description: 'Восточные блюда с экзотическими вкусами.',
            },
            {
                title: 'Мексиканская кухня',

                category: 'mexican',
                description: 'Острые и ароматные мексиканские блюда.',
            },
            {
                title: 'Паназиатская кухня',

                category: 'pan-asian',
                description: 'Разнообразные блюда восточной кухни.',
            },
            {
                title: 'Русская кухня',

                category: 'russian',
                description: 'Традиционные русские блюда для всей семьи.',
            },
            {
                title: 'Турецкая кухня',

                category: 'turkish',
                description: 'Ароматные и насыщенные турецкие блюда.',
            },
            {
                title: 'Французская кухня',

                category: 'french',
                description: 'Элегантные и изысканные блюда французской кухни.',
            },
            {
                title: 'Шведская кухня',

                category: 'swedish',
                description: 'Традиционные шведские блюда.',
            },
            {
                title: 'Японская кухня',

                category: 'japanese',
                description: 'Популярные японские блюда с рисом и рыбой.',
            },
            {
                title: 'Другая кухня',

                category: 'different',
                description: 'Блюда из других кухонь мира.',
            },
        ],
    },
    {
        title: 'Соусы',

        category: 'souses',
        description: 'Разнообразие соусов для различных блюд.',
        subItems: [
            {
                title: 'Соусы мясные',

                category: 'meat-souses',
                description: 'Соусы на основе мяса для насыщенного вкуса.',
            },
            {
                title: 'Соусы сырные',

                category: 'cheese-souses',
                description: 'Кремовые соусы с добавлением сыра.',
            },
            {
                title: 'Маринады',

                category: 'marinades',
                description: 'Ароматные маринады для мяса и овощей.',
            },
        ],
    },
    {
        title: 'Напитки',

        category: 'drinks',
        description: 'Разнообразие напитков на любой вкус.',
        subItems: [
            {
                title: 'Соки и фреши',

                category: 'juices',
                description: 'Свежевыжатые соки и фреши.',
            },
            {
                title: 'Смузи',

                category: 'smoothie',
                description: 'Полезные смузи с фруктами и овощами.',
            },
            {
                title: 'Компоты',

                category: 'compotes',
                description: 'Сладкие компоты из фруктов.',
            },
            {
                title: 'Кисели',

                category: 'jelly',
                description: 'Ароматные кисели на основе фруктов.',
            },
            {
                title: 'Кофе',

                category: 'coffee',
                description: 'Разнообразные рецепты кофе.',
            },
            {
                title: 'Лечебный чай',

                category: 'health-tea',
                description: 'Чаи с полезными свойствами.',
            },
            {
                title: 'Квас',

                category: 'kvass',
                description: 'Освежающий квас на основе хлеба.',
            },
            {
                title: 'Коктейли',

                category: 'cocktails',
                description: 'Разнообразные коктейли для праздников.',
            },
            {
                title: 'Алкогольные',

                category: 'alcohol',
                description: 'Алкогольные напитки для взрослых.',
            },
        ],
    },
    {
        title: 'Заготовки',

        category: 'zagotovki',
        description: 'Рецепты для домашних заготовок на зиму.',
        subItems: [
            {
                title: 'Мясные заготовки',

                category: 'meat-zagotovki',
                description: 'Заготовки из мяса для хранения.',
            },
            {
                title: 'Рыбные заготовки',

                category: 'fish-zagotovki',
                description: 'Консервация рыбы на зиму.',
            },
            {
                title: 'Из огурцов',

                category: 'cucumber-zagotovki',
                description: 'Рецепты заготовок из огурцов.',
            },
            {
                title: 'Из томатов',

                category: 'tomato-zagotovki',
                description: 'Консервация томатов на зиму.',
            },
            {
                title: 'Из грибов',

                category: 'mushroom-zagotovki',
                description: 'Заготовки из грибов для хранения.',
            },
            {
                title: 'Овощные заготовки',

                category: 'vegetables-zagotovki',
                description: 'Разнообразные овощные заготовки.',
            },
            {
                title: 'Салаты, икра',

                category: 'salads-zagotovki',
                description: 'Консервация салатов и икры.',
            },
            {
                title: 'Из фруктов и ягод',

                category: 'fruit-zagotovki',
                description: 'Заготовки из фруктов и ягод на зиму.',
            },
        ],
    },
];
