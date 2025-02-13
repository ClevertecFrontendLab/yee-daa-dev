import cakeImg from '../assets/images/chocolate-cake.webp';
import grechaImg from '../assets/images/grechka-s-ovoshchami.jpg';
import hamImg from '../assets/images/ham.png';
import kotletaImg from '../assets/images/kapustnie-kotletki.png';
import kneliImg from '../assets/images/kneli.png';
import lazaniaImg from '../assets/images/lazania-vegan.jpg';
import manImg from '../assets/images/man.png';
import noodleImg from '../assets/images/noodle.png';
import oladushkiImg from '../assets/images/oladushki.png';
import pastaImg from '../assets/images/pasta.jpg';
import potatoGarlicImg from '../assets/images/potato-garlic.jpg';
import rollsImg from '../assets/images/potato-mini-rolls.jpg';
import potatTushImg from '../assets/images/potato-tushenaya.jpg';
import soupImg from '../assets/images/pumpkin-soup.webp';
import puriImg from '../assets/images/puri.jpg';
import chikenSaladImg from '../assets/images/salat-kurica-s-ananasami.jpg';
import saladImg from '../assets/images/salat-zdorovie.png';
import soliankaImg from '../assets/images/solianka.png';
import tefteliImg from '../assets/images/tefteli-vegan.jpg';
import tomImg from '../assets/images/tom.png';
import womanImg from '../assets/images/woman.png';
import { Recipe } from '../types/recipe.ts';

export const recipes: Recipe[] = [
    {
        id: 0,
        title: 'Картошка, тушенная с болгарским перцем и фасолью в томатном соусе',
        description:
            'Сытное блюдо на каждый день. Картошка тушится с болгарским перцем и фасолью, что делает его насыщенным и ароматным.',
        category: 'Веганская кухня',
        image: potatTushImg,
        bookmarks: 85,
        likes: 152,
    },
    {
        id: 1,
        title: 'Картофельные рулетики с грибами',
        description:
            'Постное блюдо из картофеля и грибов, которое готовится без мяса и сыра. Идеально подходит для обеда или ужина.',
        category: 'Веганская кухня',
        image: rollsImg,
        bookmarks: 85,
        likes: 1152,
    },
    {
        id: 2,
        title: 'Том-ям с капустой кимчи',
        description:
            'Острый тайский суп с капустой кимчи и ароматными специями, идеально подходит для любителей острых блюд.',
        category: 'Национальные',
        image: tomImg,
        bookmarks: 124,
        likes: 324,
    },
    {
        id: 3,
        title: 'Овощная лазанья из лаваша',
        description:
            'Лазанья без мяса, приготовленная с овощным соусом и соусом бешамель, с использованием тонкого лаваша вместо листов лазаньи.',
        category: 'Веганская кухня',
        image: lazaniaImg,
        bookmarks: 85,
        likes: 152,
    },
    {
        id: 4,
        title: 'Тефтели из булгура и чечевицы, запечённые в томатном соусе',
        description:
            'Питательные тефтели, приготовленные из булгура и чечевицы, запечённые в ароматном томатном соусе.',
        category: 'Веганская кухня',
        image: tefteliImg,
        bookmarks: 85,
        likes: 152,
    },
    {
        id: 5,
        title: 'Чесночная картошка',
        description:
            'Хрустящая картошка с ароматом чеснока, идеальная для обеда или ужина. Готовится быстро и просто.',
        category: 'Веганская кухня',
        image: potatoGarlicImg,
        bookmarks: 124,
        likes: 342,
    },
    {
        id: 6,
        title: 'Пури',
        description:
            'Индийские жареные лепешки из пресного теста. Хрустящие и легкие, идеально подходят как закуска.',
        category: 'Веганская кухня',
        image: puriImg,
        bookmarks: 123,
        likes: 342,
    },
    {
        id: 7,
        title: 'Капустные котлеты',
        description:
            'Пышные и вкусные котлеты из капусты, идеально подходят для вегетарианского меню.',
        category: 'Веганская кухня',
        image: kotletaImg,
        bookmarks: 2,
        likes: 1,
    },
    {
        id: 8,
        title: 'Стейк для вегетарианцев',
        description:
            'Ароматные и сочные котлеты из капусты, которые станут вашим любимым овощным блюдом.',
        category: 'Веганская кухня',
        image: hamImg,
        bookmarks: 2,
        likes: 1,
    },
    {
        id: 9,
        title: 'Котлеты из гречки и фасоли',
        description:
            'Сытные котлеты, приготовленные из гречки и фасоли. Подходят для постного и вегетарианского меню.',
        category: 'Веганская кухня',
        image: grechaImg,
        bookmarks: 85,
        likes: 152,
    },
    {
        id: 10,
        title: 'Сырный суп с лапшой и брокколи',
        description:
            'Кремовый сырный суп с лапшой и брокколи, который согреет и насытит в холодное время года.',
        category: 'Веганская кухня',
        image: soupImg,
        bookmarks: 85,
        likes: 152,
    },
    {
        id: 11,
        title: 'Кнели со спагетти',
        description:
            'Нежные кнели, подаваемые со спагетти в ароматном соусе. Идеальный вариант для ужина.',
        category: 'Вторые блюда',
        image: kneliImg,
        bookmarks: 85,
        likes: 1152,
    },
    {
        id: 12,
        title: 'Пряная ветчина по итальянски',
        description:
            'Ветчина, приготовленная с пряностями и специями, идеально подходит для подачи с овощами.',
        category: 'Вторые блюда',
        image: hamImg,
        bookmarks: 159,
        likes: 1257,
        recommendation: {
            firstName: 'Елена',
            lastName: 'Высоцкая',
            imageUrl: womanImg,
        },
    },
    {
        id: 13,
        title: 'Лапша с курицей и шафраном',
        description: 'Ароматная лапша с курицей и шафраном, идеальное сочетание для сытного обеда.',
        category: 'Вторые блюда',
        image: noodleImg,
        bookmarks: 258,
        likes: 1342,
        recommendation: {
            firstName: 'Alex',
            lastName: 'Cook',
            imageUrl: manImg,
        },
    },
    {
        id: 14,
        title: 'Бананово-молочное желе',
        description: 'Легкое желе с бананами и молоком, идеально подходит для десерта.',
        category: 'Десерты и выпечка',
        image: kneliImg,
        bookmarks: 1,
        likes: 1,
    },
    {
        id: 15,
        title: 'Нежный сливочно-сырный крем для кексов',
        description:
            'Сливочно-сырный крем для украшения кексов, который добавляет нежности и аромата.',
        category: 'Десерты и выпечка',
        image: kneliImg,
        bookmarks: 2,
        likes: 1,
    },
    {
        id: 16,
        title: 'Домашние сырные палочки',
        description: 'Хрустящие сырные палочки, идеальные для закуски или перекуса.',
        category: 'Детские блюда',
        image: kneliImg,
        bookmarks: 2,
        likes: 1,
    },
    {
        id: 17,
        title: 'Панкейки',
        description: 'Пышные панкейки, идеальные для завтрака с ягодами и сиропом.',
        category: 'Десерты и выпечка',
        image: kneliImg,
        bookmarks: 85,
        likes: 152,
    },
    {
        id: 18,
        title: 'Воздушное банановое печенье на сковороде',
        description:
            'Банановое печенье, готовящееся на сковороде. Мягкое и ароматное, идеально подходит к чаю.',
        category: 'Десерты и выпечка',
        image: kneliImg,
        bookmarks: 85,
        likes: 152,
    },
    {
        id: 19,
        title: 'Солянка с грибами',
        description: 'Насыщенная солянка с грибами, идеально подходит для холодного времени года.',
        category: 'Первые блюда',
        image: soliankaImg,
        bookmarks: 1,
    },
    {
        id: 20,
        title: 'Салат "Здоровье"',
        description: 'Полезный салат с сельдереем, который порадует вас свежестью и вкусом.',
        category: 'Салаты',
        image: saladImg,
    },
    {
        id: 21,
        title: 'Гречка с овощами',
        description: 'Полезное и сытное блюдо из гречки и свежих овощей, идеальный гарнир.',
        category: 'Гарниры',
        image: grechaImg,
    },
    {
        id: 22,
        title: 'Шоколадный торт',
        description: 'Нежный шоколадный торт, который порадует любителей сладкого.',
        category: 'Десерты, выпечка',
        image: cakeImg,
        likes: 3,
    },
    {
        id: 23,
        title: 'Суп-пюре из тыквы',
        description: 'Ароматный суп-пюре из тыквы, который согревает в холодное время года.',
        category: 'Первые блюда',
        image: soupImg,
        bookmarks: 1,
        likes: 2,
    },
    {
        id: 24,
        title: 'Паста с томатным соусом',
        description:
            'Простая и вкусная паста с домашним томатным соусом, идеальный вариант для ужина.',
        category: 'Вторые блюда',
        image: pastaImg,
        likes: 4,
    },
    {
        id: 25,
        title: 'Куриный салат с ананасами',
        description: 'Свежий и легкий салат с курицей и ананасами, идеален для летних дней.',
        category: 'Салаты',
        image: chikenSaladImg,
        bookmarks: 3,
    },
    {
        id: 26,
        title: 'Оладьи на кефире "Пышные"',
        description:
            'Очень вкусные и нежные оладьи на кефире. Настоятельно рекомендую пышные кефирные оладьи на завтрак.',
        category: 'Десерты и выпечка',
        image: oladushkiImg,
        likes: 1,
    },
];

export const carouselRecipes = recipes.slice(21, 30);
export const favouritesRecipes = recipes
    .filter((recipe) => recipe.likes !== undefined)
    .sort((a, b) => (b?.likes ?? 0) - (a?.likes ?? 0))
    .slice(0, 4);
