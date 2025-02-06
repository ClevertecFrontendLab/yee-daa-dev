import { Flex, Spacer } from '@chakra-ui/react';

import { useIsTablet } from '../../hooks/media-query.ts';
import { user } from '../../mocks/users.ts';
import { Breadcrumbs } from '../breadcrumbs';
import { BurgerMenu } from '../burger-menu';
import { Logo } from '../logo';
import { StatsBlock } from '../stats-block';
import { UserInfo } from '../user-info';

export const Header = () => {
    const isTablet = useIsTablet();
    return (
        <Flex pl={4} pr={4} pt={6} pb={6} mr={{ base: 0, md: 14 }} h='100%' alignItems='center'>
            <Logo />
            <Breadcrumbs />
            <Spacer />
            {!isTablet && <UserInfo withGutter {...user} />}
            {isTablet && <StatsBlock />}
            {isTablet && <BurgerMenu />}
        </Flex>
    );
};
