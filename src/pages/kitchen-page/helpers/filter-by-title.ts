import { Recipe } from '../../../types/recipe';

export const filterRecipesByTitle = (recipes: Recipe[], inputValue: string): Recipe[] => {
    return recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(inputValue.toLowerCase()),
    );
};
