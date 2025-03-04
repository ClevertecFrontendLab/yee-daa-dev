import { useParams } from 'react-router';

import { routeParams } from '~/constants/path';
import { selectCategoriesMenu } from '~/redux/features/categories-slice';
import { isArrayWithItems } from '~/utils/is-array-with-items';

import { useAppSelector } from './typed-react-redux-hooks';

export const useDetectParams = () => {
    const menuItems = useAppSelector(selectCategoriesMenu);

    const { categoryName, recipeId, subCategoryName } = useParams<typeof routeParams>();
    const selectedCategory = menuItems.find((elem) => elem.category === categoryName) ?? null;

    const selectedSubCategory =
        selectedCategory && isArrayWithItems(selectedCategory.subCategories)
            ? selectedCategory.subCategories.find((subElem) => subElem.category === subCategoryName)
            : null;

    return {
        selectedCategory,
        selectedSubCategory: selectedSubCategory ?? null,
        recipeId: recipeId ?? null,
    };
};
