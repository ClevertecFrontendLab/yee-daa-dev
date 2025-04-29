import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { FilterDrawer } from '~/components/drawer';

type FilterDrawer = {
    isOpen: boolean;
    isFiltering: boolean;
};

const initialState: FilterDrawer = {
    isOpen: false,
    isFiltering: false,
};

export const filterDrawerSlice = createSlice({
    name: 'filterDrawer',
    initialState,
    reducers: {
        openDrawer: (state) => {
            state.isOpen = true;
        },
        closeDrawer: (state) => {
            state.isOpen = false;
        },
        setIsFiltering: (state, { payload }: PayloadAction<boolean>) => {
            state.isFiltering = payload;
        },
    },
    selectors: {
        selectDrawer: (state) => state.isOpen,
        selectIsFiltering: (state) => state.isFiltering,
    },
});

export const filterDrawerReducer = filterDrawerSlice.reducer;

export const { selectDrawer, selectIsFiltering } = filterDrawerSlice.selectors;

export const { openDrawer, closeDrawer, setIsFiltering } = filterDrawerSlice.actions;
