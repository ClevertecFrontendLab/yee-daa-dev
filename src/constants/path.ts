export const routeParams = {
    categoryName: 'categoryName',
    subCategoryName: 'subCategoryName',
    recipeId: 'recipeId',
    blogId: 'blogId',
} as const;

export const Paths = {
    SIGN_IN: '/sign-in',
    SIGN_UP: '/sign-up',
    RESTORE_CREDENTIALS: '/sign-in/restore-credentials',
    EMAIL_VERIFICATION: '/verification',

    R_SWITCHER: '/',
    CATEGORY_ROOT: `:${routeParams.categoryName}`,
    CATEGORY: `:${routeParams.categoryName}/:${routeParams.subCategoryName}`,
    RECIPE: `:${routeParams.categoryName}/:${routeParams.subCategoryName}/:${routeParams.recipeId}`,
    JUICIEST: '/the-juiciest',
    BLOGS: '/blogs',
    BLOGS_ITEM: `/blogs/:${routeParams.blogId}`,
    ERROR: '/not-found',
    OTHERS: '*',
} as const;
