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
        SubmitButton: 'submit',
        PasswordVisibilityButton: 'password-visibility-button',
        ForgotPasswordButton: 'forgot-password',
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
    },
} as const;
