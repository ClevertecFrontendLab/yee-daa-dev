export const NotificationMessages = {
    ERROR_GENERAL_TITLE: 'Ошибка сервера',
    ERROR_TITLE: 'Ошибка',
    ERROR_GENERAL_DESCRIPTION: 'Попробуйте поискать снова попозже',
    ERROR_TRY_LATER: 'Попробуйте немного позже',
    ERROR_TOO_MANY_TITLE: '429 Слишком много запросов',
    ERROR_TOO_MANY_DESCRIPTION:
        'Достигнут лимит запросов в единицу времени, попробуйте сформировать запрос позже',
    CREATE_RECIPE_SUCCESS_TITLE: 'Рецепт успешно опубликован',
    CREATE_RECIPE_SUCCESS_DESCRIPTION: 'Рецепт успешно создан',
    CREATE_RECIPE_ERROR_TITLE: 'Ошибка сервера',
    CREATE_RECIPE_ERROR_DESCRIPTION: 'Попробуйте пока сохранить в черновик.',
    UPDATE_RECIPE_ERROR_DESCRIPTION: 'Не удалось обновить рецепт',
    UPDATE_RECIPE_SUCCESS_TITLE: 'Рецепт успешно обновлен',
    DELETE_RECIPE_ERROR_DESCRIPTION: 'Не удалось удалить рецепт',
    DELETE_RECIPE_SUCCESS_TITLE: 'Рецепт успешно удален',
    RECIPE_ALREADY_EXISTS_DESCRIPTION: 'Рецепт с таким названием уже существует',
    SAVE_DRAFT_ERROR_DESCRIPTION: 'Не удалось сохранить черновик рецепта',
    DRAFT_SUCCESS_TITLE: 'Черновик успешно сохранен',
    NOTES_CREATE_SUCCESS_TITLE: 'Заметка опубликована',
    NOTES_DELETE_SUCCESS_TITLE: 'Заметка удалена',
    USER_DELETE_SUCCESS_TITLE: 'Аккаунт успешно удалён',
    USER_UPDATE_DATA_SUCCESS_TITLE: 'Изменения сохранены',
} as const;

export const NotificationDescription = {
    ERROR_GENERAL_DESCRIPTION: 'Попробуйте позже.',
    ERROR_TRY_AGAIN_DESCRIPTION: 'Попробуйте снова',
} as const;
