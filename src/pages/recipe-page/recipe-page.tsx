import { Stack, VStack } from '@chakra-ui/react';

import { AuthorCard } from '~/components/author-card/author-card.tsx';
import { CalorieCard } from '~/components/calorie/calorie.tsx';
import { Carousel } from '~/components/carousel/carousel.tsx';
import { IngredientsBlock } from '~/components/ingredients-block/ingredients-block.tsx';
import { RecipeCard } from '~/components/recipe-card/recipe-card.tsx';
import { StepsBlock } from '~/components/stpeps-block/steps-block.js';
import { useDetectParams } from '~/hooks/use-detect-params';
import { mockAuthors } from '~/mocks/authors';
import { useGetRecipeByIdQuery } from '~/redux/api/recipes-api';

export const RecipePage = () => {
    const { recipeId } = useDetectParams();

    const { data: recipe } = useGetRecipeByIdQuery(recipeId as string);
    //TODO добавить логику поиска автора по ид из рецепта когда будет готова коллекция авторов
    const foundAuthor = mockAuthors[0] || null;

    return (
        <VStack spacing={10}>
            <RecipeCard recipe={recipe} />
            <Stack spacing={10} maxW={{ base: '100%', xl: '758px' }} margin='0 auto' w='100%'>
                <CalorieCard {...recipe} />
                <IngredientsBlock {...recipe} />
                <Stack gap={5}>
                    <StepsBlock {...recipe} />
                </Stack>
                {foundAuthor && <AuthorCard author={foundAuthor} />}
            </Stack>
            <Carousel />
        </VStack>
    );
};
