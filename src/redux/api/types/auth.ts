import {
    CredentialsFormSchema,
    EmailRestoreFormSchema,
    SignInFormSchema,
    SignUpFormSchema,
} from '~/constants/authorization';

export type SignInBody = SignInFormSchema;

export type SigInResponse = {
    refreshToken: string;
    accessToken: string;
};

export type SignUpBody = SignUpFormSchema;

export type SigUpResponse = void;

export type SendVerificationCodeBody = EmailRestoreFormSchema;

export type SendVerificationCodeResponse = void;

export type CheckVerificationCodeBody = {
    code: string;
};

export type CheckVerificationCodeResponse = void;

export type ResetCredentialsBody = CredentialsFormSchema;

export type ResetCredentialsResponse = void;
