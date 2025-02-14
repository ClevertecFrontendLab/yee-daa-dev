import { Fragment, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router';

import { Layout } from '../components/layout';
import { Paths } from '../constants/path.ts';
import { CategoryPage } from '../pages/category-page';
import { JuiciestPage } from '../pages/juiciest-page';
import { MainPage } from '../pages/main-page';
import { selectCategoriesMenu } from '../redux/features/categories-slice.ts';
import { MenuItem } from '../types/category.ts';

const renderRoutes = (routes: MenuItem[], basePath: string = ''): ReactNode => {
    return routes.map((item): ReactNode => {
        const currentPath = `${basePath}/${item.category}`;

        return (
            <Fragment key={currentPath}>
                <Route path={currentPath} element={<CategoryPage />} />
                {item.subItems && renderRoutes(item.subItems, currentPath)}
            </Fragment>
        );
    });
};

export const AppRoutes = () => {
    const navMenu = useSelector(selectCategoriesMenu);

    return (
        <Routes>
            <Route path={Paths.R_SWITCHER} element={<Layout />}>
                <Route index element={<MainPage />} />
                <Route path={Paths.JUICIEST} element={<JuiciestPage />} />
                {renderRoutes(navMenu)}
            </Route>
        </Routes>
    );
};
