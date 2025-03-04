import { createApi } from '@reduxjs/toolkit/query/react';

import { ApiEndpoints } from '~/redux/api/constants';
import { baseQuery } from '~/redux/api/get-base-query';
import {
    CategoriesRawResponse,
    CategoriesResponse,
    Category,
    CategoryRaw,
} from '~/redux/api/types/categories';
import { setCategories } from '~/redux/features/categories-slice';
import { isArrayWithItems } from '~/utils/is-array-with-items';

import { replaceUnderScoreId } from '../../utils/replace-underscore-id';
import { transformBaseErrorResponse } from '../../utils/transform-base-error-response';

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
                response.map((resp) => replaceUnderScoreId(resp)),

            transformErrorResponse: transformBaseErrorResponse,
        }),
        getCategoryById: build.query<Category, void>({
            query: (id) => ({ url: `${ApiEndpoints.Category}/${id}` }),
            transformResponse: (response: CategoryRaw): Category => replaceUnderScoreId(response),

            transformErrorResponse: transformBaseErrorResponse,
        }),
    }),
});

export const { useGetAllCategoriesQuery, useGetCategoryByIdQuery } = categoryApi;
