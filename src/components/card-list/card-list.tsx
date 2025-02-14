import { SimpleGrid } from '@chakra-ui/react';
import { FC } from 'react';

import { Recipe } from '../../types/recipe';
import { FoodCard } from '../food-card';

type CardListProps = {
    recipeList: Recipe[];
};

export const CardList: FC<CardListProps> = ({ recipeList }) => (
    <SimpleGrid
        columns={2}
        gap={{ base: 3, md: 4 }}
        maxWidth='1360px'
        minChildWidth={{ base: '328px', md: '450px' }}
    >
        {recipeList.map((el) => (
            <FoodCard {...el} key={el.id} />
        ))}
    </SimpleGrid>
);
