import { Suspense } from 'react';
import { Await, Navigate, useLoaderData, useLocation } from 'react-router';

import { AppLoader } from '~/components/app-loader/app-loader.tsx';
import { Paths } from '~/constants/path.ts';
import { Recipe } from '~/redux/api/types/recipes.ts';
import { PageType } from '~/types/page.ts';

import { KitchenPage } from '../kitchen-page/kitchen-page.tsx';

export const JuiciestPage = () => {
    // при переходе на страницу в стейте надо передать предыдущую локацию
    const { state } = useLocation();

    const { recipes } = useLoaderData<{ recipes: Recipe[] | null }>();

    return (
        <Suspense fallback={<AppLoader isOpen={true} />}>
            <Await
                resolve={recipes}
                errorElement={<Navigate to={state?.fromPage ?? Paths.R_SWITCHER} />}
            >
                <KitchenPage pageType={PageType.Juiciest} />
            </Await>
        </Suspense>
    );
};
