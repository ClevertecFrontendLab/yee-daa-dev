import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { meats } from '~/mocks/filters';
import { FoodItem } from '~/types/food-item';
import { toggleItemInArray } from '~/utils/toggle-items';

type MeatsState = {
    meats: FoodItem[];
    selectedMeats: string[];
};

const initialState: MeatsState = {
    meats: meats,
    selectedMeats: [],
};

export const meatsSlice = createSlice({
    name: 'meats',
    initialState,
    reducers: {
        setMeats(state, action: PayloadAction<FoodItem[]>) {
            state.meats = action.payload;
        },
        toggleMeat(state, action: PayloadAction<string>) {
            state.selectedMeats = toggleItemInArray(state.selectedMeats, action.payload);
        },
        clearSelectedMeats(state) {
            state.selectedMeats = [];
        },
    },
    selectors: {
        selectMeats: (state) => state.meats,
        selectSelectedMeats: (state) => state.selectedMeats,
    },
});

export const { selectMeats, selectSelectedMeats } = meatsSlice.selectors;

export const { setMeats, toggleMeat, clearSelectedMeats } = meatsSlice.actions;

export const meatsReducer = meatsSlice.reducer;
