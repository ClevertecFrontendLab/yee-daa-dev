import * as yup from 'yup';

import { CredentialsStep } from '../components/credentials-step/credentials-step';
import { PersonalInfoStep } from '../components/personal-info-step/personal-info-step';
import { SignUpForm } from '../types/sign-up-form';

export const enum SignUpStep {
    PersonalInfo,
    Credentials,
}

const PersonalInfoSchema = yup.object().shape({
    firstName: yup.string().required('Введите имя'),
    lastName: yup.string().required('Введите фамилию'),
    email: yup.string().required('Введите email'),
}) as yup.ObjectSchema<SignUpForm>;

const CredentialsSchema = yup.object().shape({
    login: yup.string().required('Введите логин'),
    password: yup.string().required('Введите пароль'),
    repeatPassword: yup
        .string()
        .required('Введите пароль')
        .oneOf([yup.ref('password')], 'Пароли должны совпадать'),
}) as yup.ObjectSchema<SignUpForm>;

export const SignUpSchema = [PersonalInfoSchema, CredentialsSchema];

export const SignUpStepComponent = {
    [SignUpStep.PersonalInfo]: PersonalInfoStep,
    [SignUpStep.Credentials]: CredentialsStep,
};
