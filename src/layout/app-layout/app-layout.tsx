import { Fragment, lazy, Suspense } from 'react';

import { AppLoader } from '~/components/app-loader';
import { useAppSelector } from '~/hooks/typed-react-redux-hooks';
import { useGetAllCategoriesQuery } from '~/redux/api/category-api';
import { JUICIEST_PARAMS, NEWEST_PARAMS } from '~/redux/api/constants';
import { useGetAllRecipesWithParamsQuery } from '~/redux/api/recipes-api';
import { appLoadingSelector } from '~/redux/features/app-slice';

const Layout = lazy(() => import('~/components/layout/layout.tsx'));

export const AppLayout = () => {
    const isLoaderOpen = useAppSelector(appLoadingSelector);
    const { isLoading: loadingCategory } = useGetAllCategoriesQuery(undefined, {
        refetchOnReconnect: true,
    });
    const { isLoading: loadingNewest } = useGetAllRecipesWithParamsQuery(NEWEST_PARAMS);
    const { isLoading: loadingJuiciest } = useGetAllRecipesWithParamsQuery(JUICIEST_PARAMS);

    const isAppLoading = loadingCategory || loadingNewest || loadingJuiciest;

    return (
        <Fragment>
            <></>
            <Suspense fallback={<AppLoader isOpen={true} overlayColor='white' />}>
                <Layout />
            </Suspense>
            <AppLoader isOpen={isLoaderOpen || isAppLoading} />
        </Fragment>
    );
};
