import { LoaderFunction } from 'react-router';

import { store } from '~/redux/configure-store';
import { resetAllergenSlice } from '~/redux/features/allergens-slice';
import { clearSelectedAuthors } from '~/redux/features/authors-slice';
import { resetSelectedCategories } from '~/redux/features/categories-slice';
import { setIsFiltering } from '~/redux/features/filter-drawer-slice';
import { clearSelectedMeats } from '~/redux/features/meats-slice';
import { clearFilteredRecipes, setShowedEmptyText } from '~/redux/features/recipes-slice';
import { setInputValue } from '~/redux/features/search-slice';
import { clearSelectedSides } from '~/redux/features/sides-slice';

export const clearFilterStateLoader: LoaderFunction = async () => {
    store.dispatch(setShowedEmptyText(false));
    store.dispatch(setIsFiltering(false));
    store.dispatch(setInputValue(''));
    store.dispatch(clearFilteredRecipes());
    store.dispatch(resetSelectedCategories());
    store.dispatch(clearSelectedAuthors());
    store.dispatch(resetSelectedCategories());
    store.dispatch(clearSelectedMeats());
    store.dispatch(clearSelectedSides());
    store.dispatch(resetAllergenSlice());
};
