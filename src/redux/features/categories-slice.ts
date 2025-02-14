import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { navMenu } from '../../mocks/nav-menu';
import { MenuItem } from '../../types/category';
import { AppState } from '../../types/store';

type CategoriesState = {
    menu: MenuItem[];
    isLoading: boolean;
};

const initialState: CategoriesState = { menu: navMenu, isLoading: false };

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        setCategories(state, action: PayloadAction<MenuItem[]>) {
            state.menu = action.payload;
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },
    },
});

export const selectCategoriesLoading = (state: AppState) => state.categories.isLoading;
export const selectCategoriesMenu = (state: AppState) => state.categories.menu;

export const categoriesReducer = categoriesSlice.reducer;
export const { setCategories, setLoading } = categoriesSlice.actions;
