import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { allergens } from '../../mocks/allergens';
import { Allergen } from '../../types/allergens';
import { AppState } from '../../types/store';

interface AllergensState {
    allergens: Allergen[];
    selectedAllergens: string[];
    isLoading: boolean;
    searchTerm: string;
}

const initialState: AllergensState = {
    allergens: allergens,
    selectedAllergens: [],
    isLoading: false,
    searchTerm: '',
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
        setLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },
    },
});

export const selectAllergens = (state: AppState) => state.allergens.allergens;
export const selectSelectedAllergens = (state: AppState) => state.allergens.selectedAllergens;
export const selectIsLoading = (state: AppState) => state.allergens.isLoading;

export const {
    setAllergens,
    addAllergen,
    selectAllergen,
    deselectAllergen,
    clearSelectedAllergens,
    setLoading,
} = allergenSlice.actions;
export const allergenReducer = allergenSlice.reducer;
