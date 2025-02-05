import { UserProps } from './user.ts';

export type Recipe = {
    id: number;
    category: string;
    title: string;
    description: string;
    image: string;
    likes?: number;
    views?: number;
    bookmarks?: number;
    recommendation?: Omit<UserProps, 'login'>;
};
