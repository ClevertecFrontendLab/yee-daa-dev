import { Box, Stack, VStack } from '@chakra-ui/react';

import { AuthorCard } from '~/components/author-card/author-card.tsx';
import { CalorieCard } from '~/components/calorie/calorie.tsx';
import { Carousel } from '~/components/carousel/carousel.tsx';
import { IngredientsBlock } from '~/components/ingredients-block/ingredients-block.tsx';
import { RecipeCard } from '~/components/recipe-card/recipe-card.tsx';
import { StepsBlock } from '~/components/stpeps-block/steps-block.js';
import { useDetectParams } from '~/hooks/use-detect-params';
import { useGetRecipeByIdQuery } from '~/redux/api/recipes-api';

export const RecipePage = () => {
    const { recipeId } = useDetectParams();

    const { data: recipeData } = useGetRecipeByIdQuery(recipeId as string);
    console.log('recipeData', recipeData);

    return (
        <VStack spacing={10}>
            <RecipeCard recipe={recipeData?.existRecipe} />
            <Stack spacing={10} maxW={{ base: '100%', xl: '758px' }} margin='0 auto' w='100%'>
                <CalorieCard {...recipeData?.existRecipe} />
                <IngredientsBlock {...recipeData?.existRecipe} />
                <Stack gap={5}>
                    <StepsBlock {...recipeData?.existRecipe} />
                </Stack>
                {recipeData?.authorData && (
                    <AuthorCard
                        author={recipeData?.authorData}
                        authorId={recipeData.existRecipe.authorId}
                    />
                )}
            </Stack>
            <Box width='100%'>
                <Carousel />
            </Box>
        </VStack>
    );
};
