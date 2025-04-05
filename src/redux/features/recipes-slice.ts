import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Recipe } from '~/redux/api/types/recipes';

type RecipesState = {
    filteredRecipes: Recipe[];
    isFilterError: boolean;
    showEmptyText: boolean;
};

const initialState: RecipesState = {
    filteredRecipes: [],
    isFilterError: false,
    showEmptyText: false,
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
        setShowedEmptyText: (state, { payload }: PayloadAction<boolean>) => {
            state.showEmptyText = payload;
        },
        clearFilteredRecipes(state) {
            state.filteredRecipes = [];
        },
    },
    selectors: {
        selectFilteredRecipes: (state) => state.filteredRecipes,
        selectIsFilterError: (state) => state.isFilterError,
        selectShowEmptyText: (state) => state.showEmptyText,
    },
});

export const recipesReducer = recipesSlice.reducer;
export const { setFilteredRecipes, clearFilteredRecipes, setIsFilterError, setShowedEmptyText } =
    recipesSlice.actions;

export const { selectFilteredRecipes, selectIsFilterError, selectShowEmptyText } =
    recipesSlice.selectors;
