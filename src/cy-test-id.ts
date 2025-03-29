export const CyTestId = {
    AppLoader: 'app-loader',
    Breadcrumbs: 'breadcrumbs',
    Progress: {
        SignUp: 'sign-up-progress',
    },
    Form: {
        SignIn: 'sign-in-form',
        SignUp: 'sign-up-form',
    },
    Input: {
        Login: 'login-input',
        Password: 'password-input',
        PasswordConfirm: 'confirm-password-input',
        Email: 'email-input',
        FirstName: 'first-name-input',
        LastName: 'last-name-input',
        VerificationCode: 'verification-code-input',
    },
    Modal: {
        SignInError: 'sign-in-error-modal',
        SignUpSuccess: 'sign-up-success-modal',
        EmailVerificationFailed: 'email-verification-failed-modal',
        SendEmailModal: 'send-email-modal',
        VerificationCodeModal: 'verification-code-modal',
        ResetCredentialsModal: 'reset-credentials-modal',
    },
    Button: {
        ForgotPassword: 'forgot-password',
        PasswordVisibility: 'password-visibility-button',
        Submit: 'submit-button',
        Repeat: 'repeat-button',
        Close: 'close-button',
    },
} as const;
