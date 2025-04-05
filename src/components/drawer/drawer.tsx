import { CloseIcon } from '@chakra-ui/icons';
import {
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    Stack,
} from '@chakra-ui/react';

import { FILTER_TITLES } from '~/constants/filters';
import { useAppDispatch, useAppSelector } from '~/hooks/typed-react-redux-hooks';
import { authors as mockAuthors } from '~/mocks/filters';
import { selectCategoriesMenu } from '~/redux/features/categories-slice';
import { closeDrawer, selectDrawer } from '~/redux/features/filter-drawer-slice';
import { selectMeats } from '~/redux/features/meats-slice';
import { selectSides } from '~/redux/features/sides-slice';

import { CriteriaTagsList } from '../criteria-tags-list';
import { AllergenSelect } from '../search-block/allergen-select';
import styles from './drawer.module.css';
import { DrawerCheckboxGroup } from './drawer-checkbox-group';
import { FilterDrawerFooter } from './drawer-footer';
import { DrawerMenu } from './drawer-menu';

export const FilterDrawer = () => {
    const dispatch = useAppDispatch();
    const isOpenDrawer = useAppSelector(selectDrawer);
    const allCategories = useAppSelector(selectCategoriesMenu);

    //TODO заменить на данные из запроса для авторов когда будет коллекция с авторами
    const authors = mockAuthors;
    const meats = useAppSelector(selectMeats);
    const sides = useAppSelector(selectSides);

    const onClose = () => dispatch(closeDrawer());

    return (
        <Drawer
            isOpen={isOpenDrawer}
            placement='right'
            onClose={onClose}
            size={{ base: '100%', sm: 'sm', lg: 'md' }}
        >
            <DrawerOverlay onClick={onClose} />
            <DrawerContent className={styles.drawer} data-test-id='filter-drawer'>
                <DrawerHeader className={styles.drawerHeader}>
                    <span className={styles.drawerHeading}>Фильтр</span>
                    <CloseIcon
                        data-test-id='close-filter-drawer'
                        bg='black'
                        borderRadius='50%'
                        color='white'
                        p={1}
                        w={6}
                        h={6}
                        onClick={onClose}
                        cursor='pointer'
                    />
                </DrawerHeader>
                <DrawerBody className={styles.drawerBody}>
                    <Stack spacing={6}>
                        <DrawerMenu items={allCategories} filterTitle={FILTER_TITLES.CATEGORY} />
                        <DrawerMenu items={authors} filterTitle={FILTER_TITLES.AUTHOR_SEARCH} />
                    </Stack>
                    <Stack spacing={6}>
                        <DrawerCheckboxGroup filterTitle={FILTER_TITLES.MEAT} items={meats} />
                        <DrawerCheckboxGroup filterTitle={FILTER_TITLES.SIDE} items={sides} />
                        <AllergenSelect fromFilter={true} />
                    </Stack>
                    <CriteriaTagsList forDrawer={true} />
                </DrawerBody>
                <FilterDrawerFooter />
            </DrawerContent>
        </Drawer>
    );
};
