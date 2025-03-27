import { setAccessToken } from '~/redux/features/auth-slice';

import { unauthorizedApi } from '..';
import { ACCESS_TOKEN_HEADER, ApiEndpoints } from '../constants';
import {
    CheckVerificationCodeBody,
    CheckVerificationCodeResponse,
    ResetCredentialsBody,
    ResetCredentialsResponse,
    SendVerificationCodeBody,
    SendVerificationCodeResponse,
    SignInBody,
    SignUpBody,
    SigUpResponse,
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
                    console.error(error);
                }
            },
        }),

        signUp: build.mutation<SigUpResponse, SignUpBody>({
            query: (body) => ({ url: ApiEndpoints.SignUp, method: 'POST', body }),
        }),

        refreshToken: build.mutation<void, void>({
            query: (body) => ({ url: ApiEndpoints.SignUp, method: 'GET', body }),
            async onQueryStarted(_, { queryFulfilled, dispatch }) {
                try {
                    const { meta } = await queryFulfilled;

                    dispatch(
                        setAccessToken(meta?.response?.headers.get(ACCESS_TOKEN_HEADER) || ''),
                    );
                } catch (error) {
                    console.error(error);
                }
            },
        }),

        sendVerificationCode: build.mutation<
            SendVerificationCodeResponse,
            SendVerificationCodeBody
        >({
            query: (body) => ({ url: ApiEndpoints.SendVerificationCode, method: 'POST', body }),
        }),

        checkVerificationCode: build.mutation<
            CheckVerificationCodeResponse,
            CheckVerificationCodeBody
        >({
            query: (body) => ({ url: ApiEndpoints.CheckVerificationCode, method: 'POST', body }),
        }),

        resetCredentials: build.mutation<ResetCredentialsResponse, ResetCredentialsBody>({
            query: (body) => ({ url: ApiEndpoints.ResetCredentials, method: 'PATCH', body }),
        }),

        // signOut: build.mutation({
        //     query: () => ({ url: ApiEndpoints.SignOut }),
        // }),
    }),
});

export const {
    useSignInMutation,
    useSignUpMutation,
    useSendVerificationCodeMutation,
    useCheckVerificationCodeMutation,
    useResetCredentialsMutation,
    // useSignOutMutation,
} = authApi;
