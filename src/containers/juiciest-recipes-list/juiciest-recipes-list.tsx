import { memo } from 'react';

import { RecipeCardList } from '~/components/recipes-card-list';
import { SectionBox } from '~/components/section-box/section-box';
import { JUICIEST_PAGE_PARAMS } from '~/redux/api/constants';
import { useGetAllRecipesInfiniteInfiniteQuery } from '~/redux/api/recipes-api';
import { isArrayWithItems } from '~/utils/is-array-with-items';

export const JuiciestRecipesList = memo(() => {
    const { isFetching, fetchNextPage, data } =
        useGetAllRecipesInfiniteInfiniteQuery(JUICIEST_PAGE_PARAMS);

    // data приходят как массив со страничками - где на каждой страничке есть свои данные, как и при обычном useQuery
    const recipesJuiciestPage = data?.pages.flatMap((elem) => elem.data) ?? [];
    const recipesTotalPage = data?.pages[0]?.meta?.totalPages ?? 1;
    const currentPage = data?.pages.at(-1)?.meta?.page ?? 1;

    const pageParams = data?.pageParams.flatMap((param) => param.page);
    // в массиве будет лежать столько элементов - сколько раз мы запросили данные
    const requestQuantity = pageParams?.length ?? 1;

    const loadMoreRecipes = () => {
        if (requestQuantity < recipesTotalPage) fetchNextPage();
    };

    return (
        isArrayWithItems(recipesJuiciestPage) && (
            <SectionBox>
                <RecipeCardList
                    recipeList={recipesJuiciestPage}
                    currentPage={currentPage}
                    isLoading={isFetching}
                    totalPages={recipesTotalPage}
                    loadMoreCallback={loadMoreRecipes}
                    mb={10}
                />
            </SectionBox>
        )
    );
});
