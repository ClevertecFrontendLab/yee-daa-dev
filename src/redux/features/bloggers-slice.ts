import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { BloggerById, NoteType } from '~/redux/api/users-api';

export type BloggerCard = {
    _id: string;
    firstName: string;
    lastName: string;
    login: string;
    subscribersCount: number;
    bookmarksCount: number;
    newRecipesCount: number;
    notes?: NoteType[];
    text?: string;
    isFavorite?: boolean;
};

export type BloggerInfo = {
    bloggerInfo: {
        _id: string;
        email: string;
        login: string;
        firstName: string;
        lastName: string;
        recipesIds: string[];
        drafts: never[];
        subscribers: string[];
    };
    totalSubscribers: number;
    totalBookmarks: number;
    isFavorite: boolean;
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
    bloggerCurrent: {
        data: BloggerById;
        info: BloggerInfo;
    };
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
            userId: '',
        },
        info: {
            bloggerInfo: {
                _id: '',
                email: '',
                login: '',
                firstName: '',
                lastName: '',
                recipesIds: [],
                drafts: [],
                subscribers: [],
            },
            totalSubscribers: 0,
            totalBookmarks: 0,
            isFavorite: false,
        },
    },
    bloggersLoadingId: '',
    bloggersUnfoldLoading: true,
    bloggersLimit: undefined,
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
        setBloggersInfoById(state, { payload }: PayloadAction<BloggerInfo>) {
            state.bloggerCurrent.info = payload;
        },
        resetBlogger(state) {
            state.bloggerCurrent = initialState.bloggerCurrent;
        },
        resetToInit() {
            return initialState;
        },
    },
    selectors: {
        selectBloggersPreview: (state) => state.bloggersPreview,
        selectBloggersLimit: (state) => state.bloggersLimit,
        selectBloggersFavorite: (state) => state.bloggersMain.favorites,
        selectBloggersOthers: (state) => state.bloggersMain.others,
        selectBloggersToggleLoading: (state) => state.bloggersLoadingId,
        selectBloggersUnfoldLoading: (state) => state.bloggersUnfoldLoading,
        selectBloggersById: (state) => state.bloggerCurrent,
        selectBloggersInfoById: (state) => state.bloggerCurrent.info,
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
    resetBlogger,
    resetToInit,
} = bloggersSlice.actions;
export const {
    selectBloggersPreview,
    selectBloggersLimit,
    selectBloggersFavorite,
    selectBloggersOthers,
    selectBloggersToggleLoading,
    selectBloggersUnfoldLoading,
    selectBloggersById,
    selectBloggersInfoById,
} = bloggersSlice.selectors;
