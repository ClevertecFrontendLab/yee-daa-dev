import { NotificationMessages } from '~/constants/notification-messages';

import { authorizedApi } from '../';
import { ApiEndpoints, NOTIFICATION_STATE_NAME } from '../constants';
import { StatusTypesEnum } from '../types/common';

type FileUploadResponse = {
    name: string;
    url: string;
    _id: string;
};

export const fileApi = authorizedApi.injectEndpoints({
    endpoints: (build) => ({
        uploadFile: build.mutation<FileUploadResponse, FormData>({
            query: (formData) => ({
                url: ApiEndpoints.FileUpload,
                method: 'POST',
                body: formData,
                formData: true,
            }),
            transformErrorResponse: (response) => ({
                ...response,
                [NOTIFICATION_STATE_NAME]: {
                    status: StatusTypesEnum.Error,
                    title: NotificationMessages.ERROR_GENERAL_TITLE,
                    description: 'Попробуйте сохранить фото позже.',
                },
            }),
        }),
    }),
});

export const { useUploadFileMutation } = fileApi;
