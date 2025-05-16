import { Box, Heading, SimpleGrid, Stack } from '@chakra-ui/react';

import { BlogCard } from '~/components/blog-card';
import { Carousel } from '~/components/carousel';
import { Paths } from '~/constants/path';
import { useAppSelector } from '~/hooks/typed-react-redux-hooks';
import { AllBlogsCollapse } from '~/pages/blogs-page/components/all-blogs-collapse';
import { selectBloggersFavorite } from '~/redux/features/bloggers-slice';

export const BlogsPage = () => {
    const bloggersFavorites = useAppSelector(selectBloggersFavorite);

    return (
        <Stack spacing={6} mb={8} mt={{ base: 1, sm: 0, md: -7, xmd: 0 }}>
            <Heading fontSize={{ base: '2xl', xl: '5xl' }} lineHeight='none' textAlign='center'>
                Кулинарные блоги
            </Heading>
            {Boolean(bloggersFavorites.length) && (
                <Box
                    mb={{ base: 1, md: 1 }}
                    mt={{ base: 1, sm: 0 }}
                    bg='lime.400'
                    borderRadius={{ base: 16, xl: 24 }}
                    padding={{ base: '8px 12px 12px', sm: 2, xl: 6 }}
                    data-test-id='blogs-favorites-box'
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
                        data-test-id='blogs-favorites-grid'
                    >
                        {bloggersFavorites.map((el) => (
                            <BlogCard
                                key={el._id}
                                _id={el._id}
                                firstName={el.firstName}
                                lastName={el.lastName}
                                login={el.login}
                                text={el.text}
                                cardType='FAVORITE'
                                subscribersCount={el.subscribersCount}
                                bookmarksCount={el.bookmarksCount}
                                isFavorite={el.isFavorite}
                                newRecipesCount={el.newRecipesCount}
                                link={`${Paths.BLOGS}/${el._id}`}
                            />
                        ))}
                    </SimpleGrid>
                </Box>
            )}
            <AllBlogsCollapse />
            <Carousel mt={2} />
        </Stack>
    );
};
