import { Button, CardFooter, Image, Stack } from '@chakra-ui/icons';
import { Box, Card, CardBody, CardHeader, Heading, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { NavLink, useLocation } from 'react-router';

import { useAppSelector } from '~/hooks/typed-react-redux-hooks.ts';
import { useGetRecipePath } from '~/hooks/use-get-recipe-path.ts';
import { mockAuthors } from '~/mocks/authors.ts';
import { Recipe } from '~/redux/api/types/recipes.ts';
import { selectInputValue } from '~/redux/features/search-slice.ts';
import { getAbsoluteImagePath } from '~/utils/get-absolute-image-path.ts';

import { CardStat } from '../card-stat/card-stat.tsx';
import { CategoryTag } from '../category-tag';
import { HighlightText } from '../highlight/highlight-text.tsx';
import { BookmarkIcon } from '../icons/bookmark-icon.tsx';
import { RecommendationTag } from '../recommendation-tag';

export const FoodCard: FC<{ recipe: Recipe; index: number }> = ({ recipe, index }) => {
    const inputValue = useAppSelector(selectInputValue);
    const { pathname } = useLocation();

    const { title, image, description, categoriesIds, likes, bookmarks } = recipe;

    const recipePath = useGetRecipePath(recipe);

    // TODO заменить на поиск автора по recommendedByUserId из рецепта
    const { login, ...authorRecommendInfo } = mockAuthors[1];

    return (
        <Card
            direction='row'
            variant='outline'
            gap={{ base: 2, xmd: 6 }}
            data-test-id={`food-card-${index}`}
        >
            <Box position='relative' w={{ base: '158px', xmd: '50%' }} maxW='346px' flex='1'>
                <Box
                    position='absolute'
                    top={2}
                    left={2}
                    right={2}
                    display={{ base: 'block', xmd: 'none' }}
                    maxWidth='150px'
                    zIndex={2}
                >
                    <CategoryTag categoriesIds={categoriesIds} color='lime.50' />
                </Box>
                <Box
                    position='absolute'
                    zIndex={2}
                    bottom={2}
                    left={2}
                    right={2}
                    display={{ base: 'none', xxl: 'block' }}
                >
                    {login && <RecommendationTag {...authorRecommendInfo} />}
                </Box>
                <Image
                    top={0}
                    left={0}
                    src={getAbsoluteImagePath(image)}
                    alt={title}
                    width='100%'
                    height='100%'
                    objectFit='cover'
                    position='absolute'
                    borderRadius='var(--chakra-radii-lg)'
                />
            </Box>

            <Stack
                pt={{ base: 2, xl: 6 }}
                pb={{ base: 1, xl: 6 }}
                pr={{ base: 2, xl: 6 }}
                gap={{ base: 0, xmd: 6 }}
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
                        <CategoryTag categoriesIds={categoriesIds} color='lime.50' />
                    </Box>
                    <CardStat bookmarks={bookmarks} likes={likes} />
                </CardHeader>
                <CardBody p={0}>
                    <Heading
                        fontSize={{ base: 'md', xmd: 'xl' }}
                        noOfLines={{ base: 2, xmd: 1 }}
                        mb={{ base: 6, sm: 7, xmd: 2 }}
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
                        size={{ base: 'xs', xmd: 'sm' }}
                        leftIcon={<BookmarkIcon />}
                        color='blackAlpha.800'
                    >
                        <Box as='span' display={{ base: 'none', xmd: 'inline' }}>
                            Сохранить
                        </Box>
                    </Button>
                    <NavLink
                        to={recipePath}
                        data-test-id={`card-link-${index}`}
                        state={{ fromPage: pathname }}
                    >
                        <Button bg='black' color='white' size={{ base: 'xs', xmd: 'sm' }}>
                            Готовить
                        </Button>
                    </NavLink>
                </CardFooter>
            </Stack>
        </Card>
    );
};
