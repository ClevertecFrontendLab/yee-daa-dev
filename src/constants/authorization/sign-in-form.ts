import * as yup from 'yup';

export const SignInSchema = yup.object().shape({
    email: yup.string().required('Обязательное поле'),
    password: yup.string().required('Обязательное поле'),
});
