import { FC, PropsWithChildren, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router';

import { AppLoader } from '~/components/app-loader';
import { Paths } from '~/constants/path';
import { useAppDispatch } from '~/hooks/typed-react-redux-hooks';
import { useGetBloggerbyIdQuery } from '~/redux/api/users-api';
import { setBloggerByIdLoading } from '~/redux/features/bloggers-slice';

export const BlogExistProtected: FC<PropsWithChildren> = ({ children }) => {
    const { pathname } = useLocation();
    const pathnameSplit = pathname.split('/');
    const userId = pathnameSplit[pathnameSplit.length - 1];
    const { isLoading, data } = useGetBloggerbyIdQuery(userId);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setBloggerByIdLoading(isLoading));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading]);

    if (isLoading) return <AppLoader isOpen={true} />;
    if (data) return children;

    return <Navigate to={Paths.ERROR} replace={true} />;
};
