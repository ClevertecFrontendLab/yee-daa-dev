import { Button, DrawerFooter } from '@chakra-ui/react';

import { useAppDispatch, useAppSelector } from '~/hooks/typed-react-redux-hooks';
import { clearSelectedAllergens, selectSelectedAllergens } from '~/redux/features/allergens-slice';
import { clearSelectedAuthors, selectSelectedAuthors } from '~/redux/features/authors-slice';
import {
    clearSelectedCategories,
    selectSelectedCategories,
} from '~/redux/features/categories-slice';
import { closeDrawer, setIsFiltering } from '~/redux/features/filter-drawer-slice';
import { clearSelectedMeats, selectSelectedMeats } from '~/redux/features/meats-slice';
import { clearSelectedSides, selectSelectedSides } from '~/redux/features/sides-slice';

import styles from './drawer.module.css';
import { isButtonDisabled } from './helpers/is-button-disabled';

export const FilterDrawerFooter = () => {
    const dispatch = useAppDispatch();

    const selectedCategories = useAppSelector(selectSelectedCategories);
    const selectedAuthors = useAppSelector(selectSelectedAuthors);
    const selectedMeats = useAppSelector(selectSelectedMeats);
    const selectedSides = useAppSelector(selectSelectedSides);
    const selectedAllergens = useAppSelector(selectSelectedAllergens);

    const disabled = isButtonDisabled(
        selectedCategories,
        selectedAuthors,
        selectedMeats,
        selectedSides,
        selectedAllergens,
    );

    const clearFilters = () => {
        dispatch(clearSelectedAuthors());
        dispatch(clearSelectedCategories());
        dispatch(clearSelectedMeats());
        dispatch(clearSelectedSides());
        dispatch(clearSelectedAllergens());
    };

    const findRecipes = async () => {
        dispatch(setIsFiltering(true));
        dispatch(closeDrawer());
    };

    return (
        <DrawerFooter p={0}>
            <Button
                variant='outline'
                mr={3}
                onClick={clearFilters}
                className={styles.drawerButton}
                data-test-id='clear-filter-button'
            >
                Очистить фильтр
            </Button>
            <Button
                data-test-id='find-recipe-button'
                bg='black'
                color='white'
                onClick={findRecipes}
                size='lg'
                sx={{
                    pointerEvents: disabled ? 'none' : 'auto',
                    bg: disabled ? 'gray.500' : 'black',
                    cursor: disabled ? 'not-allowed' : 'pointer',
                    opacity: disabled ? 0.4 : 1,
                }}
            >
                Найти рецепт
            </Button>
        </DrawerFooter>
    );
};
