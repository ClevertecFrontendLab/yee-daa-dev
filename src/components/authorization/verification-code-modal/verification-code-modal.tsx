import { HStack, ModalBody, ModalFooter, PinInput, PinInputField, Text } from '@chakra-ui/react';
import { FC, useState } from 'react';

import { AppLoader } from '~/components/app-loader';
import { RestoreStep } from '~/constants/authorization';
import { HttpStatus } from '~/constants/http-status';
import { TOAST_MESSAGE } from '~/constants/toast';
import { useAuthToast } from '~/hooks/use-auth-toast';
import { useCheckVerificationCodeMutation } from '~/redux/api/auth-api';
import { RestoreModalProps } from '~/types/authorization';
import { isFetchBaseQueryError } from '~/utils/type-guard';

import { ResultModal } from '../../result-modal/result-modal';
import { ModalLabel } from './label';

const Pin = [1, 2, 3, 4, 5, 6];
const { ServerErrorToast } = TOAST_MESSAGE;

type VerificationCodeModalProps = RestoreModalProps & {
    email: string;
};

export const VerificationCodeModal: FC<VerificationCodeModalProps> = ({
    updateStep,
    email,
    ...props
}) => {
    const [code, setCode] = useState('');
    const [isInvalid, setIsInvalid] = useState(false);
    const modalText = [ModalLabel.Body[0], email, ModalLabel.Body[1]];

    const { toast } = useAuthToast();
    const [checkVerificationCode, { isLoading, reset }] = useCheckVerificationCodeMutation();

    const updateCode = (value: string) => {
        setIsInvalid(false);
        setCode(value);
    };

    const onCompleteCode = async (value: string) => {
        const { data, error } = await checkVerificationCode({ email, otpToken: value });

        if (data) {
            setIsInvalid(false);
            updateStep(RestoreStep.Form);
            reset();

            return;
        }

        if (isFetchBaseQueryError(error) && error.status === HttpStatus.FORBIDDEN) {
            setIsInvalid(true);
        } else {
            toast(ServerErrorToast);
        }

        setCode('');
        reset();
    };

    return (
        <>
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

                    <HStack
                        justifyContent='center'
                        mt={4}
                        color='lime.800'
                        mx={{ base: -3, md: 0 }}
                    >
                        <PinInput
                            isInvalid={isInvalid}
                            onChange={updateCode}
                            onComplete={onCompleteCode}
                            value={code}
                            autoFocus
                            otp
                        >
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

            <AppLoader isOpen={isLoading} />
        </>
    );
};
