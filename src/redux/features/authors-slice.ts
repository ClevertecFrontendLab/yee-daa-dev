import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { authors } from '../../mocks/filters';
import { AppState } from '../../types/store';
import { UserProps } from '../../types/user';

type AuthorsState = {
    authors: UserProps[];
    selectedAuthors: string[];
    isLoading: boolean;
};

const initialState: AuthorsState = {
    authors: authors,
    selectedAuthors: [],
    isLoading: false,
};

export const authorsSlice = createSlice({
    name: 'authors',
    initialState,
    reducers: {
        setAuthors(state, action: PayloadAction<UserProps[]>) {
            state.authors = action.payload;
            state.isLoading = false;
        },

        selectCuisine(state, action: PayloadAction<string>) {
            const allergen = action.payload;
            if (!state.selectedAuthors.includes(allergen)) {
                state.selectedAuthors.push(allergen);
            }
        },
        deselectAllergen(state, action: PayloadAction<string>) {
            state.selectedAuthors = state.selectedAuthors.filter((item) => item !== action.payload);
        },
        clearSelectedAllergens(state) {
            state.selectedAuthors = [];
        },

        setLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },
    },
});

export const selectAuthors = (state: AppState) => state.authors.authors;
export const selectSelectedAuthors = (state: AppState) => state.authors.selectedAuthors;
export const selectIsLoading = (state: AppState) => state.authors.isLoading;

export const { setAuthors, selectCuisine, deselectAllergen } = authorsSlice.actions;

export const authorsReducer = authorsSlice.reducer;
