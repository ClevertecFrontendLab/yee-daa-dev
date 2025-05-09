import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export const isFetchBaseQueryError = (
    error: unknown,
): error is FetchBaseQueryError & { data: object } =>
    typeof error === 'object' &&
    error !== null &&
    'status' in error &&
    typeof error.status === 'number';

export const isFetchBaseQueryErrorWithMessage = (
    error: unknown,
): error is FetchBaseQueryError & { data: { message?: string } } =>
    isFetchBaseQueryError(error) && 'data' in error && typeof error.data === 'object';
