import hamImg from '../assets/images/ham.png';
import kneliImg from '../assets/images/kneli.png';
import manImg from '../assets/images/man.png';
import noodleImg from '../assets/images/noodle.png';
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
];
