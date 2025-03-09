import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { isArrayWithItems } from '~/utils/is-array-with-items';
import { getDataFromLocalStorage, LOCALSTORAGE_KEYS } from '~/utils/local-storage-util';
import { toggleItemInArray } from '~/utils/toggle-items';

import { Category, SubCategory } from '../api/types/categories';

type CategoriesState = {
    categories: Category[];
    subCategories: SubCategory[];
    selectedSubCategoriesIds: string[];
    isLoading: boolean;
};

const initCategories = getDataFromLocalStorage(LOCALSTORAGE_KEYS.CATEGORIES) as Category[];
const initSubCategories = getDataFromLocalStorage(LOCALSTORAGE_KEYS.SUBCATEGORIES) as SubCategory[];

const initialState: CategoriesState = {
    categories: isArrayWithItems(initCategories) ? initCategories : [],
    subCategories: isArrayWithItems(initSubCategories) ? initSubCategories : [],
    selectedSubCategoriesIds: [],
    isLoading: false,
};

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        setCategories(state, { payload }: PayloadAction<Category[]>) {
            state.categories = payload;
        },
        setSubCategories(state, { payload }: PayloadAction<SubCategory[]>) {
            state.subCategories = payload;
        },
        toggleCategory(state, { payload }: PayloadAction<string>) {
            state.selectedSubCategoriesIds = toggleItemInArray(
                state.selectedSubCategoriesIds,
                payload,
            );
        },
        clearSelectedCategories(state) {
            state.selectedSubCategoriesIds = [];
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
        selectCategoriesMenu: (state) => state.categories,
        selectSelectedCategories: (state) => state.selectedSubCategoriesIds,
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
