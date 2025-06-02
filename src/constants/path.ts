export const routeParams = {
    categoryName: 'categoryName',
    subCategoryName: 'subCategoryName',
    recipeId: 'recipeId',
    blogId: 'blogId',
} as const;

const RECIPE_PATH = `:${routeParams.categoryName}/:${routeParams.subCategoryName}/:${routeParams.recipeId}`;
export const EDIT_RECIPE_PATH = 'edit-recipe';

export const Paths = {
    SIGN_IN: '/sign-in',
    SIGN_UP: '/sign-up',
    RESTORE_CREDENTIALS: '/sign-in/restore-credentials',
    EMAIL_VERIFICATION: '/verification',
    R_SWITCHER: '/',
    CATEGORY_ROOT: `:${routeParams.categoryName}`,
    CATEGORY: `:${routeParams.categoryName}/:${routeParams.subCategoryName}`,
    RECIPE: `/${RECIPE_PATH}`,
    JUICIEST: '/the-juiciest',
    BLOGS: '/blogs',
    BLOGS_ITEM: `/blogs/:${routeParams.blogId}`,
    NEW_RECIPE: '/new-recipe',
    EDIT_RECIPE: `/${EDIT_RECIPE_PATH}/${RECIPE_PATH}`,
    ERROR: '/not-found',
    OTHERS: '*',
} as const;
