import { FC, PropsWithChildren, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router';

import { AppLoader } from '~/components/app-loader';
import { Paths } from '~/constants/path';
import { useAppDispatch } from '~/hooks/typed-react-redux-hooks';
import { useGetBloggerRecipesByIdQuery, useGetUserByIdQuery } from '~/redux/api/users-api';
import {
    setBloggerByIdLoading,
    setBloggersDataById,
    setBloggersInfoById,
} from '~/redux/features/bloggers-slice';

export const BlogExistProtected: FC<PropsWithChildren> = ({ children }) => {
    const { pathname } = useLocation();

    const pathnameSplit = pathname.split('/');
    const userId = pathnameSplit[pathnameSplit.length - 1];
    const { isLoading, data } = useGetBloggerRecipesByIdQuery(userId, {
        refetchOnMountOrArgChange: true,
    });
    const { isLoading: isLoadingUser, data: userData } = useGetUserByIdQuery(userId);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setBloggerByIdLoading(isLoading || isLoadingUser));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading, isLoadingUser, data?.userId]);

    if (isLoading || isLoadingUser) return <AppLoader isOpen={true} />;
    if (data && userData) {
        dispatch(setBloggersInfoById(userData));
        dispatch(setBloggersDataById(data));

        return children;
    }

    return <Navigate to={Paths.ERROR} replace={true} />;
};
