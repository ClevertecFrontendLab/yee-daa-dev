import { ReactNode } from 'react';
import { Route, Routes } from 'react-router';

import { Layout } from '../components/layout';
import { MenuItem, navMenu } from '../constants/nav-menu.ts';
import { Paths } from '../constants/path.ts';
import { JuiciestPage } from '../pages/juiciest-page';
import { MainPage } from '../pages/main-page';
import { VeganPage } from '../pages/vegan-page';

const renderRoutes = (routes: MenuItem[]) => {
    return routes.map(({ path, subItems }): ReactNode => {
        if (subItems)
            return (
                <>
                    <Route key={path} path={path} element={<VeganPage />} />
                    {renderRoutes(subItems)}
                </>
            );

        return <Route key={path} path={path} element={<VeganPage />} />;
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
