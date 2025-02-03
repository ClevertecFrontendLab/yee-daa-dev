import { Route, Routes } from 'react-router';

import { Layout } from '../components/layout';
import { Paths } from '../constants/path.ts';
import { MainPage } from '../pages/main-page';
import { VeganPage } from '../pages/vegan-page';

export const routes = (
    <Routes>
        <Route path={Paths.R_SWITCHER} element={<Layout />}>
            <Route index element={<MainPage />} />
            <Route path={Paths.VEGAN} element={<VeganPage />} />
        </Route>
    </Routes>
);
