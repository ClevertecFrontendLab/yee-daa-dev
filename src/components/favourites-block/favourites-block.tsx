import { ArrowForwardIcon, Button } from '@chakra-ui/icons';
import { Center, Heading, HStack } from '@chakra-ui/react';
import { FC } from 'react';
import { Link } from 'react-router';

import { Paths } from '../../constants/path.ts';
import { useIsTablet } from '../../hooks/media-query.ts';
import { useAppSelector } from '../../hooks/typed-react-redux-hooks.ts';
import { selectRecipes } from '../../redux/features/recipies-slice.ts';
import { CardList } from '../card-list/card-list.tsx';
import { SectionBox } from '../section-box/section-box.tsx';

export const FavouritesBlock: FC = () => {
    const isTablet = useIsTablet();
    const recipes = useAppSelector(selectRecipes);

    const favouritesRecipes = recipes
        .filter((recipe) => recipe.likes !== undefined)
        .sort((a, b) => (b?.likes ?? 0) - (a?.likes ?? 0))
        .slice(0, 4);

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
                    _hover={{ cursor: 'pointer' }}
                >
                    Самое сочное
                </Heading>
                {!isTablet && linkBtn}
            </HStack>
            <CardList recipeList={favouritesRecipes} />
            <Center display={{ base: 'flex', md: 'none' }} mt={3}>
                {linkBtn}
            </Center>
        </SectionBox>
    );
};
