import './side-nav.module.css';

import { Box, Text } from '@chakra-ui/react';
import { FC, useState } from 'react';
import { NavLink } from 'react-router';

import { MenuItem } from '../../constants/nav-menu.ts';

export const SubNavItem: FC<MenuItem> = ({ path, title }) => {
    const [isActive, setIsActive] = useState(false);

    const cn = ['sideNavItem', isActive ? 'active' : ''].join(' ').trim();

    return (
        <NavLink
            to={path}
            key={path}
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
