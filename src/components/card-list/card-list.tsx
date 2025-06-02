import { SimpleGrid, SimpleGridProps } from '@chakra-ui/react';
import { FC } from 'react';

import { Recipe } from '~/redux/api/types/recipes';

import { FoodCard } from '../food-card';

type CardListProps = {
    recipeList: Recipe[];
} & SimpleGridProps;

export const CardList: FC<CardListProps> = ({ recipeList, ...rest }) => (
    <SimpleGrid
        pt={6}
        columns={{ base: 1, md: 2, xmd: 1, '2xl': 2 }}
        gap={{ base: 3, md: 4 }}
        gridTemplateColumns={{
            base: '1fr',
            md: 'repeat(2, 1fr)',
            lg: '1fr',
            '2xl': 'repeat(2, 1fr)',
        }}
        data-test-id='recipe-card-list'
        {...rest}
    >
        {recipeList.map((el, index) => (
            <FoodCard recipe={el} key={el.id} index={index} />
        ))}
    </SimpleGrid>
);
