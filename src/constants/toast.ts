export const TOAST_MESSAGE = {
    signInError: {
        id: 'sign-in-error',
        title: 'Неверный логин или пароль',
        description: 'Попробуйте снова',
    },
    signUpError: {
        id: 'sign-up-error',
        title: 'Ошибка сервера',
        description: 'Попробуйте немного позже',
    },
} as const;
