import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { MenuItem } from '~/types/category';

export type ChosenCategory = MenuItem & {
    chosenSubCategory: MenuItem | null;
};

export const initialState: ChosenCategory = {
    id: '',
    title: '',
    category: '',
    description: '',
    chosenSubCategory: null,
};

export const chosenCategorySlice = createSlice({
    name: 'chosenCategory',
    initialState,
    reducers: {
        setChosenCategory(_state, action: PayloadAction<ChosenCategory>) {
            return action.payload;
        },
        clearChosenCategory() {
            return initialState;
        },
    },
    selectors: {
        selectChosenCategory: (state) => state,
    },
});

export const { setChosenCategory, clearChosenCategory } = chosenCategorySlice.actions;

export const { selectChosenCategory } = chosenCategorySlice.selectors;

export const chosenCategoryReducer = chosenCategorySlice.reducer;
