import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { sides } from '~/mocks/filters';
import { FoodItem } from '~/types/food-item';
import { toggleItemInArray } from '~/utils/toggle-items';

type SidesState = {
    sides: FoodItem[];
    selectedSides: string[];
    isLoading: boolean;
};

const initialState: SidesState = {
    sides: sides,
    selectedSides: [],
    isLoading: false,
};

export const sidesSlice = createSlice({
    name: 'sides',
    initialState,
    reducers: {
        setSides(state, action: PayloadAction<FoodItem[]>) {
            state.sides = action.payload;
            state.isLoading = false;
        },

        toggleSide(state, action: PayloadAction<string>) {
            state.selectedSides = toggleItemInArray(state.selectedSides, action.payload);
        },
        clearSelectedSides(state) {
            state.selectedSides = [];
        },

        setLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },
    },
    selectors: {
        selectSides: (state) => state.sides,
        selectSelectedSides: (state) => state.selectedSides,
        selectIsLoading: (state) => state.isLoading,
    },
});

export const { selectIsLoading, selectSelectedSides, selectSides } = sidesSlice.selectors;

export const { setSides, toggleSide, setLoading, clearSelectedSides } = sidesSlice.actions;

export const sidesReducer = sidesSlice.reducer;
