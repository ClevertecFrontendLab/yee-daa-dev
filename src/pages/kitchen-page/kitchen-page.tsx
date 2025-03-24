import { Center } from '@chakra-ui/react';
import { FC, Fragment } from 'react';
import { shallowEqual } from 'react-redux';

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
import { useAppDispatch, useAppSelector } from '~/hooks/typed-react-redux-hooks.ts';
import { useDetectParams } from '~/hooks/use-detect-params.ts';
import { useGetAllRecipesMergeQuery } from '~/redux/api/services/recipes-api';
import { selectSelectedAllergens } from '~/redux/features/allergens-slice';
import { selectSelectedSubCategoriesIds } from '~/redux/features/categories-slice';
import { selectIsFiltering } from '~/redux/features/filter-drawer-slice';
import { selectSelectedMeats } from '~/redux/features/meats-slice';
import { selectFilteredRecipes } from '~/redux/features/recipes-slice';
import {
    selectInputValue,
    selectSelectedPage,
    setSelectedPage,
} from '~/redux/features/search-slice';
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

    const { selectedCategory, selectedSubCategory } = useDetectParams();
    const dispatch = useAppDispatch();

    const selectedAllergens = useAppSelector(selectSelectedAllergens, shallowEqual);
    const filteredRecipes = useAppSelector(selectFilteredRecipes, shallowEqual);
    const selectedMeats = useAppSelector(selectSelectedMeats, shallowEqual);
    const searchInputValue = useAppSelector(selectInputValue);
    const selectedSides = useAppSelector(selectSelectedSides, shallowEqual);
    const selectedSubcategories = useAppSelector(selectSelectedSubCategoriesIds, shallowEqual);
    const isFiltering = useAppSelector(selectIsFiltering);
    const selectedPage = useAppSelector(selectSelectedPage);

    const requestParams = getRequestParams({
        allergens: selectedAllergens,
        meats: selectedMeats,
        searchInput: searchInputValue,
        sides: selectedSides,
        subCategories: selectedSubcategories,
        page: selectedPage,
    });

    const isFilteringWithCategory = selectedSubCategory?.id && isFiltering;

    // для запросов с главной страницы
    const { data: allRecipes, isFetching } = useGetAllRecipesMergeQuery(
        { ...requestParams, limit: FILTERED_RECIPES_LIMIT },
        { skip: isJuiciestPage || !isFiltering || Boolean(selectedSubCategory?.id) },
    );

    // для запросов внутри выбранной категории
    const { data: recipesData, isFetching: isFetchingByCategory } = useGetAllRecipesMergeQuery(
        {
            ...requestParams,
            limit: FILTERED_RECIPES_LIMIT,
            subcategoriesIds: selectedSubCategory?.id ? [selectedSubCategory.id] : [],
        },
        { skip: isJuiciestPage || !selectedSubCategory?.id || !isFiltering },
    );
    const subCategoryRecipes = recipesData?.data ?? [];
    const allFilteredRecipes = allRecipes?.data ?? [];

    const totalPages =
        (isFilteringWithCategory && recipesData?.meta?.totalPages) ||
        allRecipes?.meta?.totalPages ||
        1;

    const loadMoreCallback = () => {
        dispatch(setSelectedPage(selectedPage + 1));
    };

    const isFilteredRecipesShowed = isArrayWithItems(filteredRecipes);

    return (
        <Fragment key='kitchen-page'>
            <SectionHeader pageType={pageType} />

            {isFilteredRecipesShowed ? (
                <Fragment key='filtered part'>
                    <Center w='100%' flexWrap='wrap'>
                        <CriteriaTagsList withAllergens={false} />
                    </Center>
                    <RecipeCardList
                        recipeList={
                            isFilteringWithCategory ? subCategoryRecipes : allFilteredRecipes
                        }
                        currentPage={selectedPage}
                        isLoading={isFetching || isFetchingByCategory}
                        totalPages={totalPages}
                        loadMoreCallback={loadMoreCallback}
                    />
                </Fragment>
            ) : (
                <Fragment key='usual part'>
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
