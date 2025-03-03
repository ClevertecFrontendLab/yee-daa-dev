import { ReactNode } from 'react';
import { Navigate, useParams } from 'react-router';

import { Paths, routeParams } from '~/constants/path';
import { useAppSelector } from '~/hooks/typed-react-redux-hooks';
import { selectCategoriesMenu } from '~/redux/features/categories-slice';
import { isArrayWithItems } from '~/utils/is-array-with-items';

type CategoryExistProtectedProps = {
    children: ReactNode;
};

export const CategoryExistProtected = ({ children }: CategoryExistProtectedProps) => {
    const menuItems = useAppSelector(selectCategoriesMenu);
    const { categoryName, subCategoryName } = useParams<typeof routeParams>();

    const selectedCategory = menuItems.find((elem) => elem.category === categoryName);

    if (categoryName && selectedCategory && !subCategoryName) return children;

    const selectedSubCategory = isArrayWithItems(selectedCategory?.subCategories)
        ? selectedCategory.subCategories.find((subElem) => subElem.category === subCategoryName)
        : null;

    if (subCategoryName && selectedSubCategory) return children;

    return <Navigate to={Paths.ERROR} />;
};
