import { Button, FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import { FC } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { SignUpFormData } from '~/types/authorization';

import { Label } from './label';

type PersonalInfoFormProps = {
    form: UseFormReturn<SignUpFormData>;
};

export const PersonalInfoForm: FC<PersonalInfoFormProps> = ({
    form: {
        register,
        formState: { errors, isSubmitting },
    },
}) => (
    <>
        <FormControl isInvalid={!!errors.firstName}>
            <FormLabel>{Label.FirstName.Label}</FormLabel>
            <Input
                variant='auth'
                size='lg'
                placeholder={Label.FirstName.Placeholder}
                {...register('firstName')}
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
            />
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>

        <Button mt={12} w='full' variant='black' isLoading={isSubmitting} type='submit' size='lg'>
            {Label.SubmitBtnLabel}
        </Button>
    </>
);
