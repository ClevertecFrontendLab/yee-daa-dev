import { Category } from '~/redux/api/types/categories';
import { Recipe } from '~/redux/api/types/recipes';
import { MenuItem } from '~/types/category';

export const getPath = (
    allcategories: MenuItem[],
    allRecipes: Recipe[],
    selectedCategory: Category | null | undefined,
    recipeId: string,
) => {
    const currentRecipe = allRecipes.find((recipe) => recipe.id === recipeId);

    const chosenCategory = currentRecipe?.categoriesIds.find(
        (category) => category === selectedCategory?.category,
    );

    if (chosenCategory) {
        return `/${chosenCategory}/${selectedCategory?.category}/${recipeId}`;
    } else {
        const foundCategory = allcategories.find(
            (category) => category.category === currentRecipe?.categoriesIds[0],
        );

        const foundSubCategory = foundCategory?.subCategories?.find((subItem) =>
            currentRecipe?.categoriesIds.includes(subItem.category),
        );

        return `/${foundCategory?.category}/${foundSubCategory?.category}/${recipeId}`;
    }
};
