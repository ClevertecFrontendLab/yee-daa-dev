import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Box, Button, Heading, Link, SimpleGrid, Stack } from '@chakra-ui/react';

import { BlogCard } from '~/components/blog-card/blog-card';
import { Carousel } from '~/components/carousel';

const MOCK_FAV_BLOGS = [
    {
        name: 'Мин',
        lastName: 'Мин',
        login: '@cookermin',
        descr: 'Паназиатская кухня — это настоящий праздник для вашего здоровья и вкусовых рецепторов. Присоединяйтесь ко мне, и мы создадим новые кулинарные шедевры!',
        imgSrc: 'imgSrc',
        newRecipes: 1,
        social: {
            bookmarks: 12,
            followers: 1,
        },
    },
    {
        name: 'Name',
        lastName: 'Мин',
        login: 'login',
        descr: 'Паназиатская кухня — это настоящий праздник для вашего здоровья и вкусовых рецепторов. Присоединяйтесь ко мне, и мы создадим новые кулинарные шедевры!',
        imgSrc: 'imgSrc',
        newRecipes: 1,
        social: {
            bookmarks: 12,
            followers: 1,
        },
    },
];

const MOCK_ALL_BLOGS = [
    {
        name: 'Мин',
        lastName: 'Мин',
        login: '@cookermin',
        descr: 'Паназиатская кухня — это настоящий праздник для вашего здоровья и вкусовых рецепторов. Присоединяйтесь ко мне, и мы создадим новые кулинарные шедевры!',
        imgSrc: 'imgSrc',
        newRecipes: 1,
        social: {
            bookmarks: 12,
            followers: 1,
        },
    },
    {
        name: 'Name',
        lastName: 'Мин',
        login: 'login',
        descr: 'Паназиатская кухня — это настоящий праздник для вашего здоровья и вкусовых рецепторов. Присоединяйтесь ко мне, и мы создадим новые кулинарные шедевры!',
        imgSrc: 'imgSrc',
        newRecipes: 1,
        social: {
            bookmarks: 12,
            followers: 1,
        },
    },
    {
        name: 'Name',
        lastName: 'Мин',
        login: 'login',
        descr: 'Паназиатская кухня — это настоящий праздник для вашего здоровья и вкусовых рецепторов. Присоединяйтесь ко мне, и мы создадим новые кулинарные шедевры!',
        imgSrc: 'imgSrc',
        newRecipes: 1,
        social: {
            bookmarks: 12,
            followers: 1,
        },
    },
    {
        name: 'Name',
        lastName: 'Мин',
        login: 'login',
        descr: 'Паназиатская кухня — это настоящий праздник для вашего здоровья и вкусовых рецепторов. Присоединяйтесь ко мне, и мы создадим новые кулинарные шедевры!',
        imgSrc: 'imgSrc',
        newRecipes: 1,
        social: {
            bookmarks: 12,
            followers: 1,
        },
    },
    {
        name: 'Name',
        lastName: 'Мин',
        login: 'login',
        descr: 'Паназиатская кухня — это настоящий праздник для вашего здоровья и вкусовых рецепторов. Присоединяйтесь ко мне, и мы создадим новые кулинарные шедевры!',
        imgSrc: 'imgSrc',
        newRecipes: 1,
        social: {
            bookmarks: 12,
            followers: 1,
        },
    },
    {
        name: 'Name',
        lastName: 'Мин',
        login: 'login',
        descr: 'Паназиатская кухня — это настоящий праздник для вашего здоровья и вкусовых рецепторов. Присоединяйтесь ко мне, и мы создадим новые кулинарные шедевры!',
        imgSrc: 'imgSrc',
        newRecipes: 1,
        social: {
            bookmarks: 12,
            followers: 1,
        },
    },
    {
        name: 'Name',
        lastName: 'Мин',
        login: 'login',
        descr: 'Паназиатская кухня — это настоящий праздник для вашего здоровья и вкусовых рецепторов. Присоединяйтесь ко мне, и мы создадим новые кулинарные шедевры!',
        imgSrc: 'imgSrc',
        newRecipes: 1,
        social: {
            bookmarks: 12,
            followers: 1,
        },
    },
];

export const BlogsPage = () => (
    <Stack spacing={4} mb={8}>
        <Heading fontSize={{ base: '2xl', xl: '5xl' }} lineHeight='none' textAlign='center'>
            Кулинарные блоги
        </Heading>
        <Box mb={{ base: 1, md: 1 }} bg='lime.400' borderRadius={6} padding={6}>
            <Heading fontSize={{ base: '2xl', xl: '4xl' }} lineHeight={10} fontWeight={400}>
                Избранные блоги
            </Heading>
            <SimpleGrid
                pt={6}
                columns={{ base: 1, md: 2, xmd: 1, '2xl': 2 }}
                gap={{ base: 3, md: 4 }}
                gridTemplateColumns={{
                    base: '1fr',
                    md: 'repeat(2, 1fr)',
                    lg: '1fr',
                    '2xl': 'repeat(2, 1fr)',
                }}
            >
                {MOCK_FAV_BLOGS.map((el) => (
                    <BlogCard
                        firstName={el.name}
                        lastName={el.lastName}
                        login={el.login}
                        text={el.descr}
                        cardType='FAVORITE'
                        social={el.social}
                        newRecipes={el.newRecipes}
                    />
                ))}
            </SimpleGrid>
        </Box>
        <Box
            mb={{ base: 1, md: 1 }}
            bg='blackAlpha.50'
            borderRadius={6}
            padding={6}
            alignItems='center'
        >
            <Stack align='center'>
                <SimpleGrid
                    columns={{ base: 1, md: 2, xmd: 1, '2xl': 2 }}
                    columnGap={{ base: 1, md: 4 }}
                    rowGap={{ base: 2, md: 6 }}
                    gridTemplateColumns={{
                        base: '1fr',
                        md: 'repeat(3, 1fr)',
                        lg: '1fr',
                        '2xl': 'repeat(2, 1fr)',
                        '3xl': 'repeat(3, 1fr)',
                    }}
                >
                    {MOCK_ALL_BLOGS.map((el) => (
                        <BlogCard
                            firstName={el.name}
                            lastName={el.lastName}
                            login={el.login}
                            text={el.descr}
                            cardType='AVAILABLE'
                            social={el.social}
                        />
                    ))}
                </SimpleGrid>
                <Button
                    width='fit-content'
                    mt={6}
                    size={{ base: 'md', '2xl': 'lg' }}
                    rightIcon={<ArrowForwardIcon />}
                    display={{ base: 'none', md: 'flex' }}
                    alignItems='center'
                    variant='ghost'
                    as={Link}
                    // to='/'
                >
                    Всe авторы
                </Button>
            </Stack>
        </Box>
        <Carousel />
    </Stack>
);
