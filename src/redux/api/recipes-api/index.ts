import { NotificationMessages } from '~/constants/notification-messages';
import { StatusTypesEnum } from '~/redux/api/types/common';
import {
    AllRecipeParams,
    MetaData,
    MetaRequest,
    RawRecipe,
    RawRecipesResponse,
    Recipe,
    RecipeByUserId,
    RecipeByUserIdNormalized,
    RecipesByCategoryIdArgs,
    RecipesInfiniteResponse,
    RecipesResponse,
    RecipesResponseWithMeta,
} from '~/redux/api/types/recipes';
import {
    replaceMapUnderscoreId,
    replaceUnderscoreId,
} from '~/redux/api/utils/replace-underscore-id';
import { transformBaseErrorResponse } from '~/redux/api/utils/transform-base-error-response';
import { setNotificationData, setNotificationVisibility } from '~/redux/features/app-slice';
import {
    setFilteredRecipes,
    setIsFilterError,
    setShowedEmptyText,
} from '~/redux/features/recipes-slice';
import { removeBookmarks, setRecipeRecommendation } from '~/redux/features/user-slice';
import { RecipeFormValues } from '~/types/recipe-form';
import { AppState } from '~/types/store';

import { authorizedApi } from '..';
import { ApiEndpoints, NOTIFICATION_STATE_NAME } from '../constants';

export const recipeApi = authorizedApi.injectEndpoints({
    endpoints: (build) => ({
        getAllRecipesWithParams: build.query<RecipesResponseWithMeta, AllRecipeParams>({
            query: (params) => ({ url: ApiEndpoints.Recipe, params }),
            transformResponse: ({ data, meta }: RawRecipesResponse): RecipesResponseWithMeta => ({
                data: data.map((resp) => replaceUnderscoreId(resp)),
                meta,
            }),
            transformErrorResponse: transformBaseErrorResponse,
            providesTags: (result) =>
                result
                    ? [
                          ...result.data.map(({ id }) => ({ type: 'Recipe' as const, id })),
                          { type: 'Recipe' as const, id: 'LIST' },
                      ]
                    : [{ type: 'Recipe' as const, id: 'LIST' }],
        }),
        getAllRecipesInfinite: build.infiniteQuery<
            RecipesResponseWithMeta,
            AllRecipeParams,
            MetaRequest
        >({
            infiniteQueryOptions: {
                initialPageParam: { page: 1 },
                getNextPageParam(_firstPage, _allPages, firstPageParam) {
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
            providesTags: () => [{ type: 'Recipe' as const, id: 'LIST' }],
        }),
        // старая версия - как в РТК можно сделать инфинит запрос - сделано, т.к. в инфинит нет lazy query - пока для фильтрации и поиска больше подходит
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
                } catch {
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
            providesTags: (result) =>
                result
                    ? [
                          ...result.data.map(({ id }) => ({ type: 'Recipe' as const, id })),
                          { type: 'Recipe' as const, id: 'LIST' },
                      ]
                    : [{ type: 'Recipe' as const, id: 'LIST' }],
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
            providesTags: (result, _error, args) =>
                result
                    ? [
                          ...result.map((recipe) => ({ type: 'Recipe' as const, id: recipe.id })),
                          { type: 'Recipe' as const, id: `CATEGORY_${args.id}` },
                      ]
                    : [{ type: 'Recipe' as const, id: `CATEGORY_${args.id}` }],
        }),
        getRecipeByCategoryIdInfinite: build.infiniteQuery<
            RecipesInfiniteResponse,
            RecipesByCategoryIdArgs,
            MetaRequest
        >({
            infiniteQueryOptions: {
                initialPageParam: { page: 1 },
                getNextPageParam(_firstPage, _allPages, firstPageParam) {
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
            providesTags: (_result, _error, arg) => [
                { type: 'Recipe' as const, id: `CATEGORY_${arg.id}` },
            ],
        }),
        getRecipeById: build.query<Recipe, string>({
            query: (id) => ({ url: `${ApiEndpoints.Recipe}/${id}` }),
            transformResponse: (response: RawRecipe): Recipe => replaceUnderscoreId(response),
            transformErrorResponse: transformBaseErrorResponse,
            providesTags: (_result, _error, id) => [{ type: 'Recipe' as const, id }],
        }),
        createRecipe: build.mutation<Recipe, RecipeFormValues>({
            query: (recipe) => ({
                url: ApiEndpoints.Recipe,
                method: 'POST',
                body: recipe,
            }),
            transformResponse: (response: RawRecipe): Recipe => replaceUnderscoreId(response),
            transformErrorResponse: (response) => ({
                ...response,
                [NOTIFICATION_STATE_NAME]: {
                    status: StatusTypesEnum.Error,
                    title:
                        response.status === 409
                            ? NotificationMessages.ERROR_TITLE
                            : NotificationMessages.ERROR_GENERAL_TITLE,
                    description:
                        response.status === 409
                            ? NotificationMessages.RECIPE_ALREADY_EXISTS_DESCRIPTION
                            : NotificationMessages.CREATE_RECIPE_ERROR_DESCRIPTION,
                },
            }),
            invalidatesTags: (_result, error) =>
                error ? [] : [{ type: 'Recipe' as const, id: 'LIST' }],
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(
                        setNotificationData({
                            status: StatusTypesEnum.Success,
                            title: NotificationMessages.CREATE_RECIPE_SUCCESS_TITLE,
                        }),
                    );
                    dispatch(setNotificationVisibility(true));
                } catch (err) {
                    console.error(err);
                }
            },
        }),
        updateRecipe: build.mutation<Recipe, { id: string; data: RecipeFormValues }>({
            query: ({ id, data }) => ({
                url: `${ApiEndpoints.Recipe}/${id}`,
                method: 'PATCH',
                body: data,
            }),
            transformResponse: (response: RawRecipe): Recipe => replaceUnderscoreId(response),
            transformErrorResponse: (response) => ({
                ...response,
                [NOTIFICATION_STATE_NAME]: {
                    status: StatusTypesEnum.Error,
                    title:
                        response.status === 409
                            ? NotificationMessages.ERROR_TITLE
                            : NotificationMessages.ERROR_GENERAL_TITLE,
                    description:
                        response.status === 409
                            ? NotificationMessages.RECIPE_ALREADY_EXISTS_DESCRIPTION
                            : NotificationMessages.CREATE_RECIPE_ERROR_DESCRIPTION,
                },
            }),
            invalidatesTags: (_result, error, { id }) =>
                error
                    ? []
                    : [
                          { type: 'Recipe' as const, id },
                          { type: 'Recipe' as const, id: 'LIST' },
                      ],
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(
                        setNotificationData({
                            status: StatusTypesEnum.Success,
                            title: NotificationMessages.CREATE_RECIPE_SUCCESS_TITLE,
                        }),
                    );
                    dispatch(setNotificationVisibility(true));
                } catch (err) {
                    console.error(err);
                }
            },
        }),
        deleteRecipe: build.mutation<void, string>({
            query: (id) => ({
                url: `${ApiEndpoints.Recipe}/${id}`,
                method: 'DELETE',
            }),
            transformErrorResponse: (response) => ({
                ...response,
                [NOTIFICATION_STATE_NAME]: {
                    status: StatusTypesEnum.Error,
                    title: NotificationMessages.ERROR_GENERAL_TITLE,
                    description: NotificationMessages.DELETE_RECIPE_ERROR_DESCRIPTION,
                },
            }),
            invalidatesTags: (_result, error) =>
                error ? [] : [{ type: 'Recipe' as const, id: 'LIST' }],
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(
                        setNotificationData({
                            status: StatusTypesEnum.Success,
                            title: NotificationMessages.DELETE_RECIPE_SUCCESS_TITLE,
                        }),
                    );
                    dispatch(setNotificationVisibility(true));
                } catch (err) {
                    console.error(err);
                }
            },
        }),
        likeRecipe: build.mutation<void, string>({
            query: (id) => ({
                url: `${ApiEndpoints.Recipe}/${id}/like`,
                method: 'POST',
            }),
            transformErrorResponse: (response) => ({
                ...response,
                [NOTIFICATION_STATE_NAME]: {
                    status: StatusTypesEnum.Error,
                    title: NotificationMessages.ERROR_GENERAL_TITLE,
                    description: NotificationMessages.ERROR_TRY_LATER,
                },
            }),
            invalidatesTags: (_result, error, id) =>
                error
                    ? []
                    : [
                          { type: 'Recipe' as const, id },
                          { type: 'Recipe' as const, id: 'LIST' },
                      ],
        }),
        bookmarkRecipe: build.mutation<{ message: string }, string>({
            query: (id) => ({
                url: `${ApiEndpoints.Recipe}/${id}/bookmark`,
                method: 'POST',
            }),
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    if (data.message === 'Recipe removed from bookmarks') {
                        dispatch(removeBookmarks(id));
                    }
                } catch (err) {
                    console.error(err);
                }
            },
            transformErrorResponse: (response) => ({
                ...response,
                [NOTIFICATION_STATE_NAME]: {
                    status: StatusTypesEnum.Error,
                    title: NotificationMessages.ERROR_GENERAL_TITLE,
                    description: NotificationMessages.ERROR_TRY_LATER,
                },
            }),
            invalidatesTags: (_result, error, id) =>
                error
                    ? []
                    : [
                          { type: 'Recipe' as const, id },
                          { type: 'Recipe' as const, id: 'LIST' },
                      ],
        }),
        createRecipeDraft: build.mutation<Recipe, RecipeFormValues>({
            query: (recipe) => ({
                url: `${ApiEndpoints.Recipe}/draft`,
                method: 'POST',
                body: recipe,
            }),
            transformResponse: (response: RawRecipe): Recipe => replaceUnderscoreId(response),
            transformErrorResponse: (response) => ({
                ...response,
                [NOTIFICATION_STATE_NAME]: {
                    status: StatusTypesEnum.Error,
                    title:
                        response.status === 409
                            ? NotificationMessages.ERROR_TITLE
                            : NotificationMessages.ERROR_GENERAL_TITLE,
                    description:
                        response.status === 409
                            ? NotificationMessages.RECIPE_ALREADY_EXISTS_DESCRIPTION
                            : NotificationMessages.SAVE_DRAFT_ERROR_DESCRIPTION,
                },
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(
                        setNotificationData({
                            status: StatusTypesEnum.Success,
                            title: NotificationMessages.DRAFT_SUCCESS_TITLE,
                        }),
                    );
                    dispatch(setNotificationVisibility(true));
                } catch (err) {
                    console.error(err);
                }
            },
        }),
        recommendationRecipe: build.mutation<void, string>({
            query: (id) => ({
                url: `/${ApiEndpoints.Recipe}/recommend/${id}`,
                method: 'POST',
            }),
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(setRecipeRecommendation(id));
                } catch (err) {
                    console.error(err);
                }
            },
            invalidatesTags: (_result, error, id) =>
                error
                    ? []
                    : [
                          { type: 'Recipe' as const, id },
                          { type: 'Recipe' as const, id: 'LIST' },
                      ],
        }),
        getRecipeByUserId: build.query<RecipeByUserIdNormalized, string>({
            query: (id) => ({
                url: `/${ApiEndpoints.Recipe}/user/${id}`,
                method: 'GET',
            }),
            transformResponse: (response: RecipeByUserId): RecipeByUserIdNormalized => {
                const replaceId = {
                    ...response,
                    myBookmarks: replaceMapUnderscoreId(response.myBookmarks),
                    recipes: replaceMapUnderscoreId(response.recipes),
                    notes: replaceMapUnderscoreId(response.notes),
                };
                return replaceId;
            },
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
    useCreateRecipeMutation,
    useUpdateRecipeMutation,
    useDeleteRecipeMutation,
    useLikeRecipeMutation,
    useBookmarkRecipeMutation,
    useCreateRecipeDraftMutation,
    useRecommendationRecipeMutation,
    useGetRecipeByUserIdQuery,
} = recipeApi;
