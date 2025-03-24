import { isRejectedWithValue, Middleware, MiddlewareAPI } from '@reduxjs/toolkit';

import { setNotificationData, setNotificationVisibility } from '~/redux/features/app-slice';

import { WithNotificationState } from '../api/types/common';

export const appErrorMiddleware: Middleware =
    ({ dispatch }: MiddlewareAPI) =>
    (next) =>
    (action) => {
        if (isRejectedWithValue(action)) {
            if (action.payload instanceof Object && 'appNotificationState' in action.payload) {
                const {
                    appNotificationState: { status, title, description },
                } = action.payload as WithNotificationState<unknown>;
                dispatch(setNotificationVisibility(false));
                dispatch(setNotificationData({ status, title, description }));
                dispatch(setNotificationVisibility(true));
            }
        }

        return next(action);
    };
