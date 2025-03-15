import { ModalBody } from '@chakra-ui/react';
import { FC } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { ModalLabel } from './label';
import { ResultModal } from '../../result-modal/result-modal';
import { CredentialsForm } from '../credentials-form/credentials-form';

import { CredentialsFormData, RestoreModalProps, SignUpFormData } from '~/types/authorization';
import { CredentialsSchema } from '~/constants/authorization';
import { useAuthToast } from '~/hooks/use-auth-toast';
import { TOAST_MESSAGE } from '~/constants/toast';

const { serverError } = TOAST_MESSAGE;

export const RestoreFormModal: FC<Omit<RestoreModalProps, 'updateStep'>> = ({ ...props }) => {
    const { toast } = useAuthToast();

    const registrationForm = useForm<CredentialsFormData>({
        mode: 'onChange',
        resolver: yupResolver<CredentialsFormData>(CredentialsSchema),
    });

    const onSubmit = () => {
        props.onClose();
        toast(serverError);
    };

    return (
        <ResultModal title={ModalLabel.Header} {...props}>
            <ModalBody>
                <form onSubmit={registrationForm.handleSubmit(onSubmit)}>
                    <CredentialsForm
                        form={registrationForm as unknown as UseFormReturn<SignUpFormData>}
                    />
                </form>
            </ModalBody>
        </ResultModal>
    );
};
