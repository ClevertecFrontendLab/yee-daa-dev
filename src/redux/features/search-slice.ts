import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SearchState = {
    inputValue: string;
    isLoading: boolean;
};

export const initialState: SearchState = {
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
    selectors: {
        selectInputValue: (state) => state.inputValue,
        selectSearchLoading: (state) => state.isLoading,
    },
});

export const { setInputValue, setLoading } = searchSlice.actions;
export const searchReducer = searchSlice.reducer;

export const { selectInputValue, selectSearchLoading } = searchSlice.selectors;
