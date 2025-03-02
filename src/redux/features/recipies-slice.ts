import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { recipes } from '~/mocks/recipes';
import { Recipe } from '~/types/recipe';

type RecipesState = {
    recipes: Recipe[];
    filteredRecipes: Recipe[];
    isLoading: boolean;
};

const initialState: RecipesState = {
    recipes: recipes,
    filteredRecipes: [],
    isLoading: false,
};

export const recipesSlice = createSlice({
    name: 'recipes',
    initialState,
    reducers: {
        setLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },
        setRecipes(state, action: PayloadAction<Recipe[]>) {
            state.recipes = action.payload;
        },

        setFilteredRecipes(state, action: PayloadAction<Recipe[]>) {
            state.filteredRecipes = action.payload;
        },
        clearFilteredRecipes(state) {
            state.filteredRecipes = [];
        },
    },
    selectors: {
        recipesLoading: (state) => state.isLoading,
        selectRecipes: (state) => state.recipes,
        selectFilteredRecipes: (state) => state.filteredRecipes,
    },
});

export const recipesReducer = recipesSlice.reducer;
export const { setLoading, setRecipes, setFilteredRecipes, clearFilteredRecipes } =
    recipesSlice.actions;

export const { recipesLoading, selectFilteredRecipes, selectRecipes } = recipesSlice.selectors;
