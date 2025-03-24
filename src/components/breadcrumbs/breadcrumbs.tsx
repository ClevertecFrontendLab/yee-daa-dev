import { BreadcrumbLink, ChevronRightIcon } from '@chakra-ui/icons';
import { Box, Breadcrumb, BreadcrumbItem } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router';

import { Paths } from '~/constants/path';
import { useAppDispatch } from '~/hooks/typed-react-redux-hooks.ts';
import { useDetectParams } from '~/hooks/use-detect-params';
import { useGetRecipeByIdQuery } from '~/redux/api/recipes-api';
import { resetAccordion } from '~/redux/features/accordion-slice';
import { closeMenu } from '~/redux/features/burger-slice.ts';
import { isArrayWithItems } from '~/utils/is-array-with-items';

export const Breadcrumbs = () => {
    const { pathname } = useLocation();
    const { selectedCategory, selectedSubCategory, recipeId } = useDetectParams();
    const dispatch = useAppDispatch();
    const { data: recipe } = useGetRecipeByIdQuery(recipeId as string, { skip: !recipeId });

    const isJuiciestPath = pathname.includes(Paths.JUICIEST);

    const pathsArrNames = [
        selectedCategory?.title,
        selectedSubCategory?.title,
        recipeId ? recipe?.title : undefined,
    ].filter(Boolean);
    const pathsArr = [
        selectedCategory?.category,
        selectedSubCategory?.category,
        recipeId ? recipe?.id : undefined,
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
                {!isJuiciestPath &&
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
