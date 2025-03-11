import { useCallback } from 'react';

import { clearSelectedAllergens } from '~/redux/features/allergens-slice';
import { clearSelectedAuthors } from '~/redux/features/authors-slice';
import { resetSelectedCategories } from '~/redux/features/categories-slice';
import { clearSelectedMeats } from '~/redux/features/meats-slice';
import { clearFilteredRecipes } from '~/redux/features/recipes-slice';
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
        dispatch(clearSelectedAllergens());
    }, [dispatch]);

    const clearSearchInputBlock = useCallback(() => {
        dispatch(setInputValue(''));
        dispatch(clearFilteredRecipes());
        dispatch(resetSelectedCategories());
    }, [dispatch]);

    return { clearDrawerFilters, clearSearchInputBlock };
};
