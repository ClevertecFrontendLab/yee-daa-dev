import { AccordionIcon, AccordionItem, AccordionPanel, Image } from '@chakra-ui/icons';
import { AccordionButton, HStack, Text } from '@chakra-ui/react';
import { FC, useState } from 'react';
import { NavLink } from 'react-router';

import { categoriesMap } from '../../constants/categories.ts';
import { MenuItem } from '../../constants/nav-menu.ts';
import { SubNavItem } from './sub-nav-item.tsx';

export const NavItem: FC<MenuItem> = ({ subItems, path, title, dataTestId }) => {
    const [isActive, setIsActive] = useState(false);
    return (
        <AccordionItem border='none'>
            <NavLink
                to={path}
                className={({ isActive }) => {
                    setIsActive(isActive);

                    return undefined;
                }}
                data-test-id={dataTestId}
            >
                <AccordionButton
                    padding='8px 12px'
                    _expanded={{
                        background: 'lime.100',
                    }}
                >
                    <HStack as='span' flex='1' textAlign='left' spacing={3}>
                        <Image src={categoriesMap[title]} alt={title} w={6} h={6} />
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
                {subItems?.map((el) => <SubNavItem key={el.path} {...el} />)}
            </AccordionPanel>
        </AccordionItem>
    );
};
