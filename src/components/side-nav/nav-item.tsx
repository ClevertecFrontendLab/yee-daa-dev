import { AccordionIcon, AccordionItem, AccordionPanel, Image } from '@chakra-ui/icons';
import { AccordionButton, HStack, Text } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router';

import { categoriesMap } from '../../constants/categories.ts';
import { useAppDispatch, useAppSelector } from '../../hooks/typed-react-redux-hooks.ts';
import {
    clearSelectedAllergens,
    setFilteredByAllergens,
} from '../../redux/features/allergens-slice.ts';
import {
    selectChoosenCategory,
    setChoosenCategory,
} from '../../redux/features/choosen-category-slice.ts';
import { clearFilteredRecipes } from '../../redux/features/recipies-slice.ts';
import { MenuItem } from '../../types/category.ts';
import { SubNavItem } from './sub-nav-item.tsx';

export const NavItem: FC<MenuItem> = ({ category, subItems, title, description }) => {
    const location = useLocation();
    const dispatch = useAppDispatch();
    const [isActive, setIsActive] = useState(false);
    const choosenCategory = useAppSelector(selectChoosenCategory);

    const categoryPath = subItems ? `/${category}/${subItems[0].category}` : `/${category}`;
    const choosenItem = {
        category,
        title,
        description,
        choosenSubCategory: subItems ? subItems[0] : null,
    };

    const handleClick = () => {
        dispatch(setChoosenCategory(choosenItem));
        dispatch(clearFilteredRecipes());
        dispatch(clearSelectedAllergens());
        dispatch(setFilteredByAllergens([]));

        setIsActive((prev) => !prev);
    };

    useEffect(() => {
        setIsActive(location.pathname.split('/')[1] === categoryPath.split('/')[1]);
    }, [location.pathname, categoryPath]);

    useEffect(() => {
        if (!choosenCategory.category) {
            setIsActive(false);
        }
    }, [choosenCategory]);

    return (
        <AccordionItem
            border='none'
            className='accordion'
            sx={{
                '.chakra-collapse': {
                    display: isActive ? 'block !important' : 'none !important',
                    height: isActive ? 'auto !important' : '0px !important',
                    opacity: isActive ? '1 !important' : '0 !important',
                    transition: 'opacity 0.1s ease',
                },
            }}
        >
            <NavLink
                to={categoryPath}
                key={category}
                onClick={handleClick}
                data-test-id={`${category === 'vegan' ? 'vegan-cuisine' : category}`}
            >
                <AccordionButton
                    padding='8px 12px'
                    _expanded={{
                        background: 'lime.100',
                    }}
                >
                    <HStack as='span' flex='1' textAlign='left' spacing={3}>
                        <Image src={categoriesMap[category]} alt={category} w={6} h={6} />
                        <Text
                            fontSize='md'
                            lineHeight={6}
                            fontWeight={isActive ? 700 : 500}
                            noOfLines={1}
                        >
                            {title}
                        </Text>
                    </HStack>
                    <AccordionIcon />
                </AccordionButton>
            </NavLink>
            <AccordionPanel padding='4px 8px 4px 40px'>
                {subItems?.map((el) => (
                    <SubNavItem
                        key={el.category}
                        {...el}
                        parentCategory={category}
                        parentTitle={title}
                        parentDesc={description}
                    />
                ))}
            </AccordionPanel>
        </AccordionItem>
    );
};
