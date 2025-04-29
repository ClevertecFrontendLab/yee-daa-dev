import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQuery } from '~/redux/api/get-base-query';

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery,
    endpoints: () => ({}),
});
