import { Stack } from '@chakra-ui/icons';
import { Accordion, Text } from '@chakra-ui/react';

import { useIsTablet } from '../../hooks/media-query.ts';
import { useAppSelector } from '../../hooks/typed-react-redux-hooks.ts';
import { selectCategoriesMenu } from '../../redux/features/categories-slice.ts';
import { Breadcrumbs } from '../breadcrumbs/breadcrumbs.tsx';
import { NavItem } from './nav-item.tsx';
import styles from './side-nav.module.css';

export const SideNav = () => {
    const navMenu = useAppSelector(selectCategoriesMenu);
    const isTablet = useIsTablet();

    return (
        <Stack pt={6} justifyContent='space-between' h='100%' className={styles.container}>
            {isTablet && <Breadcrumbs />}
            <Accordion allowToggle>
                {navMenu.map((item, i) => (
                    <NavItem {...item} key={i} />
                ))}
            </Accordion>
            <Stack p={6} display={{ base: 'none', xl: 'block' }}>
                <Text color='blackAlpha.400' fontSize='xs' lineHeight={4} fontWeight={500}>
                    Версия программы 03.25
                </Text>
                <Text color='blackAlpha.700' fontSize='xs' lineHeight={4}>
                    Все права защищены, ученический файл, <br /> ©Клевер Технолоджи, 2025
                </Text>
            </Stack>
        </Stack>
    );
};
