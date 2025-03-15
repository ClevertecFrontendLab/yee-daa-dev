import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    useDisclosure,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, Outlet } from 'react-router';

import { Label } from './label';
import { SignInErrorModal } from '../sign-in-error-modal/sign-in-error-modal';
import { PasswordInput } from '../password-input/password-input';

import { TOAST_MESSAGE } from '~/constants/toast';
import { useAuthToast } from '~/hooks/use-auth-toast';
import { Paths } from '~/constants/path';
import type { SignInFormData } from '~/types/authorization';
import { SignInSchema } from '~/constants/authorization';

const { signInError } = TOAST_MESSAGE;

export const SignInForm: FC = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { toast } = useAuthToast();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignInFormData>({
        resolver: yupResolver(SignInSchema),
    });

    const onSubmit: Parameters<typeof handleSubmit>[0] = (data) => {
        console.log(data);
        onOpen();
    };

    useEffect(() => {
        toast(signInError, false);
    }, []);

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl isInvalid={!!errors.email}>
                    <FormLabel>{Label.Login.Label}</FormLabel>
                    <Input
                        variant='auth'
                        size='lg'
                        placeholder={Label.Login.Placeholder}
                        {...register('email')}
                    />
                    <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.password} mt={6}>
                    <FormLabel>{Label.Password.Label}</FormLabel>

                    <PasswordInput
                        placeholder={Label.Password.Placeholder}
                        {...register('password')}
                    />

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
                    <NavLink to={Paths.RESTORE_CREDENTIALS} replace>
                        {Label.ForgotPassword}
                    </NavLink>
                </Box>
            </form>

            <SignInErrorModal {...{ isOpen, onClose }} repeat={() => {}} />
            <Outlet />
        </>
    );
};
