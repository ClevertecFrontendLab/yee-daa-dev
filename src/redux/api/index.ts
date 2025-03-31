import {
    BaseQueryFn,
    createApi,
    FetchArgs,
    fetchBaseQuery,
    FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';

import { AppState } from '~/types/store';

import { resetAuth, setAccessToken } from '../features/auth-slice';
import { ACCESS_TOKEN_HEADER, API_BASE_URL, API_DEV_URL, ApiEndpoints } from './constants';
import { requestQueue } from './request-queue';

const BASE_URL = Number(import.meta.env.VITE_START_LOCAL_SERVER) ? API_DEV_URL : API_BASE_URL;

const baseAuthQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as AppState).auth.accessToken;

        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
    credentials: 'include',
});

const reauthQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args,
    api,
    extraOptions,
) => {
    let result = await baseAuthQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
        if (requestQueue.shouldSubscribe) {
            return new Promise((resolve, reject) => {
                requestQueue.subscribe(async () => {
                    try {
                        const queuedResult = await baseAuthQuery(args, api, extraOptions);
                        resolve(queuedResult);
                    } catch (error) {
                        reject(error);
                    }
                });
            });
        }

        requestQueue.shouldSubscribe = true;

        const refreshResult = await baseAuthQuery(
            {
                url: ApiEndpoints.RefreshToken,
                method: 'GET',
            },
            api,
            extraOptions,
        );

        if (refreshResult.error) {
            api.dispatch(resetAuth());
            requestQueue.reset();

            return result;
        }

        const newAccessToken = refreshResult.meta?.response?.headers.get(ACCESS_TOKEN_HEADER) ?? '';
        api.dispatch(setAccessToken(newAccessToken));

        requestQueue.notify();
        result = await baseAuthQuery(args, api, extraOptions);
    }

    return result;
};

export const unauthorizedApi = createApi({
    reducerPath: 'unauthorized-api',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: () => ({}),
});

export const authorizedApi = createApi({
    reducerPath: 'authorized-api',
    baseQuery: reauthQuery,
    endpoints: () => ({}),
});
