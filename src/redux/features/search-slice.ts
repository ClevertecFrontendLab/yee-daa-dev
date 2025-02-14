import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppState } from '../../types/store';

type SearchState = {
    inputValue: string;
    isLoading: boolean;
};

const initialState: SearchState = {
    inputValue: '',
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
    },
});

export const selectInputValue = (state: AppState) => state.search.inputValue;
export const selectSearchLoading = (state: AppState) => state.search.isLoading;
export const searchReducer = searchSlice.reducer;

export const { setInputValue, setLoading } = searchSlice.actions;
