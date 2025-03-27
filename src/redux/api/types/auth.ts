import {
    CredentialsFormSchema,
    EmailRestoreFormSchema,
    SignInFormSchema,
    SignUpFormSchema,
} from '~/constants/authorization';

export type SignInBody = SignInFormSchema;

export type SignUpBody = Omit<SignUpFormSchema, 'passwordConfirm'>;

export type SigUpResponse = void;

export type SendVerificationCodeBody = EmailRestoreFormSchema;

export type SendVerificationCodeResponse = void;

export type CheckVerificationCodeBody = {
    email: string;
    otpToken: string;
};

export type CheckVerificationCodeResponse = void;

export type ResetCredentialsBody = CredentialsFormSchema;

export type ResetCredentialsResponse = void;
