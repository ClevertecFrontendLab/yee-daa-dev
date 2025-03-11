import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { allergens } from '~/mocks/allergens';
import { Recipe } from '~/redux/api/types/recipes';
import { Allergen } from '~/types/allergens';

type AllergensState = {
    allergens: Allergen[];
    selectedAllergens: string[];
    filteredByAllergens: Recipe[];
    switcherState: boolean;
    fromFilter: boolean;
    isLoading: boolean;
};

const initialState: AllergensState = {
    allergens: allergens,
    selectedAllergens: [],
    filteredByAllergens: [],
    switcherState: false,
    fromFilter: false,
    isLoading: false,
};

export const allergenSlice = createSlice({
    name: 'allergens',
    initialState,
    reducers: {
        setAllergens(state, action: PayloadAction<Allergen[]>) {
            state.allergens = action.payload;
            state.isLoading = false;
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
        setFilteredByAllergens(state, action: PayloadAction<Recipe[]>) {
            state.filteredByAllergens = action.payload;
        },
        clearFilteredByAllergens(state) {
            state.filteredByAllergens = [];
        },
        setFromFilter(state, action: PayloadAction<boolean>) {
            state.fromFilter = action.payload;
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },
        toggleSwitcher: (state) => {
            state.switcherState = !state.switcherState;
        },
        resetAllergenSlice: () => initialState,
    },
    selectors: {
        selectAllergens: (state) => state.allergens,
        selectSelectedAllergens: (state) => state.selectedAllergens,
        selectFilteredByAllergens: (state) => state.filteredByAllergens,
        selectFromFilter: (state) => state.fromFilter,
        selectIsLoading: (state) => state.isLoading,
        selectSwitcherState: (state) => state.switcherState,
    },
});

export const {
    setAllergens,
    addAllergen,
    selectAllergen,
    deselectAllergen,
    clearSelectedAllergens,
    setLoading,
    setFilteredByAllergens,
    clearFilteredByAllergens,
    setFromFilter,
    toggleSwitcher,
    resetAllergenSlice,
} = allergenSlice.actions;

export const {
    selectAllergens,
    selectFilteredByAllergens,
    selectIsLoading,
    selectSelectedAllergens,
    selectFromFilter,
    selectSwitcherState,
} = allergenSlice.selectors;

export const allergenReducer = allergenSlice.reducer;
