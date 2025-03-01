import { Recipe } from '~/types/recipe';

export const filterRecipesByTitle = (recipes: Recipe[], inputValue: string): Recipe[] =>
    recipes.filter((recipe) => recipe.title.toLowerCase().includes(inputValue.toLowerCase()));
