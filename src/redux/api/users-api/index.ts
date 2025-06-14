import { NotificationMessages } from '~/constants/notification-messages';
import { authorizedApi } from '~/redux/api';
import { ApiEndpoints, NOTIFICATION_STATE_NAME } from '~/redux/api/constants';
import { StatusTypesEnum } from '~/redux/api/types/common';
import { RawRecipe, Recipe } from '~/redux/api/types/recipes';
import { replaceUnderscoreId } from '~/redux/api/utils/replace-underscore-id';
import {
    BloggerCard,
    BloggerInfo,
    BloggersMainType,
    resetToInit,
    setBloggersMain,
    setBloggersPreview,
} from '~/redux/features/bloggers-slice';
import { NoteType } from '~/types/user';

type BloggersRequestType = {
    id: string;
    limit?: string;
};

type ToggleSubscriptionRequestType = {
    fromUserId: string;
    toUserId: string;
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

type GetBloggerInfoByIdType = {
    bloggerId: string;
    currentUserId: string;
};

const replaceNotesWithText = (bloggers: BloggerCard[]) =>
    bloggers.map((item) => {
        const { notes, ...rest } = item;
        return { ...rest, text: notes && notes.length ? notes[0].text : '' };
    });

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
                transformErrorResponse: (response) => ({
                    ...response,
                    [NOTIFICATION_STATE_NAME]: {
                        status: StatusTypesEnum.Error,
                        title: NotificationMessages.ERROR_GENERAL_TITLE,
                        description: 'Попробуйте немного позже.',
                    },
                }),
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
                            const dataWithText = replaceNotesWithText(data.others);

                            dispatch(setBloggersPreview(dataWithText));
                        } else {
                            const dataWithText = {
                                favorites: replaceNotesWithText(data.favorites),
                                others: replaceNotesWithText(data.others),
                            };
                            dispatch(setBloggersMain(dataWithText));
                        }
                    } catch (err: unknown) {
                        dispatch(resetToInit());
                        console.error('Error in get Bloggers list', err);
                    }
                },
                transformErrorResponse: (response) => ({
                    ...response,
                    [NOTIFICATION_STATE_NAME]: {
                        status: StatusTypesEnum.Error,
                        title: NotificationMessages.ERROR_GENERAL_TITLE,
                        description: 'Попробуйте немного позже.',
                    },
                }),
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
                transformErrorResponse: (response) => ({
                    ...response,
                    [NOTIFICATION_STATE_NAME]: {
                        status: StatusTypesEnum.Error,
                        title: NotificationMessages.ERROR_GENERAL_TITLE,
                        description: 'Попробуйте немного позже.',
                    },
                }),
            }),
            getBloggerInfoById: build.query<BloggerInfo, GetBloggerInfoByIdType>({
                query: ({ bloggerId, currentUserId }) => ({
                    url: `${ApiEndpoints.GetBloggers}/${bloggerId}?currentUserId=${currentUserId}`,
                }),
                transformErrorResponse: (response) => ({
                    ...response,
                    [NOTIFICATION_STATE_NAME]: {
                        status: StatusTypesEnum.Error,
                        title: NotificationMessages.ERROR_GENERAL_TITLE,
                        description: 'Попробуйте немного позже.',
                    },
                }),
            }),
        }),
    });

export const {
    useToggleSubscriptionMutation,
    useGetBloggersQuery,
    useGetBloggerRecipesByIdQuery,
    useGetBloggerInfoByIdQuery,
    useLazyGetBloggerInfoByIdQuery,
} = usersApi;
