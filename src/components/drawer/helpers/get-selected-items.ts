import { FILTER_TITLES } from '../../../constants/filters';
import { MenuItem } from '../../../types/category';
import { FoodItem } from '../../../types/food-item';
import { UserProps } from '../../../types/user';

type SelectedItems = {
    selectedCategories: string[];
    selectedAuthors: string[];
    selectedMeats: string[];
    selectedSides: string[];
};

type AllItems = {
    allCategories: MenuItem[];
    allAuthors: UserProps[];
    allMeats: FoodItem[];
    allSides: FoodItem[];
};

export const getSelectedItems = (filterTitle: string, selectedItems: SelectedItems) => {
    switch (filterTitle) {
        case FILTER_TITLES.CATEGORY:
            return selectedItems.selectedCategories;
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

export const getTranslatedMenuItem = (selectedMenuItems: string[], allMenuItems: MenuItem[]) => {
    return selectedMenuItems
        .map((selected) => {
            const item = allMenuItems.find((it) => it.category === selected);
            return item ? item.title : null;
        })
        .filter(Boolean);
};

export const getTranslatedFoodItem = (selectedFoodItems: string[], allFoodItems: FoodItem[]) => {
    return selectedFoodItems
        .map((selected) => {
            const item = allFoodItems.find((it) => it.value === selected);
            return item ? item.label : null;
        })
        .filter(Boolean);
};

export const getTranslatedAuthor = (selectedAuthors: string[], allAuthors: UserProps[]) => {
    return selectedAuthors
        .map((selected) => {
            const author = allAuthors.find((au) => au.login === selected);
            return author ? `${author.lastName} ${author.firstName}` : null;
        })
        .filter(Boolean);
};

export const translateSelectedItems = (
    filterTitle: string,
    selectedItems: SelectedItems,
    allItems: AllItems,
) => {
    switch (filterTitle) {
        case FILTER_TITLES.CATEGORY:
            return getTranslatedMenuItem(selectedItems.selectedCategories, allItems.allCategories);

        case FILTER_TITLES.AUTHOR_SEARCH:
            return getTranslatedAuthor(selectedItems.selectedAuthors, allItems.allAuthors);
    }
};

export const getEnglishMenuItem = (title: string, menuItem: MenuItem[]) => {
    const item = menuItem.find((cat) => cat.title === title);
    return item ? item.category : null;
};

export const getEnglishFoodItem = (label: string, foodItems: FoodItem[]) => {
    const item = foodItems.find((food) => food.label === label);
    return item ? item.value : null;
};

export const getEnglishAuthor = (fullName: string, allAuthors: UserProps[]) => {
    const author = allAuthors.find((au) => `${au.lastName}${au.firstName}` === fullName);
    return author ? author.login : null;
};
