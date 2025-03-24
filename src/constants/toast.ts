import { HttpStatus } from './http-status';

export const TOAST_MESSAGE = {
    SignInToast: {
        [HttpStatus.UNAUTHORIZED]: {
            id: 'sign-in-error-credentials',
            title: 'Неверный логин или пароль',
            description: 'Попробуйте снова',
        },
        [HttpStatus.FORBIDDEN]: {
            id: 'sign-in-error-not-verified',
            title: 'E-mail не верифицирован',
            description: 'Проверьте почту и перейдите по ссылке',
        },
    },
    SignUpToast: {
        [HttpStatus.OK]: {
            id: 'sign-up-verified-ok',
            title: 'Верификация прошла успешно',
        },
    },
    SendVerificationCodeToast: {
        [HttpStatus.FORBIDDEN]: {
            id: 'send-verification-code-not-exist',
            title: 'Такого e-mail нет',
            description: 'Попробуйте другой e-mail или проверьте правильность его написания',
        },
    },
    RestoreCredentials: {
        [HttpStatus.OK]: {
            id: 'restore-credentials-ok',
            title: 'Восстановление данных успешно',
        },
    },
    ServerErrorToast: {
        id: 'server-error',
        title: 'Ошибка сервера',
        description: 'Попробуйте немного позже',
    },
} as const;
