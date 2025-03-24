import { Stack } from '@chakra-ui/icons';
import { Accordion, Text } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';

import { useIsLg } from '~/hooks/media-query.ts';
import { useAppDispatch, useAppSelector } from '~/hooks/typed-react-redux-hooks.ts';
import { useIsErrorPage } from '~/hooks/use-is-error-page.ts';
import { selectActiveIndex } from '~/redux/features/accordion-slice.ts';
import { closeMenu, selectIsClicked } from '~/redux/features/burger-slice';
import { selectCategoriesMenu } from '~/redux/features/categories-slice.ts';

import { Breadcrumbs } from '../breadcrumbs/breadcrumbs.tsx';
import { NavItem } from './nav-item.tsx';
import styles from './side-nav.module.css';

export const SideNav = () => {
    const dispatch = useAppDispatch();
    const navMenu = useAppSelector(selectCategoriesMenu);
    const isClicked = useAppSelector(selectIsClicked);

    const isLg = useIsLg();
    const navRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as Node;

        if (navRef.current && !navRef.current.contains(target) && !isClicked) {
            dispatch(closeMenu());
        }
    };

    const activeIndex = useAppSelector(selectActiveIndex);

    const isErrorPage = useIsErrorPage();

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Stack
            data-test-id='nav'
            pt={6}
            justifyContent='space-between'
            h='100%'
            className={styles.container}
            ref={navRef}
        >
            {isLg && !isErrorPage && <Breadcrumbs />}
            {!isErrorPage && (
                <Accordion allowToggle={true} index={activeIndex}>
                    {navMenu.map((item, index) => (
                        <NavItem {...item} key={item.id} index={index} />
                    ))}
                </Accordion>
            )}
            <Stack p={6} display={{ base: 'none', xl: 'block' }} marginTop='auto'>
                <Text
                    color='blackAlpha.400'
                    fontSize='xs'
                    lineHeight={4}
                    fontWeight={500}
                    paddingBottom='24px'
                >
                    Версия программы 03.25
                </Text>
                <Text color='blackAlpha.700' fontSize='xs' lineHeight={4}>
                    Все права защищены, ученический файл, <br /> ©Клевер Технолоджи, 2025
                </Text>
            </Stack>
        </Stack>
    );
};
