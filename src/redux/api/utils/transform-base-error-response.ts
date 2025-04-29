import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

import { NotificationMessages } from '~/constants/notification-messages';
import { NOTIFICATION_STATE_NAME } from '~/redux/api/constants';
import { StatusTypesEnum } from '~/redux/api/types/common';

export const transformBaseErrorResponse = (response: FetchBaseQueryError) => ({
    ...response,
    [NOTIFICATION_STATE_NAME]: {
        status: StatusTypesEnum.Error,
        title:
            response.status === 429
                ? NotificationMessages.ERROR_TOO_MANY_TITLE
                : NotificationMessages.ERROR_GENERAL_TITLE,
        description:
            response.status === 429
                ? NotificationMessages.ERROR_TOO_MANY_DESCRIPTION
                : NotificationMessages.ERROR_GENERAL_DESCRIPTION,
    },
});
