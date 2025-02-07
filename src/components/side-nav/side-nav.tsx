import { Accordion, Box } from '@chakra-ui/react';

import { navMenu } from '../../constants/nav-menu.ts';
import { NavItem } from './nav-item.tsx';

export const SideNav = () => {
    return (
        <Box pt={6}>
            <Accordion allowToggle>
                {navMenu.map((item, i) => (
                    <NavItem {...item} key={i} />
                ))}
            </Accordion>
        </Box>
    );
};
