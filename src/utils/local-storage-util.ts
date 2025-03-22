export enum LOCALSTORAGE_KEYS {
    CATEGORIES = 'categories',
    SUBCATEGORIES = 'sub_categories',
    REFRESH_TOKEN = 'refresh_token',
}

export const setDataToLocalStorage = (key: LOCALSTORAGE_KEYS, data: unknown) => {
    const preparedData = JSON.stringify(data);
    localStorage.setItem(key, preparedData);
};

export const getDataFromLocalStorage = (key: LOCALSTORAGE_KEYS) => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
};

export const removeDataFromLocalStorage = (key: LOCALSTORAGE_KEYS) => localStorage.removeItem(key);
