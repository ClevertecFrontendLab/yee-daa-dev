import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Recipe } from '../../types/recipe';
import { AppState } from '../../types/store';

type SearchState = {
    inputValue: string;
    matchedRecipes: Recipe[];
    isLoading: boolean;
};

export const initialState: SearchState = {
    inputValue: '',
    matchedRecipes: [],
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
        setMatchedRecipes(state, action: PayloadAction<Recipe[]>) {
            state.matchedRecipes = action.payload;
        },
    },
});

export const selectInputValue = (state: AppState) => state.search.inputValue;
export const selectSearchLoading = (state: AppState) => state.search.isLoading;
export const selectMatchedRecipes = (state: AppState) => state.search.matchedRecipes;

export const { setInputValue, setLoading, setMatchedRecipes } = searchSlice.actions;
export const searchReducer = searchSlice.reducer;
