import hamImg from '../assets/images/ham.png';
import kneliImg from '../assets/images/kneli.png';
import lazaniaImg from '../assets/images/lazania-vegan.jpg';
import manImg from '../assets/images/man.png';
import noodleImg from '../assets/images/noodle.png';
import rollsImg from '../assets/images/potato-mini-rolls.jpg';
import potatTushImg from '../assets/images/potato-tushenaya.jpg';
import tefteliImg from '../assets/images/tefteli-vegan.jpg';
import tomImg from '../assets/images/tom.png';
import womanImg from '../assets/images/woman.png';
import { Recipe } from '../types/recipe.ts';

export const favouritesRecipes: Recipe[] = [
    {
        id: 0,
        title: 'Кнели со спагетти',
        description:
            'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
        category: 'Вторые блюда',
        image: kneliImg,
        bookmarks: 85,
        likes: 152,
    },
    {
        id: 1,
        title: 'Пряная ветчина по итальянски',
        description:
            'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
        category: 'Вторые блюда',
        image: hamImg,
        bookmarks: 159,
        likes: 257,
        recommendation: {
            firstName: 'Елена',
            lastName: 'Высоцкая',
            imageUrl: womanImg,
        },
    },
    {
        id: 2,
        title: 'Лапша с курицей и шафраном',
        description:
            'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
        category: 'Вторые блюда',
        image: noodleImg,
        bookmarks: 258,
        likes: 342,
        recommendation: {
            firstName: 'Alex',
            lastName: 'Cook',
            imageUrl: manImg,
        },
    },
    {
        id: 3,
        title: 'Том-ям с капустой кимчи',
        description:
            'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
        category: 'Национальные',
        image: tomImg,
        bookmarks: 124,
        likes: 324,
    },
    {
        id: 4,
        title: 'Картошка, тушенная с болгарским перцем и фасолью в томатном соусе',
        description:
            'Картошка, тушенная с болгарским перцем, фасолью, морковью и луком, -  вариант сытного блюда на каждый день. Фасоль в данном случае заменяет  мясо, делая рагу сытным и питательным. Чтобы сократить время  приготовления, возьмём консервированную фасоль. Блюдо хоть и простое, но в полной мере наполнено ароматами и имеет выразительный вкус за счёт  добавления томатной пасты.',
        category: 'Национальные',
        image: potatTushImg,
        bookmarks: 85,
        likes: 152,
    },
    {
        id: 5,
        title: 'Картофельные рулетики с грибами',
        description:
            'Рекомендую всем приготовить постное блюдо из картофеля и грибов.  Готовится это блюдо без яиц, без мяса и без сыра, из самых простых  ингредиентов, а получается очень вкусно и сытно. Постный рецепт  картофельных рулетиков с грибами, в томатном соусе, - на обед, ужин и  даже на праздничный стол!',
        category: 'Детские блюда',
        image: rollsImg,
        bookmarks: 85,
        likes: 152,
    },
    {
        id: 6,
        title: 'Овощная лазанья из лаваша',
        description:
            'Большое, сытное блюдо для ценителей блюд без мяса! Такая лазанья  готовится с овощным соусом и соусом бешамель, а вместо листов для  лазаньи используется тонкий лаваш.',
        category: 'Блюда на гриле',
        image: lazaniaImg,
        bookmarks: 85,
        likes: 152,
    },
    {
        id: 7,
        title: 'Тефтели из булгура и чечевицы, запечённые в томатном соусе',
        description:
            'Тефтели из булгура и чечевицы – яркие и питательные, отлично подходят  для постного и вегетарианского меню. Тефтели получаются нежными, а также сочными и ароматными благодаря использованию томатного соуса и душистых пряностей.',
        category: 'Вторые блюда',
        image: tefteliImg,
        bookmarks: 85,
        likes: 152,
    },
];
