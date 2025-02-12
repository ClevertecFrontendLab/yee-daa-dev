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
            'Картошка, тушенная с болгарским перцем, фасолью, морковью и луком, -  вариант сытного блюда на каждый день. Фасоль в данном случае заменяет  мясо, делая рагу сытным и питательным. Чтобы сократить время  приготовления, возьмём консервированную фасоль. Блюдо хоть и простое, но в полной мере наполнено ароматами и имеет выразительный вкус за счёт  добавления томатной пасты.',
        category: 'Веганская кухня',
        image: potatTushImg,
        bookmarks: 85,
        likes: 152,
    },
    {
        id: 1,
        title: 'Картофельные рулетики с грибами',
        description:
            'Рекомендую всем приготовить постное блюдо из картофеля и грибов.  Готовится это блюдо без яиц, без мяса и без сыра, из самых простых  ингредиентов, а получается очень вкусно и сытно. Постный рецепт  картофельных рулетиков с грибами, в томатном соусе, - на обед, ужин и  даже на праздничный стол!',
        category: 'Веганская кухня',
        image: rollsImg,
        bookmarks: 85,
        likes: 152,
    },
    {
        id: 2,
        title: 'Том-ям с капустой кимчи',
        description:
            'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
        category: 'Национальные',
        image: tomImg,
        bookmarks: 124,
        likes: 324,
    },
    {
        id: 3,
        title: 'Овощная лазанья из лаваша',
        description:
            'Большое, сытное блюдо для ценителей блюд без мяса! Такая лазанья  готовится с овощным соусом и соусом бешамель, а вместо листов для  лазаньи используется тонкий лаваш.',
        category: 'Веганская кухня',
        image: lazaniaImg,
        bookmarks: 85,
        likes: 152,
    },
    {
        id: 4,
        title: 'Тефтели из булгура и чечевицы, запечённые в томатном соусе',
        description:
            'Тефтели из булгура и чечевицы – яркие и питательные, отлично подходят  для постного и вегетарианского меню. Тефтели получаются нежными, а также сочными и ароматными благодаря использованию томатного соуса и душистых пряностей.',
        category: 'Веганская кухня',
        image: tefteliImg,
        bookmarks: 85,
        likes: 152,
    },
    {
        id: 5,
        title: 'Чесночная картошка',
        description:
            'Такая картошечка украсит любой семейный обед! Все будут в полном  восторге, очень вкусно! Аромат чеснока, хрустящая корочка на картошечке - просто объедение! Отличная идея для обеда или ужина, готовится просто!',
        category: 'Веганская кухня',
        image: potatoGarlicImg,
        bookmarks: 124,
        likes: 342,
    },
    {
        id: 6,
        title: 'Пури',
        description:
            'Пури - это индийские жареные лепешки, которые готовятся из пресного  теста. Рецепт лепешек пури требует самых доступных ингредиентов, и  времени на приготовление хрустящих лепешек уйдет мало.',
        category: 'Веганская кухня',
        image: puriImg,
        bookmarks: 123,
        likes: 342,
    },
    {
        id: 7,
        title: 'Пури 2',
        description:
            'Пури - это индийские жареные лепешки, которые готовятся из пресного  теста. Рецепт лепешек пури требует самых доступных ингредиентов, и  времени на приготовление хрустящих лепешек уйдет мало.',
        category: 'Веганская кухня',
        image: puriImg,
        bookmarks: 124,
        likes: 342,
    },
    {
        id: 8,
        title: 'Капустные котлеты',
        description:
            'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
        category: 'Веганская кухня',
        image: kneliImg,
        bookmarks: 2,
        likes: 1,
    },
    {
        id: 9,
        title: 'Стейк для вегетарианцев',
        description:
            'Капустные котлеты по этому рецепту получаются необычайно пышными и  невероятно вкусными. Мягкий вкус и лёгкая пряная нотка наверняка помогут сделать эти чудесные котлеты из капусты одним из ваших любимых овощных  блюд.',
        category: 'Веганская кухня',
        image: kneliImg,
        bookmarks: 2,
        likes: 1,
    },
    {
        id: 10,
        title: 'Котлеты из гречки и фасоли',
        description:
            'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
        category: 'Веганская кухня',
        image: kneliImg,
        bookmarks: 85,
        likes: 152,
    },
    {
        id: 11,
        title: 'Сырный суп с лапшой и брокколи',
        description:
            'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
        category: 'Веганская кухня',
        image: kneliImg,
        bookmarks: 85,
        likes: 152,
    },
    {
        id: 12,
        title: 'Кнели со спагетти',
        description:
            'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
        category: 'Вторые блюда',
        image: kneliImg,
        bookmarks: 85,
        likes: 1152,
    },
    {
        id: 13,
        title: 'Пряная ветчина по итальянски',
        description:
            'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
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
        id: 14,
        title: 'Лапша с курицей и шафраном',
        description:
            'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
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
        id: 15,
        title: 'Том-ям с капустой кимчи',
        description:
            'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
        category: 'Национальные',
        image: tomImg,
        bookmarks: 124,
        likes: 1324,
    },

    {
        id: 16,
        title: 'Бананово-молочное желе',
        description:
            'Это легкое и воздушное желе, которое идеально подходит для десерта. Сочетание бананов и молока делает его вкусным и полезным.',
        category: 'Десерты и выпечка',
        image: kneliImg,
        bookmarks: 1,
        likes: 1,
    },
    {
        id: 17,
        title: 'Нежный сливочно-сырный крем для кексов',
        description:
            'Этот крем придаёт вашим кексам особую нежность. Он прекрасно подходит для украшения и наполнения заварных пирожных.',
        category: 'Десерты и выпечка',
        image: kneliImg,
        bookmarks: 2,
        likes: 1,
    },
    {
        id: 18,
        title: 'Домашние сырные палочки',
        description:
            'Эти сырные палочки получаются невероятно вкусными и хрустящими. Идеальны как закуска или перекус для детей и взрослых.',
        category: 'Детские блюда',
        image: kneliImg,
        bookmarks: 2,
        likes: 1,
    },
    {
        id: 19,
        title: 'Панкейки',
        description:
            'Панкейки — это классический завтрак, который легко приготовить. Они получаются пышными и нежными, идеально подходят с ягодами и сиропом.',
        category: 'Десерты и выпечка',
        image: kneliImg,
        bookmarks: 85,
        likes: 152,
    },
    {
        id: 20,
        title: 'Воздушное банановое печенье на сковороде',
        description:
            'Это простое и быстрое банановое печенье, которое готовится на сковороде. Оно получается мягким и ароматным, отлично подходит к чаю или кофе.',
        category: 'Десерты и выпечка',
        image: kneliImg,
        bookmarks: 85,
        likes: 152,
    },
    {
        id: 21,
        title: 'Солянка с грибами',
        description:
            'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
        category: 'Первые блюда',
        image: soliankaImg,
        bookmarks: 1,
    },
    {
        id: 22,
        title: 'Капустные котлеты',
        description:
            'Капустные котлеты по этому рецепту получаются необычайно пышными и невероятно вкусными. Мягкий вкус и лёгкая пряная нотка наверняка помогут сделать эти чудесные котлеты из капусты одним из ваших любимых овощных блюд.',
        category: 'Веганская кухня',
        image: kotletaImg,
        bookmarks: 2,
        likes: 1,
    },
    {
        id: 23,
        title: 'Оладьи на кефире "Пышные"',
        description:
            'Очень вкусные и нежные оладьи на кефире. Настоятельно рекомендую пышные кефирные оладьи на завтрак.',
        category: 'Десерты и выпечка',
        image: oladushkiImg,
        likes: 1,
    },
    {
        id: 24,
        title: 'Салат "Здоровье"',
        description:
            'Сельдерей очень полезен для здоровья, пора набираться витаминов. Не салат, а сплошное удовольствие:) Вкусный, необычный, а главное быстрый.',
        category: 'Салаты',
        image: saladImg,
    },
    {
        id: 25,
        title: 'Гречка с овощами',
        description:
            'Полезное и сытное блюдо, идеально подходящее для вегетарианцев. Гречка с овощами — это отличный гарнир или самостоятельное блюдо.',
        category: 'Гарниры',
        image: grechaImg,
    },
    {
        id: 26,
        title: 'Шоколадный торт',
        description:
            'Невероятно вкусный шоколадный торт, который порадует любителей сладкого. Легкий и воздушный, он станет украшением любого стола.',
        category: 'Десерты, выпечка',
        image: cakeImg,
        likes: 3,
    },
    {
        id: 27,
        title: 'Суп-пюре из тыквы',
        description:
            'Нежный и ароматный суп-пюре из тыквы, который согреет в холодное время года. Легко готовится и идеально подходит для вегетарианцев.',
        category: 'Первые блюда',
        image: soupImg,
        bookmarks: 1,
        likes: 2,
    },
    {
        id: 28,
        title: 'Паста с томатным соусом',
        description:
            'Простое и быстрое блюдо, которое порадует вас своим вкусом. Паста с томатным соусом — отличный вариант для ужина.',
        category: 'Вторые блюда',
        image: pastaImg,
        likes: 4,
    },
    {
        id: 29,
        title: 'Куриный салат с ананасами',
        description:
            'Свежий и легкий салат с курицей и ананасами. Идеален для летних дней и праздников.',
        category: 'Салаты',
        image: chikenSaladImg,
        bookmarks: 3,
    },
];

export const carouselRecipes = recipes.slice(21, 30);
export const favouritesRecipes = recipes
    .filter((recipe) => recipe.likes !== undefined)
    .sort((a, b) => (b?.likes ?? 0) - (a?.likes ?? 0))
    .slice(0, 4);
export const veganRecipes = recipes.filter((recipe) => recipe.category === 'Веганская кухня');
export const cookiesRecipes = recipes.filter((recipe) => recipe.category === 'Десерты и выпечка');
