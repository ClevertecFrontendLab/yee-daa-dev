import { Box, Button, Stack, VStack } from '@chakra-ui/react';
import { useEffect } from 'react';

import { AuthorCard } from '~/components/author-card/author-card.tsx';
import { CalorieCard } from '~/components/calorie/calorie.tsx';
import { Carousel } from '~/components/carousel/carousel.tsx';
import { RecommendationIcon } from '~/components/icons/recommendation-icon';
import { IngredientsBlock } from '~/components/ingredients-block/ingredients-block.tsx';
import { RecipeCard } from '~/components/recipe-card/recipe-card.tsx';
import { StepsBlock } from '~/components/stpeps-block/steps-block.js';
import { useAppSelector } from '~/hooks/typed-react-redux-hooks';
import { useDetectParams } from '~/hooks/use-detect-params';
import { useGetRecipeByIdQuery, useRecommendationRecipeMutation } from '~/redux/api/recipes-api';
import { useLazyGetBloggerInfoByIdQuery } from '~/redux/api/users-api';
import { selectUserId } from '~/redux/features/auth-slice';
import { selectIsRecommending, selectIsRecommendingRecipe } from '~/redux/features/user-slice';

export const RecipePage = () => {
    const { recipeId } = useDetectParams();
    const currentUserId = useAppSelector(selectUserId);

    const isRecommendingProfile = useAppSelector(selectIsRecommending);
    const isRecommendingRecipe = useAppSelector((state) =>
        selectIsRecommendingRecipe(state, recipeId),
    );

    const { data: recipeData } = useGetRecipeByIdQuery(recipeId as string);
    const [trigger, result] = useLazyGetBloggerInfoByIdQuery();
    const [recommendingRecipe] = useRecommendationRecipeMutation();

    useEffect(() => {
        if (recipeData?.authorId) trigger({ bloggerId: recipeData?.authorId, currentUserId });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [recipeData?.authorId]);

    const handleRecommendingRecipe = () => {
        recommendingRecipe(recipeId!);
    };

    const renderRecommendedButton = () =>
        isRecommendingRecipe ? (
            <Button
                colorScheme='black'
                variant='outline'
                size='lg'
                onClick={handleRecommendingRecipe}
                type='button'
                leftIcon={<RecommendationIcon color='blackAlpha.900' />}
            >
                Вы порекомендовали
            </Button>
        ) : (
            <Button
                colorScheme='black'
                variant='solid'
                bgColor='blackAlpha.900'
                size='lg'
                onClick={handleRecommendingRecipe}
                type='button'
                leftIcon={<RecommendationIcon color='white' />}
            >
                Рекомендовать рецепт
            </Button>
        );

    return (
        <VStack spacing={10}>
            <RecipeCard recipe={recipeData} />
            <Stack spacing={10} maxW={{ base: '100%', xl: '758px' }} margin='0 auto' w='100%'>
                <CalorieCard {...recipeData} />
                <IngredientsBlock {...recipeData} />
                <Stack gap={5}>
                    <StepsBlock {...recipeData} />
                </Stack>
                {result.data && recipeData && recipeData.authorId !== currentUserId && (
                    <AuthorCard author={result.data} authorId={recipeData.authorId} />
                )}
                {isRecommendingProfile && renderRecommendedButton()}
            </Stack>
            <Box width='100%'>
                <Carousel />
            </Box>
        </VStack>
    );
};
