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
    useDisclosure,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router';

import { SignInErrorModal } from './components/sign-in-error-modal/sign-in-error-modal';
import { SignInSchema } from './constants/sign-in-form';
import { Label } from './label';
import { SignInForm } from './types/sign-in-form';

import { TOAST_MESSAGE } from '~/constants/toast';
import { useAuthToast } from '~/hooks/use-auth-toast';

const { signInError } = TOAST_MESSAGE;

const SignInPage: FC = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);

    const { isOpen, onOpen, onClose } = useDisclosure();
    const { toast } = useAuthToast();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignInForm>({
        resolver: yupResolver(SignInSchema),
    });

    const showPassword = () => setPasswordVisible(true);
    const hidePassword = () => setPasswordVisible(false);

    const onSubmit: Parameters<typeof handleSubmit>[0] = (data) => {
        console.log(data);
        onOpen();
    };

    useEffect(() => {
        if (!toast.isActive(signInError.id)) {
            toast(signInError);
        }
    }, []);

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl isInvalid={!!errors.email}>
                    <FormLabel>{Label.LoginLabel}</FormLabel>
                    <Input
                        variant='auth'
                        size='lg'
                        placeholder={Label.LoginPlaceholder}
                        {...register('email')}
                    />
                    <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.password} mt={6}>
                    <FormLabel>{Label.PasswordLabel}</FormLabel>

                    <InputGroup>
                        <InputRightElement height='48px'>
                            <IconButton
                                aria-label='password-visibility'
                                onMouseDown={showPassword}
                                onMouseUp={hidePassword}
                                onMouseLeave={hidePassword}
                                variant='unstyled'
                                height='100%'
                            >
                                {passwordVisible ? <ViewIcon /> : <ViewOffIcon />}
                            </IconButton>
                        </InputRightElement>

                        <Input
                            variant='auth'
                            size='lg'
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

            <SignInErrorModal {...{ isOpen, onClose }} repeat={() => {}} />
        </>
    );
};

export default SignInPage;
