import { ModalBody } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { FC } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';

import {
    CredentialsFormSchema,
    CredentialsSchema,
    SignUpFormSchema,
} from '~/constants/authorization';
import { TOAST_MESSAGE } from '~/constants/toast';
import { useAuthToast } from '~/hooks/use-auth-toast';
import { RestoreModalProps } from '~/types/authorization';

import { ResultModal } from '../../result-modal/result-modal';
import { CredentialsForm } from '../credentials-form/credentials-form';
import { ModalLabel } from './label';

const { serverError } = TOAST_MESSAGE;

export const RestoreFormModal: FC<Omit<RestoreModalProps, 'updateStep'>> = ({ ...props }) => {
    const { toast } = useAuthToast();

    const registrationForm = useForm<CredentialsFormSchema>({
        mode: 'onChange',
        resolver: yupResolver<CredentialsFormSchema>(CredentialsSchema),
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
                        form={registrationForm as unknown as UseFormReturn<SignUpFormSchema>}
                    />
                </form>
            </ModalBody>
        </ResultModal>
    );
};
