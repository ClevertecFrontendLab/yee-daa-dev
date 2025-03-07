import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { toggleItemInArray } from '~/utils/toggle-items';

import { Category, SubCategory } from '../api/types/categories';

type CategoriesState = {
    menu: Category[];
    subCategories: SubCategory[];
    selectedCategories: string[];
    isLoading: boolean;
};

const initialState: CategoriesState = {
    menu: [],
    subCategories: [],
    selectedCategories: [],
    isLoading: false,
};

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        setCategories(state, { payload }: PayloadAction<Category[]>) {
            state.menu = payload;
        },
        setSubCategories(state, { payload }: PayloadAction<SubCategory[]>) {
            state.subCategories = payload;
        },
        toggleCategory(state, { payload }: PayloadAction<string>) {
            state.selectedCategories = toggleItemInArray(state.selectedCategories, payload);
        },
        clearSelectedCategories(state) {
            state.selectedCategories = [];
        },
        setLoading(state, { payload }: PayloadAction<boolean>) {
            state.isLoading = payload;
        },
    },
    selectors: {
        selectCategoriesLoading: (state) => state.isLoading,
        selectCategoriesMenu: (state) => state.menu,
        selectSelectedCategories: (state) => state.selectedCategories,
        selectSubCategories: (state) => state.subCategories,
    },
});

export const categoriesReducer = categoriesSlice.reducer;

export const {
    setCategories,
    toggleCategory,
    clearSelectedCategories,
    setLoading,
    setSubCategories,
} = categoriesSlice.actions;

export const {
    selectCategoriesLoading,
    selectCategoriesMenu,
    selectSelectedCategories,
    selectSubCategories,
} = categoriesSlice.selectors;
