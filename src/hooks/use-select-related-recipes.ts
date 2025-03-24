import { shallowEqual } from 'react-redux';

import { selectCategoriesMenu } from '~/redux/features/categories-slice';
import { getRandom } from '~/utils/get-random';

import { useAppSelector } from './typed-react-redux-hooks';

export const useSelectRelatedRecipes = () => {
    const categories = useAppSelector(selectCategoriesMenu, shallowEqual);

    const randomInd = getRandom(categories.length);
    const randomCategory = categories[randomInd];

    const title = randomCategory?.title;
    const description = randomCategory?.description;
    const firstSubCategoryId = randomCategory?.subCategories?.[0]?.id;

    return { title, description, firstSubCategoryId };
};
