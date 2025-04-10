import { ArrowForwardIcon, Button } from '@chakra-ui/icons';
import { Center, Heading, HStack } from '@chakra-ui/react';
import { FC } from 'react';
import { Link, useLocation } from 'react-router';

import { Paths } from '~/constants/path.js';
import { JUICIEST_PARAMS } from '~/redux/api/constants.ts';
import { useGetAllRecipesWithParamsQuery } from '~/redux/api/recipes-api';
import { isArrayWithItems } from '~/utils/is-array-with-items.ts';

import { CardList } from '../card-list';
import { Loader } from '../loader';
import { SectionBox } from '../section-box/section-box';

export const FavoritesBlock: FC = () => {
    const { isLoading, data } = useGetAllRecipesWithParamsQuery(JUICIEST_PARAMS);
    const favoritesRecipes = data?.data;
    const { pathname } = useLocation();

    return (
        <>
            {isLoading && (
                <Center w='100%' margin='auto'>
                    <Loader boxSize={16} />
                </Center>
            )}
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
                    <Button
                        bg='lime.400'
                        size={{ base: 'md', '2xl': 'lg' }}
                        rightIcon={<ArrowForwardIcon />}
                        alignItems='center'
                        as={Link}
                        state={{ fromPage: pathname }}
                        to={Paths.JUICIEST}
                        data-test-id='juiciest-link'
                        display={{ base: 'none', md: 'flex' }}
                    >
                        Вся подборка
                    </Button>
                </HStack>
                {isArrayWithItems(favoritesRecipes) && (
                    <CardList recipeList={favoritesRecipes} pb={10} />
                )}
                <Center display={{ base: 'flex', md: 'none' }} mt={3}>
                    <Button
                        bg='lime.400'
                        size={{ base: 'md', '2xl': 'lg' }}
                        rightIcon={<ArrowForwardIcon />}
                        alignItems='center'
                        as={Link}
                        state={{ fromPage: pathname }}
                        to={Paths.JUICIEST}
                        data-test-id='juiciest-link-mobile'
                    >
                        Вся подборка
                    </Button>
                </Center>
            </SectionBox>
        </>
    );
};
