import { Button, CardFooter, Image, Stack } from '@chakra-ui/icons';
import { Badge, Box, Card, CardBody, CardHeader, Heading, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router';

import { EDIT_DRAFT_PATH, EDIT_RECIPE_PATH, Paths } from '~/constants/path.ts';
import { useAppSelector } from '~/hooks/typed-react-redux-hooks.ts';
import { useGetRecipePath } from '~/hooks/use-get-recipe-path.ts';
import { userProfileHeaderDataType } from '~/pages/user-profile-page/utils/user-profile-headers.tsx';
import { useBookmarkRecipeMutation } from '~/redux/api/recipes-api';
import { Recipe } from '~/redux/api/types/recipes.ts';
import { selectInputValue } from '~/redux/features/search-slice.ts';
import { selectUser, selectUserInfoRecommended } from '~/redux/features/user-slice.ts';
import { getAbsoluteImagePath } from '~/utils/get-absolute-image-path.ts';

import { CardStat } from '../card-stat/card-stat.tsx';
import { CategoryTag } from '../category-tag';
import { HighlightText } from '../highlight/highlight-text.tsx';
import { BookmarkIcon } from '../icons/bookmark-icon.tsx';
import { RecommendationTag } from '../recommendation-tag';

export const FoodCard: FC<{ recipe: Recipe; index: number }> = ({ recipe, index }) => {
    const inputValue = useAppSelector(selectInputValue);

    const { bookmarks: bookmarksUser, drafts } = useAppSelector(selectUser);
    const { title, image, description, categoriesIds, likes, bookmarks, id, recommendedByUserId } =
        recipe;

    const { pathname } = useLocation();
    const [bookmarkRecipe] = useBookmarkRecipeMutation();

    const userRecommendedRecipe = useAppSelector((state) =>
        recommendedByUserId?.[0]
            ? selectUserInfoRecommended(state, recommendedByUserId[0])
            : undefined,
    );

    const isProfile = pathname === Paths.PROFILE;

    const cardType = () => {
        const bookmarksKey = bookmarksUser.find((el) => el.id === id);
        if (bookmarksKey) {
            return userProfileHeaderDataType.bookmarks;
        }
        const resultKey = drafts.find((draft) => draft.id === id);
        if (resultKey) {
            return userProfileHeaderDataType.drafts;
        }
        return userProfileHeaderDataType.recipes;
    };

    const cardKey = cardType();
    const recipePath = useGetRecipePath(recipe);

    const navigate = useNavigate();

    const onBookmarkRecipe = async () => {
        await bookmarkRecipe(id);
    };
    const handleEditDraft = () => {
        if (cardKey === userProfileHeaderDataType.drafts) {
            navigate(`/${EDIT_DRAFT_PATH}/${id}`);
        } else {
            navigate(`/${EDIT_RECIPE_PATH}${recipePath}`);
        }
    };

    const renderButtonsForProfile = () =>
        cardKey === userProfileHeaderDataType.bookmarks ? (
            <Button
                variant='outline'
                size={{ base: 'xs', xmd: 'sm' }}
                leftIcon={<BookmarkIcon />}
                color='blackAlpha.800'
                onClick={onBookmarkRecipe}
            >
                <Box as='span' display={{ base: 'none', xmd: 'inline' }}>
                    Убрать из сохранённых
                </Box>
            </Button>
        ) : (
            <Button
                variant='outline'
                size={{ base: 'xs', xmd: 'sm' }}
                color={cardKey === userProfileHeaderDataType.recipes ? 'blackAlpha.800' : 'white'}
                bg={
                    cardKey === userProfileHeaderDataType.drafts
                        ? 'blackAlpha.900'
                        : 'whiteAlpha-100'
                }
                onClick={handleEditDraft}
            >
                <Box as='span' display={{ base: 'none', xmd: 'inline' }}>
                    Редактировать
                </Box>
            </Button>
        );

    return (
        <Card
            direction='row'
            variant='outline'
            gap={{ base: 2, xmd: 6 }}
            data-test-id={`food-card-${index}`}
        >
            <Box position='relative' w={{ base: '158px', xmd: '50%' }} maxW='346px' flex='1'>
                <Box
                    position='absolute'
                    top={2}
                    left={2}
                    right={2}
                    display={{ base: 'block', xmd: 'none' }}
                    maxWidth='150px'
                    zIndex={2}
                >
                    <CategoryTag categoriesIds={categoriesIds} color='lime.50' />
                </Box>
                <Box
                    position='absolute'
                    zIndex={2}
                    bottom={2}
                    left={2}
                    right={2}
                    display={{ base: 'none', xxl: 'block' }}
                >
                    {Boolean(recommendedByUserId?.length) && userRecommendedRecipe ? (
                        <RecommendationTag
                            {...userRecommendedRecipe}
                            othersLength={recommendedByUserId?.length}
                        />
                    ) : null}
                </Box>
                <Image
                    top={0}
                    left={0}
                    src={getAbsoluteImagePath(image)}
                    alt={title}
                    width='100%'
                    height='100%'
                    objectFit='cover'
                    position='absolute'
                    borderRadius='var(--chakra-radii-lg)'
                />
            </Box>

            <Stack
                pt={{ base: 2, xl: 6 }}
                pb={{ base: 1, xl: 6 }}
                pr={{ base: 2, xl: 6 }}
                gap={{ base: 0, xmd: 6 }}
                flex='1'
            >
                <CardHeader
                    p={0}
                    display='flex'
                    justifyContent={
                        cardKey === userProfileHeaderDataType.drafts ? 'flex-end' : 'space-between'
                    }
                    flexDirection='row'
                    alignItems='flex-start'
                >
                    {cardKey === userProfileHeaderDataType.drafts ? (
                        <Badge
                            fontWeight='400'
                            color='black'
                            bg='blackAlpha.100'
                            fontSize='14px'
                            variant='solid'
                            p='2px 8px'
                            borderRadius='4px'
                            lineHeight='20px'
                            textTransform='capitalize'
                        >
                            Черновик
                        </Badge>
                    ) : (
                        <>
                            <Box display={{ base: 'none', xmd: 'block' }}>
                                <CategoryTag categoriesIds={categoriesIds} color='lime.50' />
                            </Box>
                            <CardStat bookmarks={bookmarks} likes={likes} />
                        </>
                    )}
                </CardHeader>
                <CardBody p={0}>
                    <Heading
                        fontSize={{ base: 'md', xmd: 'xl' }}
                        noOfLines={{ base: 2, xmd: 1 }}
                        mb={{ base: 6, sm: 7, xmd: 2 }}
                        fontWeight={500}
                    >
                        <HighlightText query={inputValue ?? ''} text={title} />
                    </Heading>
                    <Text
                        noOfLines={3}
                        fontSize='sm'
                        lineHeight={5}
                        display={{ base: 'none', xmd: '-webkit-box' }}
                    >
                        {description}
                    </Text>
                </CardBody>
                <CardFooter
                    p={0}
                    justifyContent='flex-end'
                    display='flex'
                    gap={{ base: 3, md: 2 }}
                    flexWrap='wrap'
                >
                    {isProfile ? (
                        renderButtonsForProfile()
                    ) : (
                        <>
                            <Button
                                variant='outline'
                                size={{ base: 'xs', xmd: 'sm' }}
                                leftIcon={<BookmarkIcon />}
                                color='blackAlpha.800'
                                onClick={onBookmarkRecipe}
                            >
                                <Box as='span' display={{ base: 'none', xmd: 'inline' }}>
                                    Сохранить
                                </Box>
                            </Button>
                            <NavLink
                                to={recipePath}
                                data-test-id={`card-link-${index}`}
                                state={{ fromPage: pathname }}
                            >
                                <Button bg='black' color='white' size={{ base: 'xs', xmd: 'sm' }}>
                                    Готовить
                                </Button>
                            </NavLink>
                        </>
                    )}
                </CardFooter>
            </Stack>
        </Card>
    );
};
