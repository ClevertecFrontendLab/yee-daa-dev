import './side-nav.module.css';

import { Box, Text } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import { NavLink } from 'react-router';

import { useAppDispatch } from '~/hooks/typed-react-redux-hooks';
import { useDetectParams } from '~/hooks/use-detect-params';
import { clearSelectedAllergens, setFilteredByAllergens } from '~/redux/features/allergens-slice';
import { clearFilteredRecipes } from '~/redux/features/recipies-slice';
import { MenuItem } from '~/types/category';

type SubNavItemProps = MenuItem & {
    parentCategory: string;
};

export const SubNavItem: FC<SubNavItemProps> = ({ parentCategory, category, title }) => {
    const dispatch = useAppDispatch();
    const [isActive, setIsActive] = useState(false);

    const { selectedSubCategory } = useDetectParams();
    const subCategoryPath = `/${parentCategory}/${category}`;

    const handleClick = () => {
        dispatch(clearFilteredRecipes());
        dispatch(clearSelectedAllergens());
        dispatch(setFilteredByAllergens([]));
    };

    useEffect(() => {
        setIsActive(selectedSubCategory?.category === subCategoryPath.split('/')[2]);
    }, [selectedSubCategory?.category, subCategoryPath]);

    return (
        <NavLink
            to={subCategoryPath}
            key={category}
            onClick={handleClick}
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
