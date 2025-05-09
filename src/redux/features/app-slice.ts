import { AlertProps } from '@chakra-ui/react';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type NotificationData = {
    status: AlertProps['status'];
    title: string;
    description?: string;
};

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        isLoading: false,
        isNotificationShowed: false,
        notificationData: { status: 'error', description: '', title: '' } as NotificationData,
    },
    reducers: {
        setAppLoading: (state, { payload }: PayloadAction<boolean>) => {
            state.isLoading = payload;
        },
        setNotificationVisibility: (state, { payload }: PayloadAction<boolean>) => {
            state.isNotificationShowed = payload;
        },
        setNotificationData: (state, { payload }: PayloadAction<NotificationData>) => {
            state.notificationData = payload;
        },
        resetNotification: (state) => {
            state.isNotificationShowed = false;
            state.notificationData = { status: 'error', description: '', title: '' };
        },
    },
    selectors: {
        appLoadingSelector: (state) => state.isLoading,
        notificationShowedSelector: (state) => state.isNotificationShowed,
        notificationDataSelector: (state) => state.notificationData,
    },
});

export const appReducer = appSlice.reducer;

export const { setAppLoading, setNotificationData, setNotificationVisibility, resetNotification } =
    appSlice.actions;
export const { appLoadingSelector, notificationDataSelector, notificationShowedSelector } =
    appSlice.selectors;
