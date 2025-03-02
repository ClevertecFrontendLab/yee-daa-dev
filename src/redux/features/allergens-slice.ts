import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { allergens } from '~/mocks/allergens';
import { Allergen } from '~/types/allergens';
import { Recipe } from '~/types/recipe';

type AllergensState = {
    allergens: Allergen[];
    selectedAllergens: string[];
    filteredByAllergens: Recipe[];
    isfromFilter: boolean;
    isLoading: boolean;
};

const initialState: AllergensState = {
    allergens: allergens,
    selectedAllergens: [],
    filteredByAllergens: [],
    isfromFilter: false,
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
        setisfromFilter(state, action: PayloadAction<boolean>) {
            state.isfromFilter = action.payload;
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },
    },
    selectors: {
        selectAllergens: (state) => state.allergens,
        selectSelectedAllergens: (state) => state.selectedAllergens,
        selectFilteredByAllergens: (state) => state.filteredByAllergens,
        selectisfromFilter: (state) => state.isfromFilter,
        selectIsLoading: (state) => state.isLoading,
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
    setisfromFilter,
} = allergenSlice.actions;

export const {
    selectAllergens,
    selectFilteredByAllergens,
    selectIsLoading,
    selectSelectedAllergens,
    selectisfromFilter,
} = allergenSlice.selectors;

export const allergenReducer = allergenSlice.reducer;
