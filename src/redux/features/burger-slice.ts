import { createSlice } from '@reduxjs/toolkit';

import { AppState } from '../../types/store';

const initialState = {
    isOpen: false,
    isClicked: false,
};

export const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        toggleMenu: (state) => {
            state.isOpen = !state.isOpen;
            state.isClicked = false;
        },
        openMenu: (state) => {
            state.isOpen = true;
            state.isClicked = false;
        },
        closeMenu: (state) => {
            state.isOpen = false;
            state.isClicked = false;
        },
        setClicked: (state, action) => {
            state.isClicked = action.payload;
        },
    },
});

export const { toggleMenu, openMenu, closeMenu, setClicked } = menuSlice.actions;
export const selectMenu = (state: AppState) => state.menu.isOpen;
export const selectIsClicked = (state: AppState) => state.menu.isClicked;

export const menuReducer = menuSlice.reducer;
