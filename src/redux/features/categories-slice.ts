import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { isArrayWithItems } from '~/utils/is-array-with-items';
import { getDataFromLocalStorage, LOCALSTORAGE_KEYS } from '~/utils/local-storage-util';
import { toggleItemInArray } from '~/utils/toggle-items';

import { Category, SubCategory } from '../api/types/categories';

type CategoriesState = {
    categories: Category[];
    subCategories: SubCategory[];
    selectedSubCategoriesIds: string[];
    selectedCategories: string[];
};

const initCategories = getDataFromLocalStorage(LOCALSTORAGE_KEYS.CATEGORIES) as Category[];
const initSubCategories = getDataFromLocalStorage(LOCALSTORAGE_KEYS.SUBCATEGORIES) as SubCategory[];

const initialState: CategoriesState = {
    categories: isArrayWithItems(initCategories) ? initCategories : [],
    subCategories: isArrayWithItems(initSubCategories) ? initSubCategories : [],
    selectedSubCategoriesIds: [],
    selectedCategories: [],
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
            state.selectedCategories = toggleItemInArray(state.selectedCategories, payload);
        },
        updateSelectedSubCategoriesIds(state) {
            const currSelectedCategories = state.categories;

            const foundSubCategories = currSelectedCategories.reduce<string[]>((_, curr) => {
                const { subCategories } = curr;
                return subCategories.map((elem) => elem.id);
            }, []);

            state.selectedSubCategoriesIds = Array.from(new Set(foundSubCategories));
        },
        resetSelectedCategories(state) {
            state.selectedCategories = [];
            state.selectedSubCategoriesIds = [];
        },
        resetToInit() {
            return initialState;
        },
    },
    selectors: {
        selectCategoriesMenu: (state) => state.categories,
        selectSelectedCategories: (state) => state.selectedCategories,
        selectSelectedSubCategoriesIds: (state) => state.selectedSubCategoriesIds,
        selectSubCategories: (state) => state.subCategories,
    },
});

export const categoriesReducer = categoriesSlice.reducer;

export const {
    setCategories,
    toggleCategory,
    resetSelectedCategories,
    setSubCategories,
    resetToInit,
    updateSelectedSubCategoriesIds,
} = categoriesSlice.actions;

export const {
    selectCategoriesMenu,
    selectSelectedCategories,
    selectSubCategories,
    selectSelectedSubCategoriesIds,
} = categoriesSlice.selectors;
