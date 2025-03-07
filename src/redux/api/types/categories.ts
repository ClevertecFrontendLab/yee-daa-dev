import { ReplacedIdToUnderscore } from './common';

export type GetCategoriesRawResponse = Array<CategoryRaw | SubCategoryRaw>;
export type GetCategoriesResponse = Array<Category | SubCategory>;

export type CategoryRaw = Omit<ReplacedIdToUnderscore<Category>, 'subCategories'> & {
    subCategories: SubCategoryRaw[];
};

export type SubCategoryRaw = ReplacedIdToUnderscore<SubCategory>;

export type CategoriesResponse = Array<Category | SubCategory>;

export type Category = {
    id: string;
    category: string;
    title: string;
    description: string;
    icon: string;
    subCategories: SubCategory[];
};

export type SubCategory = {
    id: string;
    category: string;
    title: string;
    rootCategoryId: string;
};
