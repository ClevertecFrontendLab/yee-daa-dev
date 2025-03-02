import { createSlice } from '@reduxjs/toolkit';

export const drawerSlice = createSlice({
    name: 'drawer',
    initialState: {
        isOpen: false,
    },
    reducers: {
        openDrawer: (state) => {
            state.isOpen = true;
        },
        closeDrawer: (state) => {
            state.isOpen = false;
        },
    },
    selectors: {
        selectDrawer: (state) => state.isOpen,
    },
});

export const drawerReducer = drawerSlice.reducer;

export const { selectDrawer } = drawerSlice.selectors;

export const { openDrawer, closeDrawer } = drawerSlice.actions;
