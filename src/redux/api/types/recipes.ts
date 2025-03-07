import { SortOrder, SortParamsAvailable } from '../constants';
import { ReplacedIdToUnderscore } from './common';

export type Recipe = {
    id: string;
    createdAt: string;
    title: string;
    description: string;
    time: number;
    // внутри должен быть массив ИД только подкатегорий (type SubCategory)
    categoriesIds: string[];
    likes: number;
    views: number;
    nutritionValue: EnergyValue;
    ingredients: Ingredient[];
    steps: Step[];
    authorId: string;
    meat?: string;
    side?: string;
    portions?: number;
    image?: string;
    bookmarks?: number;
    recommendedByUserId?: string;
};

export type EnergyValue = {
    calories: number;
    protein: number;
    fats: number;
    carbohydrates: number;
};

type Ingredient = { title: string; count: number; measureUnit: string };

type Step = { stepNumber: number; description: string; image?: string };

export type RawRecipesResponse = { data: RawRecipe[]; meta: MetaData };

export type MetaData = {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
};

export type RawRecipe = ReplacedIdToUnderscore<Recipe>;

export type RecipesResponse = Recipe[];

export type PaginationParams = { page: number; limit: number };

export type FilterParams = { meat: string; garnish: string };

export type SortParams = {
    sortBy: SortParamsAvailable;
    sortOrder: SortOrder;
};

export type SearchParams = {
    allergens: string[];
    searchString: string;
};

export type AllRecipeParams = Partial<PaginationParams & FilterParams & SortParams>;

export type RecipesByCategoryIdArgs = { id: string } & Partial<PaginationParams & SearchParams>;
