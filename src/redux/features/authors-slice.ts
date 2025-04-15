import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { authors } from '../../mocks/filters';
import { AppState } from '../../types/store';
import { UserProps } from '../../types/user';
import { toggleItemInArray } from '../../utils/toggle-items';

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

        toggleAuthor(state, action: PayloadAction<string>) {
            state.selectedAuthors = toggleItemInArray(state.selectedAuthors, action.payload);
        },
        clearSelectedAuthors(state) {
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

export const { setAuthors, toggleAuthor, clearSelectedAuthors } = authorsSlice.actions;

export const authorsReducer = authorsSlice.reducer;
