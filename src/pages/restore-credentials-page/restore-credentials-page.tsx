import { useDisclosure } from '@chakra-ui/react';
import { FC, useRef, useState } from 'react';
import { useNavigate } from 'react-router';

import { EmailModal, RestoreFormModal, VerificationCodeModal } from '~/components/authorization';
import { RestoreStep } from '~/constants/authorization';
import { Paths } from '~/constants/path';

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
            return <RestoreFormModal {...{ isOpen, onClose, email: email.current }} />;

        default:
            return null;
    }
};

export default RestoreCredentialsPage;
