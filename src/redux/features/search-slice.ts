import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Recipe } from '~/types/recipe';

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
    selectors: {
        selectInputValue: (state) => state.inputValue,
        selectSearchLoading: (state) => state.isLoading,
        selectMatchedRecipes: (state) => state.matchedRecipes,
    },
});

export const { setInputValue, setLoading, setMatchedRecipes } = searchSlice.actions;
export const searchReducer = searchSlice.reducer;

export const { selectInputValue, selectMatchedRecipes, selectSearchLoading } =
    searchSlice.selectors;
