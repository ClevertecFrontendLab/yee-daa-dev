import { Button, Center } from '@chakra-ui/react';
import { FC } from 'react';

import { Recipe } from '~/redux/api/types/recipes';

import { CardList } from '../card-list';

type RecipeCardListProps = {
    recipeList: Recipe[];
    currentPage?: number;
    totalPages?: number;
    loadMoreCallback?: VoidFunction;
    isLoading?: boolean;
};

export const RecipeCardList: FC<RecipeCardListProps> = ({
    recipeList,
    loadMoreCallback,
    currentPage = 1,
    totalPages = 1,
    isLoading = false,
}) => (
    <>
        <CardList recipeList={recipeList} />
        {currentPage < totalPages && (
            <Center mt={4}>
                <Button
                    data-test-id='load-more-button'
                    bg='lime.400'
                    mb={10}
                    onClick={loadMoreCallback}
                    isLoading={isLoading}
                    loadingText='Загрузка...'
                >
                    Загрузить ещё
                </Button>
            </Center>
        )}
    </>
);
