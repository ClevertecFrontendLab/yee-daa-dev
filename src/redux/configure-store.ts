import { configureStore } from '@reduxjs/toolkit';

import { allergenReducer, allergenSlice } from './features/allergens-slice';
import { menuReducer, menuSlice } from './features/burger-slice';
import { categoriesReducer, categoriesSlice } from './features/categories-slice';
import { choosenCategoryReducer, choosenCategorySlice } from './features/choosen-category-slice';
import { selectedRecipeReducer, selectedRecipeSlice } from './features/choosen-recipe-slice';
import { recipesReducer, recipesSlice } from './features/recipies-slice';
import { searchReducer, searchSlice } from './features/search-slice';

export const store = configureStore({
    reducer: {
        [searchSlice.name]: searchReducer,
        [categoriesSlice.name]: categoriesReducer,
        [choosenCategorySlice.name]: choosenCategoryReducer,
        [recipesSlice.name]: recipesReducer,
        [allergenSlice.name]: allergenReducer,
        [selectedRecipeSlice.name]: selectedRecipeReducer,
        [menuSlice.name]: menuReducer,
    },
});

export const RootState = store.getState;
