import { Fragment, lazy, Suspense } from 'react';

import { AppLoader } from '~/components/app-loader';
import { ScrollToHashElement } from '~/components/scroll-to-hash-element';
import { useAppSelector } from '~/hooks/typed-react-redux-hooks';
import { useGetAllCategoriesQuery } from '~/redux/api/category-api';
import { JUICIEST_PARAMS, NEWEST_PARAMS } from '~/redux/api/constants';
import { useGetAllRecipesWithParamsQuery } from '~/redux/api/recipes-api';
import { useGetBloggersQuery } from '~/redux/api/users-api';
import { appLoadingSelector } from '~/redux/features/app-slice';
import { selectUserId } from '~/redux/features/auth-slice';

const Layout = lazy(() => import('~/components/layout/layout.tsx'));

export const AppLayout = () => {
    const isLoaderOpen = useAppSelector(appLoadingSelector);
    const userId = useAppSelector(selectUserId);

    const { isLoading: loadingBloggers } = useGetBloggersQuery(
        {
            id: userId,
            limit: '',
        },
        { refetchOnMountOrArgChange: true },
    );
    const { isLoading: loadingCategory } = useGetAllCategoriesQuery(undefined, {
        refetchOnReconnect: true,
    });
    const { isLoading: loadingNewest } = useGetAllRecipesWithParamsQuery(NEWEST_PARAMS);
    const { isLoading: loadingJuiciest } = useGetAllRecipesWithParamsQuery(JUICIEST_PARAMS);

    const isAppLoading = loadingCategory || loadingNewest || loadingJuiciest || loadingBloggers;

    return (
        <Fragment>
            <></>
            <ScrollToHashElement />
            <Suspense fallback={<AppLoader isOpen={true} overlayColor='white' />}>
                <Layout />
            </Suspense>
            <AppLoader isOpen={isLoaderOpen || isAppLoading} />
        </Fragment>
    );
};
