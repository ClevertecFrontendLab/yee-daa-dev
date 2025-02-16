import { createSlice } from '@reduxjs/toolkit';

import { AppState } from '../../types/store';

const initialState = {
    isOpen: false,
};

export const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        toggleMenu: (state) => {
            state.isOpen = !state.isOpen;
        },
        openMenu: (state) => {
            state.isOpen = true;
        },
        closeMenu: (state) => {
            state.isOpen = false;
        },
    },
});

export const { toggleMenu, openMenu, closeMenu } = menuSlice.actions;
export const selectMenu = (state: AppState) => state.menu.isOpen;

export const menuReducer = menuSlice.reducer;
