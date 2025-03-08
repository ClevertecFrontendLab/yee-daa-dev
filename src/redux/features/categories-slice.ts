import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { isArrayWithItems } from '~/utils/is-array-with-items';
import { getDataFromLocalStorage, LOCALSTORAGE_KEYS } from '~/utils/local-storage-util';
import { toggleItemInArray } from '~/utils/toggle-items';

import { Category, SubCategory } from '../api/types/categories';

type CategoriesState = {
    menu: Category[];
    subCategories: SubCategory[];
    selectedCategories: string[];
    isLoading: boolean;
};

const initCategories = getDataFromLocalStorage(LOCALSTORAGE_KEYS.CATEGORIES) as Category[];
const initSubCategories = getDataFromLocalStorage(LOCALSTORAGE_KEYS.SUBCATEGORIES) as SubCategory[];

const initialState: CategoriesState = {
    menu: isArrayWithItems(initCategories) ? initCategories : [],
    subCategories: isArrayWithItems(initSubCategories) ? initSubCategories : [],
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
        resetToInit() {
            return initialState;
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
    resetToInit,
} = categoriesSlice.actions;

export const {
    selectCategoriesLoading,
    selectCategoriesMenu,
    selectSelectedCategories,
    selectSubCategories,
} = categoriesSlice.selectors;
