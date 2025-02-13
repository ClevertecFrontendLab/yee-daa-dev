import { ReactNode } from 'react';
import { Route, Routes } from 'react-router';

import { Layout } from '../components/layout';
import { MenuItem, navMenu } from '../constants/nav-menu.ts';
import { Paths } from '../constants/path.ts';
import { CategoryPage } from '../pages/category-page';
import { JuiciestPage } from '../pages/juiciest-page';
import { MainPage } from '../pages/main-page';

const renderRoutes = (routes: MenuItem[]) => {
    return routes.map((item): ReactNode => {
        if (item.subItems)
            return (
                <>
                    <Route
                        key={item.path}
                        path={item.path}
                        element={<CategoryPage title={item.title} />}
                    />
                    {renderRoutes(item.subItems)}
                </>
            );

        return (
            <Route key={item.path} path={item.path} element={<CategoryPage title={item.title} />} />
        );
    });
};

export const routes = (
    <Routes>
        <Route path={Paths.R_SWITCHER} element={<Layout />}>
            <Route index element={<MainPage />} />
            <Route path={Paths.JUICIEST} element={<JuiciestPage />} />
            {renderRoutes(navMenu)}
        </Route>
    </Routes>
);
