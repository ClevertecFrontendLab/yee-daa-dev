import { ArrowForwardIcon, Button, SimpleGrid } from '@chakra-ui/icons';
import { Center, Heading, HStack } from '@chakra-ui/react';
import { Link } from 'react-router';

import { Paths } from '../../constants/path.ts';
import { useIsTablet } from '../../hooks/media-query.ts';
import { favouritesRecipes } from '../../mocks/favourites-recipes.ts';
import { FoodCard } from '../food-card';
import { SectionBox } from '../section-box/section-box.tsx';

export const FavouritesBlock = () => {
    const isTablet = useIsTablet();

    const linkBtn = (
        <Button
            bg='lime.400'
            size={{ base: 'md', '2xl': 'lg' }}
            rightIcon={<ArrowForwardIcon />}
            alignItems='center'
            as={Link}
            to={Paths.JUICIEST}
        >
            Вся подборка
        </Button>
    );

    return (
        <SectionBox>
            <HStack justifyContent='space-between' mb={6}>
                <Heading
                    fontSize={{ base: '2xl', xl: '4xl', '2xl': '5xl' }}
                    lineHeight='none'
                    fontWeight={500}
                >
                    Самое сочное
                </Heading>
                {!isTablet && linkBtn}
            </HStack>
            <SimpleGrid
                columns={2}
                gap={{ base: 3, md: 4 }}
                maxWidth='100%'
                minChildWidth={{ base: '300px', md: '450px' }}
            >
                {favouritesRecipes.slice(0, 4).map((el) => (
                    <FoodCard {...el} key={el.id} />
                ))}
            </SimpleGrid>
            <Center display={{ base: 'flex', md: 'none' }} mt={3}>
                {linkBtn}
            </Center>
        </SectionBox>
    );
};
