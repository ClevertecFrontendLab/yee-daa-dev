import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { cuisines } from '../../mocks/filters';
import { FoodItem } from '../../types/food-item';
import { AppState } from '../../types/store';

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

        selectCuisine(state, action: PayloadAction<string>) {
            const allergen = action.payload;
            if (!state.selectedCuisines.includes(allergen)) {
                state.selectedCuisines.push(allergen);
            }
        },
        deselectAllergen(state, action: PayloadAction<string>) {
            state.selectedCuisines = state.selectedCuisines.filter(
                (item) => item !== action.payload,
            );
        },
        clearSelectedAllergens(state) {
            state.selectedCuisines = [];
        },

        setLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },
    },
});

export const selectCuisines = (state: AppState) => state.cuisines.cuisines;
export const selectSelectedCuisines = (state: AppState) => state.cuisines.selectedCuisines;
export const selectIsLoading = (state: AppState) => state.cuisines.isLoading;

export const { setCuisines, selectCuisine, deselectAllergen } = cuisinesSlice.actions;

export const cuisinesReducer = cuisinesSlice.reducer;
