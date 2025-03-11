import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { authors } from '~/mocks/filters';
import { UserProps } from '~/types/user';
import { toggleItemInArray } from '~/utils/toggle-items';

type AuthorsState = {
    authors: UserProps[];
    selectedAuthors: string[];
};

const initialState: AuthorsState = {
    authors: authors,
    selectedAuthors: [],
};

export const authorsSlice = createSlice({
    name: 'authors',
    initialState,
    reducers: {
        setAuthors(state, action: PayloadAction<UserProps[]>) {
            state.authors = action.payload;
        },

        toggleAuthor(state, action: PayloadAction<string>) {
            state.selectedAuthors = toggleItemInArray(state.selectedAuthors, action.payload);
        },
        clearSelectedAuthors(state) {
            state.selectedAuthors = [];
        },
    },
    selectors: {
        selectAuthors: (state) => state.authors,
        selectSelectedAuthors: (state) => state.selectedAuthors,
    },
});

export const { setAuthors, toggleAuthor, clearSelectedAuthors } = authorsSlice.actions;

export const { selectAuthors, selectSelectedAuthors } = authorsSlice.selectors;

export const authorsReducer = authorsSlice.reducer;
