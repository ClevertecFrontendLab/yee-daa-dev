import { authorizedApi } from '~/redux/api';
import { ApiEndpoints } from '~/redux/api/constants';
import { RawRecipe, Recipe } from '~/redux/api/types/recipes';
import { replaceUnderscoreId } from '~/redux/api/utils/replace-underscore-id';
import {
    BloggerInfo,
    BloggersMainType,
    resetToInit,
    setBloggersMain,
    setBloggersPreview,
} from '~/redux/features/bloggers-slice';

type BloggersRequestType = {
    id: string;
    limit?: string;
};

type ToggleSubscriptionRequestType = {
    fromUserId: string;
    toUserId: string;
};

type NoteType = {
    date: string;
    text: string;
};

export type RawBloggerById = {
    userId: string;
    recipes: RawRecipe[];
    likes: number;
    bookmarks: number;
    notes: NoteType[];
    totalBookmarks: number;
    totalSubscribers: number;
};

export type BloggerById = {
    userId: string;
    recipes: Recipe[];
    likes: number;
    bookmarks: number;
    notes: NoteType[];
    totalBookmarks: number;
    totalSubscribers: number;
};

export type CurrentUserType = {
    _id: string;
    email: string;
    login: string;
    firstName: string;
    lastName: string;
    recipesIds: string[];
    subscriptions: string[];
};

export const usersApi = authorizedApi
    .enhanceEndpoints({ addTagTypes: ['Bloggers'] })
    .injectEndpoints({
        endpoints: (build) => ({
            toggleSubscription: build.mutation<boolean, ToggleSubscriptionRequestType>({
                query: (body) => ({
                    url: ApiEndpoints.ToggleSubscription,
                    body,
                    method: 'PATCH',
                }),
                invalidatesTags: ['Bloggers'],
                transformResponse: (response: { message: string }): boolean =>
                    response.message.includes('Подписка'),
            }),
            getBloggers: build.query<BloggersMainType, BloggersRequestType>({
                providesTags: ['Bloggers'],
                query: ({ id, limit }) => ({
                    url: ApiEndpoints.GetBloggers,
                    params: { currentUserId: id, limit },
                }),
                async onQueryStarted({ limit }, { dispatch, queryFulfilled }) {
                    try {
                        const { data } = await queryFulfilled;

                        if (!limit) {
                            dispatch(setBloggersPreview(data.others));
                        } else {
                            dispatch(setBloggersMain(data));
                        }
                    } catch (err: unknown) {
                        dispatch(resetToInit());
                        console.error('Error in get Bloggers list', err);
                    }
                },
            }),
            getBloggerRecipesById: build.query<BloggerById, string>({
                query: (id) => ({
                    url: `${ApiEndpoints.GetBloggerById}/${id}`,
                }),
                transformResponse: (response: RawBloggerById): BloggerById => ({
                    ...response,
                    recipes: response.recipes.map((resp) => replaceUnderscoreId(resp)),
                }),
            }),
            getBloggerDataById: build.query({
                query: (id) => ({
                    url: `${ApiEndpoints.GetBloggerInfoById}/${id}`,
                }),
            }),
            getUserById: build.query<BloggerInfo, string>({
                query: (id) => ({
                    url: `${ApiEndpoints.GetUserById}/${id}`,
                }),
            }),
        }),
    });

export const {
    useToggleSubscriptionMutation,
    useGetBloggersQuery,
    useGetBloggerRecipesByIdQuery,
    useGetUserByIdQuery,
    useLazyGetUserByIdQuery,
} = usersApi;
