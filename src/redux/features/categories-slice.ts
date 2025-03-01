import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { navMenu } from '~/mocks/nav-menu';
import { MenuItem } from '~/types/category';
import { AppState } from '~/types/store';
import { toggleItemInArray } from '~/utils/toggle-items';

type CategoriesState = {
    menu: MenuItem[];
    selectedCategories: string[];
    isLoading: boolean;
};

const initialState: CategoriesState = { menu: navMenu, selectedCategories: [], isLoading: false };

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        setCategories(state, action: PayloadAction<MenuItem[]>) {
            state.menu = action.payload;
        },
        toggleCategory(state, action: PayloadAction<string>) {
            state.selectedCategories = toggleItemInArray(state.selectedCategories, action.payload);
        },
        clearSelectedCategories(state) {
            state.selectedCategories = [];
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },
    },
});

export const selectCategoriesLoading = (state: AppState) => state.categories.isLoading;
export const selectCategoriesMenu = (state: AppState) => state.categories.menu;
export const selectSelectedCategories = (state: AppState) => state.categories.selectedCategories;

export const categoriesReducer = categoriesSlice.reducer;
export const { setCategories, toggleCategory, clearSelectedCategories, setLoading } =
    categoriesSlice.actions;
