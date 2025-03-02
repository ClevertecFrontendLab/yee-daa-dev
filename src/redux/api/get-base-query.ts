import {
    BaseQueryFn,
    FetchArgs,
    fetchBaseQuery,
    FetchBaseQueryError,
} from '@reduxjs/toolkit/query';

import { AppState } from '~/types/store';

import { API_BASE_URL, API_DEV_URL } from './constants';

const isDevMode = process.env.NODE_ENV === 'development';

const baseQueryWithAuth = fetchBaseQuery({
    baseUrl: isDevMode ? API_DEV_URL : API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
        const state = getState() as AppState;
        console.log(state);
        // логика авторизации будет
        // const accessToken = accessTokenSelector(state);

        // if (accessToken) {
        //     headers.set('Authorization', `Bearer ${accessToken}`);
        // }

        return headers;
    },
});

const mainBaseQuery = fetchBaseQuery({
    baseUrl: API_DEV_URL,
});

export const baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args,
    api,
    extraOptions: { auth?: boolean },
) => {
    if (!extraOptions || !extraOptions.auth) {
        return mainBaseQuery(args, api, extraOptions);
    }

    return baseQueryWithAuth(args, api, extraOptions);
};
