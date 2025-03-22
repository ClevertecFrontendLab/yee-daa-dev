import { setAccessToken } from '~/redux/features/auth-slice';
import { LOCALSTORAGE_KEYS, setDataToLocalStorage } from '~/utils/local-storage-util';

import { unauthorizedApi } from '../..';
import { ApiEndpoints } from '../../constants';
import {
    CheckVerificationCodeBody,
    CheckVerificationCodeResponse,
    ResetCredentialsBody,
    ResetCredentialsResponse,
    SendVerificationCodeBody,
    SendVerificationCodeResponse,
    SigInResponse,
    SignInBody,
    SignUpBody,
    SigUpResponse,
} from '../../types/auth';

export const authApi = unauthorizedApi.injectEndpoints({
    endpoints: (build) => ({
        signIn: build.mutation<SigInResponse, SignInBody>({
            query: (body) => ({ url: ApiEndpoints.SignIn, method: 'POST', body }),
            async onQueryStarted(_, { queryFulfilled, dispatch }) {
<<<<<<< HEAD
                try {
                    const {
                        data: { refreshToken, accessToken },
                    } = await queryFulfilled;

                    setDataToLocalStorage(LOCALSTORAGE_KEYS.REFRESH_TOKEN, refreshToken);
                    dispatch(setAccessToken(accessToken));
                } catch (error) {
                    //
                }
=======
                const {
                    data: { refreshToken, accessToken },
                } = await queryFulfilled;

                setDataToLocalStorage(LOCALSTORAGE_KEYS.REFRESH_TOKEN, refreshToken);
                dispatch(setAccessToken(accessToken));
>>>>>>> fb6bd31 (feat(sign-in, api): add api, add sign-in interaction)
            },
        }),

        signUp: build.mutation<SigUpResponse, SignUpBody>({
            query: (body) => ({ url: ApiEndpoints.SignUp, method: 'POST', body }),
        }),

        signOut: build.mutation({
            query: () => ({ url: ApiEndpoints.SignOut }),
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
    }),
});

export const {
    useSignInMutation,
    useSignUpMutation,
    useSignOutMutation,
    useSendVerificationCodeMutation,
    useCheckVerificationCodeMutation,
    useResetCredentialsMutation,
} = authApi;
