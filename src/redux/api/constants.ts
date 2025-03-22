import {
    JUICIEST_MAIN_PAGE_LIMIT,
    JUICIEST_PAGE_LIMIT,
    SLIDER_RECIPES_LIMIT,
} from '~/constants/general';

export const API_BASE_URL = 'https://marathon-api.clevertec.ru/';

export const API_DEV_URL = 'http://127.0.0.1:4000/'; //localhost

export const API_IMGS_BASE = 'https://training-api.clevertec.ru';

export const NOTIFICATION_STATE_NAME = 'appNotificationState';

export enum ApiEndpoints {
    SignIn = 'sign-in',
    SignUp = 'sign-up',
    SignOut = 'sign-out',
    SendVerificationCode = 'sendVerificationCode',
    CheckVerificationCode = 'checkVerificationCode',
    ResetCredentials = 'resetCredentials',

    Category = 'category',
    Recipe = 'recipe',
    RecipeByCategory = 'recipe/category',
}

export enum SortParamsAvailable {
    DATE = 'createdAt',
    LIKES = 'likes',
}

export enum SortOrder {
    ASC = 'ASC',
    DESC = 'DESC',
}

export const JUICIEST_PARAMS = {
    sortBy: SortParamsAvailable.LIKES,
    limit: JUICIEST_MAIN_PAGE_LIMIT,
};

export const NEWEST_PARAMS = { limit: SLIDER_RECIPES_LIMIT, sortBy: SortParamsAvailable.DATE };

export const JUICIEST_PAGE_PARAMS = {
    sortBy: SortParamsAvailable.LIKES,
    limit: JUICIEST_PAGE_LIMIT,
};
