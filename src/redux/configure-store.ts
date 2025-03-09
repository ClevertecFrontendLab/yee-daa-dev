import { configureStore } from '@reduxjs/toolkit';

import { appErrorMiddleware } from './api/middleware';
import { categoryApi } from './api/services/category-api';
import { recipeApi } from './api/services/recipes-api';
import { allergenReducer, allergenSlice } from './features/allergens-slice';
import { appReducer, appSlice } from './features/app-slice';
import { authorsReducer, authorsSlice } from './features/authors-slice';
import { menuReducer, menuSlice } from './features/burger-slice';
import { categoriesReducer, categoriesSlice } from './features/categories-slice';
import { filterDrawerReducer, filterDrawerSlice } from './features/filter-drawer-slice';
import { meatsReducer, meatsSlice } from './features/meats-slice';
import { recipesReducer, recipesSlice } from './features/recipes-slice';
import { searchReducer, searchSlice } from './features/search-slice';
import { sidesReducer, sidesSlice } from './features/sides-slice';

// по дефолту при старте приложения yarn start vite по дефолту устанавливает MODE: 'development'
// переменные доступны из файла .env.development

const isDevMode = import.meta.env.MODE === 'development';

const combinedReducer = {
    [appSlice.name]: appReducer,
    [searchSlice.name]: searchReducer,
    [categoriesSlice.name]: categoriesReducer,
    [recipesSlice.name]: recipesReducer,
    [allergenSlice.name]: allergenReducer,
    [menuSlice.name]: menuReducer,
    [filterDrawerSlice.name]: filterDrawerReducer,
    [authorsSlice.name]: authorsReducer,
    [meatsSlice.name]: meatsReducer,
    [sidesSlice.name]: sidesReducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [recipeApi.reducerPath]: recipeApi.reducer,
};

export const store = configureStore({
    reducer: combinedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            categoryApi.middleware,
            recipeApi.middleware,
            appErrorMiddleware,
        ),
    devTools: isDevMode,
});
