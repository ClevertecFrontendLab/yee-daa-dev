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

export type Ingredient = { title: string; count: number; measureUnit: string };

export type Step = { stepNumber: number; description: string; image?: string };

export type RawRecipesResponse = { data: RawRecipe[]; meta: MetaData };

export type MetaData = {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
};

export type MetaRequest = Partial<Pick<MetaData, 'limit' | 'page'>>;

export type RawRecipe = ReplacedIdToUnderscore<Recipe>;

export type RecipesResponse = Recipe[];

export type RecipesInfiniteResponse = { data: Recipe[]; meta: MetaData };

export type RecipesResponseWithMeta = { data: RecipesResponse; meta: MetaData };

export type PaginationParams = { page: number; limit: number };

export type FilterParams = { meat: string[]; garnish: string[]; subcategoriesIds: string[] };

export type SortParams = {
    sortBy: SortParamsAvailable;
    sortOrder: SortOrder;
};

export type SearchParams = {
    allergens: string[];
    searchString: string;
};

export type AllRecipeParams = Partial<PaginationParams & FilterParams & SortParams & SearchParams>;

export type RecipesByCategoryIdArgs = { id: string } & Partial<PaginationParams & SearchParams>;
