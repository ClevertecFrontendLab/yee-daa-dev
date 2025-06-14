import { configureStore } from '@reduxjs/toolkit';

import { bloggersReducer, bloggersSlice } from '~/redux/features/bloggers-slice';

import { authorizedApi, unauthorizedApi } from './api';
import { accordionReducer, accordionSlice } from './features/accordion-slice';
import { allergenReducer, allergenSlice } from './features/allergens-slice';
import { appReducer, appSlice } from './features/app-slice';
import { authReducer, authSlice } from './features/auth-slice';
import { authorsReducer, authorsSlice } from './features/authors-slice';
import { menuReducer, menuSlice } from './features/burger-slice';
import { categoriesReducer, categoriesSlice } from './features/categories-slice';
import { filterDrawerReducer, filterDrawerSlice } from './features/filter-drawer-slice';
import { meatsReducer, meatsSlice } from './features/meats-slice';
import { recipesReducer, recipesSlice } from './features/recipes-slice';
import { searchReducer, searchSlice } from './features/search-slice';
import { sidesReducer, sidesSlice } from './features/sides-slice';
import { userReducer, userSlice } from './features/user-slice';
import { appErrorMiddleware } from './middleware';

// по дефолту при старте приложения yarn start vite по устанавливает MODE: 'development'
// переменные доступны из файла .env.development - чтобы reduxDevTools работал

const isDevMode = import.meta.env.MODE === 'development';

const combinedReducer = {
    [authSlice.name]: authReducer,
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
    [authorizedApi.reducerPath]: authorizedApi.reducer,
    [unauthorizedApi.reducerPath]: unauthorizedApi.reducer,
    [bloggersSlice.name]: bloggersReducer,
    [userSlice.name]: userReducer,
};

export const store = configureStore({
    reducer: combinedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            appErrorMiddleware,
            authorizedApi.middleware,
            unauthorizedApi.middleware,
        ),
    devTools: isDevMode,
});
