import { createSlice } from '@reduxjs/toolkit';

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
    selectors: {
        selectMenu: (state) => state.isOpen,
        selectIsClicked: (state) => state.isClicked,
    },
});

export const { toggleMenu, openMenu, closeMenu, setClicked } = menuSlice.actions;

export const { selectIsClicked, selectMenu } = menuSlice.selectors;

export const menuReducer = menuSlice.reducer;
