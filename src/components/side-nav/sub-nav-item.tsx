import './side-nav.module.css';

import { Box, Text } from '@chakra-ui/react';
import { FC, useState } from 'react';
import { NavLink } from 'react-router';

import { useAppDispatch } from '../../hooks/typed-react-redux-hooks';
import { setChoosenCategory } from '../../redux/features/choosen-category-slice';
import { MenuItem } from '../../types/category';

type SubNavItemProps = MenuItem & {
    parentCategory: string;
    parentTitle: string;
    parentDesc?: string;
};

export const SubNavItem: FC<SubNavItemProps> = ({
    parentCategory,
    parentTitle,
    parentDesc,
    category,
    title,
    description,
}) => {
    const dispatch = useAppDispatch();
    const [isActive, setIsActive] = useState(false);

    const subCategoryPath = `/${parentCategory}/${category}`;
    const cn = ['sideNavItem', isActive ? 'active' : ''].join(' ').trim();

    const choosenSubItem = {
        title: parentTitle,
        category: parentCategory,
        description: parentDesc,
        choosenSubCategory: { title, category, description },
    };

    const handleClick = () => {
        dispatch(setChoosenCategory(choosenSubItem));
    };

    return (
        <NavLink
            to={subCategoryPath}
            key={category}
            onClick={handleClick}
            className={({ isActive }) => {
                setIsActive(isActive);

                return undefined;
            }}
        >
            <Box borderColor='lime.400' borderLeftWidth={'1px'} pl={3} mt={1} mb={1} className={cn}>
                <Text fontSize='md' lineHeight={6} fontWeight={isActive ? 700 : 500} noOfLines={1}>
                    {title}
                </Text>
            </Box>
        </NavLink>
    );
};
