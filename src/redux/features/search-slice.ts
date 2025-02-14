import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Recipe } from '../../types/recipe';
import { AppState } from '../../types/store';

type SearchState = {
    inputValue: string;
    filteredRecipes: Recipe[];
    isLoading: boolean;
};

const initialState: SearchState = {
    inputValue: '',
    filteredRecipes: [],
    isLoading: false,
};

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setInputValue(state, action: PayloadAction<string>) {
            state.inputValue = action.payload;
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },
        setFilteredRecipes(state, action: PayloadAction<Recipe[]>) {
            state.filteredRecipes = action.payload;
        },
    },
});

export const selectInputValue = (state: AppState) => state.search.inputValue;
export const selectSearchLoading = (state: AppState) => state.search.isLoading;
export const selectFilteredRecipes = (state: AppState) => state.search.filteredRecipes;

export const { setInputValue, setLoading, setFilteredRecipes } = searchSlice.actions;
export const searchReducer = searchSlice.reducer;
