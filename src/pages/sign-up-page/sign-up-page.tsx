import { Box, chakra, Heading, Progress, useDisclosure } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router';

import { AppLoader } from '~/components/app-loader';
import {
    CredentialsForm,
    PersonalInfoForm,
    SignUpSuccessModal,
    VerificationFailedModal,
} from '~/components/authorization';
import { SignUpFormSchema, SignUpSchema, SignUpStep } from '~/constants/authorization';
import { AuthSearchParams } from '~/constants/authorization/search-params';
import { HttpStatus } from '~/constants/http-status';
import { Paths } from '~/constants/path';
import { TOAST_MESSAGE } from '~/constants/toast';
import { CyTestId } from '~/cy-test-id';
import { useAuthToast } from '~/hooks/use-auth-toast';
import { useSignUpMutation } from '~/redux/api/auth-api';
import { isFetchBaseQueryErrorWithMessage } from '~/utils/type-guard';

import { SignUpPropgessLabel } from './label';
import styles from './sign-up-page.module.css';

const ChakraForm = chakra('form');
const { ServerErrorToast, SignUpToast } = TOAST_MESSAGE;

const SignUpStepComponent = {
    [SignUpStep.PersonalInfo]: PersonalInfoForm,
    [SignUpStep.Credentials]: CredentialsForm,
};

const SignUpPage: FC = () => {
    const [search] = useSearchParams();
    const navigate = useNavigate();
    const [step, setStep] = useState(SignUpStep.PersonalInfo);
    const emailVerified = search.has(AuthSearchParams.EmailVerified);

    const StepComponent = SignUpStepComponent[step];

    const {
        isOpen: isSuccessOpen,
        onOpen: onSuccessOpen,
        onClose: onSuccessClose,
    } = useDisclosure();
    const {
        isOpen: isVerificationOpen,
        onOpen: onVerificationOpen,
        onClose: onVerificationClose,
    } = useDisclosure({ defaultIsOpen: false });

    const { toast } = useAuthToast();

    const registrationForm = useForm<SignUpFormSchema>({
        mode: 'onChange',
        resolver: yupResolver<SignUpFormSchema>(SignUpSchema[step]),
    });

    const [signUp, { reset }] = useSignUpMutation();

    const {
        watch,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = registrationForm;

    const watchFields = watch();

    const validFieldsCount = Object.entries(watchFields).filter(
        ([key, value]) => value && !errors[key as keyof typeof errors],
    ).length;

    const changeStep = (newStep: SignUpStep) => setStep(newStep);

    const onClose = () => {
        navigate(Paths.SIGN_IN, { replace: true });
        onSuccessClose();
    };

    const onSubmit: Parameters<typeof handleSubmit>[0] = async ({
        passwordConfirm: _,
        ...body
    }) => {
        if (step === SignUpStep.PersonalInfo) {
            setStep(SignUpStep.Credentials);

            return;
        }

        try {
            await signUp(body).unwrap();
            onSuccessOpen();
        } catch (error) {
            if (
                isFetchBaseQueryErrorWithMessage(error) &&
                error.status === HttpStatus.BAD_REQUEST
            ) {
                toast({ ...SignUpToast[400], title: error.data.message }, false);
            } else {
                toast(ServerErrorToast, false);
            }

            reset();
        }
    };

    useEffect(() => {
        if (emailVerified) {
            onVerificationOpen();
        }
    }, []);

    return (
        <Box as='section'>
            <Heading as='h3' fontSize='md' fontWeight='regular' mb={1}>
                {SignUpPropgessLabel[step]}
            </Heading>
            <Progress
                data-test-id={CyTestId.Progress.SignUp}
                className={styles.signUpProgress}
                value={(validFieldsCount * 100) / 6}
                mb={6}
                hasStripe
                size='sm'
                bgColor='blackAlpha.100'
            />

            <ChakraForm data-test-id={CyTestId.Form.SignUp} onSubmit={handleSubmit(onSubmit)}>
                <StepComponent form={registrationForm} {...{ changeStep }} />
            </ChakraForm>

            <SignUpSuccessModal email={watchFields.email} isOpen={isSuccessOpen} {...{ onClose }} />
            <VerificationFailedModal isOpen={isVerificationOpen} onClose={onVerificationClose} />
            <AppLoader isOpen={isSubmitting} />
        </Box>
    );
};

export default SignUpPage;
