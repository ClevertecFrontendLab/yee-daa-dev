import { HStack, ModalBody, ModalFooter, PinInput, PinInputField, Text } from '@chakra-ui/react';
import { FC, useState } from 'react';

import { ModalLabel } from './label';
import { ResultModal } from '../../result-modal/result-modal';

import { RestoreStep } from '~/constants/authorization';
import { RestoreModalProps } from '~/types/authorization';

const Pin = [1, 2, 3, 4, 5, 6];

type VerificationCodeModalProps = RestoreModalProps & {
    email: string;
};

export const VerificationCodeModal: FC<VerificationCodeModalProps> = ({
    updateStep,
    email,
    ...props
}) => {
    const [isInvalid, setIsInvalid] = useState(true);
    const modalText = [ModalLabel.Body[0], email, ModalLabel.Body[1]];

    const onCompleteCode = (value: string) => {
        console.log(value, setIsInvalid);
        updateStep(RestoreStep.Form);
    };

    return (
        <ResultModal
            imageUrl='/images/work.png'
            {...props}
            title={isInvalid ? ModalLabel.Header : null}
        >
            <ModalBody>
                <div>
                    {modalText.map((label, index) => (
                        <Text
                            key={index}
                            color='blackAlpha.900'
                            textAlign='center'
                            fontWeight={index === 1 ? 'semibold' : 'normal'}
                            fontSize='md'
                        >
                            {label}
                        </Text>
                    ))}
                </div>

                <HStack justifyContent='center' mt={4} color='lime.800' mx={{ base: -3, md: 0 }}>
                    <PinInput isInvalid={isInvalid} onComplete={onCompleteCode}>
                        {Pin.map((key) => (
                            <PinInputField _placeholder={{ color: 'lime.800' }} key={key} />
                        ))}
                    </PinInput>
                </HStack>
            </ModalBody>

            <ModalFooter mt={6} flexDirection='column'>
                <Text color='blackAlpha.600' textAlign='center' fontSize='xs'>
                    {ModalLabel.Extra}
                </Text>
            </ModalFooter>
        </ResultModal>
    );
};
