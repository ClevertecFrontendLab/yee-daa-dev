import { Button, ModalBody, ModalFooter, ModalProps, Text } from '@chakra-ui/react';
import { FC } from 'react';

import { CyTestId } from '~/cy-test-id';

import { ResultModal } from '../../result-modal/result-modal';
import { Label } from './label';

type SignInErrorModalProps = Omit<ModalProps, 'children'> & {
    repeat: () => void;
    isSubmitting: boolean;
};

export const SignInErrorModal: FC<SignInErrorModalProps> = ({ repeat, isSubmitting, ...props }) => (
    <ResultModal
        data-test-id={CyTestId.Modal.SignInError.Root}
        title={Label.Header}
        imageUrl='/public/images/breakfast.png'
        isClosable={!isSubmitting}
        {...props}
    >
        <ModalBody>
            {Label.Body.map((subTitle) => (
                <Text color='blackAlpha.700' textAlign='center' fontSize='md' key={subTitle}>
                    {subTitle}
                </Text>
            ))}
        </ModalBody>
        <ModalFooter>
            <Button
                data-test-id={CyTestId.Modal.SignInError.RepeatButton}
                variant='black'
                w='full'
                mt={8}
                onClick={repeat}
                isLoading={isSubmitting}
                loadingText={Label.Button}
            >
                {Label.Button}
            </Button>
        </ModalFooter>
    </ResultModal>
);
