import { Flex, Spacer } from '@chakra-ui/react';

import { useIsLg, useIsTablet } from '~/hooks/media-query.ts';
import { useAppSelector } from '~/hooks/typed-react-redux-hooks.ts';
import { user, users } from '~/mocks/users.ts';
import { selectMenu } from '~/redux/features/burger-slice.ts';

import { Breadcrumbs } from '../breadcrumbs';
import { BurgerMenu } from '../burger-menu';
import { Logo } from '../logo';
import { StatsBlock } from '../stats-block';
import { UserInfo } from '../user-info';

export const Header = () => {
    const isTablet = useIsTablet();
    const isLg = useIsLg();

    const isOpen = useAppSelector(selectMenu);

    return (
        <Flex pl={4} pr={4} pt={6} pb={6} h='100%' alignItems='center'>
            <Logo />
            {!isLg && <Breadcrumbs />}
            <Spacer />
            {isTablet && !isOpen && <StatsBlock {...users[2]} />}
            <UserInfo withGutter {...user} />
            <BurgerMenu />
        </Flex>
    );
};
