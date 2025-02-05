import { CardFooter, Image, Stack, TagLabel } from '@chakra-ui/icons';
import { Card, CardBody, CardHeader, Heading, HStack, Tag, Text } from '@chakra-ui/react';
import React, { FC } from 'react';

import cookies from '../../assets/icons/cookies.png';
import first from '../../assets/icons/first.png';
import salad from '../../assets/icons/salad.png';
import vegan from '../../assets/icons/vegan.png';
import { Recipe } from '../../types/recipe.ts';
import { BookmarkIcon } from '../icons/bookmark-icon.tsx';
import { FavoritesIcon } from '../icons/favorites-icon.tsx';

const images = [
    <Image src={first} />,
    <Image src={vegan} />,
    <Image src={cookies} />,
    <Image src={salad} />,
];

export const CarouselItem: FC<Recipe> = ({
    title,
    image,
    description,
    category,
    id,
    likes,
    bookmarks,
}) => {
    return (
        <Card
            maxWidth='322px'
            flexBasis={{ base: '158px', md: '277', xl: '322px' }}
            flexShrink={0}
            border='1px solid rgba(0, 0, 0, 0.08)'
            borderRadius='8px'
        >
            <CardHeader p={0} position='relative'>
                <Image src={image} alt={title} borderTopRightRadius='lg' borderTopLeftRadius='lg' />
                <Tag
                    size={'md'}
                    bg='lime.150'
                    maxWidth='175px'
                    display={{ base: 'flex', md: 'none' }}
                    position='absolute'
                    top={2}
                    left={2}
                    p={1}
                >
                    {images[id]}
                    <TagLabel ml='2px' noOfLines={1} fontSize='sm' letterSpacing='-0.5px'>
                        {category}
                    </TagLabel>
                </Tag>
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
                <HStack justifyContent={'space-between'} alignItems={'center'}>
                    <Tag
                        size={'md'}
                        bg='lime.150'
                        maxWidth='170px'
                        display={{ base: 'none', md: 'flex' }}
                    >
                        {images[id]}
                        <TagLabel ml={2} noOfLines={1}>
                            {category}
                        </TagLabel>
                    </Tag>
                    <HStack>
                        {bookmarks && (
                            <HStack spacing={2} pl={2} pr={1}>
                                <BookmarkIcon w={4} h={4} />
                                <Text fontSize='md' lineHeight={6} color='lime.600'>
                                    {bookmarks}
                                </Text>
                            </HStack>
                        )}
                        {likes && (
                            <HStack spacing={2} pl={2} pr={1}>
                                <FavoritesIcon w={4} h={4} />
                                <Text fontSize='md' lineHeight={6} color='lime.600'>
                                    {likes}
                                </Text>
                            </HStack>
                        )}
                    </HStack>
                </HStack>
            </CardFooter>
        </Card>
    );
};
