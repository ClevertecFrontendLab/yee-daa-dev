import './side-nav.module.css';

import { Box, Text } from '@chakra-ui/react';
import { FC, MouseEventHandler, useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router';

import { useDetectParams } from '~/hooks/use-detect-params';
import { MenuItem } from '~/types/category';

type SubNavItemProps = MenuItem & {
    parentCategory: string;
};

export const SubNavItem: FC<SubNavItemProps> = ({ parentCategory, category, title }) => {
    const { pathname } = useLocation();
    const [isActive, setIsActive] = useState(false);
    const isRootPath = pathname === '/';

    const { selectedSubCategory } = useDetectParams();
    const subCategoryPath = `/${parentCategory}/${category}`;

    const handleClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
        //предотвращает перерендер и перенавигацию при клике по тому же самому элементу
        if (selectedSubCategory?.category === category) {
            e.preventDefault();
        }
    };

    useEffect(() => {
        if (isRootPath) {
            setIsActive(false);
            return;
        }
        setIsActive(selectedSubCategory?.category === subCategoryPath.split('/')[2]);
    }, [isRootPath, selectedSubCategory?.category, subCategoryPath]);

    return (
        <NavLink
            to={subCategoryPath}
            onClick={handleClick}
            key={category}
            data-test-id={category === 'snacks' ? 'snacks' : ''}
        >
            <Box
                borderColor='lime.400'
                borderLeftWidth='1px'
                pl={3}
                mt={1}
                mb={1}
                className={isActive ? 'active sideNavItem' : 'sideNavItem'}
            >
                <Text fontSize='md' lineHeight={6} fontWeight={isActive ? 700 : 500} noOfLines={1}>
                    {title}
                </Text>
            </Box>
        </NavLink>
    );
};
