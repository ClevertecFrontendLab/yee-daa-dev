export const TOAST_MESSAGE = {
    signInError: {
        id: 'sign-in-error',
        title: 'Неверный логин или пароль',
        description: 'Попробуйте снова',
    },
    serverError: {
        id: 'server-error',
        title: 'Ошибка сервера',
        description: 'Попробуйте немного позже',
    },
} as const;
