import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { FilterDrawer } from '~/components/drawer';

import { Recipe } from '../api/types/recipes';

type FilterDrawer = {
    filteredRecipes: Recipe[];
    isOpen: boolean;
    isFiltering: boolean;
};

const initialState: FilterDrawer = {
    isOpen: false,
    isFiltering: false,
    filteredRecipes: [],
};

export const filterDrawerSlice = createSlice({
    name: 'filterDrawer',
    initialState,
    reducers: {
        openDrawer: (state) => {
            state.isOpen = true;
        },
        setFilteredRecipes: (state, { payload }: PayloadAction<Recipe[]>) => {
            state.filteredRecipes = payload;
        },
        clearFilteredRecipes: (state) => {
            state.filteredRecipes = [];
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
        selectFilteredRecipes: (state) => state.filteredRecipes,
        selectIsFiltering: (state) => state.isFiltering,
    },
});

export const filterDrawerReducer = filterDrawerSlice.reducer;

export const { selectDrawer, selectFilteredRecipes, selectIsFiltering } =
    filterDrawerSlice.selectors;

export const { openDrawer, closeDrawer, setFilteredRecipes, clearFilteredRecipes, setIsFiltering } =
    filterDrawerSlice.actions;
