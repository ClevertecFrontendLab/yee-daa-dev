import { CardFooter, Image, Stack } from '@chakra-ui/icons';
import { Box, Card, CardBody, CardHeader, Heading, HStack, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { NavLink } from 'react-router';

import { useAppDispatch, useAppSelector } from '~/hooks/typed-react-redux-hooks.ts';
import { Recipe } from '~/redux/api/types/recipes.ts';
import { selectCategoriesMenu } from '~/redux/features/categories-slice.ts';
import { setSelectedRecipe } from '~/redux/features/choosen-recipe-slice.ts';
import { selectRecipes } from '~/redux/features/recipies-slice.ts';
import { getAbsoluteImagePath } from '~/utils/get-absolute-image-path.ts';
import { getPath } from '~/utils/get-path.ts';
import { isArrayWithItems } from '~/utils/is-array-with-items.ts';

import { CardStat } from '../card-stat/card-stat.tsx';
import { CategoryTag } from '../category-tag';

export const CarouselItem: FC<{ recipe: Recipe }> = ({ recipe }) => {
    const dispatch = useAppDispatch();

    const allCategories = useAppSelector(selectCategoriesMenu);
    const allRecipes = useAppSelector(selectRecipes);

    const { id, title, image, description, categoriesIds, likes, bookmarks } = recipe;
    const categoryId = isArrayWithItems(categoriesIds) ? categoriesIds[0] : '';
    const selectedCategory = allCategories.find((elem) => elem.id === categoryId);

    const categoryPath = getPath(allCategories, allRecipes, selectedCategory, id);

    const handleClick = () => {
        dispatch(setSelectedRecipe(recipe));
    };

    return (
        <NavLink to={categoryPath} onClick={handleClick}>
            <Card
                w={{ base: '158px', xmd: '277px', xl: '322px' }}
                h={{ base: '220px', xmd: '375px', xl: '400px' }}
                border='1px solid rgba(0, 0, 0, 0.08)'
                borderRadius='8px'
                boxShadow='none'
            >
                <CardHeader p={0} position='relative'>
                    <Box h={{ base: '128px', xmd: '230px', xl: '230px' }}>
                        <Image
                            src={getAbsoluteImagePath(image)}
                            alt={title}
                            borderTopRightRadius='lg'
                            borderTopLeftRadius='lg'
                            objectFit='cover'
                            h={{ base: '128px', xmd: '230px', xl: '230px' }}
                        />
                    </Box>
                    <Box
                        position='absolute'
                        top={1}
                        left={1}
                        p={1}
                        display={{ base: 'block', md: 'none' }}
                        width='100%'
                    >
                        <CategoryTag categoriesIds={categoriesIds} color='lime.150' />
                    </Box>
                </CardHeader>
                <CardBody p={{ base: 3, xmd: 6 }} pt={{ base: 3, xmd: 4 }} pb={{ base: 2, xmd: 6 }}>
                    <Stack>
                        <Heading
                            fontSize={{ base: 'md', xmd: 'xl' }}
                            lineHeight='none'
                            textAlign='left'
                            noOfLines={{ base: 2, xmd: 1 }}
                            minH={{ base: 'auto', xmd: '48px', lg: 'auto' }}
                        >
                            {title}
                        </Heading>
                        <Text
                            fontSize='sm'
                            lineHeight={5}
                            noOfLines={3}
                            display={{ base: 'none', xmd: '-webkit-box' }}
                        >
                            {description}
                        </Text>
                    </Stack>
                </CardBody>
                <CardFooter p={{ base: 3, xmd: 6 }} pt={{ base: 0, xmd: 0 }} display='block'>
                    <HStack justifyContent='space-between' alignItems='center'>
                        <Box display={{ base: 'none', xmd: 'flex' }}>
                            {/* по макету только один тег на слайдере */}
                            <CategoryTag
                                categoriesIds={categoriesIds.slice(0, 1)}
                                color='lime.150'
                            />
                        </Box>
                        <CardStat likes={likes} bookmarks={bookmarks} />
                    </HStack>
                </CardFooter>
            </Card>
        </NavLink>
    );
};
