import { FILTER_TITLES } from '../../../constants/filters';

type SelectedItems = {
    selectedCategories?: string[];
    selectedCuisines?: string[];
    selectedAuthors?: string[];
    selectedMeats?: string[];
    selectedSides?: string[];
};

export const getSelectedItems = (filterTitle: string, selectedItems: SelectedItems) => {
    switch (filterTitle) {
        case FILTER_TITLES.CATEGORY:
            return selectedItems.selectedCategories;
        case FILTER_TITLES.CUISINE:
            return selectedItems.selectedCuisines;
        case FILTER_TITLES.AUTHOR_SEARCH:
            return selectedItems.selectedAuthors;
        case FILTER_TITLES.MEAT:
            return selectedItems.selectedMeats;
        case FILTER_TITLES.SIDE:
            return selectedItems.selectedSides;
        default:
            return [];
    }
};
