import { BreadcrumbLink, ChevronRightIcon } from '@chakra-ui/icons';
import { Box, Breadcrumb, BreadcrumbItem } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router';

import { Paths } from '../../constants/path.ts';
import { useAppDispatch, useAppSelector } from '../../hooks/typed-react-redux-hooks.ts';
import { closeMenu } from '../../redux/features/burger-slice.ts';
import { selectCategoriesMenu } from '../../redux/features/categories-slice.ts';
import {
    clearChoosenCategory,
    setChoosenCategory,
} from '../../redux/features/choosen-category-slice.ts';
import { selectRecipes } from '../../redux/features/recipies-slice.ts';

export const Breadcrumbs = () => {
    const { pathname } = useLocation();
    const dispatch = useAppDispatch();
    const navMenu = useAppSelector(selectCategoriesMenu);
    const recipes = useAppSelector(selectRecipes);

    const pathsArr = pathname.split('/').filter(Boolean);
    const categoryItem = navMenu.find((item) => item.category === pathsArr[0]);
    const subcategory = categoryItem?.subItems?.find((subItem) => subItem.category === pathsArr[1]);
    const recipePath = recipes.find((recipe) => recipe.id === pathsArr[2])?.title || '';

    const isRathsJuiciest = pathname.includes(Paths.JUICIEST);

    const pathsRussianArr = [categoryItem?.title, subcategory?.title, recipePath];

    const handleCategoryClick = () => {
        const choosenCategory = {
            category: categoryItem?.category ?? '',
            title: categoryItem?.title ?? '',
            description: categoryItem?.description ?? '',
            choosenSubCategory: subcategory ?? null,
        };

        dispatch(closeMenu());
        dispatch(setChoosenCategory(choosenCategory));
    };

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
            >
                <BreadcrumbItem>
                    <BreadcrumbLink
                        as={Link}
                        to={Paths.R_SWITCHER}
                        onClick={() => dispatch(clearChoosenCategory())}
                    >
                        Главная
                    </BreadcrumbLink>
                </BreadcrumbItem>
                {isRathsJuiciest ? (
                    <BreadcrumbItem>
                        <BreadcrumbLink as={Link} to={Paths.JUICIEST}>
                            Самое сочное
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                ) : (
                    pathsRussianArr.map(
                        (title, index) =>
                            title && (
                                <BreadcrumbItem
                                    key={index}
                                    isCurrentPage={index === pathsRussianArr.length - 1}
                                >
                                    <BreadcrumbLink
                                        as={Link}
                                        to={
                                            index === 0
                                                ? '#'
                                                : `/${pathsArr.slice(0, index + 1).join('/')}`
                                        }
                                        onClick={index === 0 ? handleCategoryClick : undefined}
                                    >
                                        {title}
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                            ),
                    )
                )}
            </Breadcrumb>
        </Box>
    );
};
