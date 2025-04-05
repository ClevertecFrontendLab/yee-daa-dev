import { useDisclosure } from '@chakra-ui/react';
import { FC, useEffect } from 'react';
import { useSearchParams } from 'react-router';

import { VerificationFailedModal } from '~/components/authorization';
import { AuthSearchParams } from '~/constants/authorization/search-params';
import { TOAST_MESSAGE } from '~/constants/toast';
import { useAuthToast } from '~/hooks/use-auth-toast';

import SignInPage from '../sign-in-page/sign-in-page';
import SignUpPage from '../sign-up-page/sign-up-page';

const { EmailVerificationToast } = TOAST_MESSAGE;

const VerificationEmailPage: FC = () => {
    const [search] = useSearchParams();
    const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: false });
    const { toast } = useAuthToast();

    const emailVerified = JSON.parse(search.get(AuthSearchParams.EmailVerified)!);

    useEffect(() => {
        if (emailVerified) {
            toast({ ...EmailVerificationToast[200], status: 'success' }, false);
        } else {
            onOpen();
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {emailVerified ? <SignInPage /> : <SignUpPage />}
            <VerificationFailedModal {...{ isOpen, onClose }} />
        </>
    );
};

export default VerificationEmailPage;
