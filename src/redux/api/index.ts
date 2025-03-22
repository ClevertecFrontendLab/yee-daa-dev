import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_BASE_URL, API_DEV_URL } from './constants';

const BASE_URL = Number(import.meta.env.VITE_START_LOCAL_SERVER) ? API_DEV_URL : API_BASE_URL;

export const unauthorizedApi = createApi({
    reducerPath: 'unauthorized-api',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: () => ({}),
});

const authQuery = fetchBaseQuery({
    prepareHeaders(headers) {
        return headers;
    },
});

export const authorizedApi = createApi({
    reducerPath: 'authorized-api',
    baseQuery: (...args) => authQuery(...args),
    endpoints: () => ({}),
});
