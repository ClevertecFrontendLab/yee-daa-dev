import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export const isFetchBaseQueryError = (error: unknown): error is FetchBaseQueryError =>
    typeof error === 'object' &&
    error !== null &&
    'status' in error &&
    typeof (error as FetchBaseQueryError).status === 'number';
