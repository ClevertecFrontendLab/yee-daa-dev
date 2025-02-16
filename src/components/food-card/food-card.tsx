import { Button, CardFooter, Image, Stack } from '@chakra-ui/icons';
import { Box, Card, CardBody, CardHeader, Heading, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { NavLink } from 'react-router';

import { useAppDispatch, useAppSelector } from '../../hooks/typed-react-redux-hooks.ts';
import { selectCategoriesMenu } from '../../redux/features/categories-slice.ts';
import { selectChoosenCategory } from '../../redux/features/choosen-category-slice.ts';
import { setSelectedRecipe } from '../../redux/features/choosen-recipe-slice.ts';
import { selectRecipes } from '../../redux/features/recipies-slice.ts';
import { selectInputValue } from '../../redux/features/search-slice.ts';
import { Recipe } from '../../types/recipe.ts';
import { getPath } from '../../utils/get-path.ts';
import { CardStat } from '../card-stat/card-stat.tsx';
import { CategoryTag } from '../category-tag';
import { HighlightText } from '../highlight/highlight-text.tsx';
import { BookmarkIcon } from '../icons/bookmark-icon.tsx';
import { RecommendationTag } from '../recommendation-tag';

export const FoodCard: FC<{ recipe: Recipe }> = ({ recipe }) => {
    const dispatch = useAppDispatch();
    const inputValue = useAppSelector(selectInputValue);
    const allcategories = useAppSelector(selectCategoriesMenu);
    const selectedCategory = useAppSelector(selectChoosenCategory);
    const allRecipes = useAppSelector(selectRecipes);

    const { id, title, image, description, category, likes, bookmarks, recommendation } = recipe;

    const categoryPath = getPath(allcategories, allRecipes, selectedCategory, id);
    const handleClick = () => {
        dispatch(setSelectedRecipe(recipe));
    };

    return (
        <Card direction='row' variant='outline' gap={6}>
            <Box position='relative' w={{ base: '158px', md: '50%' }} maxW='346px' flex='1'>
                <Box
                    position='absolute'
                    top={2}
                    left={2}
                    right={2}
                    display={{ base: 'block', xmd: 'none' }}
                    maxWidth='150px'
                    zIndex={2}
                >
                    <CategoryTag category={category} color={'lime.50'} />
                </Box>
                <Box
                    position='absolute'
                    zIndex={2}
                    bottom={2}
                    left={2}
                    right={2}
                    display={{ base: 'none', xxl: 'block' }}
                >
                    {recommendation && <RecommendationTag {...recommendation} />}
                </Box>
                <Image
                    top={0}
                    left={0}
                    src={image}
                    alt={title}
                    width='100%'
                    height='100%'
                    objectFit='cover'
                    position='absolute'
                    borderRadius={'var(--chakra-radii-lg)'}
                />
            </Box>

            <Stack
                pt={{ base: 2, xl: 6 }}
                pb={{ base: 2, xl: 6 }}
                pr={{ base: 2, xl: 6 }}
                gap={6}
                flex='1'
            >
                <CardHeader
                    p={0}
                    display='flex'
                    justifyContent='space-between'
                    flexDirection='row'
                    alignItems='flex-start'
                >
                    <Box display={{ base: 'none', xmd: 'block' }}>
                        <CategoryTag category={category} color='lime.50' />
                    </Box>
                    <CardStat bookmarks={bookmarks} likes={likes} />
                </CardHeader>
                <CardBody p={0}>
                    <Heading
                        fontSize={{ base: 'md', xmd: 'xl' }}
                        noOfLines={{ base: 2, md: 1 }}
                        mb={2}
                        fontWeight={500}
                    >
                        <HighlightText query={inputValue ?? ''} text={title} />
                    </Heading>
                    <Text
                        noOfLines={3}
                        fontSize='sm'
                        lineHeight={5}
                        display={{ base: 'none', xmd: '-webkit-box' }}
                    >
                        {description}
                    </Text>
                </CardBody>
                <CardFooter
                    p={0}
                    justifyContent='flex-end'
                    display='flex'
                    gap={{ base: 3, md: 2 }}
                    flexWrap='wrap'
                >
                    <Button
                        variant='outline'
                        size={{ base: 'xs', md: 'sm' }}
                        leftIcon={<BookmarkIcon />}
                        color='blackAlpha.800'
                    >
                        <Box as='span' display={{ base: 'none', xmd: 'inline' }}>
                            Сохранить
                        </Box>
                    </Button>
                    <NavLink to={categoryPath} onClick={handleClick}>
                        <Button bg='black' color='white' size={{ base: 'xs', md: 'sm' }}>
                            Готовить
                        </Button>
                    </NavLink>
                </CardFooter>
            </Stack>
        </Card>
    );
};
