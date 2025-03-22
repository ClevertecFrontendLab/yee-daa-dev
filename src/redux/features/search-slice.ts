import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SearchState = {
    inputValue: string;
    selectedPage: number;
    isLoading: boolean;
};

export const initialState: SearchState = {
    inputValue: '',
    selectedPage: 1,
    isLoading: false,
};

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setInputValue(state, action: PayloadAction<string>) {
            state.inputValue = action.payload;
        },
        setSelectedPage(state, { payload }: PayloadAction<number>) {
            state.selectedPage = payload;
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },
    },
    selectors: {
        selectInputValue: (state) => state.inputValue,
        selectSearchLoading: (state) => state.isLoading,
        selectSelectedPage: (state) => state.selectedPage,
    },
});

export const { setInputValue, setLoading, setSelectedPage } = searchSlice.actions;
export const searchReducer = searchSlice.reducer;

export const { selectInputValue, selectSearchLoading, selectSelectedPage } = searchSlice.selectors;
