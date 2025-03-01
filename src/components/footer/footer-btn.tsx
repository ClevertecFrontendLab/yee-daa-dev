import { Stack } from '@chakra-ui/icons';
import { Text } from '@chakra-ui/react';
import React, { FC } from 'react';
import { Link, useLocation } from 'react-router';

import { Paths } from '~/constants/path.js';

import styles from './footer.module.css';

type Props = {
    text: string;
    icon: React.ReactNode;
    isProfile?: boolean;
};

export const FooterBtn: FC<Props> = ({ icon, isProfile = false, text }) => {
    const { pathname } = useLocation();
    // заглушка логики на определение активной ссылки
    const isActive = pathname === Paths.R_SWITCHER && text === 'Главная';

    return (
        <Stack
            direction='column'
            spacing={1}
            as={Link}
            to={Paths.R_SWITCHER}
            className={styles.footerLink}
        >
            {isProfile ? (
                <div className={isActive ? styles.profileActive : styles.profile}>{icon}</div>
            ) : (
                <div className={isActive ? styles.iconWrapperActive : styles.iconWrapper}>
                    {icon}
                </div>
            )}
            <Text fontSize='xs' lineHeight={4} color={isActive ? 'black' : 'blackAlpha.700'}>
                {text}
            </Text>
        </Stack>
    );
};
