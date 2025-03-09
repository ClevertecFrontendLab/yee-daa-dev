import { createApi } from '@reduxjs/toolkit/query/react';

import { ApiEndpoints } from '~/redux/api/constants';
import { baseQuery } from '~/redux/api/get-base-query';
import {
    AllRecipeParams,
    MetaData,
    MetaRequest,
    RawRecipe,
    RawRecipesResponse,
    Recipe,
    RecipesByCategoryIdArgs,
    RecipesInfiniteResponse,
    RecipesResponse,
    RecipesResponseWithMeta,
} from '~/redux/api/types/recipes';
import { replaceUnderscoreId } from '~/redux/api/utils/replace-underscore-id';
import { transformBaseErrorResponse } from '~/redux/api/utils/transform-base-error-response';
import { changeTotalRecipes } from '~/redux/features/recipes-slice';
import { AppState } from '~/types/store';

export const recipeApi = createApi({
    reducerPath: 'recipeApi',
    baseQuery,
    endpoints: (build) => ({
        getAllRecipesWithParams: build.query<RecipesResponseWithMeta, AllRecipeParams>({
            query: (params) => ({ url: ApiEndpoints.Recipe, params }),
            async onQueryStarted(_, { getState, dispatch, queryFulfilled }) {
                try {
                    const {
                        recipes: { totalRecipes },
                    } = getState() as AppState;

                    const response = await queryFulfilled;
                    const { total } = response.meta as MetaData;
                    if (totalRecipes !== total) {
                        dispatch(changeTotalRecipes(total));
                    }
                } catch (err: unknown) {
                    console.error('Error get Recipes\n', err);
                }
            },
            transformResponse: ({ data, meta }: RawRecipesResponse): RecipesResponseWithMeta => ({
                data: data.map((resp) => replaceUnderscoreId(resp)),
                meta,
            }),
            transformErrorResponse: transformBaseErrorResponse,
        }),
        getAllRecipesInfinite: build.infiniteQuery<
            RecipesResponseWithMeta,
            AllRecipeParams,
            MetaRequest
        >({
            infiniteQueryOptions: {
                initialPageParam: { page: 1 },
                getNextPageParam(firstPage, allPages, firstPageParam) {
                    const currPage = firstPageParam?.page ?? 1;

                    return { page: currPage + 1 };
                },
            },
            onQueryStarted: async (args, { getState, dispatch, queryFulfilled }) => {
                try {
                    const data = await queryFulfilled;
                    console.log(data, 'RTK_DATA');
                } catch (error) {
                    //
                }
            },
            query: ({ queryArg, pageParam }) => ({
                url: ApiEndpoints.Recipe,
                params: { ...queryArg, page: pageParam.page },
            }),
            transformResponse: (response: RawRecipesResponse): RecipesResponseWithMeta => ({
                data: response.data.map((resp) => replaceUnderscoreId(resp)),
                meta: response.meta,
            }),
            transformErrorResponse: transformBaseErrorResponse,
        }),
        // getAllRecipesMerge: build.query<RecipesResponseWithMeta, AllRecipeParams>({
        //     query: (params) => ({
        //         url: ApiEndpoints.Recipe,
        //         params: params,
        //     }),

        // }),
        getRecipeByCategoryId: build.query<RecipesResponse, RecipesByCategoryIdArgs>({
            query: ({ id, ...params }) => ({
                url: `${ApiEndpoints.RecipeByCategory}/${id}`,
                params: params,
            }),
            transformResponse: (response: RawRecipesResponse): RecipesResponse => {
                const { data } = response;
                return data.map((resp) => replaceUnderscoreId(resp));
            },
            transformErrorResponse: transformBaseErrorResponse,
        }),
        getRecipeByCategoryIdInfinite: build.infiniteQuery<
            RecipesInfiniteResponse,
            RecipesByCategoryIdArgs,
            MetaRequest
        >({
            infiniteQueryOptions: {
                initialPageParam: { page: 1 },
                getNextPageParam(firstPage, allPages, firstPageParam) {
                    const currPage = firstPageParam?.page ?? 1;

                    return { page: currPage + 1 };
                },
            },
            query: ({ queryArg, pageParam }) => {
                const { id, ...restParams } = queryArg;
                return {
                    url: `${ApiEndpoints.RecipeByCategory}/${id}`,
                    params: { ...restParams, page: pageParam.page },
                };
            },
            transformErrorResponse: transformBaseErrorResponse,
            transformResponse: (response: RawRecipesResponse): RecipesInfiniteResponse => {
                const { data } = response;
                const preparedData = data.map((resp) => replaceUnderscoreId(resp));
                return { data: preparedData, meta: response.meta };
            },
        }),
        getRecipeById: build.query<Recipe, string>({
            query: (id) => ({ url: `${ApiEndpoints.Recipe}/${id}` }),
            transformResponse: (response: RawRecipe): Recipe => replaceUnderscoreId(response),
            transformErrorResponse: transformBaseErrorResponse,
        }),
    }),
});

export const {
    useGetAllRecipesWithParamsQuery,
    useLazyGetAllRecipesWithParamsQuery,
    useGetRecipeByCategoryIdQuery,
    useLazyGetRecipeByCategoryIdQuery,
    useGetRecipeByIdQuery,
    useLazyGetRecipeByIdQuery,
    useGetAllRecipesInfiniteInfiniteQuery,
    useGetRecipeByCategoryIdInfiniteInfiniteQuery,
} = recipeApi;
