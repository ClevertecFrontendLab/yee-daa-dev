import { Box, Heading, Progress, useDisclosure } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';

import { SignUpSchema, SignUpStep, SignUpStepComponent } from './constants/sign-up-form';
import { SignUpPropgessLabel } from './label';
import styles from './sign-up-page.module.css';
import { SignUpForm } from './types/sign-up-form';
import { SignUpSuccessModal } from './components/sign-up-success-modal/sign-up-success-modal';

import { useAuthToast } from '~/hooks/use-auth-toast';
import { TOAST_MESSAGE } from '~/constants/toast';

const { signUpError } = TOAST_MESSAGE;

const SignUpPage: FC = () => {
    const [step, setStep] = useState(SignUpStep.PersonalInfo);

    const StepComponent = SignUpStepComponent[step];

    const { isOpen, onOpen, onClose } = useDisclosure();
    const { toast } = useAuthToast();
    const registrationForm = useForm<SignUpForm>({
        mode: 'onChange',
        resolver: yupResolver<SignUpForm>(SignUpSchema[step]),
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

        if (!toast.isActive(signUpError.id)) {
            toast(signUpError);
        }

        onOpen();
        console.log(data);
    };
    return (
        <Box as='section'>
            <Heading as='h6' fontSize='md' fontWeight='regular' mb={1}>
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

            <form onSubmit={handleSubmit(onSubmit)}>
                <StepComponent form={registrationForm} {...{ changeStep }} />
            </form>

            <SignUpSuccessModal email={watchFields.email} {...{ isOpen, onClose }} />
        </Box>
    );
};

export default SignUpPage;
