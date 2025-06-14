import { NotificationDescription, NotificationMessages } from '~/constants/notification-messages';
import { Paths } from '~/constants/path';
import { setNotificationData, setNotificationVisibility } from '~/redux/features/app-slice';
import { resetAuth } from '~/redux/features/auth-slice';
import {
    resetUser,
    setAllUsers,
    setAvatar,
    setUser,
    setUserNotes,
    setUserStatistic,
} from '~/redux/features/user-slice';
import { AppState } from '~/types/store';
import {
    BaseUserInfo,
    NoteType,
    UserState,
    UserStateWithUnderscoreId,
    UserStatistic,
} from '~/types/user';

import { authorizedApi } from '..';
import { ApiEndpoints } from '../constants';
import { StatusTypesEnum } from '../types/common';
import { NoteWithUnderscoreId } from '../types/recipes';
import { replaceMapUnderscoreId, replaceUnderscoreId } from '../utils/replace-underscore-id';

type NoteBody = {
    text: string;
};

type UserUpdateBody = {
    firstName: string;
    lastName: string;
};

type UserUpdatePasswordBody = {
    password: string;
    newPassword: string;
};

type FileUploadResponse = {
    name: string;
    photoLink: string;
    _id: string;
};

export const userApi = authorizedApi.enhanceEndpoints({ addTagTypes: ['User'] }).injectEndpoints({
    endpoints: (build) => ({
        // Получение всей информации о юзере
        getCurrentUser: build.query<UserState, void>({
            query: () => ({
                url: ApiEndpoints.GetMe,
            }),
            transformResponse: (response: UserStateWithUnderscoreId): UserState => {
                const { _id, drafts, notes, ...rest } = response;
                return {
                    ...rest,
                    id: _id,
                    drafts: replaceMapUnderscoreId(drafts),
                    notes: replaceMapUnderscoreId(notes),
                };
            },
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setUser(data));
                } catch (err) {
                    console.error('Failed to fetch user:', err);
                }
            },
        }),
        // Получение информации по всем юзерам
        getAllUsersInfo: build.query<BaseUserInfo[], void>({
            query: () => ({
                url: ApiEndpoints.GetAllUsers,
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setAllUsers(data));
                } catch (err) {
                    console.error('Failed to fetch user:', err);
                }
            },
        }),
        // Создание заметки в блог
        createNote: build.mutation<NoteType, NoteBody>({
            query: (body) => ({
                url: `${ApiEndpoints.GetMe}/note`,
                method: 'POST',
                body,
            }),
            transformResponse: (response: NoteWithUnderscoreId): NoteType =>
                replaceUnderscoreId(response),
            async onQueryStarted(_, { dispatch, queryFulfilled, getState }) {
                try {
                    const { data: createdNote } = await queryFulfilled;

                    const state = getState() as AppState;
                    const currentNotes = state.user.user.notes;
                    dispatch(setUserNotes([...currentNotes, createdNote]));
                    dispatch(
                        setNotificationData({
                            status: StatusTypesEnum.Success,
                            title: NotificationMessages.NOTES_CREATE_SUCCESS_TITLE,
                        }),
                    );
                    dispatch(setNotificationVisibility(true));
                } catch (err) {
                    dispatch(
                        setNotificationData({
                            status: StatusTypesEnum.Error,
                            title: NotificationMessages.ERROR_GENERAL_TITLE,
                            description: NotificationDescription.ERROR_GENERAL_DESCRIPTION,
                        }),
                    );
                    dispatch(setNotificationVisibility(true));
                    console.error(err);
                }
            },
        }),
        // Удаление заметки в блоге
        deleteNote: build.mutation<void, string>({
            query: (id) => ({
                url: `${ApiEndpoints.GetMe}/note/${id}`,
                method: 'DELETE',
            }),
            async onQueryStarted(noteId, { dispatch, queryFulfilled, getState }) {
                const previousUser = (getState() as AppState).user.user;

                try {
                    await queryFulfilled;
                    dispatch(setUserNotes(previousUser.notes.filter((note) => note.id !== noteId)));
                    dispatch(
                        setNotificationData({
                            status: StatusTypesEnum.Success,
                            title: NotificationMessages.NOTES_DELETE_SUCCESS_TITLE,
                        }),
                    );
                    dispatch(setNotificationVisibility(true));
                } catch (err) {
                    dispatch(setUserNotes(previousUser.notes));
                    dispatch(
                        setNotificationData({
                            status: StatusTypesEnum.Error,
                            title: NotificationMessages.ERROR_GENERAL_TITLE,
                            description: NotificationDescription.ERROR_GENERAL_DESCRIPTION,
                        }),
                    );
                    dispatch(setNotificationVisibility(true));
                    console.error(err);
                }
            },
        }),
        // Удаление аккаунта
        deleteUser: build.mutation<void, void>({
            query: () => ({
                url: `${ApiEndpoints.GetMe}`,
                method: 'DELETE',
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    document.cookie = 'refreshToken=;';
                    dispatch(resetUser());
                    dispatch(resetAuth());
                    window.location.href = Paths.SIGN_IN;
                    dispatch(
                        setNotificationData({
                            status: StatusTypesEnum.Success,
                            title: NotificationMessages.USER_DELETE_SUCCESS_TITLE,
                        }),
                    );
                    dispatch(setNotificationVisibility(true));
                } catch (err) {
                    dispatch(
                        setNotificationData({
                            status: StatusTypesEnum.Error,
                            title: NotificationMessages.ERROR_GENERAL_TITLE,
                            description: NotificationDescription.ERROR_GENERAL_DESCRIPTION,
                        }),
                    );
                    dispatch(setNotificationVisibility(true));
                    console.error(err);
                }
            },
        }),
        // Получение статистики по юзеру
        getStatistic: build.query<UserStatistic, void>({
            query: () => ({
                url: '/statistic',
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setUserStatistic(data));
                } catch (err) {
                    console.error(err);
                }
            },
        }),
        // Изменение данных юзера
        updateUserData: build.mutation<UserUpdateBody, UserUpdateBody>({
            query: (body) => ({
                url: `${ApiEndpoints.GetMe}/update-info`,
                method: 'PATCH',
                body,
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setUser(data));
                    dispatch(
                        setNotificationData({
                            status: StatusTypesEnum.Success,
                            title: NotificationMessages.USER_UPDATE_DATA_SUCCESS_TITLE,
                        }),
                    );
                    dispatch(setNotificationVisibility(true));
                } catch (err) {
                    dispatch(
                        setNotificationData({
                            status: StatusTypesEnum.Error,
                            title: NotificationMessages.ERROR_GENERAL_TITLE,
                            description: NotificationDescription.ERROR_GENERAL_DESCRIPTION,
                        }),
                    );
                    dispatch(setNotificationVisibility(true));
                    console.error(err);
                }
            },
        }),
        // Изменение пароля юзера
        updatePasswordData: build.mutation<void, UserUpdatePasswordBody>({
            query: (body) => ({
                url: `${ApiEndpoints.GetMe}/update-password`,
                method: 'PATCH',
                body,
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;

                    dispatch(
                        setNotificationData({
                            status: StatusTypesEnum.Success,
                            title: 'Пароль успешно обновлён',
                        }),
                    );
                    dispatch(setNotificationVisibility(true));
                } catch (error) {
                    const err = error as { error: { status: number; data?: { message: string } } };
                    if (err.error.status === 400) {
                        dispatch(
                            setNotificationData({
                                status: StatusTypesEnum.Error,
                                title: err.error.data!.message,
                                description: NotificationDescription.ERROR_TRY_AGAIN_DESCRIPTION,
                            }),
                        );
                    } else {
                        dispatch(
                            setNotificationData({
                                status: StatusTypesEnum.Error,
                                title: NotificationMessages.ERROR_GENERAL_TITLE,
                                description: NotificationMessages.ERROR_TRY_LATER,
                            }),
                        );
                    }
                    dispatch(setNotificationVisibility(true));
                    console.error(err);
                }
            },
        }),
        // Сохранение аватара
        addAvatar: build.mutation<FileUploadResponse, FormData>({
            query: (formData) => ({
                url: `${ApiEndpoints.GetMe}/photo`,
                method: 'POST',
                body: formData,
                formData: true,
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setAvatar(data.photoLink));
                } catch (err) {
                    dispatch(
                        setNotificationData({
                            status: StatusTypesEnum.Error,
                            title: NotificationMessages.ERROR_GENERAL_TITLE,
                            description: NotificationDescription.ERROR_GENERAL_DESCRIPTION,
                        }),
                    );
                    dispatch(setNotificationVisibility(true));
                    console.log(err);
                }
            },
        }),
    }),
});

export const {
    useGetCurrentUserQuery,
    useCreateNoteMutation,
    useDeleteNoteMutation,
    useDeleteUserMutation,
    useAddAvatarMutation,
    useGetStatisticQuery,
    useUpdateUserDataMutation,
    useUpdatePasswordDataMutation,
    useGetAllUsersInfoQuery,
} = userApi;
