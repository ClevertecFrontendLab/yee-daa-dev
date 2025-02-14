import { BreadcrumbLink, ChevronRightIcon } from '@chakra-ui/icons';
import { Box, Breadcrumb, BreadcrumbItem } from '@chakra-ui/react';
import { Link, useLocation, useNavigate } from 'react-router';

import { Paths } from '../../constants/path.ts';
import { useAppSelector } from '../../hooks/typed-react-redux-hooks.ts';
import { selectCategoriesMenu } from '../../redux/features/categories-slice.ts';
import { generatePathsMap } from './helpers/get-paths.ts';

export const Breadcrumbs = () => {
    const navMenu = useAppSelector(selectCategoriesMenu);
    const pathsMap = generatePathsMap(navMenu);
    const { pathname } = useLocation();
    const pathsArr = pathname.split('/').filter(Boolean);
    const navigate = useNavigate();

    const handleCategoryClick = (el: string, e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const firstSubItem = navMenu.find((item) => item.category === el)?.subItems?.[0];
        if (firstSubItem) {
            navigate(`/${el}/${firstSubItem.category}`);
        }
    };

    return (
        <>
            <Box width={32} display={{ base: 'none', md: 'block' }} />
            <Breadcrumb
                spacing='8px'
                separator={<ChevronRightIcon color='gray.800' />}
                display={{ base: 'none', md: 'block' }}
            >
                <BreadcrumbItem>
                    <BreadcrumbLink as={Link} to={Paths.R_SWITCHER}>
                        Главная
                    </BreadcrumbLink>
                </BreadcrumbItem>
                {pathsArr.map((el, i) => {
                    const isLast = i === pathsArr.length - 1;

                    return (
                        <BreadcrumbItem
                            key={i}
                            isCurrentPage={isLast}
                            color={isLast ? 'black' : 'blackAlpha.700'}
                        >
                            <BreadcrumbLink
                                as={Link}
                                to={isLast ? '#' : `/${el}`}
                                onClick={
                                    !isLast &&
                                    navMenu.find((item) => item.category === el)?.subItems?.length
                                        ? (e) => handleCategoryClick(el, e)
                                        : undefined
                                }
                            >
                                {pathsMap[el] || el}
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    );
                })}
            </Breadcrumb>
        </>
    );
};
