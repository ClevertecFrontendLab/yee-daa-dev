import { ChoosenCategory } from '../redux/features/choosen-category-slice';
import { MenuItem } from '../types/category';
import { Recipe } from '../types/recipe';

export const getPath = (
    allcategories: MenuItem[],
    allRecipes: Recipe[],
    selectedCategory: ChoosenCategory | null,
    recipeId: string,
) => {
    const currentRecipe = allRecipes.find((recipe) => recipe.id === recipeId);

    const choosenCategory = currentRecipe?.category.find(
        (category) => category === selectedCategory?.category,
    );

    if (choosenCategory) {
        return `/${choosenCategory}/${selectedCategory?.choosenSubCategory?.category}/${recipeId}`;
    } else {
        const foundCategory = allcategories.find(
            (category) => category.category === currentRecipe?.category[0],
        );

        const foundSubCategory = foundCategory?.subItems?.find((subItem) =>
            currentRecipe?.subcategory.includes(subItem.category),
        );

        return `/${foundCategory?.category}/${foundSubCategory?.category}/${recipeId}`;
    }
};
