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
import { setCategories } from '~/redux/features/categories-slice';
import { isArrayWithItems } from '~/utils/is-array-with-items';

export const categoryApi = createApi({
    reducerPath: 'categoryApi',
    baseQuery,
    endpoints: (build) => ({
        getAllCategories: build.query<CategoriesResponse, void>({
            query: () => ({ url: ApiEndpoints.Category }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    const dataWithSubCategories = data.filter((category) =>
                        isArrayWithItems(category.subCategories),
                    );

                    dispatch(setCategories(dataWithSubCategories));
                } catch (err: unknown) {
                    console.error('Error get Category list\n', err);
                }
            },
            transformResponse: (response: CategoriesRawResponse): CategoriesResponse =>
                response.map((resp) =>
                    resp._id
                        ? {
                              ...resp,
                              id: resp._id,
                          }
                        : resp,
                ),

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
            transformResponse: (response: CategoryRaw): Category =>
                response._id
                    ? {
                          ...response,
                          id: response._id,
                      }
                    : response,

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
