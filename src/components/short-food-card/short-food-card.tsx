import { Button, Image } from '@chakra-ui/icons';
import { Heading, HStack } from '@chakra-ui/react';
import { FC } from 'react';

import { categoriesMap } from '../../constants/categories.ts';
import { Recipe } from '../../types/recipe.ts';

export const ShortFoodCard: FC<Recipe> = ({ category, title }) => {
    return (
        <HStack
            border='1px solid rgba(0, 0, 0, 0.08)'
            padding={{ base: '8px 12px', md: '12px 24px' }}
            borderRadius='8px'
            alignItems='center'
            spacing={2}
        >
            <Image src={categoriesMap[category]} alt={category} />
            <Heading
                fontSize={{ base: 'md', md: 'xl' }}
                noOfLines={1}
                fontWeight={500}
                flexGrow={1}
            >
                {title}
            </Heading>
            <Button
                variant='outline'
                color='lime.600'
                borderColor='lime.600'
                size='sm'
                flexShrink={0}
            >
                Готовить
            </Button>
        </HStack>
    );
};
