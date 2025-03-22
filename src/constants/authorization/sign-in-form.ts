import * as yup from 'yup';

export const SignInSchema = yup.object().shape({
    login: yup.string().required('Введите логин').max(100, 'Максимум 100 символов'),
    password: yup.string().required('Введите пароль').max(100, 'Максимум 100 символов'),
});

export type SignInFormSchema = yup.InferType<typeof SignInSchema>;
