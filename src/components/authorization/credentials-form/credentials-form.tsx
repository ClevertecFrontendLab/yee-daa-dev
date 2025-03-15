import {
    Button,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    Input,
} from '@chakra-ui/react';
import { FC } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { Label } from './label';
import { PasswordInput } from '../password-input/password-input';

import { SignUpFormData } from '~/types/authorization';

type CredentialsFormProps = {
    form: UseFormReturn<SignUpFormData>;
};

export const CredentialsForm: FC<CredentialsFormProps> = ({
    form: {
        register,
        formState: { errors, isSubmitting },
    },
}) => {
    return (
        <>
            <FormControl isInvalid={!!errors.login}>
                <FormLabel>{Label.Login.Label}</FormLabel>
                <Input
                    variant='auth'
                    size='lg'
                    placeholder={Label.Login.Placeholder}
                    {...register('login')}
                />
                <FormHelperText>{Label.Login.Helper}</FormHelperText>
                <FormErrorMessage>{errors.login?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.password} mt={6}>
                <FormLabel>{Label.Password.Label}</FormLabel>
                <PasswordInput placeholder={Label.Password.Placeholder} {...register('password')} />
                <FormHelperText>{Label.Password.Helper}</FormHelperText>
                <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.repeatPassword} mt={6}>
                <FormLabel>{Label.RepeatPassword.Label}</FormLabel>
                <PasswordInput
                    placeholder={Label.RepeatPassword.Placeholder}
                    {...register('repeatPassword')}
                />
                <FormErrorMessage>{errors.repeatPassword?.message}</FormErrorMessage>
            </FormControl>

            <Button
                mt={12}
                w='full'
                variant='black'
                isLoading={isSubmitting}
                type='submit'
                size='lg'
            >
                {Label.SubmitBtnLabel}
            </Button>
        </>
    );
};
