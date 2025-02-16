import { Stack } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';

import { AuthorCard } from '../../components/author-card/author-card.tsx';
import { CalorieCard } from '../../components/calorie/calorie.tsx';
import { Carousel } from '../../components/carousel/carousel.tsx';
import { IngredientsBlock } from '../../components/ingredients-block/ingredients-block.tsx';
import { RecipeCard } from '../../components/recipe-card/recipe-card.tsx';
import { StepsBlock } from '../../components/stpeps-block/steps-block.js';
import { Paths } from '../../constants/path.ts';
import { useAppSelector } from '../../hooks/typed-react-redux-hooks.ts';
import { selectRecipes } from '../../redux/features/recipies-slice.ts';

export const RecipePage = () => {
    const location = useLocation();
    const { id } = useParams();
    const navigate = useNavigate();
    const recipes = useAppSelector(selectRecipes);

    const recipe = recipes.find((recipe) => recipe.id === id);

    const category = location.pathname.split('/')[1];

    const isRedirect = !recipe || !recipe.category.includes(category);

    useEffect(() => {
        if (isRedirect) {
            navigate(Paths.ERROR);
        }
    }, [isRedirect, navigate]);

    return (
        <Stack spacing={10}>
            <RecipeCard recipe={recipe} />
            <Stack spacing={10} maxW={{ base: '100%', xl: '758px' }} margin='0 auto'>
                <CalorieCard {...recipe} />
                <IngredientsBlock {...recipe} />
                <Stack gap={5}>
                    <StepsBlock {...recipe} />
                </Stack>
                <AuthorCard {...recipe} />
            </Stack>
            <Carousel />
        </Stack>
    );
};
