import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    ModalBody,
    ModalFooter,
    Text,
} from '@chakra-ui/react';
import { FC } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { ModalLabel, EmailFormLabel } from './label';

import { ResultModal } from '~/components/result-modal/result-modal';
import { EmailRestoreForm, RestoreModalProps } from '~/types/authorization';
import { EmailRestoreSchema, RestoreStep } from '~/constants/authorization';

type EmailModalProps = RestoreModalProps & {
    setEmail: (email: string) => void;
};

export const EmailModal: FC<EmailModalProps> = ({ updateStep, setEmail, ...props }) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<EmailRestoreForm>({
        resolver: yupResolver(EmailRestoreSchema),
    });

    const onSubmit: Parameters<typeof handleSubmit>[0] = ({ email }) => {
        setEmail(email);
        updateStep(RestoreStep.Code);
    };

    return (
        <ResultModal imageUrl='/images/breakfast.png' {...props}>
            <ModalBody>
                <Text
                    color='blackAlpha.900'
                    textAlign='center'
                    fontSize='md'
                    px={{ base: 0, md: 4 }}
                    mb={4}
                >
                    {ModalLabel.Body}
                </Text>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormControl isInvalid={!!errors.email}>
                        <FormLabel>{EmailFormLabel.Email.Label}</FormLabel>
                        <Input
                            variant='auth'
                            size='lg'
                            placeholder={EmailFormLabel.Email.Placeholder}
                            {...register('email')}
                        />
                        <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                    </FormControl>

                    <Button
                        mt={6}
                        w='full'
                        variant='black'
                        isLoading={isSubmitting}
                        type='submit'
                        size='lg'
                    >
                        {EmailFormLabel.SubmitBtnLabel}
                    </Button>
                </form>
            </ModalBody>

            <ModalFooter mt={6} flexDirection='column'>
                <Text color='blackAlpha.600' textAlign='center' fontSize='xs'>
                    {ModalLabel.Extra}
                </Text>
            </ModalFooter>
        </ResultModal>
    );
};
