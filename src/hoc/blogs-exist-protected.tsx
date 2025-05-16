import { FC, PropsWithChildren, useEffect } from 'react';
import { Navigate } from 'react-router';

import { AppLoader } from '~/components/app-loader';
import { Paths } from '~/constants/path';
import { useAppDispatch, useAppSelector } from '~/hooks/typed-react-redux-hooks';
import { useGetBloggersQuery } from '~/redux/api/users-api';
import { selectUserId } from '~/redux/features/auth-slice';
import { selectBloggersLimit, setBloggersUnfoldLoading } from '~/redux/features/bloggers-slice';
import { isObjectEmpty } from '~/utils/is-object-empty';

export const BlogsExistProtected: FC<PropsWithChildren> = ({ children }) => {
    const bloggersLimit = useAppSelector(selectBloggersLimit);
    const userId = useAppSelector(selectUserId);
    const dispatch = useAppDispatch();

    const { isLoading, data } = useGetBloggersQuery(
        {
            id: userId,
            limit: bloggersLimit,
        },
        { refetchOnMountOrArgChange: true },
    );

    useEffect(() => {
        dispatch(setBloggersUnfoldLoading(isLoading));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading]);

    if (isLoading) return <AppLoader isOpen={true} />;
    if (data && !isObjectEmpty(data)) {
        return children;
    }

    return <Navigate to={Paths.R_SWITCHER} />;
};
