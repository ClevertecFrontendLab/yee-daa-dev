import { Button, CardFooter, IconButton, Image, Stack } from '@chakra-ui/icons';
import { Box, Card, CardBody, CardHeader, Heading, HStack, Text } from '@chakra-ui/react';
import { FC } from 'react';

import { Recipe } from '../../types/recipe.ts';
import { CardStat } from '../card-stat/card-stat.tsx';
import { CategoryTag } from '../category-tag';
import { BookmarkIcon } from '../icons/bookmark-icon.tsx';
import { RecommendationTag } from '../recommendation-tag';

export const FoodCard: FC<Recipe> = ({
    title,
    image,
    description,
    category,
    likes,
    bookmarks,
    recommendation,
}) => {
    return (
        <Card direction='row' variant='outline' overflow='hidden'>
            <Box position='absolute' top={2} left={2} display={{ base: 'block', md: 'none' }}>
                <CategoryTag category={category} color={'lime.50'} />
            </Box>
            <Box
                position='absolute'
                bottom={2}
                left={2}
                display={{ base: 'none', md: 'block' }}
                maxW={{ base: '158px', md: 'calc(50% - 16px)' }}
            >
                {recommendation && <RecommendationTag {...recommendation} />}
            </Box>
            <Image src={image} alt={title} maxW={{ base: '158px', md: '50%' }} objectFit='cover' />
            <Stack flexGrow={1}>
                <CardHeader
                    pb={0}
                    pl={{ base: 2, md: 6 }}
                    pr={{ base: 2, md: 6 }}
                    pt={{ base: 2, md: 5 }}
                >
                    <HStack justifyContent='space-between'>
                        <Box display={{ base: 'none', md: 'block' }}>
                            <CategoryTag category={category} color='lime.50' />
                        </Box>
                        <CardStat bookmarks={bookmarks} likes={likes} />
                    </HStack>
                </CardHeader>
                <CardBody p={{ base: 2, md: 6 }} pb={{ base: 5, md: 6 }} pt={{ base: 0, md: 6 }}>
                    <Heading
                        fontSize={{ base: 'md', md: 'xl' }}
                        noOfLines={{ base: 2, md: 1 }}
                        mb={2}
                        fontWeight={500}
                    >
                        {title}
                    </Heading>
                    <Text
                        noOfLines={3}
                        fontSize='sm'
                        lineHeight={5}
                        display={{ base: 'none', md: '-webkit-box' }}
                    >
                        {description}
                    </Text>
                </CardBody>
                <CardFooter
                    pl={{ base: 2, md: 6 }}
                    pr={{ base: 2, md: 6 }}
                    pt={0}
                    pb={{ base: 1, md: 5 }}
                >
                    <HStack justifyContent='flex-end' width='100%' spacing={{ base: 3, md: 2 }}>
                        <IconButton
                            size={{ base: 'xs', md: 'sm' }}
                            aria-label={'save-recipe'}
                            icon={<BookmarkIcon />}
                            variant='outline'
                            display={{ base: 'flex', md: 'none' }}
                            w={6}
                        />
                        <Button
                            variant='outline'
                            size={{ base: 'xs', md: 'sm' }}
                            leftIcon={<BookmarkIcon />}
                            color='blackAlpha.800'
                            display={{ base: 'none', md: 'block' }}
                        >
                            Сохранить
                        </Button>
                        <Button bg='black' color='white' size={{ base: 'xs', md: 'sm' }}>
                            Готовить
                        </Button>
                    </HStack>
                </CardFooter>
            </Stack>
        </Card>
    );
};
