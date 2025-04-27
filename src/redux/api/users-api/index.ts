import { authorizedApi } from '~/redux/api';
import { ApiEndpoints } from '~/redux/api/constants';
import { Recipe } from '~/redux/api/types/recipes';
import {
    BloggerCard,
    BloggersMainType,
    resetToInit,
    setBloggersDataById,
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
    time: string;
    text: string;
};

export type BloggerById = {
    recipes: Recipe[];
    likes: number;
    bookmarks: number;
    notes: NoteType[];
    totalBookmarks: number;
    totalSubscribers: number;
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
            getBloggers: build.query<BloggerCard[] | BloggersMainType, BloggersRequestType>({
                providesTags: ['Bloggers'],
                query: ({ id, limit }) => ({
                    url: ApiEndpoints.GetBloggers,
                    params: { currentUserId: id, limit },
                }),
                async onQueryStarted({ limit }, { dispatch, queryFulfilled }) {
                    try {
                        const { data } = await queryFulfilled;
                        if (!limit) {
                            dispatch(setBloggersPreview(data as BloggerCard[]));
                        } else {
                            dispatch(setBloggersMain(data as BloggersMainType));
                        }
                    } catch (err: unknown) {
                        dispatch(resetToInit());
                        console.error('Error in get Bloggers list', err);
                    }
                },
            }),
            getBloggerbyId: build.query<BloggerById, string>({
                query: (id) => ({
                    url: `${ApiEndpoints.GetBloggerById}/${id}`,
                }),
                async onQueryStarted(_, { dispatch, queryFulfilled }) {
                    try {
                        const { data } = await queryFulfilled;
                        dispatch(setBloggersDataById(data));
                    } catch (err: unknown) {
                        dispatch(resetToInit());
                        console.error('Error in get Blogger by id', err);
                    }
                },
            }),
        }),
    });

export const { useToggleSubscriptionMutation, useGetBloggersQuery, useGetBloggerbyIdQuery } =
    usersApi;
