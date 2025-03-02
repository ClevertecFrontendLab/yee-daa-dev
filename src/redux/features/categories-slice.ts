import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { navMenu } from '~/mocks/nav-menu';
import { MenuItem } from '~/types/category';
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
    selectors: {
        selectCategoriesLoading: (state) => state.isLoading,
        selectCategoriesMenu: (state) => state.menu,
        selectSelectedCategories: (state) => state.selectedCategories,
    },
});

export const categoriesReducer = categoriesSlice.reducer;

export const { setCategories, toggleCategory, clearSelectedCategories, setLoading } =
    categoriesSlice.actions;

export const { selectCategoriesLoading, selectCategoriesMenu, selectSelectedCategories } =
    categoriesSlice.selectors;
