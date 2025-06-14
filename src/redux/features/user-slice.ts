import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { BaseUserInfo, UserState, UserStatistic } from '~/types/user';

const initialState: { user: UserState; userStatistic: UserStatistic; users: BaseUserInfo[] } = {
    user: {
        id: '',
        drafts: [],
        email: '',
        firstName: '',
        lastName: '',
        login: '',
        notes: [],
        recipesIds: [],
        recipes: [],
        subscribers: [],
        subscriptions: [],
        bookmarks: [],
        photoLink: '',
        recommendation: [],
    },
    userStatistic: {
        recommendationsCount: 0,
        likes: [],
        bookmarks: [],
    },
    users: [],
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<Partial<UserState>>) {
            state.user = {
                ...state.user,
                ...action.payload,
                ...(action.payload.notes && {
                    notes: action.payload.notes.map((note) => ({ ...note })),
                }),
            };
        },
        setUserNotes(state, action: PayloadAction<UserState['notes']>) {
            state.user.notes = action.payload.map((note) => ({ ...note }));
        },
        resetUser(state) {
            state.user = initialState.user;
        },
        setUserStatistic(state, action: PayloadAction<UserStatistic>) {
            state.userStatistic = {
                ...action.payload,
            };
        },
        setAvatar(state, action: PayloadAction<string>) {
            state.user.photoLink = action.payload;
        },
        setRecipeRecommendation(state, action: PayloadAction<string>) {
            state.user.recommendation.push(action.payload);
        },
        removeBookmarks(state, action: PayloadAction<string>) {
            state.user.bookmarks = state.user.bookmarks.filter(
                (bookmark) => bookmark.id !== action.payload,
            );
        },
        setAllUsers(state, action: PayloadAction<BaseUserInfo[]>) {
            state.users = action.payload;
        },
    },
    selectors: {
        selectUser: (state) => state.user,
        selectIsRecommending: (state) => {
            const { subscribers, bookmarks } = state.user;
            return subscribers.length > 100 && bookmarks.length > 200;
        },
        selectIsRecommendingRecipe: (state, recipeId) =>
            state.user.recommendation.includes(recipeId),
        selectUserStatistic: (state) => state.userStatistic,
        selectUserDraft: ({ user }, draftId) => user.drafts.find((draft) => draft.id === draftId),
        selectUserSubscribers: ({ users, user }) =>
            users.filter((userInfo) => user.subscribers.includes(userInfo.id)),
        selectUserInfoRecommended: ({ users }, userId) => users.find((user) => user.id === userId),
        selectUserInfoCounts: ({ user, userStatistic }) => ({
            subscribers: user.subscribers.length,
            likes: userStatistic.likes.length,
            bookmarks: userStatistic.bookmarks.length,
            recommendations: userStatistic.recommendationsCount,
        }),
    },
});

export const {
    selectUser,
    selectIsRecommending,
    selectIsRecommendingRecipe,
    selectUserStatistic,
    selectUserDraft,
    selectUserSubscribers,
    selectUserInfoRecommended,
    selectUserInfoCounts,
} = userSlice.selectors;

export const {
    setUser,
    setUserNotes,
    resetUser,
    setUserStatistic,
    setAvatar,
    setRecipeRecommendation,
    removeBookmarks,
    setAllUsers,
} = userSlice.actions;

export const userReducer = userSlice.reducer;
