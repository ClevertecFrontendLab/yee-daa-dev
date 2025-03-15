import { FC, useRef, useState } from 'react';
import { useDisclosure } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

import { Paths } from '~/constants/path';
import { RestoreStep } from '~/constants/authorization';
import { EmailModal, RestoreFormModal, VerificationCodeModal } from '~/components/authorization';

const RestoreCredentialsPage: FC = () => {
    const email = useRef('');
    const navigate = useNavigate();
    const [step, setStep] = useState(RestoreStep.Email);
    const { isOpen, onClose: onCloseDisclosure } = useDisclosure({ defaultIsOpen: true });

    const updateStep = (newStep: RestoreStep) => setStep(newStep);

    const setEmail = (newEmail: string) => (email.current = newEmail);

    const onClose = () => {
        navigate(Paths.SIGN_IN, { replace: true });
        onCloseDisclosure();
    };

    switch (step) {
        case RestoreStep.Email:
            return <EmailModal {...{ isOpen, onClose, updateStep, setEmail }} />;

        case RestoreStep.Code:
            return (
                <VerificationCodeModal {...{ isOpen, onClose, updateStep, email: email.current }} />
            );

        case RestoreStep.Form:
            return <RestoreFormModal {...{ isOpen, onClose }} />;

        default:
            return null;
    }
};

export default RestoreCredentialsPage;
