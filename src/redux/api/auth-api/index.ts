import { resetAuth, setAccessToken } from '~/redux/features/auth-slice';

import { unauthorizedApi } from '..';
import { ACCESS_TOKEN_HEADER, ApiEndpoints } from '../constants';
import {
    CheckVerificationCodeBody,
    ResetCredentialsBody,
    SendVerificationCodeBody,
    SignInBody,
    SignUpBody,
} from '../types/auth';

export const authApi = unauthorizedApi.injectEndpoints({
    endpoints: (build) => ({
        signIn: build.mutation<void, SignInBody>({
            query: (body) => ({ url: ApiEndpoints.SignIn, method: 'POST', body }),
            async onQueryStarted(_, { queryFulfilled, dispatch }) {
                try {
                    const { meta } = await queryFulfilled;

                    dispatch(
                        setAccessToken(meta?.response?.headers.get(ACCESS_TOKEN_HEADER) || ''),
                    );
                } catch (error) {
                    dispatch(resetAuth());

                    console.error(error);
                }
            },
        }),

        refreshToken: build.mutation<void, void>({
            query: () => ({
                url: ApiEndpoints.RefreshToken,
                method: 'GET',
                credentials: 'include',
            }),
            async onQueryStarted(_, { queryFulfilled, dispatch }) {
                try {
                    const { meta } = await queryFulfilled;

                    dispatch(
                        setAccessToken(meta?.response?.headers.get(ACCESS_TOKEN_HEADER) || ''),
                    );
                } catch (error) {
                    dispatch(resetAuth());

                    console.error(error);
                }
            },
        }),

        signUp: build.mutation<void, SignUpBody>({
            query: (body) => ({ url: ApiEndpoints.SignUp, method: 'POST', body }),
        }),

        sendVerificationCode: build.mutation<void, SendVerificationCodeBody>({
            query: (body) => ({ url: ApiEndpoints.SendVerificationCode, method: 'POST', body }),
        }),

        checkVerificationCode: build.mutation<void, CheckVerificationCodeBody>({
            query: (body) => ({ url: ApiEndpoints.CheckVerificationCode, method: 'POST', body }),
        }),

        resetCredentials: build.mutation<void, ResetCredentialsBody>({
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
