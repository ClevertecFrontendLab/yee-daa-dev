import { NoteWithUnderscoreId, Recipe, RecipeWithUnderscoreId } from '~/redux/api/types/recipes';

export type UserProps = {
    _id: string;
    firstName: string;
    lastName: string;
    login: string;
    imageUrl?: string;
    likes?: number;
    bookmarks?: number;
    followers?: number;
};

export type UserState = {
    id: string;
    drafts: Recipe[];
    email: string;
    firstName: string;
    lastName: string;
    login: string;
    notes: NoteType[];
    recipesIds: string[];
    subscribers: string[]; // Подписчики
    subscriptions: string[]; // Подписки
    bookmarks: Recipe[];
    photoLink: string;
    recommendation: string[];
    recipes: Recipe[];
};

export type UserStateWithUnderscoreId = Omit<UserState, 'id' | 'notes' | 'drafts'> & {
    _id: string;
    notes: NoteWithUnderscoreId[];
    drafts: RecipeWithUnderscoreId[];
};

export type NoteType = {
    date: string;
    text: string;
    id: string;
};

export type UserStatistic = {
    recommendationsCount: number;
    likes: { date: string; count: number }[];
    bookmarks: { date: string; count: number }[];
};

export type BaseUserInfo = {
    firstName: string;
    id: string;
    lastName: string;
    login: string;
    photo: string;
};
