import { configureStore } from '@reduxjs/toolkit';

import { appErrorMiddleware } from './api/middleware';
import { categoryApi } from './api/services/category-api';
import { allergenReducer, allergenSlice } from './features/allergens-slice';
import { appReducer, appSlice } from './features/app-slice';
import { authorsReducer, authorsSlice } from './features/authors-slice';
import { menuReducer, menuSlice } from './features/burger-slice';
import { categoriesReducer, categoriesSlice } from './features/categories-slice';
import { choosenCategoryReducer, choosenCategorySlice } from './features/choosen-category-slice';
import { selectedRecipeReducer, selectedRecipeSlice } from './features/choosen-recipe-slice';
import { cuisinesReducer, cuisinesSlice } from './features/cuisines-slice';
import { drawerReducer, drawerSlice } from './features/drawer';
import { meatsReducer, meatsSlice } from './features/meats-slice';
import { recipesReducer, recipesSlice } from './features/recipies-slice';
import { searchReducer, searchSlice } from './features/search-slice';
import { sidesReducer, sidesSlice } from './features/sides-slice';

const isDevMode = process.env.NODE_ENV === 'development';

const combinedReducer = {
    [appSlice.name]: appReducer,
    [searchSlice.name]: searchReducer,
    [categoriesSlice.name]: categoriesReducer,
    [choosenCategorySlice.name]: choosenCategoryReducer,
    [recipesSlice.name]: recipesReducer,
    [allergenSlice.name]: allergenReducer,
    [selectedRecipeSlice.name]: selectedRecipeReducer,
    [menuSlice.name]: menuReducer,
    [drawerSlice.name]: drawerReducer,
    [cuisinesSlice.name]: cuisinesReducer,
    [authorsSlice.name]: authorsReducer,
    [meatsSlice.name]: meatsReducer,
    [sidesSlice.name]: sidesReducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
};

export const store = configureStore({
    reducer: combinedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(categoryApi.middleware, appErrorMiddleware),
    devTools: isDevMode,
});
