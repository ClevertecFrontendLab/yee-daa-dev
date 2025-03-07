import { Category, CategoryRaw, SubCategory, SubCategoryRaw } from '../types/categories';

const hasRootCategoryId = <T extends Record<string, unknown>>(data: T) =>
    'rootCategoryId' in data && Boolean(data.rootCategoryId);

export const isCategory = (data: Category | SubCategory): data is Category =>
    !hasRootCategoryId(data);

export const isCategoryRaw = (data: CategoryRaw | SubCategoryRaw): data is CategoryRaw =>
    !hasRootCategoryId(data);
