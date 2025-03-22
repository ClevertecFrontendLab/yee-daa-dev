import { ApiEndpoints } from '~/redux/api/constants';
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
import {
    setFilteredRecipes,
    setIsFilterError,
    setShowedEmptyText,
} from '~/redux/features/recipes-slice';
import { AppState } from '~/types/store';

import { authorizedApi } from '../..';

export const recipeApi = authorizedApi.injectEndpoints({
    endpoints: (build) => ({
        getAllRecipesWithParams: build.query<RecipesResponseWithMeta, AllRecipeParams>({
            query: (params) => ({ url: ApiEndpoints.Recipe, params }),
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
        // старая версия - как в РТК можно сделать инфинит запрос - сделано, т.к. в инфинит нет lazy query - пока для фильрации и поиска больше подходит
        getAllRecipesMerge: build.query<RecipesResponseWithMeta, AllRecipeParams>({
            query: (params) => ({
                url: ApiEndpoints.Recipe,
                params: params,
            }),
            onQueryStarted: async (_, { getState, dispatch, queryFulfilled }) => {
                const {
                    filterDrawer: { isFiltering },
                } = getState() as AppState;
                // для отлова именно запроса из дровера или серч инпута
                if (!isFiltering) return;

                dispatch(setIsFilterError(false));
                dispatch(setShowedEmptyText(false));

                try {
                    const { data } = await queryFulfilled;
                    if (Array.isArray(data?.data)) {
                        dispatch(setFilteredRecipes(data.data));
                        dispatch(setShowedEmptyText(!data.data.length));
                    }
                } catch (error) {
                    dispatch(setIsFilterError(true));
                }
            },
            serializeQueryArgs: ({ endpointName }) => endpointName,
            merge: (currentCacheData, responseData, otherArgs) => {
                const {
                    arg: { page },
                } = otherArgs;

                if (page === 1) {
                    return responseData;
                }
                const newData: RecipesResponse = [
                    ...currentCacheData.data.filter(
                        (existed) =>
                            !responseData.data.some((newItem) => newItem.id === existed.id),
                    ),
                    ...responseData.data,
                ];

                const newMeta: MetaData = {
                    ...currentCacheData.meta,
                    page: responseData.meta.page,
                };
                const updatedResponse: RecipesResponseWithMeta = { data: newData, meta: newMeta };

                return updatedResponse;
            },
            forceRefetch({ currentArg, previousArg }) {
                return currentArg !== previousArg;
            },
            transformResponse: (response: RawRecipesResponse): RecipesResponseWithMeta => ({
                data: response.data.map((resp) => replaceUnderscoreId(resp)),
                meta: response.meta,
            }),
            transformErrorResponse: transformBaseErrorResponse,
        }),
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
    overrideExisting: false,
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
    useGetAllRecipesMergeQuery,
    useLazyGetAllRecipesMergeQuery,
} = recipeApi;
