import { ApiEndpoints } from '~/redux/api/constants';
import {
    Category,
    CategoryRaw,
    GetCategoriesRawResponse,
    GetCategoriesResponse,
    SubCategory,
} from '~/redux/api/types/categories';
import { resetToInit, setCategories, setSubCategories } from '~/redux/features/categories-slice';
import { LOCALSTORAGE_KEYS, setDataToLocalStorage } from '~/utils/local-storage-util';

import { isCategory, isCategoryRaw } from '../../utils/is-category';
import { replaceUnderscoreId } from '../../utils/replace-underscore-id';
import { transformBaseErrorResponse } from '../../utils/transform-base-error-response';
import { baseApi } from '../base-api';

type GroupedCategories = { categories: Category[]; subCategories: SubCategory[] };

export const categoryApi = baseApi.injectEndpoints({
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

                    dispatch(setCategories(categories));
                    dispatch(setSubCategories(subCategories));
                    setDataToLocalStorage(LOCALSTORAGE_KEYS.CATEGORIES, categories);
                    setDataToLocalStorage(LOCALSTORAGE_KEYS.SUBCATEGORIES, subCategories);
                } catch (err: unknown) {
                    dispatch(resetToInit());
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
