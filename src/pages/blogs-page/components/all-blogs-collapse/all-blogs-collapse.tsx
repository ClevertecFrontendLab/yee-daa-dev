import { ArrowForwardIcon } from '@chakra-ui/icons';
import {
    Box,
    Button,
    Collapse,
    SimpleGrid,
    Stack,
    useBreakpointValue,
    useDisclosure,
} from '@chakra-ui/react';

import { BlogCard } from '~/components/blog-card/blog-card';
import { Paths } from '~/constants/path';
import { MOCK_ALL_BLOGS } from '~/pages/blogs-page/consts';

export const AllBlogsCollapse = () => {
    const { isOpen, onToggle } = useDisclosure();
    const value = useBreakpointValue({
        base: 1068,
        md: 850,
        xl: 1068,
        '2xl': 1064,
    });

    return (
        <Box
            mt={{ base: 1, xl: 3 }}
            mb={{ base: 1, md: 1 }}
            bg='blackAlpha.50'
            borderRadius={6}
            padding={{ base: 4, xl: 6 }}
            alignItems='center'
        >
            <Stack align='center'>
                <Collapse in={isOpen} startingHeight={value}>
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
                </Collapse>
                <Button
                    width='fit-content'
                    mt={{ base: 2, xl: 4 }}
                    size={{ base: 'lg', lg: 'lg' }}
                    rightIcon={<ArrowForwardIcon transform={`rotate(${isOpen ? 180 : 0}deg)`} />}
                    alignItems='center'
                    variant='ghost'
                    onClick={onToggle}
                >
                    {isOpen ? 'Свернуть' : 'Всe авторы'}
                </Button>
            </Stack>
        </Box>
    );
};
