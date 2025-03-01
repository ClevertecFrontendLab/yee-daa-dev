import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Recipe } from '~/types/recipe';
import { AppState } from '~/types/store';

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
});

export const { setSelectedRecipe, clearSelectedRecipe } = selectedRecipeSlice.actions;

export const selectSelectedRecipe = (state: AppState) => state.selectedRecipe.selectedRecipe;
export const selectedRecipeReducer = selectedRecipeSlice.reducer;
