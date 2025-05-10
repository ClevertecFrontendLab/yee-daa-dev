import {
    Button,
    chakra,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    ModalBody,
    ModalFooter,
    Text,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { AppLoader } from '~/components/app-loader';
import { ResultModal } from '~/components/result-modal/result-modal';
import { EmailRestoreFormSchema, EmailRestoreSchema, RestoreStep } from '~/constants/authorization';
import { HttpStatus } from '~/constants/http-status';
import { TOAST_MESSAGE } from '~/constants/toast';
import { CyTestId } from '~/cy-test-id';
import { useAuthToast } from '~/hooks/use-auth-toast';
import { useTrimInputBlur } from '~/hooks/use-trim-input-blur';
import { useSendVerificationCodeMutation } from '~/redux/api/auth-api';
import { RestoreModalProps } from '~/types/authorization';
import { isFetchBaseQueryError } from '~/utils/type-guard';

import { EmailFormLabel, ModalLabel } from './label';

const ChakraForm = chakra('form');
const { SendVerificationCodeToast, ServerErrorToast } = TOAST_MESSAGE;

type EmailModalProps = RestoreModalProps & {
    setEmail: (email: string) => void;
};

export const EmailModal: FC<EmailModalProps> = ({ updateStep, setEmail, ...props }) => {
    const {
        register,
        setError,
        setValue,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<EmailRestoreFormSchema>({
        resolver: yupResolver(EmailRestoreSchema),
        mode: 'onChange',
    });

    const [sendVerificationCode, { reset }] = useSendVerificationCodeMutation();
    const { toast } = useAuthToast();
    const { handleBlur } = useTrimInputBlur(setValue);

    const onSubmit: Parameters<typeof handleSubmit>[0] = async ({ email }) => {
        try {
            await sendVerificationCode({ email }).unwrap();
            setEmail(email);
            updateStep(RestoreStep.Code);
        } catch (error) {
            if (isFetchBaseQueryError(error) && error.status === HttpStatus.FORBIDDEN) {
                toast(SendVerificationCodeToast[403]);
            } else {
                toast(ServerErrorToast);
            }
            setValue('email', '');
            setError('email', { message: '' });
            reset();
        }
    };

    return (
        <>
            <ResultModal
                dataTestId={CyTestId.Modal.SendEmailModal}
                imageUrl='/images/breakfast.png'
                {...props}
            >
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

                    <ChakraForm onSubmit={handleSubmit(onSubmit)}>
                        <FormControl isInvalid={!!errors.email}>
                            <FormLabel>{EmailFormLabel.Email.Label}</FormLabel>
                            <Input
                                data-test-id={CyTestId.Input.Email}
                                variant='auth'
                                size='lg'
                                placeholder={EmailFormLabel.Email.Placeholder}
                                {...register('email')}
                                onBlur={handleBlur('email')}
                            />
                            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                        </FormControl>

                        <Button
                            data-test-id={CyTestId.Button.Submit}
                            mt={6}
                            w='full'
                            variant='black'
                            isLoading={isSubmitting}
                            type='submit'
                            size='lg'
                        >
                            {EmailFormLabel.SubmitBtnLabel}
                        </Button>
                    </ChakraForm>
                </ModalBody>

                <ModalFooter mt={6} flexDirection='column'>
                    <Text color='blackAlpha.600' textAlign='center' fontSize='xs'>
                        {ModalLabel.Extra}
                    </Text>
                </ModalFooter>
            </ResultModal>

            <AppLoader isOpen={isSubmitting} />
        </>
    );
};
