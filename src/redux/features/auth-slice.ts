import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthSliceState = {
    accessToken: string;
};

export const initialState: AuthSliceState = {
    accessToken: '',
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAccessToken: (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload;
        },

        resetAuth: () => initialState,
    },
    selectors: {
        selectAccessToken: (state) => state.accessToken,
    },
});

export const authReducer = authSlice.reducer;
export const { setAccessToken, resetAuth } = authSlice.actions;
export const { selectAccessToken } = authSlice.selectors;
