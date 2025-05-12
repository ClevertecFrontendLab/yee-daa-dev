import { FC } from 'react';
import { Navigate, useSearchParams } from 'react-router';

import { AuthSearchParams } from '~/constants/authorization/search-params';
import { Paths } from '~/constants/path';

const VerificationEmailPage: FC = () => {
    const [search] = useSearchParams();
    const emailVerified = JSON.parse(search.get(AuthSearchParams.EmailVerified) ?? '');

    return (
        <Navigate
            to={`${emailVerified ? Paths.SIGN_IN : Paths.SIGN_UP}?${search.toString()}`}
            replace
        />
    );
};

export default VerificationEmailPage;
