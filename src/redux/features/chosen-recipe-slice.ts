import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Recipe } from '~/redux/api/types/recipes';

type SelectedRecipeState = {
    selectedRecipe: Recipe;
};

const initialState: SelectedRecipeState = {
    selectedRecipe: {} as Recipe,
};

export const selectedRecipeSlice = createSlice({
    name: 'selectedRecipe',
    initialState,
    reducers: {
        setSelectedRecipe(state, action: PayloadAction<Recipe>) {
            state.selectedRecipe = action.payload;
        },
        clearSelectedRecipe(state) {
            state.selectedRecipe = {} as Recipe;
        },
    },
    selectors: {
        selectSelectedRecipe: (state) => state.selectedRecipe,
    },
});

export const { setSelectedRecipe, clearSelectedRecipe } = selectedRecipeSlice.actions;

export const { selectSelectedRecipe } = selectedRecipeSlice.selectors;

export const selectedRecipeReducer = selectedRecipeSlice.reducer;
