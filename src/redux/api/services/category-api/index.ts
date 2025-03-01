import { createApi } from '@reduxjs/toolkit/query/react';

import { NotificationMessages } from '~/constants/notification-messages';
import { ApiEndpoints, NOTIFICATION_STATE_NAME } from '~/redux/api/constants';
import { baseQuery } from '~/redux/api/get-base-query';
import {
    CategoriesRawResponse,
    CategoriesResponse,
    Category,
    CategoryRaw,
} from '~/redux/api/types/categories';
import { StatusTypesEnum } from '~/redux/api/types/common';

export const categoryApi = createApi({
    reducerPath: 'categoryApi',
    baseQuery,
    endpoints: (build) => ({
        getAllCategories: build.query<CategoriesResponse, void>({
            query: () => ({ url: ApiEndpoints.Category }),
            transformResponse: (response: CategoriesRawResponse): CategoriesResponse =>
                response.map((resp) => ({ ...resp, id: resp._id })),
            //TODO поменять под нотификашку с дизайна константы ошибок
            transformErrorResponse: (response) => ({
                ...response,
                [NOTIFICATION_STATE_NAME]: {
                    status: StatusTypesEnum.Error,
                    message: NotificationMessages.ERROR_GENERAL_TITLE,
                    description: NotificationMessages.ERROR_GENERAL_DESCRIPTION,
                },
            }),
        }),
        getCategoryById: build.query<Category, void>({
            query: (id) => ({ url: `${ApiEndpoints.Category}/${id}` }),
            transformResponse: (response: CategoryRaw): Category => ({
                ...response,
                id: response._id,
            }),
            //TODO поменять под нотификашку с дизайна константы ошибок
            transformErrorResponse: (response) => ({
                ...response,
                [NOTIFICATION_STATE_NAME]: {
                    status: StatusTypesEnum.Error,
                    message: NotificationMessages.ERROR_GENERAL_TITLE,
                    description: NotificationMessages.ERROR_GENERAL_DESCRIPTION,
                },
            }),
        }),
    }),
});

export const { useGetAllCategoriesQuery, useGetCategoryByIdQuery } = categoryApi;
