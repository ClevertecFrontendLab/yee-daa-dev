import { ArrowForwardIcon, Button, SimpleGrid } from '@chakra-ui/icons';
import { Box, Center, Heading, HStack } from '@chakra-ui/react';

import { favouritesRecipes } from '../../mocks/favourites-recipes.ts';
import { FoodCard } from '../food-card';

export const FavouritesBlock = () => {
    return (
        <Box mb='40px'>
            <HStack justifyContent='space-between' mb={6}>
                <Heading
                    fontSize={{ base: '2xl', xl: '4xl', '2xl': '5xl' }}
                    lineHeight='none'
                    fontWeight={500}
                >
                    Самое сочное
                </Heading>
                <Button
                    bg='lime.400'
                    size={{ base: 'md', '2xl': 'lg' }}
                    rightIcon={<ArrowForwardIcon />}
                    display={{ base: 'none', md: 'block' }}
                >
                    Вся подборка
                </Button>
            </HStack>
            <SimpleGrid
                columns={2}
                gap={{ base: 3, md: 6 }}
                maxWidth='100%'
                minChildWidth={{ base: '300px', md: '450px' }}
            >
                {favouritesRecipes.map((el) => (
                    <FoodCard {...el} key={el.id} />
                ))}
            </SimpleGrid>
            <Center display={{ base: 'flex', md: 'none' }} mt={3}>
                <Button
                    bg='lime.400'
                    size={{ base: 'md', '2xl': 'lg' }}
                    rightIcon={<ArrowForwardIcon />}
                >
                    Вся подборка
                </Button>
            </Center>
        </Box>
    );
};
