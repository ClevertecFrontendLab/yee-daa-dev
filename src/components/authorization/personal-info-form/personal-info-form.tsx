import { Button, FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import { FC } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { SignUpFormSchema } from '~/constants/authorization/sign-up-form';
import { useTrimInputBlur } from '~/hooks/use-trim-input-blur';

import { Label } from './label';

type PersonalInfoFormProps = {
    form: UseFormReturn<SignUpFormSchema>;
};

export const PersonalInfoForm: FC<PersonalInfoFormProps> = ({
    form: {
        register,
        setValue,
        formState: { errors, isSubmitting },
    },
}) => {
    const { handleBlur } = useTrimInputBlur(setValue);

    return (
        <>
            <FormControl isInvalid={!!errors.firstName}>
                <FormLabel>{Label.FirstName.Label}</FormLabel>
                <Input
                    variant='auth'
                    size='lg'
                    placeholder={Label.FirstName.Placeholder}
                    {...register('firstName')}
                    onBlur={handleBlur('firstName')}
                />
                <FormErrorMessage>{errors.firstName?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.lastName} mt={6}>
                <FormLabel>{Label.LastName.Label}</FormLabel>
                <Input
                    variant='auth'
                    size='lg'
                    placeholder={Label.LastName.Placeholder}
                    {...register('lastName')}
                    onBlur={handleBlur('lastName')}
                />
                <FormErrorMessage>{errors.lastName?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.email} mt={6}>
                <FormLabel>{Label.Email.Label}</FormLabel>
                <Input
                    variant='auth'
                    size='lg'
                    placeholder={Label.Email.Placeholder}
                    {...register('email')}
                    onBlur={handleBlur('email')}
                />
                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
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
