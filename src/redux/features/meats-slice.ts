import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { meats } from '~/mocks/filters';
import { FoodItem } from '~/types/food-item';
import { toggleItemInArray } from '~/utils/toggle-items';

type MeatsState = {
    meats: FoodItem[];
    selectedMeats: string[];
    isLoading: boolean;
};

const initialState: MeatsState = {
    meats: meats,
    selectedMeats: [],
    isLoading: false,
};

export const meatsSlice = createSlice({
    name: 'meats',
    initialState,
    reducers: {
        setMeats(state, action: PayloadAction<FoodItem[]>) {
            state.meats = action.payload;
            state.isLoading = false;
        },
        toggleMeat(state, action: PayloadAction<string>) {
            state.selectedMeats = toggleItemInArray(state.selectedMeats, action.payload);
        },
        clearSelectedMeats(state) {
            state.selectedMeats = [];
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },
    },
    selectors: {
        selectMeats: (state) => state.meats,
        selectSelectedMeats: (state) => state.selectedMeats,
        selectIsLoading: (state) => state.isLoading,
    },
});

export const { selectIsLoading, selectMeats, selectSelectedMeats } = meatsSlice.selectors;

export const { setMeats, toggleMeat, setLoading, clearSelectedMeats } = meatsSlice.actions;

export const meatsReducer = meatsSlice.reducer;
