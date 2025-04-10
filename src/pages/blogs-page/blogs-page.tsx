import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Box, Button, Heading, SimpleGrid, Stack } from '@chakra-ui/react';
import { Link } from 'react-router';

import { BlogCard } from '~/components/blog-card/blog-card';
import { Carousel } from '~/components/carousel';
import { Paths } from '~/constants/path';
import { MOCK_ALL_BLOGS, MOCK_FAV_BLOGS } from '~/pages/blogs-page/consts';

export const BlogsPage = () => (
    <Stack spacing={6} mb={8} mt={{ base: 1, sm: 0, md: -7, xmd: 0 }}>
        <Heading fontSize={{ base: '2xl', xl: '5xl' }} lineHeight='none' textAlign='center'>
            Кулинарные блоги
        </Heading>
        <Box
            mb={{ base: 1, md: 1 }}
            mt={{ base: 1, sm: 0 }}
            bg='lime.400'
            borderRadius={{ base: 16, xl: 24 }}
            padding={{ base: '8px 12px 12px', sm: 2, xl: 6 }}
        >
            <Heading fontSize={{ base: '2xl', xl: '4xl' }} lineHeight={10} fontWeight={400}>
                Избранные блоги
            </Heading>
            <SimpleGrid
                pt={{ base: 2, sm: 4 }}
                columns={{ base: 1, md: 2, xmd: 1, '2xl': 2 }}
                gap={{ base: 3, md: 4 }}
                gridTemplateColumns={{
                    base: '1fr',
                    md: 'repeat(2, 1fr)',
                    xl: '1fr',
                    xxxl: 'repeat(2, 1fr)',
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
                        link={`${Paths.BLOGS}/${el.login}`}
                    />
                ))}
            </SimpleGrid>
        </Box>
        <Box
            mt={{ base: 1, xl: 3 }}
            mb={{ base: 1, md: 1 }}
            bg='blackAlpha.50'
            borderRadius={6}
            padding={{ base: 4, xl: 6 }}
            alignItems='center'
        >
            <Stack align='center'>
                <SimpleGrid
                    columns={{ base: 1, md: 2, xmd: 1, '2xl': 2 }}
                    columnGap={{ base: 4, xl: 4 }}
                    rowGap={{ base: 4, xl: 6 }}
                    gridTemplateColumns={{
                        base: '1fr',
                        md: 'repeat(2, 1fr)',
                        xl: '1fr',
                        xxxl: 'repeat(2, 1fr)',
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
                            link={`${Paths.BLOGS}/${el.login}`}
                        />
                    ))}
                </SimpleGrid>
                <Button
                    width='fit-content'
                    mt={{ base: 2, xl: 4 }}
                    size={{ base: 'lg', lg: 'lg' }}
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
        <Carousel mt={2} />
    </Stack>
);
