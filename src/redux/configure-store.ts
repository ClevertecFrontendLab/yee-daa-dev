import { configureStore } from '@reduxjs/toolkit';

import { appErrorMiddleware } from './api/middleware';
import { categoryApi } from './api/services/category-api';
import { recipeApi } from './api/services/recipes-api';
import { allergenReducer, allergenSlice } from './features/allergens-slice';
import { appReducer, appSlice } from './features/app-slice';
import { authorsReducer, authorsSlice } from './features/authors-slice';
import { menuReducer, menuSlice } from './features/burger-slice';
import { categoriesReducer, categoriesSlice } from './features/categories-slice';
import { chosenCategoryReducer, chosenCategorySlice } from './features/chosen-category-slice';
import { selectedRecipeReducer, selectedRecipeSlice } from './features/chosen-recipe-slice';
import { drawerReducer, drawerSlice } from './features/drawer';
import { meatsReducer, meatsSlice } from './features/meats-slice';
import { recipesReducer, recipesSlice } from './features/recipies-slice';
import { searchReducer, searchSlice } from './features/search-slice';
import { sidesReducer, sidesSlice } from './features/sides-slice';

// по дефолту при старте приложения yarn start vite по дефолту устанавливает MODE: 'development'
// переменные доступны из файла .env.development

const isDevMode = import.meta.env.MODE === 'development';

const combinedReducer = {
    [appSlice.name]: appReducer,
    [searchSlice.name]: searchReducer,
    [categoriesSlice.name]: categoriesReducer,
    [chosenCategorySlice.name]: chosenCategoryReducer,
    [recipesSlice.name]: recipesReducer,
    [allergenSlice.name]: allergenReducer,
    [selectedRecipeSlice.name]: selectedRecipeReducer,
    [menuSlice.name]: menuReducer,
    [drawerSlice.name]: drawerReducer,
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
