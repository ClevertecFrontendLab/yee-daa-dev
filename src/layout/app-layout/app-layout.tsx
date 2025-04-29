import { Fragment, lazy, Suspense, useEffect } from 'react';

import { AppLoader } from '~/components/app-loader';
import { ScrollToHashElement } from '~/components/scroll-to-hash-element';
import { useAppDispatch, useAppSelector } from '~/hooks/typed-react-redux-hooks';
import { useGetAllCategoriesQuery } from '~/redux/api/category-api';
import { JUICIEST_PARAMS, NEWEST_PARAMS } from '~/redux/api/constants';
import { useGetAllRecipesWithParamsQuery } from '~/redux/api/recipes-api';
import { useGetBloggersQuery, useGetMeQuery } from '~/redux/api/users-api';
import { appLoadingSelector } from '~/redux/features/app-slice';
import { selectBloggersLimit, setBloggersUnfoldLoading } from '~/redux/features/bloggers-slice';

const Layout = lazy(() => import('~/components/layout/layout.tsx'));

export const AppLayout = () => {
    const isLoaderOpen = useAppSelector(appLoadingSelector);
    const bloggersLimit = useAppSelector(selectBloggersLimit);
    const dispatch = useAppDispatch();

    const { isLoading: loadingMe } = useGetMeQuery();
    const { isLoading: loadingBloggers } = useGetBloggersQuery(
        {
            id: '67e41d2a0f68c23754bc1e07',
            limit: bloggersLimit,
        },
        { refetchOnMountOrArgChange: true },
    );
    const { isLoading: loadingCategory } = useGetAllCategoriesQuery(undefined, {
        refetchOnReconnect: true,
    });
    const { isLoading: loadingNewest } = useGetAllRecipesWithParamsQuery(NEWEST_PARAMS);
    const { isLoading: loadingJuiciest } = useGetAllRecipesWithParamsQuery(JUICIEST_PARAMS);

    const isAppLoading =
        loadingCategory || loadingNewest || loadingJuiciest || loadingBloggers || loadingMe;

    useEffect(() => {
        dispatch(setBloggersUnfoldLoading(loadingBloggers));
    }, [loadingBloggers]);

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
