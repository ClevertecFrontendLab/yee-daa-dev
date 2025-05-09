import { LoaderFunction, type Params } from 'react-router';

import { routeParams } from '~/constants/path';
import { recipeApi } from '~/redux/api/services/recipes-api';
import { store } from '~/redux/configure-store';

export const recipeLoader: LoaderFunction = async ({
    params: { recipeId },
}: {
    params: Params<keyof typeof routeParams>;
}) => ({
    recipe: store.dispatch(recipeApi.endpoints.getRecipeById.initiate(recipeId as string)),
});
