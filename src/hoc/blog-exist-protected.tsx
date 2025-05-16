import { FC, PropsWithChildren } from 'react';
import { Navigate, useLocation } from 'react-router';

import { AppLoader } from '~/components/app-loader';
import { Paths } from '~/constants/path';
import { useAppDispatch, useAppSelector } from '~/hooks/typed-react-redux-hooks';
import { useGetBloggerInfoByIdQuery, useGetBloggerRecipesByIdQuery } from '~/redux/api/users-api';
import { selectUserId } from '~/redux/features/auth-slice';
import { setBloggersDataById, setBloggersInfoById } from '~/redux/features/bloggers-slice';

export const BlogExistProtected: FC<PropsWithChildren> = ({ children }) => {
    const { pathname } = useLocation();
    const currentUserId = useAppSelector(selectUserId);

    const pathnameSplit = pathname.split('/');
    const userId = pathnameSplit[pathnameSplit.length - 1];
    const { isLoading, data } = useGetBloggerRecipesByIdQuery(userId, {
        refetchOnMountOrArgChange: true,
    });
    const { isLoading: isLoadingUser, data: userData } = useGetBloggerInfoByIdQuery({
        bloggerId: userId,
        currentUserId,
    });
    const dispatch = useAppDispatch();

    if (isLoading || isLoadingUser) return <AppLoader isOpen={true} />;

    if (data && userData) {
        dispatch(setBloggersInfoById(userData));
        dispatch(setBloggersDataById(data));

        return children;
    }

    return <Navigate to={Paths.ERROR} replace={true} />;
};
