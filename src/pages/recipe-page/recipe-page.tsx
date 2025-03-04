import { Stack } from '@chakra-ui/react';

import { AuthorCard } from '~/components/author-card/author-card.tsx';
import { CalorieCard } from '~/components/calorie/calorie.tsx';
import { Carousel } from '~/components/carousel/carousel.tsx';
import { IngredientsBlock } from '~/components/ingredients-block/ingredients-block.tsx';
import { RecipeCard } from '~/components/recipe-card/recipe-card.tsx';
import { StepsBlock } from '~/components/stpeps-block/steps-block.js';
import { mockAuthors } from '~/mocks/authors';
import { Recipe } from '~/redux/api/types/recipes';

type RecipePageProps = { recipe: Recipe };

export const RecipePage = ({ recipe }: RecipePageProps) => {
    //TODO добавить логику поиска автора по ид из рецепта
    const foundAuthor = mockAuthors[0] || null;
    return (
        <Stack spacing={10}>
            <RecipeCard recipe={recipe} />
            <Stack spacing={10} maxW={{ base: '100%', xl: '758px' }} margin='0 auto'>
                <CalorieCard {...recipe} />
                <IngredientsBlock {...recipe} />
                <Stack gap={5}>
                    <StepsBlock {...recipe} />
                </Stack>
                {foundAuthor && <AuthorCard author={foundAuthor} />}
            </Stack>
            <Carousel />
        </Stack>
    );
};
