import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { allergens } from '~/mocks/allergens';
import { Allergen } from '~/types/allergens';

type AllergensState = {
    allergens: Allergen[];
    selectedAllergens: string[];
    switcherState: boolean;
    fromFilter: boolean;
};

const initialState: AllergensState = {
    allergens: allergens,
    selectedAllergens: [],
    switcherState: false,
    fromFilter: false,
};

export const allergenSlice = createSlice({
    name: 'allergens',
    initialState,
    reducers: {
        setAllergens(state, action: PayloadAction<Allergen[]>) {
            state.allergens = action.payload;
        },
        addAllergen(state, action: PayloadAction<string>) {
            const newAllergen = {
                value: action.payload.toLowerCase().replace(/\s/g, ''),
                label: action.payload,
            };
            state.allergens.push(newAllergen);
        },
        selectAllergen(state, action: PayloadAction<string>) {
            const allergen = action.payload;
            if (!state.selectedAllergens.includes(allergen)) {
                state.selectedAllergens.push(allergen);
            }
        },
        deselectAllergen(state, action: PayloadAction<string>) {
            state.selectedAllergens = state.selectedAllergens.filter(
                (item) => item !== action.payload,
            );
        },
        clearSelectedAllergens(state) {
            state.selectedAllergens = [];
        },
        setFromFilter(state, action: PayloadAction<boolean>) {
            state.fromFilter = action.payload;
        },
        toggleSwitcher: (state) => {
            state.switcherState = !state.switcherState;
        },
        resetAllergenSlice: () => initialState,
    },
    selectors: {
        selectAllergens: (state) => state.allergens,
        selectSelectedAllergens: (state) => state.selectedAllergens,
        selectFromFilter: (state) => state.fromFilter,
        selectSwitcherState: (state) => state.switcherState,
    },
});

export const {
    setAllergens,
    addAllergen,
    selectAllergen,
    deselectAllergen,
    clearSelectedAllergens,
    setFromFilter,
    toggleSwitcher,
    resetAllergenSlice,
} = allergenSlice.actions;

export const { selectAllergens, selectSelectedAllergens, selectFromFilter, selectSwitcherState } =
    allergenSlice.selectors;

export const allergenReducer = allergenSlice.reducer;
