import { BreadcrumbLink, ChevronRightIcon } from '@chakra-ui/icons';
import { Box, Breadcrumb, BreadcrumbItem } from '@chakra-ui/react';
import { Link, matchPath, useLocation } from 'react-router';

import { Paths } from '~/constants/path';
import { useAppDispatch, useAppSelector } from '~/hooks/typed-react-redux-hooks.ts';
import { useDetectParams } from '~/hooks/use-detect-params';
import { useGetRecipeByIdQuery } from '~/redux/api/recipes-api';
import { resetAccordion } from '~/redux/features/accordion-slice';
import { selectBloggersInfoById } from '~/redux/features/bloggers-slice';
import { closeMenu } from '~/redux/features/burger-slice.ts';
import { selectUserDraft } from '~/redux/features/user-slice';
import { isArrayWithItems } from '~/utils/is-array-with-items';

export const Breadcrumbs = () => {
    const { pathname } = useLocation();
    const { selectedCategory, selectedSubCategory, recipeId } = useDetectParams();
    const dispatch = useAppDispatch();
    const { bloggerInfo } = useAppSelector(selectBloggersInfoById);
    const isEditDraftPage = Boolean(matchPath(Paths.EDIT_DRAFT, pathname));

    const { data: recipeData } = useGetRecipeByIdQuery(recipeId as string, {
        skip: !recipeId || isEditDraftPage,
    });

    const isJuiciestPath = pathname.includes(Paths.JUICIEST);
    const isBlogs = pathname.includes(Paths.BLOGS);
    const isBlogCurrent = bloggerInfo.login;
    const isRecipes = !isJuiciestPath && !isBlogs;
    const isNewRecipePage = pathname.includes(Paths.NEW_RECIPE);
    const isSettings = pathname.includes(Paths.SETTINGS);
    const isProfile = pathname.includes(Paths.PROFILE);

    const recipeFromState = useAppSelector((state) => selectUserDraft(state, recipeId));
    const recipe = isEditDraftPage ? recipeFromState : recipeData;

    const pathsArrNames = [
        selectedCategory?.title,
        selectedSubCategory?.title,
        recipeId ? recipe?.title : undefined,
        isNewRecipePage ? 'Новый рецепт' : undefined,
        isProfile ? 'Мой профиль' : undefined,
        isSettings ? 'Настройки' : undefined,
    ].filter(Boolean);
    const pathsArr = [
        selectedCategory?.category,
        selectedSubCategory?.category,
        recipeId ? recipe?.id : undefined,
        isNewRecipePage ? 'new-recipe' : undefined,
        isProfile ? 'profile' : undefined,
        isSettings ? 'settings' : undefined,
    ].filter(Boolean);

    const handleCategoryClick = () => dispatch(closeMenu());

    const handleHomePageClick = () => dispatch(resetAccordion());

    return (
        <Box ml={{ base: 0, lg: 32 }} pb={{ base: 8, lg: 0 }}>
            <Breadcrumb
                spacing='8px'
                separator={<ChevronRightIcon color='gray.800' />}
                sx={{
                    ol: {
                        display: 'flex',
                        flexWrap: 'wrap',
                    },
                }}
                data-test-id='breadcrumbs'
            >
                <BreadcrumbItem>
                    <BreadcrumbLink as={Link} to={Paths.R_SWITCHER} onClick={handleHomePageClick}>
                        Главная
                    </BreadcrumbLink>
                </BreadcrumbItem>
                {isJuiciestPath && (
                    <BreadcrumbItem>
                        <BreadcrumbLink as={Link} to={Paths.JUICIEST}>
                            Самое сочное
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                )}
                {isBlogs && (
                    <BreadcrumbItem>
                        <BreadcrumbLink
                            as={Link}
                            to={Paths.BLOGS}
                            data-test-id='blogger-user-breadcrumb-section'
                        >
                            Блоги
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                )}
                {isBlogs && isBlogCurrent && (
                    <BreadcrumbItem>
                        <BreadcrumbLink
                            as={Link}
                            to={`${Paths.BLOGS}/${bloggerInfo._id}`}
                            data-test-id='blogger-user-breadcrumb-name'
                        >
                            {`${bloggerInfo.firstName} ${bloggerInfo.lastName} (@${bloggerInfo.login})`}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                )}
                {isRecipes &&
                    isArrayWithItems(pathsArrNames) &&
                    pathsArrNames.map((title, index) =>
                        title ? (
                            <BreadcrumbItem
                                key={title}
                                isCurrentPage={index === pathsArrNames?.length - 1}
                            >
                                <BreadcrumbLink
                                    as={Link}
                                    to={`/${pathsArr.slice(0, index + 1).join('/')}`}
                                    onClick={handleCategoryClick}
                                >
                                    {title}
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        ) : null,
                    )}
            </Breadcrumb>
        </Box>
    );
};
