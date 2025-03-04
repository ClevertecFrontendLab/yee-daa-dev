import { Recipe } from '~/redux/api/types/recipes';

export const filterRecipes = (recipes: Recipe[], selectedAllergens: string[]) =>
    recipes.filter(
        (recipe) =>
            !recipe.ingredients.some((ingredient) =>
                selectedAllergens.some((allergen) => {
                    const sanitizedAllergen = allergen
                        .split('(')[0]
                        .trim()
                        .toLowerCase()
                        .replace(/\s+/g, '');
                    const sanitizedIngredient = ingredient.title.toLowerCase().replace(/\s+/g, '');

                    return sanitizedIngredient.includes(sanitizedAllergen);
                }),
            ),
    );
