import { Recipe } from '../../../types/recipe';

type FilterOptions = {
    selectedCategories: string[];
    selectedCuisines: string[];
    selectedAuthors: string[];
    selectedMeats: string[];
    selectedSides: string[];
    selectedAllergens: string[];
};

export const filterRecipes = (recipes: Recipe[], filterOptions: FilterOptions): Recipe[] => {
    const {
        selectedCategories,
        selectedCuisines,
        selectedAuthors,
        selectedMeats,
        selectedSides,
        selectedAllergens,
    } = filterOptions;
    const normalizedCategories = selectedCategories.map((cat) => cat.trim().toLowerCase());
    const normalizedCuisines = selectedCuisines.map((cuisine) => cuisine.trim().toLowerCase());
    const normalizedAuthors = selectedAuthors.map((author) => author.trim().toLowerCase());
    const normalizedMeats = selectedMeats.map((meat) => meat.trim().toLowerCase());
    const normalizedSides = selectedSides.map((side) => side.trim().toLowerCase());
    const normalizedAllergens = selectedAllergens.map((allergen) => allergen.trim().toLowerCase());

    return recipes.filter((recipe) => {
        const recipeCategories = recipe.category.map((cat) => cat.trim().toLowerCase());
        const recipeCuisine = recipe.cuisine?.trim().toLowerCase() ?? '';
        const recipeAuthor = recipe.author.login.trim().toLowerCase();
        const recipeMeat = recipe.meat?.trim().toLowerCase() ?? '';
        const recipeSide = recipe.side?.trim().toLowerCase() ?? '';
        const recipeAllergens = recipe.ingredients.map((ingredient) =>
            ingredient.title.trim().toLowerCase(),
        );

        const matchesCategory =
            normalizedCategories.length === 0 ||
            recipeCategories.some((cat) => normalizedCategories.includes(cat));
        const matchesCuisine =
            normalizedCuisines.length === 0 || normalizedCuisines.includes(recipeCuisine);
        const matchesAuthor =
            normalizedAuthors.length === 0 || normalizedAuthors.includes(recipeAuthor);
        const matchesMeat = normalizedMeats.length === 0 || normalizedMeats.includes(recipeMeat);
        const matchesSide = normalizedSides.length === 0 || normalizedSides.includes(recipeSide);
        const containsAllergen = normalizedAllergens.some((allergen) =>
            recipeAllergens.includes(allergen),
        );

        return (
            matchesCategory &&
            matchesCuisine &&
            matchesAuthor &&
            matchesMeat &&
            matchesSide &&
            !containsAllergen
        );
    });
};
