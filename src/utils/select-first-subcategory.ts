import { MenuItem } from '~/types/category';

import { isArrayWithItems } from './is-array-with-items';

export const selectFirstSubcategory = (category: MenuItem) =>
    isArrayWithItems(category?.subCategories) ? category.subCategories[0].category : null;
