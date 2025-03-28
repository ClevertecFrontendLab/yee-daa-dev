export const CyTestId = {
    AppLoader: 'app-loader',
    Breadcrumbs: 'breadcrumbs',
    Auth: {
        SignInForm: 'sign-in-form',
        SignUpForm: 'sign-up-form',

        SignUpProgress: 'sign-up-progress',

        LoginInput: 'login-input',
        PasswordInput: 'password-input',
        RepeatPasswordInput: 'repeat-password-input',
        EmailInput: 'email-input',
        FirstNameInput: 'first-name-input',
        LastNameInput: 'last-name-input',
        VerificationCodeInput: 'verification-code-input',

        SubmitButton: 'submit',
        PasswordVisibilityButton: 'password-visibility-button',
        ForgotPasswordButton: 'forgot-password',
        RestoreCredentialsButton: 'restore-credentials-button',
    },
    Modal: {
        CloseButton: 'modal-close-button',
        SignInError: {
            Root: 'sign-in-error-modal',
            RepeatButton: 'repeat-button',
        },
        SignUpSuccess: {
            Root: 'sign-up-success-modal',
        },
        EmailVerificationFailed: {
            Root: 'email-verification-failed-modal',
        },
        RestoreCredentialsEmailModal: {
            Root: 'restore-credentials-email-modal',
        },
        VerificationCodeModal: {
            Root: 'verification-code-modal',
        },
        RestoreFormModal: {
            Root: 'restore-form-modal',
        },
    },
} as const;
