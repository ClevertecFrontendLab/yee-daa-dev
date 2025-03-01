import { NotificationData } from '~/redux/features/app-slice';

import { NOTIFICATION_STATE_NAME } from '../constants';

export type ReplacedIdToUnderscore<T extends { id: string }> = Omit<T, '_id'> & { _id: T['id'] };

export type WithNotificationState<T> = T & {
    [NOTIFICATION_STATE_NAME]: NotificationData;
};

export enum StatusTypesEnum {
    Success = 'success',
    Error = 'error',
    Warn = 'warning',
}
