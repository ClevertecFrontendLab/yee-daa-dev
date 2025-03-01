import { useAppSelector } from '~/hooks/typed-react-redux-hooks';
import { appLoadingSelector } from '~/redux/features/app-slice';
import { AppRoutes } from '~/routes';

import { AppLoader } from '../app-loader';

export const App = () => {
    const isLoaderOpen = useAppSelector(appLoadingSelector);
    return (
        <>
            <AppRoutes />
            <AppLoader isOpen={isLoaderOpen} />
        </>
    );
};
