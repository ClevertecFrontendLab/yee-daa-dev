import { Box } from '@chakra-ui/react';
import { FC, useState } from 'react';
import { NavLink } from 'react-router';

import { MenuItem } from '../../constants/nav-menu.ts';

export const SubNavItem: FC<MenuItem> = ({ path, title }) => {
    const [isSecondLvlActive, setIsSecondLvlActive] = useState(false);

    return (
        <NavLink
            to={path}
            key={path}
            className={({ isActive }) => {
                setIsSecondLvlActive(isActive);

                return undefined;
            }}
        >
            <Box borderColor='lime.400' borderLeftWidth={isSecondLvlActive ? 4 : 2}>
                {title}
            </Box>
        </NavLink>
    );
};
