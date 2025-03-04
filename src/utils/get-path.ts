import { Recipe } from '~/redux/api/types/recipes';
import { ChoosenCategory } from '~/redux/features/choosen-category-slice';
import { MenuItem } from '~/types/category';

export const getPath = (
    allcategories: MenuItem[],
    allRecipes: Recipe[],
    selectedCategory: ChoosenCategory | null,
    recipeId: string,
) => {
    const currentRecipe = allRecipes.find((recipe) => recipe.id === recipeId);

    const choosenCategory = currentRecipe?.categoryIds.find(
        (category) => category === selectedCategory?.category,
    );

    if (choosenCategory) {
        return `/${choosenCategory}/${selectedCategory?.choosenSubCategory?.category}/${recipeId}`;
    } else {
        const foundCategory = allcategories.find(
            (category) => category.category === currentRecipe?.categoryIds[0],
        );

        const foundSubCategory = foundCategory?.subCategories?.find((subItem) =>
            currentRecipe?.categoryIds.includes(subItem.category),
        );

        return `/${foundCategory?.category}/${foundSubCategory?.category}/${recipeId}`;
    }
};
