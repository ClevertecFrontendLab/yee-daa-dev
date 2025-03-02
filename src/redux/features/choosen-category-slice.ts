import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { MenuItem } from '~/types/category';

export type ChoosenCategory = MenuItem & {
    choosenSubCategory: MenuItem | null;
};

export const initialState: ChoosenCategory = {
    title: '',
    category: '',
    description: '',
    choosenSubCategory: null,
};

export const choosenCategorySlice = createSlice({
    name: 'choosenCategory',
    initialState,
    reducers: {
        setChoosenCategory(_state, action: PayloadAction<ChoosenCategory>) {
            return action.payload;
        },
        clearChoosenCategory() {
            return initialState;
        },
    },
    selectors: {
        selectChoosenCategory: (state) => state.choosenSubCategory,
    },
});

export const { setChoosenCategory, clearChoosenCategory } = choosenCategorySlice.actions;

export const { selectChoosenCategory } = choosenCategorySlice.selectors;

export const choosenCategoryReducer = choosenCategorySlice.reducer;
