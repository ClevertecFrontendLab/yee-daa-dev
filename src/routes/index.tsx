import { Fragment, ReactNode } from 'react';
import { Route, Routes } from 'react-router';

import { Layout } from '../components/layout';
import { Paths } from '../constants/path.ts';
import { useAppSelector } from '../hooks/typed-react-redux-hooks.ts';
import { CategoryPage } from '../pages/category-page';
import { ErrorPage } from '../pages/error-page/error-page.tsx';
import { JuiciestPage } from '../pages/juiciest-page';
import { MainPage } from '../pages/main-page';
import { RecipePage } from '../pages/recipe-page/recipe-page.tsx';
import { selectCategoriesMenu } from '../redux/features/categories-slice.ts';
import { MenuItem } from '../types/category.ts';

const renderRoutes = (routes: MenuItem[], basePath: string = ''): ReactNode => {
    return routes.map((item): ReactNode => {
        const currentPath = `${basePath}/${item.category}`;

        return (
            <Fragment key={currentPath}>
                <Route path={currentPath} element={<CategoryPage />} />
                <Route path={`${currentPath}/:id`} element={<RecipePage />} />
                {item.subItems && renderRoutes(item.subItems, currentPath)}
            </Fragment>
        );
    });
};

export const AppRoutes = () => {
    const navMenu = useAppSelector(selectCategoriesMenu);

    return (
        <Routes>
            <Route path={Paths.R_SWITCHER} element={<Layout />}>
                <Route index element={<MainPage />} />
                <Route path={Paths.JUICIEST} element={<JuiciestPage />} />
                <Route path={Paths.ERROR} element={<ErrorPage />} />

                {renderRoutes(navMenu)}
            </Route>
        </Routes>
    );
};
