import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { sides } from '~/mocks/filters';
import { FoodItem } from '~/types/food-item';
import { toggleItemInArray } from '~/utils/toggle-items';

type SidesState = {
    sides: FoodItem[];
    selectedSides: string[];
};

const initialState: SidesState = {
    sides: sides,
    selectedSides: [],
};

export const sidesSlice = createSlice({
    name: 'sides',
    initialState,
    reducers: {
        setSides(state, action: PayloadAction<FoodItem[]>) {
            state.sides = action.payload;
        },

        toggleSide(state, action: PayloadAction<string>) {
            state.selectedSides = toggleItemInArray(state.selectedSides, action.payload);
        },
        clearSelectedSides(state) {
            state.selectedSides = [];
        },
    },
    selectors: {
        selectSides: (state) => state.sides,
        selectSelectedSides: (state) => state.selectedSides,
    },
});

export const { selectSelectedSides, selectSides } = sidesSlice.selectors;

export const { setSides, toggleSide, clearSelectedSides } = sidesSlice.actions;

export const sidesReducer = sidesSlice.reducer;
