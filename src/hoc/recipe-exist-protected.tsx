import { Navigate, useParams } from 'react-router';

import { Paths, routeParams } from '~/constants/path';
import { useAppSelector } from '~/hooks/typed-react-redux-hooks';
import { RecipePage } from '~/pages/recipe-page';
import { selectRecipes } from '~/redux/features/recipies-slice';

export const RecipeExistProtected = () => {
    const { recipeId } = useParams<typeof routeParams>();
    const recipes = useAppSelector(selectRecipes);

    if (!recipeId) return <Navigate to={Paths.ERROR} />;

    const recipe = recipes.find((recipe) => recipe.id === recipeId);

    return recipe ? <RecipePage recipe={recipe} /> : <Navigate to={Paths.ERROR} />;
};
