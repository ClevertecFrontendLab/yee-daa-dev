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

import { SignUpFormSchema } from '~/constants/authorization';
import { useTrimInputBlur } from '~/hooks/use-trim-input-blur';

import { PasswordInput } from '../password-input/password-input';
import { Label } from './label';

type CredentialsFormProps = {
    form: UseFormReturn<SignUpFormSchema>;
};

export const CredentialsForm: FC<CredentialsFormProps> = ({
    form: {
        register,
        setValue,
        formState: { errors, isSubmitting },
    },
}) => {
    const { handleBlur } = useTrimInputBlur(setValue, true);

    return (
        <>
            <FormControl isInvalid={!!errors.login}>
                <FormLabel>{Label.Login.Label}</FormLabel>
                <Input
                    variant='auth'
                    size='lg'
                    placeholder={Label.Login.Placeholder}
                    {...register('login')}
                    onBlur={handleBlur('login')}
                />
                <FormHelperText>{Label.Login.Helper}</FormHelperText>
                <FormErrorMessage>{errors.login?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.password} mt={6}>
                <FormLabel>{Label.Password.Label}</FormLabel>
                <PasswordInput
                    input={{
                        placeholder: Label.Password.Placeholder,
                        onBlur: handleBlur('password'),
                        register: register('password'),
                    }}
                />
                <FormHelperText>{Label.Password.Helper}</FormHelperText>
                <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.repeatPassword} mt={6}>
                <FormLabel>{Label.RepeatPassword.Label}</FormLabel>
                <PasswordInput
                    input={{
                        placeholder: Label.RepeatPassword.Placeholder,
                        register: register('repeatPassword'),
                    }}
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
