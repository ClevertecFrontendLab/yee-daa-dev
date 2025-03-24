import { chakra, ModalBody } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { FC } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';

import { AppLoader } from '~/components/app-loader';
import {
    CredentialsFormSchema,
    CredentialsSchema,
    SignUpFormSchema,
} from '~/constants/authorization';
import { TOAST_MESSAGE } from '~/constants/toast';
import { useAuthToast } from '~/hooks/use-auth-toast';
import { useResetCredentialsMutation } from '~/redux/api/auth-api';
import { RestoreModalProps } from '~/types/authorization';

import { ResultModal } from '../../result-modal/result-modal';
import { CredentialsForm } from '../credentials-form/credentials-form';
import { ModalLabel } from './label';

const ChakraForm = chakra('form');
const { ServerErrorToast, RestoreCredentials } = TOAST_MESSAGE;

export const RestoreFormModal: FC<Omit<RestoreModalProps, 'updateStep'>> = ({ ...props }) => {
    const { toast } = useAuthToast();

    const restoreForm = useForm<CredentialsFormSchema>({
        mode: 'onChange',
        resolver: yupResolver<CredentialsFormSchema>(CredentialsSchema),
    });

    const [restoreCredentials, { reset }] = useResetCredentialsMutation();

    const onSubmit: Parameters<typeof restoreForm.handleSubmit>[0] = async (formData) => {
        try {
            await restoreCredentials(formData).unwrap();

            props.onClose();
            toast(RestoreCredentials[200]);
        } catch (_error) {
            toast(ServerErrorToast);
            reset();
        }
    };

    return (
        <>
            <ResultModal title={ModalLabel.Header} {...props}>
                <ModalBody>
                    <ChakraForm onSubmit={restoreForm.handleSubmit(onSubmit)}>
                        <CredentialsForm
                            form={restoreForm as unknown as UseFormReturn<SignUpFormSchema>}
                        />
                    </ChakraForm>
                </ModalBody>
            </ResultModal>

            <AppLoader isOpen={restoreForm.formState.isSubmitting} />
        </>
    );
};
