import { Stack } from '@chakra-ui/icons';
import { Accordion, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';

import { Paths } from '../../constants/path.ts';
import { useAppSelector } from '../../hooks/typed-react-redux-hooks.ts';
import { selectCategoriesMenu } from '../../redux/features/categories-slice.ts';
import { selectChoosenCategory } from '../../redux/features/choosen-category-slice.ts';
import { PageType } from '../../types/page.ts';
import { NavItem } from './nav-item.tsx';
import styles from './side-nav.module.css';

export const SideNav = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const navMenu = useAppSelector(selectCategoriesMenu);
    const choosenCategory = useAppSelector(selectChoosenCategory);

    useEffect(() => {
        if (
            !choosenCategory.title &&
            !location.pathname.includes(PageType.Juiciest) &&
            location.pathname !== Paths.R_SWITCHER
        ) {
            navigate(Paths.R_SWITCHER);
        }
    }, [choosenCategory, navigate, location]);

    return (
        <Stack
            pt={6}
            justifyContent={'space-between'}
            h={'100%'}
            className={styles.container}
            pr={0}
        >
            <Accordion allowToggle>
                {navMenu.map((item, i) => (
                    <NavItem {...item} key={i} />
                ))}
            </Accordion>
            <Stack p={6}>
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
