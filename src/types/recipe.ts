import { UserProps } from './user.ts';

export type Recipe = {
    id: string;
    category: string[];
    subcategory: string[];
    title: string;
    date: string;
    description: string;
    time: string;
    value: EnergyValue;
    ingredients: ingredient[];
    steps: Step[];
    author: UserProps;
    meat?: string;
    side?: string;
    portions?: number;
    image?: string;
    likes?: number;
    views?: number;
    bookmarks?: number;
    recommendation?: Omit<UserProps, 'login'>;
};

type EnergyValue = { calorie: number; proteins: number; fats: number; carbohydrates: number };
type ingredient = { name: string; title: string; quantity: number; unit: string };
type Step = { number: number; description: string; image?: string };
