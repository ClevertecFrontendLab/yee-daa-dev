import {
    Button,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    ModalBody,
    VStack,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { Label } from '~/components/authorization/credentials-form/label';
import { PasswordInput } from '~/components/authorization/password-input/password-input';
import { ResultModal } from '~/components/result-modal/result-modal';
import { useTrimInputBlur } from '~/hooks/use-trim-input-blur';
import { useUpdatePasswordDataMutation } from '~/redux/api/user-api';

type ChangePasswordModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

type ChangePasswordFormValues = {
    password: string;
    newPassword: string;
    passwordConfirm: string;
};

const schema = yup.object().shape({
    password: yup
        .string()
        .required('Введите старый пароль')
        .max(50, 'Максимальная длина 50 символов')
        .matches(
            /^(?!.*[А-Яа-яЁё\s])(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9!@#$&_+-.]{8,}$/,
            'Не соответствует формату',
        ),
    newPassword: yup
        .string()
        .required('Введите пароль')
        .max(50, 'Максимальная длина 50 символов')
        .matches(
            /^(?!.*[А-Яа-яЁё\s])(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9!@#$&_+-.]{8,}$/,
            'Не соответствует формату',
        ),
    passwordConfirm: yup
        .string()
        .required('Повторите пароль')
        .oneOf([yup.ref('newPassword')], 'Пароли должны совпадать'),
});

export const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({ isOpen, onClose }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        trigger,
        reset,
        setError,
    } = useForm<ChangePasswordFormValues>({
        mode: 'onBlur',
        resolver: yupResolver(schema),
        defaultValues: {
            password: '',
            newPassword: '',
            passwordConfirm: '',
        },
    });

    const { handleBlur } = useTrimInputBlur(setValue, true);
    const handleBlurWithValidation =
        (field: keyof ChangePasswordFormValues) => (e: React.FocusEvent<HTMLInputElement>) => {
            handleBlur(field)(e);
            trigger(field);
        };
    const [updatePassword] = useUpdatePasswordDataMutation();
    const handleClose = () => {
        reset();
        onClose();
    };

    const onSubmit = async (data: ChangePasswordFormValues) => {
        try {
            await updatePassword(data).unwrap();
            handleClose();
        } catch (error) {
            const fetchError = error as { status: number; data: { message: string } };

            if (fetchError.status === 400) {
                if (fetchError.data.message.includes('Новый и старый пароль совпадают')) {
                    setError('newPassword', {
                        type: 'manual',
                        message: fetchError.data.message,
                    });
                }
                if (fetchError.data.message.includes('Не верный пароль')) {
                    setError('password', {
                        type: 'manual',
                        message: fetchError.data.message,
                    });
                }
            } else {
                console.error('Ошибка при смене пароля', error);
            }
        }
    };

    return (
        <ResultModal imageUrl='' isOpen={isOpen} onClose={handleClose} title='Сменить пароль'>
            <ModalBody>
                <VStack spacing='32px' width='100%'>
                    <VStack spacing='24px' width='100%'>
                        <FormControl isInvalid={!!errors.password}>
                            <FormLabel>Введите старый пароль</FormLabel>
                            <PasswordInput
                                input={{
                                    placeholder: 'Старый пароль',
                                    onBlur: handleBlurWithValidation('password'),
                                    register: register('password'),
                                }}
                            />
                            <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
                        </FormControl>

                        <FormControl isInvalid={!!errors.newPassword}>
                            <FormLabel>Введите новый пароль</FormLabel>
                            <PasswordInput
                                input={{
                                    placeholder: 'Новый пароль',
                                    onBlur: handleBlurWithValidation('newPassword'),
                                    register: register('newPassword'),
                                }}
                            />
                            <FormHelperText>{Label.Password.Helper}</FormHelperText>
                            <FormErrorMessage>{errors.newPassword?.message}</FormErrorMessage>
                        </FormControl>

                        <FormControl isInvalid={!!errors.passwordConfirm}>
                            <FormLabel>Повторите пароль</FormLabel>
                            <PasswordInput
                                input={{
                                    placeholder: 'Пароль',
                                    onBlur: handleBlurWithValidation('password'),
                                    register: register('passwordConfirm'),
                                }}
                            />
                            <FormErrorMessage>{errors.passwordConfirm?.message}</FormErrorMessage>
                        </FormControl>
                    </VStack>
                    <Button variant='black' w='full' size='lg' onClick={handleSubmit(onSubmit)}>
                        Сохранить пароль
                    </Button>
                </VStack>
            </ModalBody>
        </ResultModal>
    );
};
