import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    useDisclosure,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { FC, PropsWithChildren, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Outlet } from 'react-router';

import { SignInFormSchema, SignInSchema } from '~/constants/authorization';
import { TOAST_MESSAGE } from '~/constants/toast';
import { useAuthToast } from '~/hooks/use-auth-toast';
import { useTrimInputBlur } from '~/hooks/use-trim-input-blur';

import { PasswordInput } from '../password-input/password-input';
import { SignInErrorModal } from '../sign-in-error-modal/sign-in-error-modal';
import { Label } from './label';

const { signInError } = TOAST_MESSAGE;

export const SignInForm: FC<PropsWithChildren> = ({ children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { toast } = useAuthToast();

    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignInFormSchema>({
        resolver: yupResolver(SignInSchema),
    });

    const { handleBlur } = useTrimInputBlur(setValue);

    const onSubmit: Parameters<typeof handleSubmit>[0] = (data) => {
        console.log(data);
        onOpen();
    };

    useEffect(() => {
        toast(signInError, false);
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl isInvalid={!!errors.login}>
                    <FormLabel>{Label.Login.Label}</FormLabel>
                    <Input
                        variant='auth'
                        size='lg'
                        placeholder={Label.Login.Placeholder}
                        {...register('login')}
                        onBlur={handleBlur('login')}
                    />
                    <FormErrorMessage>{errors.login?.message}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.password} mt={6}>
                    <FormLabel>{Label.Password.Label}</FormLabel>

                    <PasswordInput
                        placeholder={Label.Password.Placeholder}
                        {...register('password')}
                        onBlur={handleBlur('password')}
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

                {children}
            </form>

            <SignInErrorModal {...{ isOpen, onClose }} repeat={() => {}} />
            <Outlet />
        </>
    );
};
