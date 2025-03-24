import { HStack, ModalBody, ModalFooter, PinInput, PinInputField, Text } from '@chakra-ui/react';
import { FC, useState } from 'react';

import { AppLoader } from '~/components/app-loader';
import { RestoreStep } from '~/constants/authorization';
import { CyTestId } from '~/cy-test-id';
import { useCheckVerificationCodeMutation } from '~/redux/api/auth-api';
import { RestoreModalProps } from '~/types/authorization';

import { ResultModal } from '../../result-modal/result-modal';
import { ModalLabel } from './label';

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

    const [checkVerificationCode, { isLoading, reset }] = useCheckVerificationCodeMutation();

    const resetIsInvalid = () => setIsInvalid(false);

    const onCompleteCode = async (value: string) => {
        const response = await checkVerificationCode({ code: value });

        if (response.error) {
            setIsInvalid(true);
            reset();
        } else {
            setIsInvalid(false);
            updateStep(RestoreStep.Form);
        }
    };

    return (
        <>
            <ResultModal
                dataTestId={CyTestId.Modal.VerificationCodeModal.Root}
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

                    <HStack
                        justifyContent='center'
                        mt={4}
                        color='lime.800'
                        mx={{ base: -3, md: 0 }}
                    >
                        <PinInput
                            isInvalid={isInvalid}
                            onChange={resetIsInvalid}
                            onComplete={onCompleteCode}
                        >
                            {Pin.map((key, index) => (
                                <PinInputField
                                    data-test-id={`${CyTestId.Auth.VerificationCodeInput}-${index}`}
                                    _placeholder={{ color: 'lime.800' }}
                                    key={key}
                                />
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

            <AppLoader isOpen={isLoading} />
        </>
    );
};
