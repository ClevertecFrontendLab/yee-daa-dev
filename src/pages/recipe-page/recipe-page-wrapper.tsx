import { Suspense } from 'react';
import { Await, Navigate, useLoaderData, useLocation } from 'react-router';

import { AppLoader } from '~/components/app-loader/app-loader.tsx';
import { Paths } from '~/constants/path.ts';
import { Recipe } from '~/redux/api/types/recipes.ts';

import { RecipePage } from './recipe-page.tsx';

export const RecipePageWrapper = () => {
    // при переходе на страницу в стейте надо передать предыдущую локацию
    const { state } = useLocation();

    const { recipe } = useLoaderData<{ recipe: Recipe | null }>();

    return (
        <Suspense fallback={<AppLoader isOpen={true} />}>
            <Await
                resolve={recipe}
                errorElement={<Navigate to={state?.fromPage ?? Paths.R_SWITCHER} />}
            >
                <RecipePage />
            </Await>
        </Suspense>
    );
};
