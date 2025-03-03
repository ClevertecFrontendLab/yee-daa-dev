import { type Params } from 'react-router';
import { LoaderFunction } from 'react-router';

import { routeParams } from '~/constants/path';
import { store } from '~/redux/configure-store';
import { selectFirstSubcategory } from '~/utils/select-first-subcategory';

export const rootCategoryLoader: LoaderFunction = ({
    params: { categoryName },
}: {
    params: Params<typeof routeParams.categoryName>;
}) => {
    const { menu } = store.getState().categories;

    const selectedCategory = menu.find((elem) => elem.category === categoryName);

    if (!categoryName || !selectedCategory) {
        return { path: null };
    }
    const firstSubcategory = selectFirstSubcategory(selectedCategory);

    return { path: firstSubcategory ? `/${categoryName}/${firstSubcategory}` : null };
};
