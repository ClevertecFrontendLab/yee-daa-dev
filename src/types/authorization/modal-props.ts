import { ModalProps } from '@chakra-ui/react';

import { RestoreStep } from '../../constants/authorization/restore-step';

export type RestoreModalProps = Omit<ModalProps, 'children'> & {
    updateStep: (step: RestoreStep) => void;
};
