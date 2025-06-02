import { ArrowForwardIcon, Button, SimpleGrid } from '@chakra-ui/icons';
import { Box, Center, Heading, HStack } from '@chakra-ui/react';
import { Link } from 'react-router';

import { BlogCard } from '~/components/blog-card';
import { Paths } from '~/constants/path.ts';
import { useAppSelector } from '~/hooks/typed-react-redux-hooks.ts';
import { selectBloggersPreview } from '~/redux/features/bloggers-slice.ts';

export const BlogSection = () => {
    const bloggersPreview = useAppSelector(selectBloggersPreview);

    return (
        Boolean(bloggersPreview.length) && (
            <Box
                mb={{ base: 8, md: 10 }}
                bg='lime.400'
                borderRadius={6}
                p={6}
                data-test-id='main-page-blogs-box'
            >
                <HStack justifyContent='space-between' mb={6}>
                    <Heading fontSize={{ base: '2xl', xl: '4xl' }} lineHeight={10} fontWeight={400}>
                        Кулинарные блоги
                    </Heading>
                    <Button
                        bg='lime.400'
                        size={{ base: 'md', '2xl': 'lg' }}
                        rightIcon={<ArrowForwardIcon />}
                        display={{ base: 'none', md: 'flex' }}
                        alignItems='center'
                        variant='ghost'
                        as={Link}
                        to={Paths.BLOGS}
                        data-test-id='main-page-blogs-button'
                    >
                        Всe авторы
                    </Button>
                </HStack>
                <SimpleGrid
                    columns={3}
                    gap={{ base: 3, md: 4 }}
                    minChildWidth='210px'
                    data-test-id='main-page-blogs-grid'
                >
                    {bloggersPreview.map((post) => (
                        <BlogCard {...post} key={post.login} cardType='DEFAULT' />
                    ))}
                </SimpleGrid>
                <Center display={{ base: 'flex', md: 'none' }} mt={3}>
                    <Button
                        bg='lime.400'
                        size={{ base: 'md', '2xl': 'lg' }}
                        rightIcon={<ArrowForwardIcon />}
                        display={{ base: 'flex', md: 'none' }}
                        alignItems='center'
                        variant='ghost'
                    >
                        Всe авторы
                    </Button>
                </Center>
            </Box>
        )
    );
};
