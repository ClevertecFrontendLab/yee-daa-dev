import { configureStore } from '@reduxjs/toolkit';

import { appErrorMiddleware } from './api/middleware';
import { baseApi } from './api/services/base-api';
import { accordionReducer, accordionSlice } from './features/accordion-slice';
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

// по дефолту при старте приложения yarn start vite по устанавливает MODE: 'development'
// переменные доступны из файла .env.development - чтобы reduxDevTools работал

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
    [accordionSlice.name]: accordionReducer,
    [baseApi.reducerPath]: baseApi.reducer,
};

export const store = configureStore({
    reducer: combinedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(appErrorMiddleware, baseApi.middleware),
    devTools: isDevMode,
});
