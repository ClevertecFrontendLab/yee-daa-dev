import { Recipe } from '~/redux/api/types/recipes';
import { selectCategoriesMenu, selectSubCategories } from '~/redux/features/categories-slice';
import { getPathFromRecipe } from '~/utils/get-path-from-recipe';

import { useAppSelector } from './typed-react-redux-hooks';
import { useDetectParams } from './use-detect-params';

export const useGetRecipePath = (recipe: Recipe) => {
    const { selectedCategory, selectedSubCategory } = useDetectParams();
    const categories = useAppSelector(selectCategoriesMenu);
    const subCategories = useAppSelector(selectSubCategories);

    if (selectedCategory && selectedSubCategory)
        return `/${selectedCategory.category}/${selectedSubCategory.category}/${recipe.id}`;

    return getPathFromRecipe(categories, subCategories, recipe);
};
