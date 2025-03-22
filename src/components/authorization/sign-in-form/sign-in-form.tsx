import {
    Box,
    Button,
    chakra,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    useDisclosure,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { NavLink, Outlet, useNavigate } from 'react-router';

import { AppLoader } from '~/components/app-loader';
import { SignInFormSchema, SignInSchema } from '~/constants/authorization';
import { HttpStatus } from '~/constants/http-status';
import { Paths } from '~/constants/path';
import { TOAST_MESSAGE } from '~/constants/toast';
import { useAuthToast } from '~/hooks/use-auth-toast';
import { useTrimInputBlur } from '~/hooks/use-trim-input-blur';
import { useSignInMutation } from '~/redux/api/services/auth-api';
import { isFetchBaseQueryError } from '~/utils/type-guard';

import { PasswordInput } from '../password-input/password-input';
import { SignInErrorModal } from '../sign-in-error-modal/sign-in-error-modal';
import { Label } from './label';

const ChakraForm = chakra('form');

const { signInError } = TOAST_MESSAGE;

export const SignInForm: FC = () => {
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose: onCloseDisclosure } = useDisclosure({ defaultIsOpen: false });
    const { toast } = useAuthToast();

    const {
        register,
        setValue,
        setError,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignInFormSchema>({
        resolver: yupResolver(SignInSchema),
        mode: 'onBlur',
    });

    const { handleBlur } = useTrimInputBlur(setValue);

    const [signIn, { reset }] = useSignInMutation();

    const onSubmit: SubmitHandler<SignInFormSchema> = async (data) => {
        try {
            await signIn(data).unwrap();

            navigate(Paths.R_SWITCHER);
        } catch (error) {
            if (isFetchBaseQueryError(error) && error.status === HttpStatus.UNAUTHORIZED) {
                toast(signInError, false);
                setError('login', { message: '' });
                setError('password', { message: '' });
            } else {
                onOpen();
                reset();
            }
        }
    };

    const onClose = () => {
        if (!isSubmitting) {
            onCloseDisclosure();
        }
    };

    return (
        <>
            <ChakraForm onSubmit={handleSubmit(onSubmit)}>
                <FormControl isDisabled={isSubmitting} isInvalid={!!errors.login}>
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

                <FormControl isDisabled={isSubmitting} isInvalid={!!errors.password} mt={6}>
                    <FormLabel>{Label.Password.Label}</FormLabel>

                    <PasswordInput
                        input={{
                            placeholder: Label.Password.Placeholder,
                            onBlur: handleBlur('password'),
                            register: register('password'),
                        }}
                        button={{
                            isDisabled: isSubmitting,
                        }}
                    />

                    <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
                </FormControl>

                <Button
                    mt={112}
                    w='full'
                    variant='black'
                    isLoading={isSubmitting}
                    loadingText={Label.LoginBtn}
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
                    pointerEvents={isSubmitting ? 'none' : 'auto'}
                    _hover={{
                        textDecoration: 'underline',
                    }}
                    opacity={isSubmitting ? 0.5 : 1}
                >
                    <NavLink to={Paths.RESTORE_CREDENTIALS} replace>
                        {Label.ForgotPassword}
                    </NavLink>
                </Box>
            </ChakraForm>

            <SignInErrorModal
                {...{ isOpen, onClose, isSubmitting }}
                repeat={handleSubmit(onSubmit)}
            />
            <AppLoader isOpen={isSubmitting} />
            <Outlet />
        </>
    );
};
