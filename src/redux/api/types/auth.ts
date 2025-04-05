import {
    CredentialsFormSchema,
    EmailRestoreFormSchema,
    SignInFormSchema,
    SignUpFormSchema,
} from '~/constants/authorization';

export type CommonResponse = {
    message: string | string[];
    statusText?: string;
    error?: string;
    statusCode: number;
};

export type SignInBody = SignInFormSchema;

export type SignUpBody = Omit<SignUpFormSchema, 'passwordConfirm'>;

export type SendVerificationCodeBody = EmailRestoreFormSchema;

export type CheckVerificationCodeBody = {
    email: string;
    otpToken: string;
};

export type ResetCredentialsBody = SendVerificationCodeBody & CredentialsFormSchema;
