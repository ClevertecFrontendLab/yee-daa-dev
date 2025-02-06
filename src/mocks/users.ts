import man from '../assets/images/man.png';
import userImg from '../assets/images/user.webp';
import woman from '../assets/images/woman.png';
import { UserProps } from '../types/user.ts';

export const users: UserProps = [
    {
        firstName: 'Елена',
        lastName: 'Высоцкая',
        login: '@elenapovar',
        imageUrl: woman,
    },
    {
        firstName: 'Alex',
        lastName: 'Cook',
        login: '@funtasticooking',
        imageUrl: man,
    },
    {
        firstName: 'Екатерина',
        lastName: 'Константинопольская',
        login: '@bake_and_pie',
        imageUrl: woman,
    },
];

export const user: UserProps = {
    firstName: 'Екатерина',
    lastName: 'Константинопольская',
    login: '@bake_and_pie',
    imageUrl: userImg,
};
