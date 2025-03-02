import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Recipe } from '~/types/recipe';

type SelectedRecipeState = {
    selectedRecipe: Recipe | null;
};

const initialState: SelectedRecipeState = {
    selectedRecipe: null,
};

export const selectedRecipeSlice = createSlice({
    name: 'selectedRecipe',
    initialState,
    reducers: {
        setSelectedRecipe(state, action: PayloadAction<Recipe>) {
            state.selectedRecipe = action.payload;
        },
        clearSelectedRecipe(state) {
            state.selectedRecipe = null;
        },
    },
    selectors: {
        selectSelectedRecipe: (state) => state.selectedRecipe,
    },
});

export const { setSelectedRecipe, clearSelectedRecipe } = selectedRecipeSlice.actions;

export const { selectSelectedRecipe } = selectedRecipeSlice.selectors;

export const selectedRecipeReducer = selectedRecipeSlice.reducer;
