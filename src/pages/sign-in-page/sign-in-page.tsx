import { useDisclosure } from '@chakra-ui/react';
import { FC, useEffect } from 'react';
import { useSearchParams } from 'react-router';

import { SignInForm, VerificationFailedModal } from '~/components/authorization';
import { AuthSearchParams } from '~/constants/authorization/search-params';
import { TOAST_MESSAGE } from '~/constants/toast';
import { useAuthToast } from '~/hooks/use-auth-toast';

const { EmailVerification } = TOAST_MESSAGE;

type SignInPageProps = {
    verify?: boolean;
};

const SignInPage: FC<SignInPageProps> = ({ verify = false }) => {
    const [search] = useSearchParams();
    const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: false });
    const { toast } = useAuthToast();

    useEffect(() => {
        if (!verify) {
            return;
        }

        const hasEmailVerified = search.has(AuthSearchParams.EmailVerified);

        if (!hasEmailVerified) {
            return;
        }

        const emailVerified = JSON.parse(search.get(AuthSearchParams.EmailVerified)!);

        if (emailVerified) {
            toast({ ...EmailVerification[200], status: 'success' }, false);
        } else {
            onOpen();
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <SignInForm />
            <VerificationFailedModal {...{ isOpen, onClose }} />
        </>
    );
};

export default SignInPage;
