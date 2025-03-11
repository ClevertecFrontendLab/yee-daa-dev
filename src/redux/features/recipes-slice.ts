import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Recipe } from '~/redux/api/types/recipes';

type RecipesState = {
    filteredRecipes: Recipe[];
    isFilterError: boolean;
    isLoading: boolean;
    showEmptyText: boolean;
};

const initialState: RecipesState = {
    filteredRecipes: [],
    isFilterError: false,
    isLoading: false,
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
        setIsFilterLoading: (state, { payload }: PayloadAction<boolean>) => {
            state.isLoading = payload;
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
        selectIsFilterLoading: (state) => state.isLoading,
        selectShowEmptyText: (state) => state.showEmptyText,
    },
});

export const recipesReducer = recipesSlice.reducer;
export const {
    setFilteredRecipes,
    clearFilteredRecipes,
    setIsFilterError,
    setIsFilterLoading,
    setShowedEmptyText,
} = recipesSlice.actions;

export const {
    selectFilteredRecipes,
    selectIsFilterError,
    selectIsFilterLoading,
    selectShowEmptyText,
} = recipesSlice.selectors;
