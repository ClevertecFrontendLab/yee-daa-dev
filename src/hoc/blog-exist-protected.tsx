import { FC, PropsWithChildren } from 'react';
import { Navigate } from 'react-router';

import { Paths } from '~/constants/path';

export const BlogExistProtected: FC<PropsWithChildren> = ({ children }) => {
    // TODO: when endpoints are done change to get from store
    // eslint-disable-next-line no-constant-condition
    if (true) return children;

    return <Navigate to={Paths.ERROR} replace={true} />;
};
