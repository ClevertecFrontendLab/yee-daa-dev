import { Stack } from '@chakra-ui/react';

import { AuthorCard } from '~/components/author-card/author-card.tsx';
import { CalorieCard } from '~/components/calorie/calorie.tsx';
import { Carousel } from '~/components/carousel/carousel.tsx';
import { IngredientsBlock } from '~/components/ingredients-block/ingredients-block.tsx';
import { RecipeCard } from '~/components/recipe-card/recipe-card.tsx';
import { StepsBlock } from '~/components/stpeps-block/steps-block.js';
import { Recipe } from '~/types/recipe';

type RecipePageProps = { recipe: Recipe };

export const RecipePage = ({ recipe }: RecipePageProps) => (
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
