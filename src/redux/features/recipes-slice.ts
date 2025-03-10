import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Recipe } from '~/redux/api/types/recipes';

type RecipesState = {
    filteredRecipes: Recipe[];
    isFilterError: boolean;
};

const initialState: RecipesState = {
    filteredRecipes: [],
    isFilterError: false,
};

export const recipesSlice = createSlice({
    name: 'recipes',
    initialState,
    reducers: {
        setFilteredRecipes(state, action: PayloadAction<Recipe[]>) {
            state.filteredRecipes = action.payload;
        },
        setIsFilterError: (state, { payload }: PayloadAction<boolean>) => {
            state.isFilterError = payload;
        },
        clearFilteredRecipes(state) {
            state.filteredRecipes = [];
        },
    },
    selectors: {
        selectFilteredRecipes: (state) => state.filteredRecipes,
        selectIsFilterError: (state) => state.isFilterError,
    },
});

export const recipesReducer = recipesSlice.reducer;
export const { setFilteredRecipes, clearFilteredRecipes, setIsFilterError } = recipesSlice.actions;

export const { selectFilteredRecipes, selectIsFilterError } = recipesSlice.selectors;
