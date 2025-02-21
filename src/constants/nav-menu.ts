export type MenuItem = {
    title: string;
    path: string;
    dataTestId?: string;
    subItems?: MenuItem[];
};

export const navMenu: MenuItem[] = [
    {
        title: 'Салаты',
        path: 'salads',
        subItems: [
            {
                title: 'Мясные салаты',
                path: 'salads/meat-salads',
            },
            {
                title: 'Рыбные салаты',
                path: 'salads/fish-salads',
            },
            {
                title: 'Овощные салаты',
                path: 'salads/vegetables-salads',
            },
            {
                title: 'Теплые салаты',
                path: 'salads/warm-salads',
            },
        ],
    },
    {
        title: 'Закуски',
        path: '/snacks',
        subItems: [
            {
                title: 'Мясные закуски',
                path: '/snacks/meat-snacks',
            },
            {
                title: 'Рыбные закуски',
                path: '/snacks/fish-snacks',
            },
            {
                title: 'Овощные закуски',
                path: '/snacks/vegetables-snacks',
            },
            {
                title: 'Теплые закуски',
                path: '/snacks/warm-snacks',
            },
            {
                title: 'Бутерброды',
                path: '/snacks/warm-sandwiches',
            },
            {
                title: 'Фастфуд',
                path: '/snacks/fast-food',
            },
        ],
    },
    {
        title: 'Первые блюда',
        path: '/first-dish',
        subItems: [
            {
                title: 'Мясные супы',
                path: '/first-dish/meat-soups',
            },
            {
                title: 'Овощные супы',
                path: '/first-dish/vegetables-soups',
            },
            {
                title: 'Бульоны',
                path: '/first-dish/bouillons',
            },
            {
                title: 'Холодные супы',
                path: '/first-dish/cold-soups',
            },
            {
                title: 'Диетические супы',
                path: '/first-dish/warm-soups',
            },
        ],
    },
    {
        title: 'Вторые блюда',
        path: '/second-dish',
        subItems: [
            {
                title: 'Мясные',
                path: '/second-dish/meat',
            },
            {
                title: 'Рыбные',
                path: '/second-dish/fish',
            },
            {
                title: 'Овощные',
                path: '/second-dish/vegetables',
            },
            {
                title: 'Из птицы',
                path: '/second-dish/poultry-dish',
            },
            {
                title: 'Из грибов',
                path: '/second-dish/mushroom-dish',
            },
            {
                title: 'Из субпродуктов',
                path: '/second-dish/offal-dish',
            },
            {
                title: 'На пару',
                path: '/second-dish/steamed-soups',
            },
            {
                title: 'Пельмени, вареники',
                path: '/second-dish/dumplings',
            },
            {
                title: 'Мучные гарниры',
                path: '/second-dish/flour-side-dishes',
            },
            {
                title: 'Овощные гарниры',
                path: '/second-dish/vegetable-side-dishes',
            },
            {
                title: 'Пицца',
                path: '/second-dish/pizza',
            },
            {
                title: 'Суши',
                path: '/second-dish/sushi',
            },
        ],
    },
    {
        title: 'Десерты и выпечка',
        path: '/dessert',
        subItems: [
            {
                title: 'Блины и оладьи',
                path: '/dessert/pancakes',
            },
            {
                title: 'Пироги и пончики',
                path: '/dessert/pies',
            },
            {
                title: 'Торты',
                path: '/dessert/cakes',
            },
            {
                title: 'Рулеты',
                path: '/dessert/rolls',
            },
            {
                title: 'Кексы и маффины',
                path: '/dessert/cupcakes',
            },
            {
                title: 'Кексы и маффины',
                path: '/dessert/cupcakes',
            },
            {
                title: 'Сырники и ватрушки',
                path: '/dessert/cottage-cheese-pancakes',
            },
            {
                title: 'Из слоеного теста',
                path: '/dessert/puff-pastry',
            },
            {
                title: 'Из заварного теста',
                path: '/dessert/choux-pastry',
            },
            {
                title: 'Из дрожжевого теста',
                path: '/dessert/yeast-dough',
            },
            {
                title: 'Булочки и сдоба',
                path: '/dessert/bun',
            },
            {
                title: 'Хлеб',
                path: '/dessert/bread',
            },
            {
                title: 'Тесто на пиццу',
                path: '/dessert/pizza-dough',
            },
            {
                title: 'Кремы',
                path: '/dessert/creams',
            },
        ],
    },
    {
        title: 'Блюда на гриле',
        path: '/grilled-dishes',
        subItems: [
            {
                title: 'Говядина',
                path: '/grilled-dishes/grilled-beef',
            },
            {
                title: 'Свинина',
                path: '/grilled-dishes/grilled-pork',
            },
            {
                title: 'Птица',
                path: '/grilled-dishes/grilled-poultry',
            },
            {
                title: 'Рыба',
                path: '/grilled-dishes/grilled-fish',
            },
            {
                title: 'Грибы',
                path: '/grilled-dishes/grilled-mushrooms',
            },
            {
                title: 'Овощи',
                path: '/grilled-dishes/grilled-vegetables',
            },
        ],
    },
    {
        title: 'Веганская кухня',
        path: 'vegan',
        dataTestId: 'vegan-cuisine',
        subItems: [
            {
                title: 'Закуски',
                path: 'vegan/snacks',
            },
            {
                title: 'Первые блюда',
                path: 'vegan/first-dish',
            },
            {
                title: 'Вторые блюда',
                path: 'vegan/second-dish',
            },
            {
                title: 'Гарниры',
                path: 'vegan/side-dishes',
            },
            {
                title: 'Десерты',
                path: 'vegan/desserts',
            },
            {
                title: 'Выпечка',
                path: 'vegan/bakery',
            },
            {
                title: 'Сыроедческие блюда',
                path: 'vegan/row-food-dishes',
            },
            {
                title: 'Напитки',
                path: 'vegan/drinks',
            },
        ],
    },
    {
        title: 'Детские блюда',
        path: '/children-dishes',
        subItems: [
            {
                title: 'Первые блюда',
                path: '/children-dishes/first-dish',
            },
            {
                title: 'Вторые блюда',
                path: '/children-dishes/second-dish',
            },
            {
                title: 'Гарниры',
                path: '/children-dishes/side-dishes',
            },
            {
                title: 'Выпечка',
                path: '/children-dishes/bakery',
            },
            {
                title: 'Без глютена',
                path: '/children-dishes/gluten-dish',
            },
            {
                title: 'Без сахара',
                path: '/children-dishes/sugar-dish',
            },
            {
                title: 'Без аллергенов',
                path: '/children-dishes/allergen-dishes',
            },
            {
                title: 'Блюда для прикорма',
                path: '/children-dishes/for-baby',
            },
        ],
    },
    {
        title: 'Лечебное питание',
        path: '/healthy-food',
        subItems: [
            {
                title: 'Детская диета',
                path: '/healthy-food/children-diet',
            },
            {
                title: 'Диета №1',
                path: '/healthy-food/diet-1',
            },
            {
                title: 'Диета №2',
                path: '/healthy-food/diet-2',
            },
            {
                title: 'Диета №3',
                path: '/healthy-food/diet-3',
            },
            {
                title: 'Диета №4',
                path: '/healthy-food/diet-4',
            },
            {
                title: 'Диета №5',
                path: '/healthy-food/diet-5',
            },
            {
                title: 'Диета №6',
                path: '/healthy-food/diet-6',
            },
            {
                title: 'Диета №7',
                path: '/healthy-food/diet-7',
            },
            {
                title: 'Диета №8',
                path: '/healthy-food/diet-8',
            },
            {
                title: 'Диета №9',
                path: '/healthy-food/diet-9',
            },
            {
                title: 'Диета №10',
                path: '/healthy-food/diet-10',
            },
            {
                title: 'Диета №11',
                path: '/healthy-food/diet-11',
            },
            {
                title: 'Диета №12',
                path: '/healthy-food/diet-12',
            },
            {
                title: 'Диета №13',
                path: '/healthy-food/diet-13',
            },
            {
                title: 'Без глютена',
                path: '/healthy-food/gluten-free-diet',
            },
            {
                title: 'Без аллергенов',
                path: '/healthy-food/allergen-free-diet',
            },
        ],
    },
    {
        title: 'Национальные',
        path: '/national',
        subItems: [
            {
                title: 'Американская кухня',
                path: '/national/american',
            },
            {
                title: 'Армянская кухня',
                path: '/national/armenians',
            },
            {
                title: 'Греческая кухня',
                path: '/national/greek',
            },
            {
                title: 'Грузинская кухня',
                path: '/national/georgian',
            },
            {
                title: 'Итальянская кухня',
                path: '/national/italian',
            },
            {
                title: 'Испанская кухня',
                path: '/national/spanish',
            },
            {
                title: 'Китайская кухня',
                path: '/national/chinese',
            },
            {
                title: 'Мексиканская кухня',
                path: '/national/mexican',
            },
            {
                title: 'Паназиатская кухня',
                path: '/national/pan-asian',
            },
            {
                title: 'Русская кухня',
                path: '/national/russian',
            },
            {
                title: 'Турецкая кухня',
                path: '/national/turkish',
            },
            {
                title: 'Французская кухня',
                path: '/national/french',
            },
            {
                title: 'Шведская кухня',
                path: '/national/swedish',
            },
            {
                title: 'Японская кухня',
                path: '/national/japanese',
            },
            {
                title: 'Другая кухня',
                path: '/national/different',
            },
        ],
    },
    {
        title: 'Соусы',
        path: '/souses',
        subItems: [
            {
                title: 'Соусы мясные',
                path: '/souses/meat-souses',
            },
            {
                title: 'Соусы сырные',
                path: '/souses/cheese-souses',
            },
            {
                title: 'Маринады',
                path: '/souses/marinades',
            },
        ],
    },
    {
        title: 'Домашние заготовки',
        path: '/zagotovki',
        subItems: [
            {
                title: 'Мясные заготовки',
                path: '/zagotovki/meat-zagotovki',
            },
            {
                title: 'Рыбные заготовки',
                path: '/zagotovki/fish-zagotovki',
            },
            {
                title: 'Из огурцов',
                path: '/zagotovki/cucumber-zagotovki',
            },
            {
                title: 'Из томатов',
                path: '/zagotovki/tomato-zagotovki',
            },
            {
                title: 'Из грибов',
                path: '/zagotovki/mushroom-zagotovki',
            },
            {
                title: 'Овощные заготовки',
                path: '/zagotovki/vegetables-zagotovki',
            },
            {
                title: 'Салаты, икра',
                path: '/zagotovki/salads-zagotovki',
            },
            {
                title: 'Из фруктов и ягод',
                path: '/zagotovki/fruit-zagotovki',
            },
        ],
    },
    {
        title: 'Напитки',
        path: '/drinks',
        subItems: [
            {
                title: 'Соки и фреши',
                path: '/drinks/juices',
            },
            {
                title: 'Смузи',
                path: '/drinks/smoothie',
            },
            {
                title: 'Компоты',
                path: '/drinks/compotes',
            },
            {
                title: 'Кисели',
                path: '/drinks/jelly',
            },
            {
                title: 'Кофе',
                path: '/drinks/coffee',
            },
            {
                title: 'Лечебный чай',
                path: '/drinks/health-tea',
            },
            {
                title: 'Квас',
                path: '/drinks/kvass',
            },
            {
                title: 'Коктейли',
                path: '/drinks/cocktails',
            },
            {
                title: 'Алкогольные',
                path: '/drinks/alcohol',
            },
        ],
    },
];
