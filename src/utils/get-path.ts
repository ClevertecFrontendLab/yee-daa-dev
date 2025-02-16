import { MenuItem } from '../types/category';

export const getPath = (
    allcategories: MenuItem[],
    category: string[],
    subcategory: string[],
    id: string,
) => {
    const subItems = allcategories.find((cat) => cat.category === category[0])?.subItems;

    const subcategoryPath = subItems
        ?.filter((item) => subcategory.includes(item.category))
        .map((item) => item.category);

    return `/${category[0]}/${subcategoryPath}/${id}`;
};
