import { Button, ModalBody, ModalFooter, ModalProps, Text } from '@chakra-ui/react';
import { FC } from 'react';

import { ResultModal } from '../../result-modal/result-modal';
import { Label } from './label';

type SignInErrorModalProps = Omit<ModalProps, 'children'> & {
    repeat: () => void;
};

export const SignInErrorModal: FC<SignInErrorModalProps> = ({ repeat, ...props }) => (
    <ResultModal title={Label.Header} imageUrl='/public/images/breakfast.png' {...props}>
        <ModalBody>
            {Label.Body.map((subTitle) => (
                <Text color='blackAlpha.700' textAlign='center' fontSize='md' key={subTitle}>
                    {subTitle}
                </Text>
            ))}
        </ModalBody>
        <ModalFooter>
            <Button variant='black' w='full' mt={8} onClick={repeat}>
                {Label.Button}
            </Button>
        </ModalFooter>
    </ResultModal>
);
