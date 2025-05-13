import { resetAuth, setAccessToken, setUserId } from '~/redux/features/auth-slice';
import { decodeJwt } from '~/utils/jwt';

import { unauthorizedApi } from '..';
import { ACCESS_TOKEN_HEADER, ApiEndpoints } from '../constants';
import {
    CheckVerificationCodeBody,
    CommonResponse,
    ResetCredentialsBody,
    SendVerificationCodeBody,
    SignInBody,
    SignUpBody,
} from '../types/auth';

export const authApi = unauthorizedApi.injectEndpoints({
    endpoints: (build) => ({
        signIn: build.mutation<CommonResponse, SignInBody>({
            query: (body) => ({
                url: ApiEndpoints.SignIn,
                method: 'POST',
                body,
                credentials: 'include',
            }),
            async onQueryStarted(_, { queryFulfilled, dispatch }) {
                try {
                    const { meta } = await queryFulfilled;
                    const accessToken = meta?.response?.headers.get(ACCESS_TOKEN_HEADER);

                    if (!accessToken) {
                        throw new Error(
                            `Access token wasn't found in ${ACCESS_TOKEN_HEADER} response header`,
                        );
                    }

                    dispatch(setAccessToken(accessToken));

                    // Извлекаем userId из токена
                    const decodedToken = decodeJwt(accessToken);
                    if (decodedToken?.userId) {
                        dispatch(setUserId(decodedToken.userId));
                    }
                } catch (error) {
                    dispatch(resetAuth());
                    console.error(error);
                }
            },
        }),

        refreshToken: build.mutation<CommonResponse, void>({
            query: () => ({
                url: ApiEndpoints.RefreshToken,
                method: 'GET',
                credentials: 'include',
            }),
            async onQueryStarted(_, { queryFulfilled, dispatch }) {
                try {
                    const { meta } = await queryFulfilled;
                    const accessToken = meta?.response?.headers.get(ACCESS_TOKEN_HEADER);

                    if (!accessToken) {
                        throw new Error(
                            `Access token wasn't found in ${ACCESS_TOKEN_HEADER} response header`,
                        );
                    }

                    dispatch(setAccessToken(accessToken));

                    // Извлекаем userId из токена
                    const decodedToken = decodeJwt(accessToken);
                    if (decodedToken?.userId) {
                        dispatch(setUserId(decodedToken.userId));
                    }
                } catch (error) {
                    dispatch(resetAuth());
                    console.error(error);
                }
            },
        }),

        checkAuth: build.query<CommonResponse, void>({
            query: () => ({
                url: ApiEndpoints.CheckAuth,
                method: 'GET',
                credentials: 'include',
            }),
        }),

        signUp: build.mutation<CommonResponse, SignUpBody>({
            query: (body) => ({ url: ApiEndpoints.SignUp, method: 'POST', body }),
        }),

        sendVerificationCode: build.mutation<CommonResponse, SendVerificationCodeBody>({
            query: (body) => ({ url: ApiEndpoints.SendVerificationCode, method: 'POST', body }),
        }),

        checkVerificationCode: build.mutation<CommonResponse, CheckVerificationCodeBody>({
            query: (body) => ({ url: ApiEndpoints.CheckVerificationCode, method: 'POST', body }),
        }),

        resetCredentials: build.mutation<CommonResponse, ResetCredentialsBody>({
            query: (body) => ({ url: ApiEndpoints.ResetCredentials, method: 'POST', body }),
        }),
    }),
});

export const {
    useSignInMutation,
    useRefreshTokenMutation,
    useSignUpMutation,
    useSendVerificationCodeMutation,
    useCheckVerificationCodeMutation,
    useResetCredentialsMutation,
    useCheckAuthQuery,
} = authApi;
