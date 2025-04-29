import { Button, DrawerFooter } from '@chakra-ui/react';

import { useAppDispatch, useAppSelector } from '~/hooks/typed-react-redux-hooks';
import { useClearFiltersWithSearch } from '~/hooks/use-clear-filters-with-search';
import { useDetectParams } from '~/hooks/use-detect-params';
import { useLazyGetAllRecipesMergeQuery } from '~/redux/api/services/recipes-api';
import { selectSelectedAllergens } from '~/redux/features/allergens-slice';
import { selectSelectedAuthors } from '~/redux/features/authors-slice';
import {
    selectSelectedCategories,
    selectSelectedSubCategoriesIds,
} from '~/redux/features/categories-slice';
import { closeDrawer, setIsFiltering } from '~/redux/features/filter-drawer-slice';
import { selectSelectedMeats } from '~/redux/features/meats-slice';
import { selectInputValue, setSelectedPage } from '~/redux/features/search-slice';
import { selectSelectedSides } from '~/redux/features/sides-slice';

import styles from './drawer.module.css';
import { getRequestParams } from './helpers/get-request-params';
import { isButtonDisabled } from './helpers/is-button-disabled';

export const FilterDrawerFooter = () => {
    const dispatch = useAppDispatch();
    const { clearDrawerFilters } = useClearFiltersWithSearch();
    const [fetchRecipes, { isFetching }] = useLazyGetAllRecipesMergeQuery();
    const { selectedSubCategory } = useDetectParams();

    const selectedCategories = useAppSelector(selectSelectedCategories);
    const selectedAuthors = useAppSelector(selectSelectedAuthors);
    const selectedMeats = useAppSelector(selectSelectedMeats);
    const selectedSides = useAppSelector(selectSelectedSides);
    const selectedAllergens = useAppSelector(selectSelectedAllergens);
    const selectedSubCategories = useAppSelector(selectSelectedSubCategoriesIds);
    const searchInput = useAppSelector(selectInputValue);

    const disabled = isButtonDisabled(
        selectedCategories,
        selectedAuthors,
        selectedMeats,
        selectedSides,
        selectedAllergens,
    );

    const clearFilters = () => clearDrawerFilters();

    const findRecipes = () => {
        const requestParams = getRequestParams({
            allergens: selectedAllergens,
            meats: selectedMeats,
            sides: selectedSides,
            searchInput,
            subCategories: selectedSubCategory?.id
                ? [selectedSubCategory.id]
                : selectedSubCategories,
        });

        // если выбрана подкатегория то не нужен запрос в рамках выбранной подкатегории
        // если категории нет - то это главная страница и все выбранные подкакатегории
        dispatch(setIsFiltering(true));
        dispatch(setSelectedPage(1));
        fetchRecipes(requestParams);

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
                isLoading={isFetching}
                loadingText='Ищем рецепты...'
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
