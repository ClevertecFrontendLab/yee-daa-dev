import {
    Box,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Heading,
    HStack,
    IconButton,
    Image,
    Stack,
    Tag,
    TagLabel,
    Text,
} from '@chakra-ui/react';
import { FC } from 'react';
import { useNavigate } from 'react-router';

import { EDIT_RECIPE_PATH, Paths } from '~/constants/path';
import { useAppSelector } from '~/hooks/typed-react-redux-hooks';
import { useDetectParams } from '~/hooks/use-detect-params';
import {
    useBookmarkRecipeMutation,
    useDeleteRecipeMutation,
    useLikeRecipeMutation,
} from '~/redux/api/recipes-api';
import { Recipe } from '~/redux/api/types/recipes';
import { selectUserId } from '~/redux/features/auth-slice';
import { getAbsoluteImagePath } from '~/utils/get-absolute-image-path';

import { CardStat } from '../card-stat/card-stat';
import { CategoryTag } from '../category-tag';
import { AlarmIcon } from '../icons/alarm-icon';
import { BasketIcon } from '../icons/basket-icon';
import { BookmarkIcon } from '../icons/bookmark-icon';
import { LikeIcon } from '../icons/like-icon';
import { PenIcon } from '../icons/pen-icon';

type RecipeCardProps = {
    recipe?: Recipe;
};

export const RecipeCard: FC<RecipeCardProps> = ({ recipe }) => {
    const userId = useAppSelector(selectUserId);

    const { recipeId, selectedCategory, selectedSubCategory } = useDetectParams();

    const [deleteRecipe] = useDeleteRecipeMutation();
    const [likeRecipe] = useLikeRecipeMutation();
    const [bookmarkRecipe] = useBookmarkRecipeMutation();

    const navigate = useNavigate();

    const isCanEditRecipe = recipe?.authorId === userId;

    const onEditRecipe = () =>
        navigate(
            `/${EDIT_RECIPE_PATH}/${selectedCategory?.category}/${selectedSubCategory?.category}/${recipeId}`,
        );

    const onDeleteRecipe = async () => {
        try {
            await deleteRecipe(recipeId as string).unwrap();
            navigate(Paths.R_SWITCHER);
        } catch (err) {
            console.log(err);
        }
    };

    const onLikeRecipe = () => {
        likeRecipe(recipeId as string);
    };

    const onBookmarkRecipe = () => {
        bookmarkRecipe(recipeId as string);
    };

    return (
        <Card
            variant='unstyled'
            direction='row'
            minH={{ base: '224px', xl: '410px' }}
            borderRadius='--chakra-radii-lg'
            flexWrap={{ base: 'wrap', sm: 'nowrap' }}
            gap={{ base: 4, md: 6 }}
            mb={{ base: 4, xl: 10 }}
        >
            <Image
                src={getAbsoluteImagePath(recipe?.image)}
                alt={recipe?.title}
                objectFit='cover'
                w={{ base: '100%', sm: '232px', xl: '353px', '2xl': '553px' }}
                borderRadius='var(--chakra-radii-lg)'
            />
            <Stack>
                <CardHeader display='flex' justifyContent='space-between' p={0} pr={1} pb={8}>
                    <HStack flexWrap='wrap'>
                        <CategoryTag categoriesIds={recipe?.categoriesIds} color='lime.50' />
                    </HStack>
                    <CardStat bookmarks={recipe?.bookmarks} likes={recipe?.likes} />
                </CardHeader>
                <CardBody p={0} pb={6}>
                    <Heading
                        fontSize={{ base: '2xl', xxl: '5xl' }}
                        mb={2}
                        fontWeight={700}
                        maxW={{ base: '100%', lg: '80%' }}
                    >
                        {recipe?.title}
                    </Heading>
                    <Text fontSize='sm' lineHeight={5}>
                        {recipe?.description}
                    </Text>
                </CardBody>
                <CardFooter p={0} justifyContent='space-between' flexWrap='wrap' gap={3}>
                    <Box mt='auto'>
                        <Tag size='md' p='4px 8px'>
                            <AlarmIcon />
                            <TagLabel ml={2}>{recipe?.time}&nbsp;минут</TagLabel>
                        </Tag>
                    </Box>
                    {isCanEditRecipe ? (
                        <HStack gap={3} flexWrap='wrap'>
                            <IconButton
                                variant='unstyled'
                                fontSize='14px'
                                aria-label='Remove'
                                icon={<BasketIcon />}
                                h={2}
                                onClick={onDeleteRecipe}
                                data-test-id='delete-recipe-button'
                                sx={{
                                    display: 'grid',
                                    placeItems: 'center',
                                }}
                            />
                            <Button
                                leftIcon={<PenIcon w={4} h={4} />}
                                colorScheme='black'
                                variant='outline'
                                onClick={onEditRecipe}
                            >
                                Редактировать рецепт
                            </Button>
                        </HStack>
                    ) : (
                        <HStack gap={3} flexWrap='wrap'>
                            <Button
                                variant='outline'
                                size={{ base: 'sm', '2xl': 'lg' }}
                                p={0}
                                leftIcon={<LikeIcon />}
                                color='blackAlpha.800'
                                fontSize={{ base: 'xs', lg: 'sm' }}
                                onClick={onLikeRecipe}
                            >
                                Оценить рецепт
                            </Button>
                            <Button
                                bg='var(--chakra-colors-lime-400)'
                                size={{ base: 'sm', '2xl': 'lg' }}
                                p={0}
                                leftIcon={<BookmarkIcon />}
                                color='blackAlpha.800'
                                fontSize={{ base: 'xs', lg: 'sm' }}
                                onClick={onBookmarkRecipe}
                            >
                                Сохранить
                            </Button>
                        </HStack>
                    )}
                </CardFooter>
            </Stack>
        </Card>
    );
};
