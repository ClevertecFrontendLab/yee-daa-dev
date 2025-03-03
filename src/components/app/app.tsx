import { RouterProvider } from 'react-router';

import { useAppSelector } from '~/hooks/typed-react-redux-hooks';
import { useGetAllCategoriesQuery } from '~/redux/api/services/category-api';
import { appLoadingSelector } from '~/redux/features/app-slice';
import { appRouter } from '~/routes';

import { AppLoader } from '../app-loader';

export const App = () => {
    const isLoaderOpen = useAppSelector(appLoadingSelector);
    const { isLoading } = useGetAllCategoriesQuery();

    return (
        <>
            <RouterProvider router={appRouter} />
            <AppLoader isOpen={isLoaderOpen || isLoading} />
        </>
    );
};
