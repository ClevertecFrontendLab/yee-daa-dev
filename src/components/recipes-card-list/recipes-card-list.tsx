import { Box, Button, Center, SimpleGridProps } from '@chakra-ui/react';
import { FC } from 'react';

import { Recipe } from '~/redux/api/types/recipes';

import { CardList } from '../card-list';

type RecipeCardListProps = {
    recipeList: Recipe[];
    currentPage?: number;
    totalPages?: number;
    loadMoreCallback?: () => void;
    isLoading?: boolean;
} & SimpleGridProps;

export const RecipeCardList: FC<RecipeCardListProps> = ({
    recipeList,
    loadMoreCallback,
    currentPage = 1,
    totalPages = 1,
    isLoading = false,
    ...rest
}) => (
    <Box>
        <CardList recipeList={recipeList} {...rest} />
        {currentPage < totalPages && (
            <Center mt={{ base: 3, sm: 4 }}>
                <Button
                    data-test-id='load-more-button'
                    bg='lime.400'
                    onClick={loadMoreCallback}
                    isLoading={isLoading}
                    loadingText='Загрузка...'
                >
                    Загрузить ещё
                </Button>
            </Center>
        )}
    </Box>
);
