import { authorizedApi } from '..';
import { ApiEndpoints } from '../constants';
import { replaceUnderscoreId } from '../utils/replace-underscore-id';
import { transformBaseErrorResponse } from '../utils/transform-base-error-response';

export type RawMeasureUnit = {
    _id: string;
    name: string;
};

export type MeasureUnit = {
    id: string;
    name: string;
};

export const measureApi = authorizedApi.injectEndpoints({
    endpoints: (build) => ({
        getMeasureUnits: build.query<MeasureUnit[], void>({
            query: () => ({ url: ApiEndpoints.MeasureUnits }),
            transformResponse: (response: RawMeasureUnit[]): MeasureUnit[] =>
                response.map((unit) => replaceUnderscoreId(unit)),
            transformErrorResponse: transformBaseErrorResponse,
        }),
    }),
    overrideExisting: false,
});

export const { useGetMeasureUnitsQuery } = measureApi;
