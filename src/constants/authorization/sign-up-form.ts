import * as yup from 'yup';

export const EmailValidation = yup
    .string()
    .required('Введите email')
    .max(100, 'Максимум 100 символов')
    .matches(
        /^[a-zA-Z0-9._%+-]+@(?!(xn--))[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'Введите корректный e-mail',
    );

const PersonalInfoSchema = yup.object().shape({
    firstName: yup.string().required('Введите имя').russianOnly().max(100, 'Максимум 100 символов'),
    lastName: yup
        .string()
        .required('Введите фамилию')
        .russianOnly()
        .max(100, 'Максимум 100 символов'),
    email: EmailValidation,
});

export const CredentialsSchema = yup.object().shape({
    login: yup
        .string()
        .required('Введите логин')
        .matches(/^[a-zA-Z0-9!@#$&_+-.]{5,}$/, 'Не соответсвует формату')
        .max(100, 'Максимум 100 символов'),
    password: yup
        .string()
        .required('Введите пароль')
        .matches(/^(?!.*[А-Яа-яЁё\s])(?=.*[A-Z])(?=.*\d).{8,}$/, 'Не соответсвует формату')
        .max(100, 'Максимум 100 символов'),
    repeatPassword: yup
        .string()
        .required('Повторите пароль')
        .oneOf([yup.ref('password')], 'Пароли должны совпадать'),
});

export type CredentialsFormSchema = yup.InferType<typeof CredentialsSchema>;

export type SignUpFormSchema = yup.InferType<typeof PersonalInfoSchema> & CredentialsFormSchema;

export const SignUpSchema = [
    PersonalInfoSchema as yup.ObjectSchema<SignUpFormSchema>,
    CredentialsSchema as yup.ObjectSchema<SignUpFormSchema>,
];
