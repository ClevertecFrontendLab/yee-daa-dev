import { createSlice } from '@reduxjs/toolkit';

import { AppState } from '~/types/store';

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
});

export const drawerReducer = drawerSlice.reducer;
export const selectDrawer = (state: AppState) => state.drawer.isOpen;
export const { openDrawer, closeDrawer } = drawerSlice.actions;
