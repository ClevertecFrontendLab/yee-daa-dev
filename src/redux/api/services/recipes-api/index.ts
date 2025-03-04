import { createApi } from '@reduxjs/toolkit/query/react';

import { ApiEndpoints } from '~/redux/api/constants';
import { baseQuery } from '~/redux/api/get-base-query';
import { transformBaseErrorResponse } from '~/redux/api/utils/transform-base-error-response';
import { changeTotalRecipes } from '~/redux/features/recipies-slice';
import { AppState } from '~/types/store';

import {
    AllRecipeParams,
    MetaData,
    RawRecipe,
    RawRecipesResponse,
    Recipe,
    RecipesByCategoryIdArgs,
    RecipesResponse,
} from '../../types/recipes';
import { replaceUnderScoreId } from '../../utils/replace-underscore-id';

export const recipeApi = createApi({
    reducerPath: 'recipeApi',
    baseQuery,
    endpoints: (build) => ({
        getAllRecipesWithParams: build.query<RecipesResponse, AllRecipeParams>({
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
            transformResponse: (response: RawRecipesResponse): RecipesResponse => {
                const { data } = response;
                return data.map((resp) => replaceUnderScoreId(resp));
            },
            transformErrorResponse: transformBaseErrorResponse,
        }),
        getRecipeByCategoryId: build.query<RecipesResponse, RecipesByCategoryIdArgs>({
            query: ({ id, ...params }) => ({
                url: `${ApiEndpoints.RecipeByCategory}/${id}`,
                params: params,
            }),
            transformResponse: (response: RawRecipesResponse): RecipesResponse => {
                const { data } = response;
                return data.map((resp) => replaceUnderScoreId(resp));
            },
            transformErrorResponse: transformBaseErrorResponse,
        }),
        getRecipeById: build.query<Recipe, string>({
            query: (id) => ({ url: `${ApiEndpoints.Category}/${id}` }),
            transformResponse: (response: RawRecipe): Recipe => replaceUnderScoreId(response),
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
} = recipeApi;
