import { configureStore } from '@reduxjs/toolkit';

import { categoriesReducer, categoriesSlice } from './features/categories-slice';
import { choosenCategoryReducer, choosenCategorySlice } from './features/choosen-category-slice';
import { recipesReducer, recipesSlice } from './features/recipies-slice';
import { searchReducer, searchSlice } from './features/search-slice';

export const store = configureStore({
    reducer: {
        [searchSlice.name]: searchReducer,
        [categoriesSlice.name]: categoriesReducer,
        [choosenCategorySlice.name]: choosenCategoryReducer,
        [recipesSlice.name]: recipesReducer,
    },
});

export const RootState = store.getState;
