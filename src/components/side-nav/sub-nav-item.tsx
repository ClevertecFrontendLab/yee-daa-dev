import './side-nav.module.css';

import { Box, Text } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router';

import { useAppDispatch } from '~/hooks/typed-react-redux-hooks';
import { clearSelectedAllergens, setFilteredByAllergens } from '~/redux/features/allergens-slice';
import { setChoosenCategory } from '~/redux/features/choosen-category-slice';
import { clearFilteredRecipes } from '~/redux/features/recipies-slice';
import { MenuItem } from '~/types/category';

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

    const location = useLocation();
    const subCategoryPath = `/${parentCategory}/${category}`;

    const choosenSubItem = {
        title: parentTitle,
        category: parentCategory,
        description: parentDesc,
        choosenSubCategory: { title, category, description },
    };

    const handleClick = () => {
        dispatch(setChoosenCategory(choosenSubItem));
        dispatch(clearFilteredRecipes());
        dispatch(clearSelectedAllergens());
        dispatch(setFilteredByAllergens([]));
    };

    useEffect(() => {
        setIsActive(location.pathname.split('/')[2] === subCategoryPath.split('/')[2]);
    }, [location.pathname, subCategoryPath]);

    return (
        <NavLink to={subCategoryPath} key={category} onClick={handleClick}>
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
