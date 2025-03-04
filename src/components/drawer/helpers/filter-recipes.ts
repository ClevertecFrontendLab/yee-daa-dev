import { Recipe } from '~/types/recipe';

type FilterOptions = {
    selectedCategories: string[];
    selectedAuthors: string[];
    selectedMeats: string[];
    selectedSides: string[];
    selectedAllergens: string[];
};

export const normalizeArray = (arr: (string | undefined)[]) =>
    arr.map((item) => (item ? item.trim().toLowerCase() : ''));

export const matchesAny = (normalizedArray: string[], valueArray: string[]) =>
    normalizedArray.length === 0 || valueArray.some((val) => normalizedArray.includes(val));

export const filterRecipes = (recipes: Recipe[], filterOptions: FilterOptions): Recipe[] => {
    const { selectedCategories, selectedAuthors, selectedMeats, selectedSides, selectedAllergens } =
        filterOptions;

    const normalizedCategories = normalizeArray(selectedCategories);
    const normalizedAuthors = normalizeArray(selectedAuthors);
    const normalizedMeats = normalizeArray(selectedMeats);
    const normalizedSides = normalizeArray(selectedSides);
    const normalizedAllergens = normalizeArray(selectedAllergens);

    return recipes.filter((recipe) => {
        const recipeCategories = normalizeArray(recipe.category);
        const recipeAuthor = normalizeArray([recipe.author.login])[0];
        const recipeMeat = normalizeArray([recipe.meat])[0];
        const recipeSide = normalizeArray([recipe.side])[0];
        const recipeAllergens = normalizeArray(
            recipe.ingredients.map((ingredient) => ingredient.title),
        );

        const matchesCategory = matchesAny(normalizedCategories, recipeCategories);
        const matchesAuthor = matchesAny(normalizedAuthors, [recipeAuthor]);
        const matchesMeat = matchesAny(normalizedMeats, [recipeMeat]);
        const matchesSide = matchesAny(normalizedSides, [recipeSide]);
        const containsAllergen = normalizedAllergens.some((allergen: string) =>
            recipeAllergens.includes(allergen),
        );

        return matchesCategory && matchesAuthor && matchesMeat && matchesSide && !containsAllergen;
    });
};
