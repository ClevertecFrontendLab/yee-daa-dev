import { useMemo } from 'react';

import {
    getSelectedItems,
    translateSelectedItems,
} from '../components/drawer/helpers/get-selected-items';
import { selectAuthors, selectSelectedAuthors } from '../redux/features/authors-slice';
import { selectCategoriesMenu, selectSelectedCategories } from '../redux/features/categories-slice';
import { selectMeats, selectSelectedMeats } from '../redux/features/meats-slice';
import { selectSelectedSides, selectSides } from '../redux/features/sides-slice';
import { useAppSelector } from './typed-react-redux-hooks';

export const useSelectedItems = (filterTitle: string) => {
    const selectedCategories = useAppSelector(selectSelectedCategories);
    const selectedAuthors = useAppSelector(selectSelectedAuthors);
    const selectedMeats = useAppSelector(selectSelectedMeats);
    const selectedSides = useAppSelector(selectSelectedSides);

    const allCategories = useAppSelector(selectCategoriesMenu);
    const allAuthors = useAppSelector(selectAuthors);
    const allMeats = useAppSelector(selectMeats);
    const allSides = useAppSelector(selectSides);

    const selectedItems = useMemo(
        () => ({
            selectedCategories,
            selectedAuthors,
            selectedMeats,
            selectedSides,
        }),
        [selectedCategories, selectedAuthors, selectedMeats, selectedSides],
    );

    const allItems = useMemo(
        () => ({
            allCategories,
            allAuthors,
            allMeats,
            allSides,
        }),
        [allCategories, allAuthors, allMeats, allSides],
    );

    const selectedItemsResult = useMemo(() => {
        return getSelectedItems(filterTitle, selectedItems);
    }, [filterTitle, selectedItems]);

    const selectedTranslatedItems = useMemo(() => {
        return translateSelectedItems(filterTitle, selectedItems, allItems);
    }, [filterTitle, selectedItems, allItems]);

    return { selectedItemsResult, selectedTranslatedItems };
};
