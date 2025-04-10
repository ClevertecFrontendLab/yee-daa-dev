import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Button, Heading, HStack, SimpleGrid, Stack } from '@chakra-ui/react';
import { useState } from 'react';
import { Link } from 'react-router';

import { BlogCard } from '~/components/blog-card/blog-card';
import { NotesBox } from '~/components/notes-box';
import { RecipeCardList } from '~/components/recipes-card-list';
import { UserInfoBig } from '~/components/user-info-big';
import { Paths } from '~/constants/path';
import { MOCK_ALL_BLOGS } from '~/pages/blogs-page/consts';
import { Recipe } from '~/redux/api/types/recipes';
import { isArrayWithItems } from '~/utils/is-array-with-items';

const userInfo = {
    firstName: 'Елена',
    lastName: 'Мин',
    login: '@cookermin',
    imgSrc: 'imgSrc',
    social: {
        bookmarks: 87,
        followers: 12,
    },
};

const RESIPE_RESPONSE: Recipe[] = new Array(8).fill({
    id: '67c9e4a035a1a9a36a3dd48a',
    image: '/media/images/919c4f8a-664b-49a0-a513-ecf0d80a1a36.webp',
    createdAt: '2025-03-06T18:08:32.823Z',
    title: 'Крем-суп из шпината с креветками',
    description:
        'Крем-суп из шпината с креветками — это изысканное и нежное блюдо, которое сочетает в себе пользу свежего шпината и изысканный вкус креветок. Нежный кремовый текстура супа подчеркивается легкой сливочной основой, а аромат чеснока и специй добавляет пикантности. Креветки придают блюду морскую нотку и делают его более сытным.',
    time: 30,
    categoriesIds: ['67c4a05bed67ca980917d676'],
    likes: 10,
    views: 0,
    nutritionValue: { calories: 1, protein: 1, fats: 1, carbohydrates: 1 },
    ingredients: [{ title: 'Свежие листья шпината', count: '500', measureUnit: 'г' }],
    steps: [
        {
            stepNumber: 1,
            description:
                'В большой кастрюле (3–5 литров) растапливаем масло. Жарим лук и чеснок до размягчения.',
        },
    ],
    authorId: '1',
});

const NOTE_LIST = new Array(8).fill({
    time: '2025-01-15T18:08:32.823Z',
    text: 'Паназиатская кухня — это настоящий праздник для вашего здоровья и вкусовых рецепторов. Присоединяйтесь ко мне, и мы создадим новые кулинарные шедевры',
});

export const BlogProfile = () => {
    const [recipePages, setRecipePages] = useState(1);
    const onLoadMoreRecipes = () => {
        setRecipePages(2);
    };
    return (
        <Stack spacing={6} align='center'>
            <UserInfoBig
                imgSrc={userInfo.imgSrc}
                firstName={userInfo.firstName}
                lastName={userInfo.lastName}
                login={userInfo.login}
                social={userInfo.social}
                mt={-4}
                minWidth={480}
            />
            {isArrayWithItems(RESIPE_RESPONSE) && (
                <RecipeCardList
                    recipeList={RESIPE_RESPONSE}
                    currentPage={recipePages}
                    totalPages={2}
                    loadMoreCallback={onLoadMoreRecipes}
                    pt={1}
                />
            )}
            <NotesBox items={NOTE_LIST} mt={4} />
            <HStack justify='space-between' w='100%' mt={7}>
                <Heading fontWeight={500} fontSize={48}>
                    Другие блоги
                </Heading>
                <Button
                    width='fit-content'
                    mt={{ base: 2, xl: 4 }}
                    size={{ base: 'lg', lg: 'lg' }}
                    rightIcon={<ArrowForwardIcon />}
                    display={{ base: 'none', md: 'flex' }}
                    alignItems='center'
                    variant='ghost'
                    as={Link}
                    to={Paths.BLOGS}
                >
                    Всe авторы
                </Button>
            </HStack>
            <SimpleGrid
                columns={{ base: 1, md: 2, xmd: 1, '2xl': 3 }}
                columnGap={{ base: 4, xl: 4 }}
                rowGap={{ base: 4, xl: 6 }}
                gridTemplateColumns={{
                    base: '1fr',
                    md: 'repeat(2, 1fr)',
                    xl: '1fr',
                    xxxl: 'repeat(3, 1fr)',
                }}
            >
                {MOCK_ALL_BLOGS.slice(0, 3).map((el) => (
                    <BlogCard
                        firstName={el.name}
                        lastName={el.lastName}
                        login={el.login}
                        text={el.descr}
                        cardType='PROFILE'
                        social={el.social}
                        link={`${Paths.BLOGS}/${el.login}`}
                    />
                ))}
            </SimpleGrid>
        </Stack>
    );
};
