import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { cuisines } from '~/mocks/filters';
import { FoodItem } from '~/types/food-item';
import { toggleItemInArray } from '~/utils/toggle-items';

type CuisinesState = {
    cuisines: FoodItem[];
    selectedCuisines: string[];
    isLoading: boolean;
};

const initialState: CuisinesState = {
    cuisines: cuisines,
    selectedCuisines: [],
    isLoading: false,
};

export const cuisinesSlice = createSlice({
    name: 'cuisines',
    initialState,
    reducers: {
        setCuisines(state, action: PayloadAction<FoodItem[]>) {
            state.cuisines = action.payload;
            state.isLoading = false;
        },

        toggleCuisine(state, action: PayloadAction<string>) {
            state.selectedCuisines = toggleItemInArray(state.selectedCuisines, action.payload);
        },
        clearSelectedCuisines(state) {
            state.selectedCuisines = [];
        },

        setLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },
    },
    selectors: {
        selectCuisines: (state) => state.cuisines,
        selectSelectedCuisines: (state) => state.selectedCuisines,
        selectIsLoading: (state) => state.isLoading,
    },
});

export const { setCuisines, toggleCuisine, setLoading, clearSelectedCuisines } =
    cuisinesSlice.actions;

export const { selectCuisines, selectIsLoading, selectSelectedCuisines } = cuisinesSlice.selectors;

export const cuisinesReducer = cuisinesSlice.reducer;
