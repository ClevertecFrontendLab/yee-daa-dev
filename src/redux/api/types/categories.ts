import { ReplacedIdToUnderscore } from './common';

export type CategoriesRawResponse = CategoryRaw[];
export type CategoryRaw = ReplacedIdToUnderscore<Category>;

export type CategoriesResponse = Category[];

export type Category = {
    id: string;
    category: string;
    title: string;
    description: string;
    icon: string;
    subCategories: SubCategory[];
};

export interface SubCategory {
    category: string;
    title: string;
    icon?: string;
    description: string;
    rootCategoryId: string;
}
