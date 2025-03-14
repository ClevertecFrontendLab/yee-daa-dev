import { Center } from '@chakra-ui/react';
import { FC, Fragment, useState } from 'react';

import { BlogSection } from '~/components/blog-section/blog-section.tsx';
import { Carousel } from '~/components/carousel/carousel.tsx';
import { CriteriaTagsList } from '~/components/criteria-tags-list';
import { getRequestParams } from '~/components/drawer/helpers/get-request-params';
import { FavoritesBlock } from '~/components/favorites-block/favorites-block';
import { KitchenTabs } from '~/components/kitchen-tabs/kitchen-tabs.tsx';
import { RecipeCardList } from '~/components/recipes-card-list/recipes-card-list.tsx';
import { RelevantKitchen } from '~/components/relevant-kitchen';
import { SectionHeader } from '~/components/section-header';
import { FILTERED_RECIPES_LIMIT } from '~/constants/general';
import { JuiciestRecipesList } from '~/containers/juiciest-recipes-list/juiciest-recipes-list.tsx';
import { useAppSelector } from '~/hooks/typed-react-redux-hooks.ts';
import { useDetectParams } from '~/hooks/use-detect-params.ts';
import { useGetAllRecipesMergeQuery } from '~/redux/api/services/recipes-api';
import { selectSelectedAllergens } from '~/redux/features/allergens-slice';
import { selectSelectedSubCategoriesIds } from '~/redux/features/categories-slice';
import { selectIsFiltering } from '~/redux/features/filter-drawer-slice';
import { selectSelectedMeats } from '~/redux/features/meats-slice';
import { selectFilteredRecipes } from '~/redux/features/recipes-slice';
import { selectInputValue } from '~/redux/features/search-slice';
import { selectSelectedSides } from '~/redux/features/sides-slice';
import { PageType } from '~/types/page.ts';
import { isArrayWithItems } from '~/utils/is-array-with-items.ts';

type KitchenPageProps = {
    pageType: PageType;
};

export const KitchenPage: FC<KitchenPageProps> = ({ pageType }) => {
    const isMainPage = pageType === PageType.Main;
    const isCategoryPage = pageType === PageType.Category;
    const isJuiciestPage = pageType === PageType.Juiciest;

    const { selectedCategory } = useDetectParams();

    const filteredRecipes = useAppSelector(selectFilteredRecipes);
    const selectedAllergens = useAppSelector(selectSelectedAllergens);
    const selectedMeats = useAppSelector(selectSelectedMeats);
    const searchInputValue = useAppSelector(selectInputValue);
    const selectedSides = useAppSelector(selectSelectedSides);
    const selectedSubcategories = useAppSelector(selectSelectedSubCategoriesIds);
    const isFiltering = useAppSelector(selectIsFiltering);

    const [currentPage, setCurrentPage] = useState(1);

    const requestParams = getRequestParams({
        allergens: selectedAllergens,
        meats: selectedMeats,
        searchInput: searchInputValue,
        sides: selectedSides,
        subCategories: selectedSubcategories,
    });

    const { data, refetch, isFetching } = useGetAllRecipesMergeQuery(
        { ...requestParams, limit: FILTERED_RECIPES_LIMIT },
        { skip: isJuiciestPage || !isFiltering },
    );

    const totalPages = data?.meta?.totalPages ?? 1;

    const loadMoreCallback = () => {
        setCurrentPage((prev) => prev + 1);
        refetch();
    };

    const isFilteredRecipesShowed = isArrayWithItems(filteredRecipes);

    return (
        <Fragment key='kitchen-page'>
            <SectionHeader pageType={pageType} />

            {isFilteredRecipesShowed && (
                <>
                    <Center w='100%' flexWrap='wrap'>
                        <CriteriaTagsList withAllergens={false} />
                    </Center>
                    <RecipeCardList
                        recipeList={filteredRecipes}
                        currentPage={currentPage}
                        isLoading={isFetching}
                        totalPages={totalPages}
                        loadMoreCallback={loadMoreCallback}
                    />
                </>
            )}
            {!isFilteredRecipesShowed && (
                <Fragment key='search-filter-page-flow'>
                    {isCategoryPage && <KitchenTabs />}
                    {isJuiciestPage && <JuiciestRecipesList />}
                    {(isMainPage || (!selectedCategory && !isJuiciestPage)) && (
                        <Fragment key='main-page-flow'>
                            <Carousel />
                            <FavoritesBlock />
                            <BlogSection />
                        </Fragment>
                    )}
                </Fragment>
            )}

            <RelevantKitchen />
        </Fragment>
    );
};
