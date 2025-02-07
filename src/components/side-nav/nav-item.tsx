import { AccordionIcon, AccordionItem, AccordionPanel, Image } from '@chakra-ui/icons';
import { AccordionButton, HStack, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { NavLink } from 'react-router';

import { categoriesMap } from '../../constants/categories.ts';
import { MenuItem } from '../../constants/nav-menu.ts';
import { SubNavItem } from './sub-nav-item.tsx';

export const NavItem: FC<MenuItem> = ({ subItems, path, title }) => {
    return (
        <AccordionItem>
            <NavLink to={path}>
                <AccordionButton
                    _expanded={{
                        background: 'lime.50',
                    }}
                >
                    <HStack as='span' flex='1' textAlign='left'>
                        <Image src={categoriesMap[title]} alt={title} />
                        <Text>{title}</Text>
                    </HStack>
                    <AccordionIcon />
                </AccordionButton>
            </NavLink>
            <AccordionPanel>
                {subItems?.map((el) => <SubNavItem key={el.path} {...el} />)}
            </AccordionPanel>
        </AccordionItem>
    );
};
