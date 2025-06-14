import { Flex, Spacer } from '@chakra-ui/react';
import { Link, NavLink } from 'react-router';

import { Paths } from '~/constants/path';
import { useIsLg, useIsTablet } from '~/hooks/media-query.ts';
import { useAppSelector } from '~/hooks/typed-react-redux-hooks.ts';
import { useIsErrorPage } from '~/hooks/use-is-error-page';
import { selectMenu } from '~/redux/features/burger-slice.ts';
import {
    selectIsRecommending,
    selectUser,
    selectUserInfoCounts,
} from '~/redux/features/user-slice';

import { Breadcrumbs } from '../breadcrumbs';
import { BurgerMenu } from '../burger-menu';
import { Logo } from '../logo';
import { StatsBlock } from '../stats-block';
import { UserInfo } from '../user-info';

export const Header = () => {
    const isTablet = useIsTablet();
    const isLg = useIsLg();

    const isErrorPage = useIsErrorPage();

    const isOpen = useAppSelector(selectMenu);
    const { login, firstName, lastName, photoLink } = useAppSelector(selectUser);
    const { likes, bookmarks, subscribers, recommendations } = useAppSelector(selectUserInfoCounts);
    const isRecommendingProfile = useAppSelector(selectIsRecommending);
    return (
        <Flex pl={4} pr={4} pt={6} pb={6} h='100%' alignItems='center'>
            <NavLink to={Paths.R_SWITCHER}>
                <Logo />
            </NavLink>

            {!isErrorPage && (
                <>
                    {!isLg && <Breadcrumbs />}
                    <Spacer />
                    {isTablet && !isOpen && (
                        <StatsBlock
                            {...{
                                followers: subscribers,
                                likes,
                                bookmarks,
                                isRecommendingProfile,
                                recommendations,
                            }}
                        />
                    )}
                    {!isTablet && (
                        <Link to={Paths.PROFILE}>
                            <UserInfo
                                withGutter
                                {...{ login, firstName, lastName, imageUrl: photoLink }}
                            />
                        </Link>
                    )}
                    <BurgerMenu />
                </>
            )}
        </Flex>
    );
};
