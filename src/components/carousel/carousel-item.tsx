import { CardFooter, Image, Stack } from '@chakra-ui/icons';
import { Box, Card, CardBody, CardHeader, Heading, HStack, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { NavLink } from 'react-router';

import { useAppDispatch, useAppSelector } from '../../hooks/typed-react-redux-hooks.ts';
import { selectCategoriesMenu } from '../../redux/features/categories-slice.ts';
import { selectChoosenCategory } from '../../redux/features/choosen-category-slice.ts';
import { setSelectedRecipe } from '../../redux/features/choosen-recipe-slice.ts';
import { selectRecipes } from '../../redux/features/recipies-slice.ts';
import { Recipe } from '../../types/recipe.ts';
import { getPath } from '../../utils/get-path.ts';
import { CardStat } from '../card-stat/card-stat.tsx';
import { CategoryTag } from '../category-tag';

export const CarouselItem: FC<{ recipe: Recipe }> = ({ recipe }) => {
    const dispatch = useAppDispatch();
    const selectedCategory = useAppSelector(selectChoosenCategory);
    const allcategories = useAppSelector(selectCategoriesMenu);
    const allRecipes = useAppSelector(selectRecipes);

    const { id, title, image, description, category, likes, bookmarks } = recipe;
    const categoryPath = getPath(allcategories, allRecipes, selectedCategory, id);

    const handleClick = () => {
        dispatch(setSelectedRecipe(recipe));
    };

    return (
        <NavLink to={categoryPath} onClick={handleClick}>
            <Card
                width={{ base: '158px', md: '277px', xl: '322px' }}
                minH={{ base: '220px', md: '375px', xl: '400px' }}
                border='1px solid rgba(0, 0, 0, 0.08)'
                borderRadius='8px'
                boxShadow='none'
            >
                <CardHeader p={0} position='relative'>
                    <Image
                        src={image}
                        alt={title}
                        borderTopRightRadius='lg'
                        borderTopLeftRadius='lg'
                    />
                    <Box
                        position='absolute'
                        top={1}
                        left={1}
                        p={1}
                        display={{ base: 'block', md: 'none' }}
                        width={'100%'}
                    >
                        <CategoryTag category={category} color='lime.150' />
                    </Box>
                </CardHeader>
                <CardBody p={{ base: 3, md: 6 }} pt={{ base: 3, md: 4 }} pb={{ base: 2, md: 6 }}>
                    <Stack>
                        <Heading
                            fontSize={{ base: 'md', md: 'xl' }}
                            lineHeight='none'
                            textAlign='left'
                            noOfLines={{ base: 2, md: 1 }}
                        >
                            {title}
                        </Heading>
                        <Text
                            fontSize='sm'
                            lineHeight={5}
                            noOfLines={3}
                            display={{ base: 'none', md: '-webkit-box' }}
                        >
                            {description}
                        </Text>
                    </Stack>
                </CardBody>
                <CardFooter p={{ base: 3, md: 6 }} pt={{ base: 0, md: 0 }} display='block'>
                    <HStack justifyContent='space-between' alignItems='center'>
                        <Box display={{ base: 'none', md: 'flex' }}>
                            <CategoryTag category={category} color='lime.150' />
                        </Box>
                        <CardStat likes={likes} bookmarks={bookmarks} />
                    </HStack>
                </CardFooter>
            </Card>
        </NavLink>
    );
};
