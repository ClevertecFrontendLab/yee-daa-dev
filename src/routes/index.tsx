import { Fragment, lazy, ReactNode, Suspense } from 'react';
import { Route, Routes } from 'react-router';

import { AppLoader } from '~/components/app-loader/app-loader.tsx';
import { Paths } from '~/constants/path.js';
import { useAppSelector } from '~/hooks/typed-react-redux-hooks.ts';
import { CategoryPage } from '~/pages/category-page';
import { ErrorPage } from '~/pages/error-page/error-page.tsx';
import { JuiciestPage } from '~/pages/juiciest-page';
import { MainPage } from '~/pages/main-page';
import { RecipePage } from '~/pages/recipe-page/recipe-page.tsx';
import { selectCategoriesMenu } from '~/redux/features/categories-slice.ts';
import { MenuItem } from '~/types/category.ts';

const Layout = lazy(() => import('~/components/layout/layout.tsx'));

const renderRoutes = (routes: MenuItem[], basePath: string = ''): ReactNode =>
    routes.map((item): ReactNode => {
        const currentPath = `${basePath}/${item.category}`;

        return (
            <Fragment key={currentPath}>
                <Route path={currentPath} element={<CategoryPage />} />
                <Route path={`${currentPath}/:id`} element={<RecipePage />} />
                {item.subItems && renderRoutes(item.subItems, currentPath)}
            </Fragment>
        );
    });

export const AppRoutes = () => {
    const navMenu = useAppSelector(selectCategoriesMenu);

    return (
        <Suspense fallback={<AppLoader isOpen={true} overlayColor='white' />}>
            <Routes>
                <Route path={Paths.R_SWITCHER} element={<Layout />}>
                    <Route index element={<MainPage />} />
                    <Route path={Paths.JUICIEST} element={<JuiciestPage />} />
                    <Route path={Paths.ERROR} element={<ErrorPage />} />

                    {renderRoutes(navMenu)}
                </Route>
            </Routes>
        </Suspense>
    );
};
