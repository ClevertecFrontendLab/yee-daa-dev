export const API_BASE_URL = 'https://marathon-api.clevertec.ru/';

export const API_DEV_URL = 'http://127.0.0.1:4000/'; //localhost

export const API_IMGS_BASE = 'https://training-api.clevertec.ru';

export const NOTIFICATION_STATE_NAME = 'appNotificationState';

export enum ApiEndpoints {
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
