import { ModalBody, ModalFooter, ModalProps, Text } from '@chakra-ui/react';
import { FC } from 'react';

import { Label } from './label';
import { ResultModal } from '../../result-modal/result-modal';

type SignUpSuccessModalProps = Omit<ModalProps, 'children'> & { email: string };

export const SignUpSuccessModal: FC<SignUpSuccessModalProps> = ({ email, ...props }) => {
    const modalBody = [Label.Body[0], email, Label.Body[1]];

    return (
        <ResultModal
            title={
                <Text as='span' paddingX={6} display='inline-block'>
                    {Label.Header}
                </Text>
            }
            imageUrl='/public/images/party.png'
            {...props}
        >
            <ModalBody>
                {modalBody.map((subTitle, index) => (
                    <Text
                        color='blackAlpha.800'
                        textAlign='center'
                        fontSize='md'
                        fontWeight={index === 1 ? 'semibold' : 'normal'}
                        key={index}
                    >
                        {subTitle}
                    </Text>
                ))}
            </ModalBody>
            <ModalFooter mt={8} flexDirection='column'>
                {Label.Extra.map((subTitle, index) => (
                    <Text color='blackAlpha.600' textAlign='center' fontSize='xs' key={index}>
                        {subTitle}
                    </Text>
                ))}
            </ModalFooter>
        </ResultModal>
    );
};
