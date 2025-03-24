import { Middleware } from '@reduxjs/toolkit';

import { resetAuth } from '~/redux/features/auth-slice';
import { LOCALSTORAGE_KEYS, removeDataFromLocalStorage } from '~/utils/local-storage-util';

export const resetAuthMiddleware: Middleware = () => (next) => (action) => {
    if (resetAuth.match(action)) {
        removeDataFromLocalStorage(LOCALSTORAGE_KEYS.REFRESH_TOKEN);
    }

    return next(action);
};
