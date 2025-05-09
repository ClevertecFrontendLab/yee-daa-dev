import { FC, useEffect } from 'react';
import { useSearchParams } from 'react-router';

import { SignInForm } from '~/components/authorization';
import { AuthSearchParams } from '~/constants/authorization/search-params';
import { TOAST_MESSAGE } from '~/constants/toast';
import { useAuthToast } from '~/hooks/use-auth-toast';

const { EmailVerificationToast } = TOAST_MESSAGE;

const SignInPage: FC = () => {
    const [search] = useSearchParams();
    const { toast } = useAuthToast();
    const emailVerified = search.has(AuthSearchParams.EmailVerified);

    useEffect(() => {
        if (emailVerified) {
            toast({ ...EmailVerificationToast[200], status: 'success' }, false);
        }
    }, []);

    return <SignInForm />;
};

export default SignInPage;
