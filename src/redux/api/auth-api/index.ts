import { resetAuth, setAccessToken } from '~/redux/features/auth-slice';

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
            query: (body) => ({ url: ApiEndpoints.SignIn, method: 'POST', body }),
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
                } catch (error) {
                    dispatch(resetAuth());

                    console.error(error);
                }
            },
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

        // signOut: build.mutation({
        //     query: () => ({ url: ApiEndpoints.SignOut }),
        // }),
    }),
});

export const {
    useSignInMutation,
    useRefreshTokenMutation,
    useSignUpMutation,
    useSendVerificationCodeMutation,
    useCheckVerificationCodeMutation,
    useResetCredentialsMutation,
    // useSignOutMutation,
} = authApi;
