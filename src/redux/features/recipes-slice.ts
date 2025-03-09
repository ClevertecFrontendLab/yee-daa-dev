import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Recipe } from '~/redux/api/types/recipes';

type RecipesState = {
    recipes: Recipe[];
    filteredRecipes: Recipe[];
    isLoading: boolean;
    totalRecipes: number;
};

const initialState: RecipesState = {
    recipes: [],
    filteredRecipes: [],
    isLoading: false,
    totalRecipes: 0,
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
        changeTotalRecipes(state, { payload }: PayloadAction<number>) {
            state.totalRecipes = payload;
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
        selectTotalRecipes: (state) => state.totalRecipes,
    },
});

export const recipesReducer = recipesSlice.reducer;
export const {
    setLoading,
    changeTotalRecipes,
    setRecipes,
    setFilteredRecipes,
    clearFilteredRecipes,
} = recipesSlice.actions;

export const { recipesLoading, selectFilteredRecipes, selectRecipes, selectTotalRecipes } =
    recipesSlice.selectors;
