import { Button, Center } from '@chakra-ui/react';
import { FC, useState } from 'react';

import { Recipe } from '~/redux/api/types/recipes';

import { CardList } from '../card-list';

type RecipeCardListProps = { recipeList: Recipe[] };

const maxVisibleCount = 8;

export const RecipeCardList: FC<RecipeCardListProps> = ({ recipeList }) => {
    const [visibleCount, setVisibleCount] = useState(maxVisibleCount);
    const loadMoreRecipes = () => {
        setVisibleCount((prevCount) => prevCount + maxVisibleCount);
    };

    return (
        <>
            <CardList recipeList={recipeList.slice(0, visibleCount)} />
            <Center mt={4}>
                {visibleCount < recipeList.length && (
                    <Button bg='lime.400' mb={10} onClick={loadMoreRecipes}>
                        Загрузить ещё
                    </Button>
                )}
            </Center>
        </>
    );
};
