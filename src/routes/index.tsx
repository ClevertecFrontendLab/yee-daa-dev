import { Route, Routes } from 'react-router';

import { Layout } from '../components/layout';
import { navMenu } from '../constants/nav-menu.ts';
import { Paths } from '../constants/path.ts';
import { JuiciestPage } from '../pages/juiciest-page';
import { MainPage } from '../pages/main-page';
import { VeganPage } from '../pages/vegan-page';

export const routes = (
    <Routes>
        <Route path={Paths.R_SWITCHER} element={<Layout />}>
            <Route index element={<MainPage />} />
            <Route path={Paths.JUICIEST} element={<JuiciestPage />} />
            {navMenu.map((item) => {
                if (item.subItems)
                    return (
                        <>
                            <Route key={item.path} path={item.path} element={<VeganPage />} />
                            {item.subItems.map(({ path }) => (
                                <Route key={path} path={path} element={<VeganPage />} />
                            ))}
                        </>
                    );

                return <Route key={item.path} path={item.path} element={<VeganPage />} />;
            })}
        </Route>
    </Routes>
);
