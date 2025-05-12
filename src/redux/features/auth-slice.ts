import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthSliceState = {
    accessToken: string;
    userId: string;
};

export const initialState: AuthSliceState = {
    accessToken: '',
    userId: '',
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAccessToken: (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload;
        },

        resetAuth: () => initialState,
        setUserId: (state, action: PayloadAction<string>) => {
            state.userId = action.payload;
        },
    },
    selectors: {
        selectAccessToken: (state) => state.accessToken,
        selectUserId: (state) => state.userId,
    },
});

export const authReducer = authSlice.reducer;
export const { setAccessToken, setUserId, resetAuth } = authSlice.actions;
export const { selectAccessToken, selectUserId } = authSlice.selectors;
