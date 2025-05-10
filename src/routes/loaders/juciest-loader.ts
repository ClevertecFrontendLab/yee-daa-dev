import { LoaderFunction } from 'react-router';

import { JUICIEST_PAGE_PARAMS } from '~/redux/api/constants';
import { recipeApi } from '~/redux/api/recipes-api';
import { store } from '~/redux/configure-store';

export const juiciestLoader: LoaderFunction = async () => ({
    recipes: store.dispatch(
        recipeApi.endpoints.getAllRecipesInfinite.initiate(JUICIEST_PAGE_PARAMS),
    ),
});
