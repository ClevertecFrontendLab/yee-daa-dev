import { CardFooter } from '@chakra-ui/icons';
import { Card, CardBody, CardHeader, Heading, HStack, Text } from '@chakra-ui/react';
import { FC } from 'react';

import { Recipe } from '~/redux/api/types/recipes';

import { CardStat } from '../card-stat/card-stat.tsx';
import { CategoryTag } from '../category-tag';

export const RelevantKitchenCard: FC<Recipe> = ({
    title,
    categoryIds,
    description,
    likes,
    bookmarks,
}) => (
    <Card variant='outline' overflow='hidden'>
        <CardHeader p={{ base: 3, md: 4, '2xl': 6 }} pb={{ base: 0, md: 0, '2xl': 0 }}>
            <Heading
                fontSize={{ base: 'md', md: 'xl' }}
                noOfLines={{ base: 2, md: 1 }}
                fontWeight={500}
            >
                {title}
            </Heading>
        </CardHeader>
        <CardBody p={{ base: 3, md: 4, '2xl': 6 }} pt={{ base: 2, md: 2, '2xl': 2 }}>
            <Text noOfLines={3} fontSize='sm' lineHeight={5}>
                {description}
            </Text>
        </CardBody>
        <CardFooter p={{ base: 3, md: 4, '2xl': 6 }} pt={{ base: 0, md: 0, '2xl': 0 }}>
            <HStack justifyContent='space-between' width='100%'>
                <CategoryTag category={categoryIds} color='lime.50' />
                <CardStat bookmarks={bookmarks} likes={likes} />
            </HStack>
        </CardFooter>
    </Card>
);
