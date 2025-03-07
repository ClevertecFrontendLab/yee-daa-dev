import { createApi } from '@reduxjs/toolkit/query/react';

import { ApiEndpoints } from '~/redux/api/constants';
import { baseQuery } from '~/redux/api/get-base-query';
import {
    Category,
    CategoryRaw,
    GetCategoriesRawResponse,
    GetCategoriesResponse,
    SubCategory,
} from '~/redux/api/types/categories';
import { setCategories, setSubCategories } from '~/redux/features/categories-slice';

import { isCategory, isCategoryRaw } from '../../utils/is-category';
import { replaceUnderscoreId } from '../../utils/replace-underscore-id';
import { transformBaseErrorResponse } from '../../utils/transform-base-error-response';

type GroupedCategories = { categories: Category[]; subCategories: SubCategory[] };

export const categoryApi = createApi({
    reducerPath: 'categoryApi',
    baseQuery,
    endpoints: (build) => ({
        getAllCategories: build.query<GetCategoriesResponse, void>({
            query: () => ({ url: ApiEndpoints.Category }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    const { categories, subCategories }: GroupedCategories = data.reduce(
                        (acc, curr) => {
                            isCategory(curr)
                                ? acc.categories.push(curr)
                                : acc.subCategories.push(curr);

                            return acc;
                        },
                        { categories: [], subCategories: [] } as GroupedCategories,
                    );

                    console.log(categories, subCategories);

                    dispatch(setCategories(categories));
                    dispatch(setSubCategories(subCategories));
                } catch (err: unknown) {
                    console.error('Error get Category list\n', err);
                }
            },
            transformResponse: (response: GetCategoriesRawResponse): GetCategoriesResponse =>
                response.map((resp) => {
                    if (isCategoryRaw(resp)) {
                        const { subCategories, ...rest } = resp;
                        const subCat: SubCategory[] = subCategories.map((sub) =>
                            replaceUnderscoreId(sub),
                        );
                        return { ...replaceUnderscoreId(rest), subCategories: subCat };
                    }
                    return replaceUnderscoreId(resp) as SubCategory;
                }),
            transformErrorResponse: transformBaseErrorResponse,
        }),
        getCategoryById: build.query<Category, void>({
            query: (id) => ({ url: `${ApiEndpoints.Category}/${id}` }),
            transformResponse: (response: CategoryRaw): Category => {
                const { subCategories, ...rest } = replaceUnderscoreId(response);
                return {
                    ...rest,
                    subCategories: subCategories.map((elem) => replaceUnderscoreId(elem)),
                };
            },

            transformErrorResponse: transformBaseErrorResponse,
        }),
    }),
});

export const { useGetAllCategoriesQuery, useGetCategoryByIdQuery } = categoryApi;
