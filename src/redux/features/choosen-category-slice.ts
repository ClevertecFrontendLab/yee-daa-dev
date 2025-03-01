import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { MenuItem } from '~/types/category';
import { AppState } from '~/types/store';

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
});

export const selectChoosenCategory = (state: AppState) => state.choosenCategory;

export const { setChoosenCategory, clearChoosenCategory } = choosenCategorySlice.actions;
export const choosenCategoryReducer = choosenCategorySlice.reducer;
