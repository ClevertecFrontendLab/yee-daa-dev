export const routeParams = {
    categoryName: 'categoryName',
    subCategoryName: 'subCategoryName',
    recipeId: 'recipeId',
} as const;

export const Paths = {
    R_SWITCHER: '/',
    CATEGORY_ROOT: `:${routeParams.categoryName}`,
    CATEGORY: `:${routeParams.categoryName}/:${routeParams.subCategoryName}`,
    RECIPE: `:${routeParams.categoryName}/:${routeParams.subCategoryName}/:${routeParams.recipeId}`,
    JUICIEST: '/the-juiciest',
    ERROR: '/not-found',
    OTHERS: '*',
};
