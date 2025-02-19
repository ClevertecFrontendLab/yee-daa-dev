import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { meats } from '../../mocks/filters';
import { FoodItem } from '../../types/food-item';
import { AppState } from '../../types/store';
import { toggleItemInArray } from '../../utils/toggle-items';

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
});

export const selectMeats = (state: AppState) => state.meats.meats;
export const selectSelectedMeats = (state: AppState) => state.meats.selectedMeats;
export const selectIsLoading = (state: AppState) => state.meats.isLoading;

export const { setMeats, toggleMeat, setLoading, clearSelectedMeats } = meatsSlice.actions;

export const meatsReducer = meatsSlice.reducer;
