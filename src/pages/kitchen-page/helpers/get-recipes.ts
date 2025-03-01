import { ChoosenCategory } from '~/redux/features/choosen-category-slice';
import { Recipe } from '~/types/recipe';

export const getCategoryRecipes = (recipes: Recipe[], selectedCategory: ChoosenCategory) =>
    recipes.filter((recipe) => {
        if (selectedCategory?.choosenSubCategory?.category) {
            return (
                recipe.category.includes(selectedCategory.category) &&
                recipe.subcategory.includes(selectedCategory?.choosenSubCategory?.category ?? '')
            );
        } else {
            return recipe.category.includes(selectedCategory.category);
        }
    });

export const getFavouritesRecipes = (recipes: Recipe[]) =>
    recipes
        .filter((recipe) => recipe.likes !== undefined)
        .sort((a, b) => (b?.likes ?? 0) - (a?.likes ?? 0))
        .slice(0, 15);
