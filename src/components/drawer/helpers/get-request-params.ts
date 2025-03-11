import { AllRecipeParams } from '~/redux/api/types/recipes';
import { isArrayWithItems } from '~/utils/is-array-with-items';

export const getRequestParams = ({
    subCategories,
    meats,
    sides,
    allergens,
    searchInput,
    page = 1,
}: {
    subCategories: string[];
    meats: string[];
    sides: string[];
    allergens: string[];
    searchInput: string;
    page?: number;
}): AllRecipeParams => {
    const result: AllRecipeParams = {};
    if (isArrayWithItems(subCategories)) {
        result.subcategoriesIds = subCategories;
    }
    if (isArrayWithItems(meats)) {
        result.meat = meats.map((elem) => elem.toLowerCase());
    }
    if (isArrayWithItems(sides)) {
        result.garnish = sides.map((elem) => elem.toLowerCase());
    }

    if (isArrayWithItems(allergens)) {
        result.allergens = allergens.map((elem) => elem.toLowerCase());
    }
    if (searchInput) {
        result.searchString = searchInput;
    }

    result.page = page;
    return result;
};
