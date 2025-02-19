import { Recipe } from '../../../types/recipe';

type FilterOptions = {
    selectedCategories: string[];
    selectedCuisines: string[];
    selectedAuthors: string[];
    selectedMeats: string[];
    selectedSides: string[];
};

export const filterRecipes = (recipes: Recipe[], filterOptions: FilterOptions): Recipe[] => {
    const { selectedCategories, selectedCuisines, selectedAuthors, selectedMeats, selectedSides } =
        filterOptions;
    const normalizedCategories = selectedCategories.map((cat) => cat.trim().toLowerCase());
    const normalizedCuisines = selectedCuisines.map((cuisine) => cuisine.trim().toLowerCase());
    const normalizedAuthors = selectedAuthors.map((author) => author.trim().toLowerCase());
    const normalizedMeats = selectedMeats.map((meat) => meat.trim().toLowerCase());
    const normalizedSides = selectedSides.map((side) => side.trim().toLowerCase());

    return recipes.filter((recipe) => {
        const recipeCategories = recipe.category.map((cat) => cat.trim().toLowerCase());
        const recipeCuisine = recipe.cuisine ? recipe.cuisine.trim().toLowerCase() : '';
        const recipeAuthor = recipe.author.login.trim().toLowerCase();
        const recipeMeat = recipe.meat ? recipe.meat.trim().toLowerCase() : '';
        const recipeSide = recipe.side ? recipe.side.trim().toLowerCase() : '';

        const matchesCategory =
            normalizedCategories.length === 0 ||
            recipeCategories.some((cat) => normalizedCategories.includes(cat));
        const matchesCuisine =
            normalizedCuisines.length === 0 || normalizedCuisines.includes(recipeCuisine);
        const matchesAuthor =
            normalizedAuthors.length === 0 || normalizedAuthors.includes(recipeAuthor);
        const matchesMeat = normalizedMeats.length === 0 || normalizedMeats.includes(recipeMeat);
        const matchesSide = normalizedSides.length === 0 || normalizedSides.includes(recipeSide);

        return matchesCategory && matchesCuisine && matchesAuthor && matchesMeat && matchesSide;
    });
};
