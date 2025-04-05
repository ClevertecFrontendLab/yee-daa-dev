import { useLayoutEffect, useRef, useState } from 'react';
import { Navigate } from 'react-router';
import { Outlet } from 'react-router';

import { AppLoader } from '~/components/app-loader';
import { Paths } from '~/constants/path';
import { useAppSelector } from '~/hooks/typed-react-redux-hooks';
import { useRefreshTokenMutation } from '~/redux/api/auth-api';
import { selectAccessToken } from '~/redux/features/auth-slice';

export const AuthGuard = () => {
    const isFirstRender = useRef(true);
    const [isGuardLoading, setIsGuardLoading] = useState(true);
    const accessToken = useAppSelector(selectAccessToken);

    const [updateTokens, { error, isLoading }] = useRefreshTokenMutation();

    useLayoutEffect(() => {
        if (isFirstRender.current) {
            if (!accessToken) {
                updateTokens();
            }

            setIsGuardLoading(false);
            isFirstRender.current = false;
        }
    }, [accessToken, updateTokens]);

    if (isLoading || isGuardLoading) {
        return <AppLoader isOpen={true} />;
    }

    if (error || !accessToken) {
        return <Navigate to={Paths.SIGN_IN} replace />;
    }

    return <Outlet />;
};
