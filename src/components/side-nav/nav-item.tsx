import { AccordionIcon, AccordionItem, AccordionPanel, Image } from '@chakra-ui/icons';
import { AccordionButton, HStack, Text } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import { NavLink } from 'react-router';

import { categoriesMap } from '../../constants/categories.ts';
import { useAppDispatch } from '../../hooks/typed-react-redux-hooks.ts';
import { setChoosenCategory } from '../../redux/features/choosen-category-slice.ts';
import { MenuItem } from '../../types/category.ts';
import { SubNavItem } from './sub-nav-item.tsx';

export const NavItem: FC<MenuItem> = ({ category, subItems, title, description }) => {
    const dispatch = useAppDispatch();
    const [isActive, setIsActive] = useState(false);

    const categoryPath = subItems ? `/${category}/${subItems[0].category}` : `/${category}`;
    const choosenItem = {
        category,
        title,
        description,
        choosenSubCategory: subItems ? subItems[0] : null,
    };

    const handleClick = () => {
        dispatch(setChoosenCategory(choosenItem));
    };

    useEffect(() => {
        setIsActive(window.location.pathname === categoryPath);
    }, [categoryPath]);

    return (
        <AccordionItem border='none'>
            <NavLink to={categoryPath} key={category} onClick={handleClick}>
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
