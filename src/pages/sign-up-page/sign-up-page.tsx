import { Box, Heading, Progress, useDisclosure } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';

import {
    CredentialsForm,
    PersonalInfoForm,
    SignUpSuccessModal,
    VerificationFailedModal,
} from '~/components/authorization';
import { SignUpFormSchema, SignUpSchema, SignUpStep } from '~/constants/authorization';
import { TOAST_MESSAGE } from '~/constants/toast';
import { CyTestId } from '~/cy-test-id';
import { useAuthToast } from '~/hooks/use-auth-toast';

import { SignUpPropgessLabel } from './label';
import styles from './sign-up-page.module.css';

const { serverError } = TOAST_MESSAGE;

const SignUpStepComponent = {
    [SignUpStep.PersonalInfo]: PersonalInfoForm,
    [SignUpStep.Credentials]: CredentialsForm,
};

const SignUpPage: FC = () => {
    const [step, setStep] = useState(SignUpStep.PersonalInfo);

    const StepComponent = SignUpStepComponent[step];

    const { isOpen, onOpen, onClose } = useDisclosure();
    const { toast } = useAuthToast();
    const registrationForm = useForm<SignUpFormSchema>({
        mode: 'onChange',
        resolver: yupResolver<SignUpFormSchema>(SignUpSchema[step]),
    });

    const {
        watch,
        handleSubmit,
        formState: { errors },
    } = registrationForm;

    const watchFields = watch();

    const validFieldsCount = Object.entries(watchFields).filter(
        ([key, value]) => value && !errors[key as keyof typeof errors],
    ).length;

    const changeStep = (newStep: SignUpStep) => setStep(newStep);

    const onSubmit: Parameters<typeof handleSubmit>[0] = (data) => {
        if (step === SignUpStep.PersonalInfo) {
            setStep(SignUpStep.Credentials);

            return;
        }

        toast(serverError, false);
        onOpen();
        console.log(data);
    };
    return (
        <Box as='section'>
            <Heading as='h6' fontSize='md' fontWeight='regular' mb={1}>
                {SignUpPropgessLabel[step]}
            </Heading>
            <Progress
                data-test-id={CyTestId.Auth.SignUpProgress}
                className={styles.signUpProgress}
                value={(validFieldsCount * 100) / 6}
                mb={6}
                hasStripe
                size='sm'
                bgColor='blackAlpha.100'
            />

            <form data-test-id={CyTestId.Auth.SignUpForm} onSubmit={handleSubmit(onSubmit)}>
                <StepComponent form={registrationForm} {...{ changeStep }} />
            </form>

            <SignUpSuccessModal email={watchFields.email} {...{ isOpen, onClose }} />
            <VerificationFailedModal {...{ isOpen, onClose }} />
        </Box>
    );
};

export default SignUpPage;
