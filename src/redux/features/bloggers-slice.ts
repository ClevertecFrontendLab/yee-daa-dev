import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { BloggerById } from '~/redux/api/users-api';

export type BloggerCard = {
    _id: string;
    firstName: string;
    lastName: string;
    login: string;
    subscribersCount: number;
    bookmarksCount: number;
    isFavorite?: boolean;
};

export type BloggersMainType = {
    favorites: BloggerCard[];
    others: BloggerCard[];
};

type BloggersState = {
    bloggersPreview: BloggerCard[];
    bloggersMain: BloggersMainType;
    bloggersLoadingId: string;
    bloggersUnfoldLoading: boolean;
    bloggerCurrent: { data: BloggerById; info: BloggerCard };
    bloggerByIdLoading: boolean;
    forceUpdateBlogsList: boolean;
    bloggersLimit?: string;
};

const initialState: BloggersState = {
    bloggersPreview: [],
    bloggersMain: {
        favorites: [],
        others: [],
    },
    bloggerCurrent: {
        data: {
            recipes: [],
            likes: 0,
            bookmarks: 0,
            notes: [],
            totalBookmarks: 0,
            totalSubscribers: 0,
        },
        info: {
            _id: '',
            firstName: '',
            lastName: '',
            login: '',
            subscribersCount: 0,
            bookmarksCount: 0,
            isFavorite: false,
        },
    },
    forceUpdateBlogsList: false,
    bloggersLoadingId: '',
    bloggersUnfoldLoading: true,
    bloggersLimit: undefined,
    bloggerByIdLoading: false,
};

export const bloggersSlice = createSlice({
    name: 'bloggers',
    initialState,
    reducers: {
        setBloggersPreview(state, { payload }: PayloadAction<BloggerCard[]>) {
            state.bloggersPreview = payload;
        },
        setBloggersLimit(state, { payload }: PayloadAction<string>) {
            state.bloggersLimit = payload;
        },
        setBloggersMain(state, { payload }: PayloadAction<BloggersMainType>) {
            state.bloggersMain = payload;
        },
        setBloggersToggleLoader(state, { payload }: PayloadAction<string>) {
            state.bloggersLoadingId = payload;
        },
        setBloggersUnfoldLoading(state, { payload }: PayloadAction<boolean>) {
            state.bloggersUnfoldLoading = payload;
        },
        setBloggersDataById(state, { payload }: PayloadAction<BloggerById>) {
            state.bloggerCurrent.data = payload;
        },
        setBloggersInfoById(state, { payload }: PayloadAction<BloggerCard>) {
            state.bloggerCurrent.info = payload;
        },
        setBloggerByIdLoading(state, { payload }: PayloadAction<boolean>) {
            state.bloggerByIdLoading = payload;
        },
        resetToInit() {
            return initialState;
        },
    },
    selectors: {
        selectBloggersPreview: (state) => state.bloggersPreview,
        selectBloggersLimit: (state) => state.bloggersLimit,
        selectBloggersMain: (state) => state.bloggersMain,
        selectBloggersFavorite: (state) => state.bloggersMain.favorites,
        selectBloggersOthers: (state) => state.bloggersMain.others,
        selectBloggersToggleLoading: (state) => state.bloggersLoadingId,
        selectBloggersUnfoldLoading: (state) => state.bloggersUnfoldLoading,
        selectBloggersById: (state) => state.bloggerCurrent,
        selectBloggerByIdLoading: (state) => state.bloggerByIdLoading,
        selectForceUpdateBlogsList: (state) => state.forceUpdateBlogsList,
    },
});

export const bloggersReducer = bloggersSlice.reducer;

export const {
    setBloggersPreview,
    setBloggersLimit,
    setBloggersMain,
    setBloggersToggleLoader,
    setBloggersUnfoldLoading,
    setBloggersDataById,
    setBloggersInfoById,
    setBloggerByIdLoading,
    resetToInit,
} = bloggersSlice.actions;
export const {
    selectBloggersPreview,
    selectBloggersLimit,
    selectBloggersMain,
    selectBloggersFavorite,
    selectBloggersOthers,
    selectBloggersToggleLoading,
    selectBloggersUnfoldLoading,
    selectBloggersById,
    selectBloggerByIdLoading,
    selectForceUpdateBlogsList,
} = bloggersSlice.selectors;
