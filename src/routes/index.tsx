import { lazy, Suspense } from 'react';
import { createBrowserRouter, createRoutesFromElements, Navigate, Route } from 'react-router';

import { AppLoader } from '~/components/app-loader';
import { Paths } from '~/constants/path.js';
import { CategoryExistProtected } from '~/hoc/category-exist-protected';
import { SubcategoryRedirect } from '~/hoc/subcategory-redirect';
import { CategoryPage } from '~/pages/category-page';
import { ErrorPage } from '~/pages/error-page/error-page';
import { JuiciestPage } from '~/pages/juiciest-page';
import { MainPage } from '~/pages/main-page';
import { RecipePageWrapper } from '~/pages/recipe-page';

import { ErrorBoundary } from './error-boundary/error-boundary';
import { clearFilterStateLoader } from './loaders/clear-filter-state-loader';
import { juiciestLoader } from './loaders/juciest-loader';
import { recipeLoader } from './loaders/recipe-loader';
import { rootCategoryLoader } from './loaders/root-category-loader';

const Layout = lazy(() => import('../components/layout/layout.tsx'));
const AuthorizationLayout = lazy(
    () => import('../components/authorization-layout/authorization-layout.tsx'),
);

const SignInPage = lazy(() => import('../pages/sign-in-page/sign-in-page.tsx'));
const SignUpPage = lazy(() => import('../pages/sign-up-page/sign-up-page.tsx'));
const RestoreCredentialsPage = lazy(
    () => import('../pages/restore-credentials-page/restore-credentials-page.tsx'),
);

// createBrowserRouter только с ним можно юзать loader, action, useLoaderData
// createRoutesFromElements позволяет сделать из обычного классического рута подкапотно children
export const appRouter = createBrowserRouter(
    createRoutesFromElements(
        <Route
            ErrorBoundary={ErrorBoundary}
            path={Paths.R_SWITCHER}
            element={
                <Suspense fallback={<AppLoader isOpen={true} overlayColor='white' />}>
                    <Layout />
                </Suspense>
            }
        >
            <Route element={<AuthorizationLayout />}>
                <Route path={Paths.SIGN_IN} element={<SignInPage />} />
                <Route path={Paths.SIGN_UP} element={<SignUpPage />} />
            </Route>

            <Route index element={<MainPage />} loader={clearFilterStateLoader} />
            <Route
                path={Paths.CATEGORY_ROOT}
                loader={rootCategoryLoader}
                element={<SubcategoryRedirect />}
            />
            <Route
                path={Paths.CATEGORY}
                element={
                    <CategoryExistProtected>
                        <CategoryPage />
                    </CategoryExistProtected>
                }
                loader={clearFilterStateLoader}
            />
            <Route
                path={Paths.RECIPE}
                element={
                    <CategoryExistProtected>
                        <RecipePageWrapper />
                    </CategoryExistProtected>
                }
                loader={recipeLoader}
            />
            <Route path={Paths.JUICIEST} element={<JuiciestPage />} loader={juiciestLoader} />
            <Route path={Paths.ERROR} element={<ErrorPage />} />
            <Route path={Paths.OTHERS} element={<Navigate to={Paths.ERROR} replace />} />
        </Route>,
    ),
);
