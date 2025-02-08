import { ArrowForwardIcon, Button, SimpleGrid } from '@chakra-ui/icons';
import { Box, Center, Heading, HStack } from '@chakra-ui/react';

import { posts } from '../../mocks/posts.ts';
import { BlogCard } from '../blog-card/blog-card.tsx';

export const BlogSection = () => {
    return (
        <Box mb={{ base: 8, md: 10 }} bg='lime.400' borderRadius={6} p={6}>
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
                >
                    Всe авторы
                </Button>
            </HStack>
            <SimpleGrid columns={3} gap={{ base: 3, md: 4 }} minChildWidth='210px'>
                {posts.map((post) => (
                    <BlogCard {...post} key={post.login} />
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
    );
};
