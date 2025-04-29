import { Navigate, useLoaderData } from 'react-router';

import { Paths } from '~/constants/path';
import { StrOrNull } from '~/types/common';

export const SubcategoryRedirect = () => {
    const { path } = useLoaderData<{ path: StrOrNull }>();

    return <Navigate to={path ?? Paths.ERROR} />;
};
