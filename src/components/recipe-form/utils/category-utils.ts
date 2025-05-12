import { Category, SubCategory } from '~/redux/api/types/categories';

interface GetRecipePathParams {
    categoriesIds: string[];
    subCategories: SubCategory[];
    categories: Category[];
}

export const getRecipePath = ({
    categories,
    categoriesIds,
    subCategories,
}: GetRecipePathParams) => {
    const subCategory = subCategories.find(({ id }) => id === categoriesIds[0]);
    const mainCategory = categories.find(({ id }) => id === subCategory?.rootCategoryId);
    return `${mainCategory?.category}/${subCategory?.category}`;
};
