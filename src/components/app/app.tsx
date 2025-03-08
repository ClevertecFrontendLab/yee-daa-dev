import { RouterProvider } from 'react-router';

import { useAppSelector } from '~/hooks/typed-react-redux-hooks';
import { JUICIEST_PARAMS, NEWEST_PARAMS } from '~/redux/api/constants';
import { useGetAllCategoriesQuery } from '~/redux/api/services/category-api';
import { useGetAllRecipesWithParamsQuery } from '~/redux/api/services/recipes-api';
import { appLoadingSelector } from '~/redux/features/app-slice';
import { appRouter } from '~/routes';

import { AppLoader } from '../app-loader';

export const App = () => {
    const isLoaderOpen = useAppSelector(appLoadingSelector);
    const { isLoading: loadingCategory } = useGetAllCategoriesQuery(undefined, {
        refetchOnReconnect: true,
        refetchOnMountOrArgChange: true,
    });
    const { isLoading: loadingNewest } = useGetAllRecipesWithParamsQuery(NEWEST_PARAMS, {
        refetchOnMountOrArgChange: true,
    });
    const { isLoading: loadingJuiciest } = useGetAllRecipesWithParamsQuery(JUICIEST_PARAMS);

    const isAppLoading = loadingCategory || loadingNewest || loadingJuiciest;

    return (
        <>
            <RouterProvider router={appRouter} />
            <AppLoader isOpen={isLoaderOpen || isAppLoading} />
        </>
    );
};
