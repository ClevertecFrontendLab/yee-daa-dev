import { CloseIcon } from '@chakra-ui/icons';
import {
    Button,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    Stack,
} from '@chakra-ui/react';

import { FILTER_TITLES } from '../../constants/filters';
import { useAppDispatch, useAppSelector } from '../../hooks/typed-react-redux-hooks';
import {
    clearSelectedAuthors,
    selectAuthors,
    selectSelectedAuthors,
} from '../../redux/features/authors-slice';
import {
    clearSelectedCategories,
    selectCategoriesMenu,
    selectSelectedCategories,
} from '../../redux/features/categories-slice';
import {
    clearSelectedCuisines,
    selectCuisines,
    selectSelectedCuisines,
} from '../../redux/features/cuisines-slice';
import { closeDrawer, selectDrawer } from '../../redux/features/drawer';
import { clearSelectedMeats, selectMeats } from '../../redux/features/meats-slice';
import { selectRecipes, setFilteredRecipes } from '../../redux/features/recipies-slice';
import {
    clearSelectedSides,
    selectSelectedSides,
    selectSides,
} from '../../redux/features/sides-slice';
import { AllergenSelect } from '../search-block/allergen-select';
import { DrawerCheckboxGroup } from './dawer-checkbox-group';
import styles from './drawer.module.css';
import { DrawerMenu } from './drawer-menu';
import { filterRecipes } from './helpers/filter-recipes';

export const FilterDrawer = () => {
    const dispatch = useAppDispatch();
    const isOpenDrawer = useAppSelector(selectDrawer);
    const allCategories = useAppSelector(selectCategoriesMenu);
    const cuisines = useAppSelector(selectCuisines);
    const authors = useAppSelector(selectAuthors);
    const meats = useAppSelector(selectMeats);
    const sides = useAppSelector(selectSides);
    const allRecipes = useAppSelector(selectRecipes);

    const selectedCategories = useAppSelector(selectSelectedCategories);
    const selectedCuisines = useAppSelector(selectSelectedCuisines);
    const selectedAuthors = useAppSelector(selectSelectedAuthors);
    const selectedMeats = useAppSelector(selectSelectedCuisines);
    const selectedSides = useAppSelector(selectSelectedSides);

    const clearFilters = () => {
        dispatch(clearSelectedAuthors());
        dispatch(clearSelectedCategories());
        dispatch(clearSelectedCuisines());
        dispatch(clearSelectedMeats());
        dispatch(clearSelectedSides());
    };

    const onClose = () => {
        clearFilters();
        dispatch(closeDrawer());
    };

    const findRecipes = () => {
        const filteredRecipes = filterRecipes(allRecipes, {
            selectedCategories,
            selectedCuisines,
            selectedAuthors,
            selectedMeats,
            selectedSides,
        });
        dispatch(closeDrawer());
        dispatch(setFilteredRecipes(filteredRecipes));
    };

    return (
        <Drawer
            isOpen={isOpenDrawer}
            placement='right'
            onClose={onClose}
            size={{ base: '100%', sm: 'sm', lg: 'md' }}
        >
            <DrawerOverlay onClick={onClose} />
            <DrawerContent className={styles.drawer}>
                <DrawerHeader className={styles.drawerHeader}>
                    <span className={styles.drawerHeading}>Фильтр</span>
                    <CloseIcon
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
                        <DrawerMenu items={cuisines} filterTitle={FILTER_TITLES.CUISINE} />
                        <DrawerMenu items={authors} filterTitle={FILTER_TITLES.AUTHOR_SEARCH} />
                    </Stack>
                    <Stack spacing={6}>
                        <DrawerCheckboxGroup filterTitle={FILTER_TITLES.MEAT} items={meats} />
                        <DrawerCheckboxGroup filterTitle={FILTER_TITLES.SIDE} items={sides} />
                        <AllergenSelect />
                    </Stack>
                </DrawerBody>
                <DrawerFooter p={0}>
                    <Button
                        variant='outline'
                        mr={3}
                        onClick={clearFilters}
                        className={styles.drawerButton}
                    >
                        Очистить фильтр
                    </Button>
                    <Button
                        bg='black'
                        color='white'
                        className={styles.drawerButton}
                        onClick={findRecipes}
                    >
                        Найти рецепт
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};
