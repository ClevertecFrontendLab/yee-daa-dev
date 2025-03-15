export const routeParams = {
    categoryName: 'categoryName',
    subCategoryName: 'subCategoryName',
    recipeId: 'recipeId',
} as const;

export const Paths = {
    SIGN_IN: '/sign-in',
    SIGN_UP: '/sign-up',
    RESTORE_CREDENTIALS: 'restore-credentials',

    R_SWITCHER: '/',
<<<<<<< HEAD
    CATEGORY_ROOT: `:${routeParams.categoryName}`,
    CATEGORY: `:${routeParams.categoryName}/:${routeParams.subCategoryName}`,
    RECIPE: `:${routeParams.categoryName}/:${routeParams.subCategoryName}/:${routeParams.recipeId}`,
    JUICIEST: '/the-juiciest',
    ERROR: '/not-found',
    OTHERS: '*',
};
=======
    JUICIEST: 'the-juiciest',
    ERROR: '*',
} as const;
>>>>>>> 8102645 (feat(auth-layout): add auth layout)
