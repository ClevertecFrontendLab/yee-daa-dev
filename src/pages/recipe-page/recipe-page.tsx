import { Box, Stack, VStack } from '@chakra-ui/react';
import { useEffect } from 'react';

import { AuthorCard } from '~/components/author-card/author-card.tsx';
import { CalorieCard } from '~/components/calorie/calorie.tsx';
import { Carousel } from '~/components/carousel/carousel.tsx';
import { IngredientsBlock } from '~/components/ingredients-block/ingredients-block.tsx';
import { RecipeCard } from '~/components/recipe-card/recipe-card.tsx';
import { StepsBlock } from '~/components/stpeps-block/steps-block.js';
import { useAppSelector } from '~/hooks/typed-react-redux-hooks';
import { useDetectParams } from '~/hooks/use-detect-params';
import { useGetRecipeByIdQuery } from '~/redux/api/recipes-api';
import { useLazyGetBloggerInfoByIdQuery } from '~/redux/api/users-api';
import { selectUserId } from '~/redux/features/auth-slice';

export const RecipePage = () => {
    const { recipeId } = useDetectParams();
    const currentUserId = useAppSelector(selectUserId);

    const { data: recipeData } = useGetRecipeByIdQuery(recipeId as string);
    const [trigger, result] = useLazyGetBloggerInfoByIdQuery();

    useEffect(() => {
        if (recipeData?.authorId) trigger({ bloggerId: recipeData?.authorId, currentUserId });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [recipeData?.authorId]);

    return (
        <VStack spacing={10}>
            <RecipeCard recipe={recipeData} />
            <Stack spacing={10} maxW={{ base: '100%', xl: '758px' }} margin='0 auto' w='100%'>
                <CalorieCard {...recipeData} />
                <IngredientsBlock {...recipeData} />
                <Stack gap={5}>
                    <StepsBlock {...recipeData} />
                </Stack>
                {result.data && recipeData && (
                    <AuthorCard author={result.data} authorId={recipeData.authorId} />
                )}
            </Stack>
            <Box width='100%'>
                <Carousel />
            </Box>
        </VStack>
    );
};
