import man from '../assets/images/man.png';
import woman from '../assets/images/woman.png';
import { Post } from '../types/post.ts';

export const posts: Post[] = [
    {
        firstName: 'Елена',
        lastName: 'Высоцкая',
        login: '@elenapovar',
        imageUrl: woman,
        text: 'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
    },
    {
        firstName: 'Alex',
        lastName: 'Cook',
        login: '@funtasticooking',
        imageUrl: man,
        text: 'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
    },
    {
        firstName: 'Екатерина',
        lastName: 'Константинопольская',
        login: '@bake_and_pie',
        imageUrl: woman,
        text: 'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
    },
];
