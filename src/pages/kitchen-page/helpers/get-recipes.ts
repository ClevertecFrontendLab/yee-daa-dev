import { Recipe } from '~/redux/api/types/recipes';
import { MenuItem } from '~/types/category';

export const getCategoryRecipes = (
    recipes: Recipe[],
    selectedCategory: MenuItem | null,
    selectedSubCategory: MenuItem | null,
) =>
    recipes.filter((recipe) => {
        if (selectedCategory && selectedSubCategory) {
            return (
                recipe.categoriesIds.includes(selectedCategory.category) &&
                recipe.categoriesIds.includes(selectedSubCategory.category)
            );
        } else if (selectedCategory) {
            return recipe.categoriesIds.includes(selectedCategory.category);
        } else {
            return true;
        }
    });

export const getFavoritesRecipes = (recipes: Recipe[]) =>
    recipes
        .filter((recipe) => recipe.likes !== undefined)
        .sort((a, b) => (b?.likes ?? 0) - (a?.likes ?? 0))
        .slice(0, 15);
