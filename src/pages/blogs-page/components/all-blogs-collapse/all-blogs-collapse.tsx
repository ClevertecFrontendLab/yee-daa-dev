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
import { MobileLoader } from '~/components/mobile-loader';
import { Paths } from '~/constants/path';
import { useAppDispatch, useAppSelector } from '~/hooks/typed-react-redux-hooks';
import {
    selectBloggersOthers,
    selectBloggersUnfoldLoading,
    setBloggersLimit,
} from '~/redux/features/bloggers-slice';

export const AllBlogsCollapse = () => {
    const { isOpen, onToggle } = useDisclosure();
    const bloggersOthers = useAppSelector(selectBloggersOthers);
    const dispatch = useAppDispatch();
    const bloggersUnfolding = useAppSelector(selectBloggersUnfoldLoading);

    const value = useBreakpointValue({
        base: 1068,
        md: 850,
        xl: 1068,
        '2xl': 1064,
    });

    const onMoreBloggersClick = () => {
        if (bloggersOthers.length < 9) dispatch(setBloggersLimit('all'));
        onToggle();
    };

    return (
        Boolean(bloggersOthers.length) && (
            <Box
                mt={{ base: 1, xl: 3 }}
                mb={{ base: 1, md: 1 }}
                bg='blackAlpha.50'
                borderRadius={6}
                padding={{ base: 4, xl: 6 }}
                alignItems='center'
            >
                <Stack align='center'>
                    <Collapse in={isOpen} startingHeight={value} style={{ width: '100%' }}>
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
                            {bloggersOthers.map((el) => (
                                <BlogCard
                                    key={el._id}
                                    _id={el._id}
                                    firstName={el.firstName}
                                    lastName={el.lastName}
                                    login={el.login}
                                    isFavorite={el.isFavorite}
                                    // text={el.descr}
                                    cardType='AVAILABLE'
                                    subscribersCount={el.subscribersCount}
                                    bookmarksCount={el.bookmarksCount}
                                    link={`${Paths.BLOGS}/${el._id}`}
                                />
                            ))}
                        </SimpleGrid>
                    </Collapse>
                    <Button
                        width='fit-content'
                        mt={{ base: 2, xl: 4 }}
                        size={{ base: 'lg', lg: 'lg' }}
                        rightIcon={
                            <ArrowForwardIcon transform={`rotate(${isOpen ? 180 : 0}deg)`} />
                        }
                        alignItems='center'
                        variant='ghost'
                        onClick={onMoreBloggersClick}
                    >
                        {isOpen ? 'Свернуть' : 'Всe авторы'}
                    </Button>
                </Stack>
                <MobileLoader isOpen={bloggersUnfolding} />
            </Box>
        )
    );
};
