import { useDisclosure } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router';

import { SignInForm, VerificationFailedModal } from '~/components/authorization';
import { AuthSearchParams } from '~/constants/authorization/search-params';
import { TOAST_MESSAGE } from '~/constants/toast';
import { useAuthToast } from '~/hooks/use-auth-toast';

const { SignUpToast } = TOAST_MESSAGE;

const SignInPage = () => {
    const [search] = useSearchParams();
    const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: false });
    const { toast } = useAuthToast();

    useEffect(() => {
        const hasEmailVerified = search.has(AuthSearchParams.EmailVerified);

        if (!hasEmailVerified) {
            return;
        }

        const emailVerified = JSON.parse(search.get(AuthSearchParams.EmailVerified)!);

        if (emailVerified) {
            toast({ ...SignUpToast[200], status: 'success' }, false);
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
