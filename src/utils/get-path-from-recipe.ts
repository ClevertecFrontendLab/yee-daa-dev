import { Paths } from '~/constants/path';
import { Category, SubCategory } from '~/redux/api/types/categories';
import { Recipe } from '~/redux/api/types/recipes';

import { isArrayWithItems } from './is-array-with-items';

export const getPathFromRecipe = (
    categories: Category[],
    subCategories: SubCategory[],
    recipe: Recipe,
) => {
    const { categoriesIds } = recipe;

    // если не найдется рецепт - просто будет возврат на главную
    if (!isArrayWithItems(subCategories) || !isArrayWithItems(categoriesIds)) {
        return Paths.R_SWITCHER;
    }

    // так как м.б. много подкатегорий - ссылку формируем на первый рецепт
    const selectedSubCategory = subCategories.find((category) => category.id === categoriesIds[0]);
    if (!selectedSubCategory) {
        return Paths.R_SWITCHER;
    }

    const { rootCategoryId, category: subCategoryName } = selectedSubCategory;

    const categoryName = categories.find((cat) => cat.id === rootCategoryId)?.category;

    if (!categoryName || !subCategoryName) {
        return Paths.R_SWITCHER;
    }
    const recipeId = recipe.id ?? recipe._id;
    return `/${categoryName}/${subCategoryName}/${recipeId}`;
};
