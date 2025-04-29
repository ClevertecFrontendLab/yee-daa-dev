import { Button, Image } from '@chakra-ui/icons';
import { Heading, HStack } from '@chakra-ui/react';
import { FC } from 'react';
import { NavLink, useLocation } from 'react-router';

import { useAppSelector } from '~/hooks/typed-react-redux-hooks.ts';
import { useGetRecipePath } from '~/hooks/use-get-recipe-path';
import { Recipe } from '~/redux/api/types/recipes';
import { selectCategoriesMenu, selectSubCategories } from '~/redux/features/categories-slice.ts';
import { getAbsoluteImagePath } from '~/utils/get-absolute-image-path';

export const ShortFoodCard: FC<Recipe> = (recipe) => {
    const { title, categoriesIds } = recipe;
    // для ссылки будем брать первый элемент
    const { pathname: currPath } = useLocation();
    const pathToRecipe = useGetRecipePath(recipe);
    const { pathname } = useLocation();

    const categories = useAppSelector(selectCategoriesMenu);
    const subCategories = useAppSelector(selectSubCategories);

    const recipeSubCategoryId = categoriesIds?.at(0) ?? '';
    const foundSubCategory = subCategories.find((elem) => elem.id === recipeSubCategoryId);
    const foundCategory = categories.find(
        (category) => category.id === foundSubCategory?.rootCategoryId,
    );

    return (
        <HStack
            border='1px solid rgba(0, 0, 0, 0.08)'
            padding={{ base: '8px 12px', md: '12px 24px' }}
            borderRadius='8px'
            alignItems='center'
            spacing={2}
        >
            <Image src={getAbsoluteImagePath(foundCategory?.icon)} alt={categoriesIds[0]} />
            <Heading
                fontSize={{ base: 'md', md: 'xl' }}
                noOfLines={1}
                fontWeight={500}
                flexGrow={1}
            >
                {title}
            </Heading>
            <Button
                variant='outline'
                color='lime.600'
                borderColor='lime.600'
                size='sm'
                flexShrink={0}
            >
                <NavLink to={pathToRecipe ?? currPath} state={{ fromPage: pathname }}>
                    Готовить
                </NavLink>
            </Button>
        </HStack>
    );
};
