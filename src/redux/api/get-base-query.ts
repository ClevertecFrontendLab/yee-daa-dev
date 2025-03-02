import {
    BaseQueryFn,
    FetchArgs,
    fetchBaseQuery,
    FetchBaseQueryError,
} from '@reduxjs/toolkit/query';

import { AppState } from '~/types/store';

import { API_BASE_URL, API_DEV_URL } from './constants';

const BASE_URL = process.env.NODE_ENV === 'development' ? API_DEV_URL : API_BASE_URL;

const baseQueryWithAuth = fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
        const state = getState() as AppState;
        console.log(state.app.isLoading);
        // логика авторизации будет
        // const accessToken = accessTokenSelector(state);

        // if (accessToken) {
        //     headers.set('Authorization', `Bearer ${accessToken}`);
        // }

        return headers;
    },
});

const mainBaseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
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
