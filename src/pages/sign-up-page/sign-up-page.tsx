import { Box, chakra, Heading, Progress, useDisclosure } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import {
    CredentialsForm,
    PersonalInfoForm,
    SignUpSuccessModal,
    // VerificationFailedModal,
} from '~/components/authorization';
import { SignUpFormSchema, SignUpSchema, SignUpStep } from '~/constants/authorization';
import { Paths } from '~/constants/path';
import { TOAST_MESSAGE } from '~/constants/toast';
import { useAuthToast } from '~/hooks/use-auth-toast';
import { useSignUpMutation } from '~/redux/api/auth-api';

import { SignUpPropgessLabel } from './label';
import styles from './sign-up-page.module.css';

const ChakraForm = chakra('form');
const { ServerErrorToast } = TOAST_MESSAGE;

const SignUpStepComponent = {
    [SignUpStep.PersonalInfo]: PersonalInfoForm,
    [SignUpStep.Credentials]: CredentialsForm,
};

const SignUpPage: FC = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(SignUpStep.PersonalInfo);

    const StepComponent = SignUpStepComponent[step];

    const { isOpen, onOpen, onClose: onCloseDisclosure } = useDisclosure();
    const { toast } = useAuthToast();
    const registrationForm = useForm<SignUpFormSchema>({
        mode: 'onChange',
        resolver: yupResolver<SignUpFormSchema>(SignUpSchema[step]),
    });

    const [signUp, { reset }] = useSignUpMutation();

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

    const onClose = () => {
        navigate(Paths.SIGN_IN, { replace: true });
        onCloseDisclosure();
    };

    const onSubmit: Parameters<typeof handleSubmit>[0] = async ({ repeatPassword: _, ...body }) => {
        if (step === SignUpStep.PersonalInfo) {
            setStep(SignUpStep.Credentials);

            return;
        }

        try {
            await signUp(body).unwrap();
            onOpen();
        } catch (_error) {
            toast(ServerErrorToast, false);
            reset();
        }
    };
    return (
        <Box as='section'>
            <Heading as='h3' fontSize='md' fontWeight='regular' mb={1}>
                {SignUpPropgessLabel[step]}
            </Heading>
            <Progress
                className={styles.signUpProgress}
                value={(validFieldsCount * 100) / 6}
                mb={6}
                hasStripe
                size='sm'
                bgColor='blackAlpha.100'
            />

            <ChakraForm onSubmit={handleSubmit(onSubmit)}>
                <StepComponent form={registrationForm} {...{ changeStep }} />
            </ChakraForm>

            <SignUpSuccessModal email={watchFields.email} {...{ isOpen, onClose }} />
        </Box>
    );
};

export default SignUpPage;
