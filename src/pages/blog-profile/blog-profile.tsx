import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Button, Heading, HStack, SimpleGrid, Stack } from '@chakra-ui/react';
import { useState } from 'react';
import { Link } from 'react-router';

import { AppLoader } from '~/components/app-loader';
import { BlogCard } from '~/components/blog-card';
import { NotesBox } from '~/components/notes-box';
import { RecipeCardList } from '~/components/recipes-card-list';
import { UserInfoBig } from '~/components/user-info-big';
import { Paths } from '~/constants/path';
import { useAppSelector } from '~/hooks/typed-react-redux-hooks';
import { selectBloggersById, selectBloggersPreview } from '~/redux/features/bloggers-slice';
import { isArrayWithItems } from '~/utils/is-array-with-items';

export const BlogProfile = () => {
    const { info, data } = useAppSelector(selectBloggersById);
    const bloggersPreview = useAppSelector(selectBloggersPreview);

    const [recipePages, setRecipePages] = useState(1);

    const onLoadMoreRecipes = () => {
        setRecipePages(2);
    };

    const isBlogExists = data.userId && info.bloggerInfo._id;

    return isBlogExists ? (
        <Stack spacing={{ base: 3, xmd: 6 }} align='center'>
            <UserInfoBig
                firstName={info.bloggerInfo.firstName}
                lastName={info.bloggerInfo.lastName}
                login={info.bloggerInfo.login}
                subscribersCount={info.totalSubscribers}
                bookmarksCount={info.totalBookmarks}
                isFavorite={info.isFavorite}
                mt={{ base: 0, md: -8, xmd: -4 }}
                minWidth={{ base: 0, sm: 356, xmd: 422, '2xl': 480 }}
                _id={info.bloggerInfo._id}
                dataTestId='blogger-user-info'
            />
            {isArrayWithItems(data.recipes) && (
                <RecipeCardList
                    recipeList={recipePages === 1 ? data.recipes.slice(0, 8) : data.recipes}
                    currentPage={recipePages}
                    totalPages={2}
                    loadMoreCallback={onLoadMoreRecipes}
                    pt={{ base: 3, sm: 1 }}
                />
            )}
            <NotesBox items={data.notes} mt={4} id='notes' />
            <HStack justify='space-between' w='100%' mt={{ base: 6, xmd: 7 }}>
                <Heading fontWeight={500} fontSize={{ base: 24, xl: 48 }}>
                    Другие блоги
                </Heading>
                <Button
                    width='fit-content'
                    mt={{ base: 2, xl: 4 }}
                    size={{ base: 'xs', lg: 'lg' }}
                    rightIcon={<ArrowForwardIcon />}
                    display='flex'
                    alignItems='center'
                    variant='ghost'
                    as={Link}
                    to={Paths.BLOGS}
                    data-test-id='blogger-user-other-blogs-button'
                >
                    Всe авторы
                </Button>
            </HStack>
            <SimpleGrid
                columns={{ base: 1, md: 2, xmd: 1, '2xl': 3 }}
                columnGap={{ base: 4, xl: 4 }}
                rowGap={{ base: 3, sm: 4, xl: 6 }}
                width='100%'
                gridTemplateColumns={{
                    base: '1fr',
                    md: 'repeat(3, 1fr)',
                    xl: '1fr',
                    xxxl: 'repeat(3, 1fr)',
                }}
                data-test-id='blogger-user-other-blogs-grid'
            >
                {bloggersPreview.slice(0, 3).map((el) => (
                    <BlogCard
                        key={el._id}
                        _id={el._id}
                        firstName={el.firstName}
                        lastName={el.lastName}
                        login={el.login}
                        text={el.text}
                        isFavorite={el.isFavorite}
                        cardType='PROFILE'
                        newRecipesCount={el.newRecipesCount}
                        subscribersCount={el.subscribersCount}
                        bookmarksCount={el.bookmarksCount}
                        link={`${Paths.BLOGS}/${el._id}`}
                        imageUrl={el.photoLink}
                    />
                ))}
            </SimpleGrid>
        </Stack>
    ) : (
        <AppLoader isOpen={!isBlogExists} />
    );
};
