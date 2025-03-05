import { Button, Image } from '@chakra-ui/icons';
import { Heading, HStack } from '@chakra-ui/react';
import { FC } from 'react';
import { NavLink } from 'react-router';

import { categoriesMap } from '~/constants/categories.ts';
import { useAppSelector } from '~/hooks/typed-react-redux-hooks.ts';
import { Recipe } from '~/redux/api/types/recipes';
import { selectCategoriesMenu } from '~/redux/features/categories-slice.ts';
import { selectChoosenCategory } from '~/redux/features/choosen-category-slice.ts';
import { selectRecipes } from '~/redux/features/recipies-slice.ts';
import { getPath } from '~/utils/get-path.ts';

export const ShortFoodCard: FC<Recipe> = ({ id, categoriesIds, title }) => {
    const allRecipes = useAppSelector(selectRecipes);
    const allcategories = useAppSelector(selectCategoriesMenu);
    const choosenCategory = useAppSelector(selectChoosenCategory);
    const categoryPath = getPath(allcategories, allRecipes, choosenCategory, id);

    return (
        <HStack
            border='1px solid rgba(0, 0, 0, 0.08)'
            padding={{ base: '8px 12px', md: '12px 24px' }}
            borderRadius='8px'
            alignItems='center'
            spacing={2}
        >
            <Image src={categoriesMap[categoriesIds[0]]} alt={categoriesIds[0]} />
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
                <NavLink to={categoryPath}>Готовить</NavLink>
            </Button>
        </HStack>
    );
};
