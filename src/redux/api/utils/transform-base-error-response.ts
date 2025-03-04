import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

import { NotificationMessages } from '~/constants/notification-messages';
import { NOTIFICATION_STATE_NAME } from '~/redux/api/constants';
import { StatusTypesEnum } from '~/redux/api/types/common';

export const transformBaseErrorResponse = (response: FetchBaseQueryError) => ({
    ...response,
    [NOTIFICATION_STATE_NAME]: {
        status: StatusTypesEnum.Error,
        message: NotificationMessages.ERROR_GENERAL_TITLE,
        description: NotificationMessages.ERROR_GENERAL_DESCRIPTION,
    },
});
