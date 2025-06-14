import {
    Button,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    Input,
    Text,
    useDisclosure,
    VStack,
    Wrap,
    WrapItem,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { Label } from '~/components/authorization/personal-info-form/label';
import { extendYup } from '~/extend-yup';
import { useAppSelector } from '~/hooks/typed-react-redux-hooks';
import { useTrimInputBlur } from '~/hooks/use-trim-input-blur';
import { useUpdateUserDataMutation } from '~/redux/api/user-api';
import { selectUser } from '~/redux/features/user-slice';

import { ChangePasswordModal } from '../change-password-modal';

type ProfileFormValues = {
    firstName: string;
    lastName: string;
    email: string;
    login: string;
};

extendYup();

const schema = yup.object().shape({
    firstName: yup
        .string()
        .required('Имя обязательно')
        .max(50, 'Максимальная длина 50 символов')
        .russianOnly(),
    lastName: yup
        .string()
        .required('Фамилия обязательна')
        .max(50, 'Максимальная длина 50 символов')
        .russianOnly(),
    email: yup.string().email().required(),
    login: yup.string().required(),
});

export const UserForm: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        trigger,
        reset,
    } = useForm<ProfileFormValues>({
        mode: 'onBlur',
        resolver: yupResolver(schema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            login: '',
        },
    });

    const { firstName, lastName, email, login } = useAppSelector(selectUser);

    useEffect(() => {
        const userData = {
            firstName,
            lastName,
            email,
            login,
        };

        reset(userData);
    }, [firstName, lastName, email, login, reset]);

    const [updateUserData] = useUpdateUserDataMutation();

    const onSubmit = (data: ProfileFormValues) => {
        const { firstName, lastName } = data;
        updateUserData({ firstName, lastName });
    };
    const { handleBlur } = useTrimInputBlur(setValue);
    const handleBlurWithValidation =
        (field: keyof ProfileFormValues) => (e: React.FocusEvent<HTMLInputElement>) => {
            handleBlur(field)(e);
            trigger(field);
        };

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <VStack spacing='24px' align='left'>
            <Wrap spacing='24px' alignSelf='stretch'>
                <WrapItem w='667px'>
                    <FormControl isInvalid={!!errors.firstName}>
                        <FormLabel>Имя</FormLabel>
                        <Input
                            variant='auth'
                            size='lg'
                            placeholder={Label.FirstName.Placeholder}
                            {...register('firstName')}
                            onBlur={handleBlurWithValidation('firstName')}
                            color='lime.800'
                        />
                        <FormErrorMessage>{errors.firstName?.message}</FormErrorMessage>
                    </FormControl>
                </WrapItem>

                <WrapItem w='667px'>
                    <FormControl isInvalid={!!errors.lastName}>
                        <FormLabel>Фамилия</FormLabel>
                        <Input
                            variant='auth'
                            size='lg'
                            placeholder={Label.LastName.Placeholder}
                            {...register('lastName')}
                            onBlur={handleBlurWithValidation('lastName')}
                            color='lime.800'
                        />
                        <FormErrorMessage>{errors.lastName?.message}</FormErrorMessage>
                    </FormControl>
                </WrapItem>

                <WrapItem w='667px'>
                    <FormControl>
                        <FormLabel>E-mail</FormLabel>
                        <Input
                            variant='auth'
                            size='lg'
                            {...register('email')}
                            disabled
                            color='lime.800'
                        />
                    </FormControl>
                </WrapItem>

                <WrapItem w='667px'>
                    <FormControl>
                        <FormLabel>Логин</FormLabel>
                        <Input
                            variant='auth'
                            size='lg'
                            {...register('login')}
                            disabled
                            color='lime.800'
                        />
                        <FormHelperText>
                            <Text fontSize='xs' lineHeight={4} color='blackAlpha.700'>
                                Логин не менее 5 символов, только латиница
                            </Text>
                        </FormHelperText>
                    </FormControl>
                </WrapItem>
            </Wrap>

            <Button
                w='250px'
                type='button'
                size='lg'
                fontSize='lg'
                textColor='black'
                variant='ghost'
                onClick={onOpen}
            >
                Сменить пароль
            </Button>

            <Button
                w='250px'
                type='button'
                size='lg'
                bg='blackAlpha.900'
                fontSize='lg'
                borderColor='blackAlpha.700'
                textColor='white'
                onClick={handleSubmit(onSubmit)}
            >
                Сохранить изменения
            </Button>
            <ChangePasswordModal isOpen={isOpen} onClose={onClose} />
        </VStack>
    );
};
