import * as yup from 'yup';

export const SignInSchema = yup.object().shape({
    login: yup.string().required('Введите логин'),
    password: yup.string().required('Введите пароль'),
});

export type SignInFormSchema = yup.InferType<typeof SignInSchema>;
