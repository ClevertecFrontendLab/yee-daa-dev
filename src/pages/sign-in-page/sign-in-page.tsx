import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router';
import * as yup from 'yup';

const schema = yup.object().shape({
    email: yup.string().required('Обязательное поле'),
    password: yup.string().required('Обязательное поле'),
});

const Label = {
    LoginLabel: 'Логин для входа на сайт',
    LoginPlaceholder: 'Введите логин',
    PasswordLabel: 'Пароль',
    PasswordPlaceholder: 'Пароль для сайта',
    LoginBtn: 'Войти',
    ForgotPassword: 'Забыли логин или пароль?',
} as const;

const SignInPage: FC = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const showPassword = () => setPasswordVisible(true);
    const hidePassword = () => setPasswordVisible(false);

    const onSubmit: Parameters<typeof handleSubmit>[0] = (data) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={!!errors.email}>
                <FormLabel>{Label.LoginLabel}</FormLabel>
                <Input variant='auth' placeholder={Label.LoginPlaceholder} {...register('email')} />
                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.password} mt={6}>
                <FormLabel>{Label.PasswordLabel}</FormLabel>

                <InputGroup>
                    <InputRightElement>
                        <IconButton
                            aria-label='password-visibility'
                            onMouseDown={showPassword}
                            onMouseUp={hidePassword}
                            onMouseLeave={hidePassword}
                            variant='unstyled'
                        >
                            {passwordVisible ? <ViewIcon /> : <ViewOffIcon />}
                        </IconButton>
                    </InputRightElement>

                    <Input
                        variant='auth'
                        type={passwordVisible ? 'text' : 'password'}
                        placeholder={Label.PasswordPlaceholder}
                        {...register('password')}
                    />
                </InputGroup>

                <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
            </FormControl>

            <Button
                mt={112}
                w='full'
                variant='black'
                isLoading={isSubmitting}
                type='submit'
                size='lg'
            >
                {Label.LoginBtn}
            </Button>

            <Box
                mt={4}
                width='full'
                textAlign='center'
                fontWeight='semibold'
                fontSize='md'
                _hover={{
                    textDecoration: 'underline',
                }}
            >
                <NavLink to='#'>{Label.ForgotPassword}</NavLink>
            </Box>
        </form>
    );
};

export default SignInPage;
