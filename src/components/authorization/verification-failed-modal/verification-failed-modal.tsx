import { ModalBody, ModalFooter, ModalProps, Text } from '@chakra-ui/react';
import { FC } from 'react';

import { CyTestId } from '~/cy-test-id';

import { ResultModal } from '../../result-modal/result-modal';
import { Label } from './label';

export const VerificationFailedModal: FC<Omit<ModalProps, 'children'>> = (props) => (
    <ResultModal
        dataTestId={CyTestId.Modal.EmailVerificationFailed.Root}
        title={Label.Header}
        imageUrl='/public/images/tea-ceremony.png'
        {...props}
    >
        <ModalBody>
            <Text
                color='blackAlpha.700'
                textAlign='center'
                fontSize='md'
                paddingX={{ bage: 0, md: 8 }}
            >
                {Label.Body}
            </Text>
        </ModalBody>
        <ModalFooter mt={8} flexDirection='column'>
            <Text color='blackAlpha.600' textAlign='center' fontSize='xs'>
                {Label.Extra}
            </Text>
        </ModalFooter>
    </ResultModal>
);
