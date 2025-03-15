import * as yup from 'yup';

import { CredentialsForm, PersonalInfoForm } from '~/components/authorization';
import { SignUpFormData } from '~/types/authorization';

export const enum SignUpStep {
    PersonalInfo,
    Credentials,
}

const PersonalInfoSchema = yup.object().shape({
    firstName: yup.string().required('Введите имя'),
    lastName: yup.string().required('Введите фамилию'),
    email: yup.string().required('Введите email'),
}) as yup.ObjectSchema<SignUpFormData>;

export const CredentialsSchema = yup.object().shape({
    login: yup.string().required('Введите логин'),
    password: yup.string().required('Введите пароль'),
    repeatPassword: yup
        .string()
        .required('Введите пароль')
        .oneOf([yup.ref('password')], 'Пароли должны совпадать'),
}) as yup.ObjectSchema<SignUpFormData>;

export const SignUpSchema = [PersonalInfoSchema, CredentialsSchema];

export const SignUpStepComponent = {
    [SignUpStep.PersonalInfo]: PersonalInfoForm,
    [SignUpStep.Credentials]: CredentialsForm,
};
