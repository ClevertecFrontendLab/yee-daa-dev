import {
    Box,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Heading,
    HStack,
    Image,
    Stack,
    Tag,
    TagLabel,
    Text,
} from '@chakra-ui/react';
import { FC } from 'react';

import { Recipe } from '../../types/recipe';
import { CardStat } from '../card-stat/card-stat';
import { CategoryTag } from '../category-tag';
import { AlarmIcon } from '../icons/alarm-icon';
import { BookmarkIcon } from '../icons/bookmark-icon';
import { LikeIcon } from '../icons/like-icon';

export const RecipeCard: FC<{ recipe?: Recipe }> = ({ recipe }) => (
    <Card
        variant={'unstyled'}
        direction='row'
        minH={{ base: '224px', xl: '410px' }}
        borderRadius={'--chakra-radii-lg'}
        flexWrap={{ base: 'wrap', sm: 'nowrap' }}
        gap={{ base: 4, md: 6 }}
        mb={{ base: 4, xl: 10 }}
    >
        <Image
            src={recipe?.image}
            alt={recipe?.title}
            objectFit='cover'
            w={{ base: '100%', sm: '232px', xl: '353px', '2xl': '553px' }}
            borderRadius='var(--chakra-radii-lg)'
        />
        <Stack>
            <CardHeader display={'flex'} justifyContent={'space-between'} p={0} pr={1} pb={8}>
                <HStack flexWrap='wrap'>
                    <CategoryTag category={recipe?.category} color='lime.50' />
                </HStack>
                <CardStat bookmarks={recipe?.bookmarks} likes={recipe?.likes} />
            </CardHeader>
            <CardBody p={0} pb={6}>
                <Heading
                    fontSize={{ base: '2xl', xxl: '5xl' }}
                    mb={2}
                    fontWeight={700}
                    maxW={{ base: '100%', lg: '80%' }}
                >
                    {recipe?.title}
                </Heading>
                <Text fontSize='sm' lineHeight={5}>
                    {recipe?.description}
                </Text>
            </CardBody>
            <CardFooter p={0} justifyContent='space-between' flexWrap='wrap' gap={3}>
                <Box mt={'auto'}>
                    <Tag size='md' p='4px 8px'>
                        <AlarmIcon />
                        <TagLabel ml={2}>{recipe?.time}</TagLabel>
                    </Tag>
                </Box>
                <HStack gap={3} flexWrap='wrap'>
                    <Button
                        variant='outline'
                        size={{ base: 'sm', '2xl': 'lg' }}
                        p={0}
                        leftIcon={<LikeIcon />}
                        color='blackAlpha.800'
                        fontSize={{ base: 'xs', lg: 'sm' }}
                    >
                        Оценить рецепт
                    </Button>
                    <Button
                        bg={'var(--chakra-colors-lime-400)'}
                        size={{ base: 'sm', '2xl': 'lg' }}
                        p={0}
                        leftIcon={<BookmarkIcon />}
                        color='blackAlpha.800'
                        fontSize={{ base: 'xs', lg: 'sm' }}
                    >
                        Сохранить
                    </Button>
                </HStack>
            </CardFooter>
        </Stack>
    </Card>
);
