import * as yup from 'yup';

export const EmailValidation = yup
    .string()
    .required('Введите email')
    .matches(
        /^[a-zA-Z0-9._%+-]+@(?!(xn--))[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'Введите корректный e-mail',
    );

const PersonalInfoSchema = yup.object().shape({
    firstName: yup.string().required('Введите имя').russianOnly(),
    lastName: yup.string().required('Введите фамилию').russianOnly(),
    email: EmailValidation,
});

export const CredentialsSchema = yup.object().shape({
    login: yup
        .string()
        .required('Введите логин')
        .matches(/^[a-zA-Z0-9!@#$&_+-.]{5,}$/, 'Не соответсвует формату'),
    password: yup
        .string()
        .required('Введите пароль')
        .matches(/^(?!.*[А-Яа-яЁё\s])(?=.*[A-Z])(?=.*\d).{8,}$/, 'Не соответсвует формату'),
    repeatPassword: yup
        .string()
        .required('Введите пароль')
        .oneOf([yup.ref('password')], 'Пароли должны совпадать'),
});

export type CredentialsFormSchema = yup.InferType<typeof CredentialsSchema>;

export type SignUpFormSchema = yup.InferType<typeof PersonalInfoSchema> & CredentialsFormSchema;

export const SignUpSchema = [
    PersonalInfoSchema as yup.ObjectSchema<SignUpFormSchema>,
    CredentialsSchema as yup.ObjectSchema<SignUpFormSchema>,
];
