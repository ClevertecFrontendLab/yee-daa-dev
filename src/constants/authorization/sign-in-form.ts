import * as yup from 'yup';

export const SignInSchema = yup.object().shape({
    login: yup.string().required('Введите логин').max(50, 'Максимальная длина 50 символов'),
    password: yup.string().required('Введите пароль').max(50, 'Максимальная длина 50 символов'),
});

export type SignInFormSchema = yup.InferType<typeof SignInSchema>;
