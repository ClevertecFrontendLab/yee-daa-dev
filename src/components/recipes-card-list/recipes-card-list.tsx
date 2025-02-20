import { Button, Center } from '@chakra-ui/react';
import { FC, useState } from 'react';

import { Recipe } from '../../types/recipe';
import { CardList } from '../card-list';

type RecipeCardListProps = { recipeList: Recipe[] };

export const RecipeCardList: FC<RecipeCardListProps> = ({ recipeList }) => {
    const [visibleCount, setVisibleCount] = useState(8);
    const loadMoreRecipes = () => {
        setVisibleCount((prevCount) => prevCount + 8);
    };

    return (
        <>
            <CardList recipeList={recipeList.slice(0, visibleCount)} />
            <Center mt={4}>
                {visibleCount < recipeList.length && (
                    <Button bg={'lime.400'} mb={10} onClick={loadMoreRecipes}>
                        Загрузить ещё
                    </Button>
                )}
            </Center>
        </>
    );
};
