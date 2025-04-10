import { lazy } from 'react';
import { createBrowserRouter, createRoutesFromElements, Navigate, Route } from 'react-router';

import { AuthGuard } from '~/components/authorization/auth-guard/auth-guard.tsx';
import { Paths } from '~/constants/path.js';
import { BlogExistProtected } from '~/hoc/blog-exist-protected.tsx';
import { CategoryExistProtected } from '~/hoc/category-exist-protected';
import { SubcategoryRedirect } from '~/hoc/subcategory-redirect';
import { AppLayout } from '~/layout/app-layout';
import { BlogProfile } from '~/pages/blog-profile/blog-profile.tsx';
import { BlogsPage } from '~/pages/blogs-page/blogs-page.tsx';
import { CategoryPage } from '~/pages/category-page';
import { ErrorPage } from '~/pages/error-page/error-page';
import { JuiciestPage } from '~/pages/juiciest-page';
import { MainPage } from '~/pages/main-page';
import { RecipePageWrapper } from '~/pages/recipe-page';

import { ErrorBoundary } from './error-boundary/error-boundary';
import { clearFilterStateLoader } from './loaders/clear-filter-state-loader';
import { juiciestLoader } from './loaders/juciest-loader';
import { recipeLoader } from './loaders/recipe-loader';
import { rootAppLoader } from './loaders/root-app-loader';
import { rootCategoryLoader } from './loaders/root-category-loader';

const AuthorizationLayout = lazy(
    () => import('../layout/authorization-layout/authorization-layout.tsx'),
);

const SignInPage = lazy(() => import('../pages/sign-in-page/sign-in-page.tsx'));
const SignUpPage = lazy(() => import('../pages/sign-up-page/sign-up-page.tsx'));
const VerificationEmailPage = lazy(
    () => import('../pages/verification-email-page/verification-email-page.tsx'),
);
const RestoreCredentialsPage = lazy(
    () => import('../pages/restore-credentials-page/restore-credentials-page.tsx'),
);

// createBrowserRouter только с ним можно юзать loader, action, useLoaderData
// createRoutesFromElements позволяет сделать из обычного классического рута подкапотно children
export const appRouter = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route element={<AuthorizationLayout />}>
                <Route path={Paths.SIGN_IN} element={<SignInPage />}>
                    <Route path={Paths.RESTORE_CREDENTIALS} element={<RestoreCredentialsPage />} />
                </Route>
                <Route path={Paths.SIGN_UP} element={<SignUpPage />} />
                <Route path={Paths.EMAIL_VERIFICATION} element={<VerificationEmailPage />} />
            </Route>
            <Route element={<AuthGuard />}>
                <Route
                    ErrorBoundary={ErrorBoundary}
                    path={Paths.R_SWITCHER}
                    loader={rootAppLoader}
                    element={<AppLayout />}
                >
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
                        path={Paths.BLOGS}
                        element={<BlogsPage />}
                        // TODO: look into
                        loader={clearFilterStateLoader}
                    />
                    <Route
                        path={Paths.BLOGS_ITEM}
                        element={
                            <BlogExistProtected>
                                <BlogProfile />
                            </BlogExistProtected>
                        }
                        // TODO: look into
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
                    <Route
                        path={Paths.JUICIEST}
                        element={<JuiciestPage />}
                        loader={juiciestLoader}
                    />
                    <Route path={Paths.ERROR} element={<ErrorPage />} />
                </Route>
            </Route>

            <Route path={Paths.OTHERS} element={<Navigate to={Paths.ERROR} replace />} />
        </Route>,
    ),
);
