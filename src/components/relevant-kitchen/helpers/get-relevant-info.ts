import { Category } from '~/redux/api/types/categories';
import { getRandom } from '~/utils/get-random';

export const getRelevantInfo = (categories: Category[]) => {
    const randomInd = getRandom(categories.length);
    const randomCategory = categories[randomInd];

    const title = randomCategory?.title;
    const description = randomCategory?.description;
    const firstSubCategoryId = randomCategory?.subCategories?.[0]?.id;

    return { title, description, firstSubCategoryId };
};
