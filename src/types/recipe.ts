import { UserProps } from './user.ts';

export type Recipe = {
    id: string;
    category: string;
    subcategory: string;
    title: string;
    date: string;
    description: string;
    image?: string;
    likes?: number;
    views?: number;
    bookmarks?: number;
    recommendation?: Omit<UserProps, 'login'>;
};
