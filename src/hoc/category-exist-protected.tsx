import { ReactNode } from 'react';
import { Navigate, useParams } from 'react-router';

import { Paths, routeParams } from '~/constants/path';
import { useAppSelector } from '~/hooks/typed-react-redux-hooks';
import { selectCategoriesMenu, selectSubCategories } from '~/redux/features/categories-slice';

type CategoryExistProtectedProps = {
    children: ReactNode;
};

export const CategoryExistProtected = ({ children }: CategoryExistProtectedProps) => {
    const menuItems = useAppSelector(selectCategoriesMenu);
    const subCategories = useAppSelector(selectSubCategories);
    const { categoryName, subCategoryName } = useParams<typeof routeParams>();

    const selectedCategory = menuItems.find((elem) => elem.category === categoryName);

    if (categoryName && selectedCategory && !subCategoryName) return children;

    const selectedSubCategory = subCategories.find((item) => item.category === subCategoryName);

    if (subCategoryName && selectedSubCategory) return children;

    return <Navigate to={Paths.ERROR} replace={true} />;
};
