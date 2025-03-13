import { useCallback } from 'react';

import { resetAllergenSlice } from '~/redux/features/allergens-slice';
import { clearSelectedAuthors } from '~/redux/features/authors-slice';
import { resetSelectedCategories } from '~/redux/features/categories-slice';
import { setIsFiltering } from '~/redux/features/filter-drawer-slice';
import { clearSelectedMeats } from '~/redux/features/meats-slice';
import { clearFilteredRecipes, setShowedEmptyText } from '~/redux/features/recipes-slice';
import { setInputValue } from '~/redux/features/search-slice';
import { clearSelectedSides } from '~/redux/features/sides-slice';

import { useAppDispatch } from './typed-react-redux-hooks';

export const useClearFiltersWithSearch = () => {
    const dispatch = useAppDispatch();

    const clearDrawerFilters = useCallback(() => {
        dispatch(clearSelectedAuthors());
        dispatch(resetSelectedCategories());
        dispatch(clearSelectedMeats());
        dispatch(clearSelectedSides());
        dispatch(resetAllergenSlice());
    }, [dispatch]);

    const clearSearchInputBlock = useCallback(() => {
        dispatch(setInputValue(''));
        dispatch(clearFilteredRecipes());
        dispatch(resetSelectedCategories());
    }, [dispatch]);

    const commonClear = useCallback(() => {
        dispatch(setShowedEmptyText(false));
        dispatch(setIsFiltering(false));
    }, [dispatch]);

    return { clearDrawerFilters, clearSearchInputBlock, commonClear };
};
