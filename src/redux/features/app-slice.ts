import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        isLoading: false,
    },
    reducers: {
        setAppLoading: (state, { payload }: PayloadAction<boolean>) => {
            state.isLoading = payload;
        },
    },
    selectors: {
        appLoadingSelector: (state) => state.isLoading,
    },
});

export const appReducer = appSlice.reducer;

export const { setAppLoading } = appSlice.actions;
export const { appLoadingSelector } = appSlice.selectors;
