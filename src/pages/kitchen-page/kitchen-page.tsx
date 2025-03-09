import { FC, Fragment, useEffect, useState } from 'react';

import { BlogSection } from '~/components/blog-section/blog-section.tsx';
import { Carousel } from '~/components/carousel/carousel.tsx';
import { FavoritesBlock } from '~/components/favorites-block/favorites-block';
import { KitchenTabs } from '~/components/kitchen-tabs/kitchen-tabs.tsx';
import { RecipeCardList } from '~/components/recipes-card-list/recipes-card-list.tsx';
import { RelevantKitchen } from '~/components/relevant-kitchen';
import { SectionHeader } from '~/components/section-header';
import { JuiciestRecipesList } from '~/containers/juiciest-recipes-list/juiciest-recipes-list.tsx';
import { useAppDispatch, useAppSelector } from '~/hooks/typed-react-redux-hooks.ts';
import { useDetectParams } from '~/hooks/use-detect-params.ts';
// import { JUICIEST_PAGE_PARAMS } from '~/redux/api/constants.ts';
// import { useGetAllRecipesWithParamsQuery } from '~/redux/api/services/recipes-api/index.ts';
// import { Recipe } from '~/redux/api/types/recipes.ts';
import {
    selectFilteredByAllergens,
    selectFromFilter,
    selectSelectedAllergens,
    setFilteredByAllergens,
} from '~/redux/features/allergens-slice.ts';
import { selectFilteredRecipes, selectRecipes } from '~/redux/features/recipes-slice';
import {
    selectInputValue,
    selectMatchedRecipes,
    setInputValue,
    setMatchedRecipes,
} from '~/redux/features/search-slice.ts';
import { PageType } from '~/types/page.ts';
import { filterRecipes } from '~/utils/filter-recipes.ts';
import { isArrayWithItems } from '~/utils/is-array-with-items.ts';

// import { filterRecipesByTitle } from './helpers/filter-by-title.ts';

type KitchenPageProps = {
    pageType: PageType;
};

export const KitchenPage: FC<KitchenPageProps> = ({ pageType }) => {
    const isMainPage = pageType === PageType.Main;
    const isCategoryPage = pageType === PageType.Category;
    const isJuiciestPage = pageType === PageType.Juiciest;

    const { selectedCategory } = useDetectParams();
    // const { data: juiciest } = useGetAllRecipesWithParamsQuery(
    //     { ...JUICIEST_PAGE_PARAMS, page: 1 },
    //     {
    //         skip: !isJuiciestPage,
    //     },
    // );

    // const recipesJuiciestPage = juiciest?.data;

    const dispatch = useAppDispatch();
    const recipes = useAppSelector(selectRecipes);

    const matchedRecipes = useAppSelector(selectMatchedRecipes);
    const selectedAllergens = useAppSelector(selectSelectedAllergens);
    const filteredByAllergens = useAppSelector(selectFilteredByAllergens);
    const filteredRecipes = useAppSelector(selectFilteredRecipes);
    const fromFilter = useAppSelector(selectFromFilter);

    const [startSearch, setStartSearch] = useState(false);
    const searchValue = useAppSelector(selectInputValue);

    // const searchRecipes: Record<PageType, Recipe[]> = {
    //     main: recipes,
    //     juiciest: recipesJuiciestPage!,
    //     category: [],
    // };

    // TODO перенести логику серча в компоненту поиска и закрепить за запросом
    const handleSearch = (inputValue: string) => {
        console.log('SEARCH_CHANGED', inputValue);
        // setStartSearch(true);

        // let nameFiltered: Recipe[] | undefined;

        // if (filteredRecipes.length) {
        //     nameFiltered = filterRecipesByTitle(filteredRecipes, inputValue);
        // } else if (filteredByAllergens.length) {
        //     nameFiltered = filterRecipesByTitle(filteredByAllergens, inputValue);
        // } else {
        //     nameFiltered = filterRecipesByTitle(searchRecipes[pageType] || [], inputValue);
        // }

        // dispatch(setMatchedRecipes(nameFiltered));
    };

    useEffect(() => {
        dispatch(setInputValue(''));
        setStartSearch(false);
    }, [dispatch, selectedCategory]);

    useEffect(() => {
        if (!searchValue) {
            dispatch(setMatchedRecipes([]));
            setStartSearch(false);
        }
    }, [dispatch, searchValue]);

    useEffect(() => {
        const recipesToFilter =
            (filteredRecipes.length && filteredRecipes) || (recipes.length && recipes) || [];

        if (selectedAllergens.length && !fromFilter) {
            const getAllergensRecipes = () => filterRecipes(recipesToFilter, selectedAllergens);

            const allergensRecipes = getAllergensRecipes();

            dispatch(setFilteredByAllergens(allergensRecipes));
        } else {
            dispatch(setFilteredByAllergens([]));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedAllergens]);

    return (
        <Fragment key='kitchen-page'>
            <SectionHeader onSearch={handleSearch} pageType={pageType} startSearch={startSearch} />

            {startSearch && isArrayWithItems(matchedRecipes) && (
                <RecipeCardList recipeList={matchedRecipes} />
            )}
            {!startSearch && (
                <Fragment key='search-filter-page-flow'>
                    {fromFilter && isArrayWithItems(filteredRecipes) && (
                        <RecipeCardList recipeList={filteredRecipes} />
                    )}
                    {!fromFilter && isArrayWithItems(filteredByAllergens) && (
                        <RecipeCardList recipeList={filteredByAllergens} />
                    )}
                    {!fromFilter &&
                        !isArrayWithItems(filteredByAllergens) &&
                        isArrayWithItems(filteredRecipes) && (
                            <RecipeCardList recipeList={filteredRecipes} />
                        )}
                    {!isArrayWithItems(filteredRecipes) &&
                        !isArrayWithItems(filteredByAllergens) && (
                            <Fragment key='all-pages-flow'>
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
                </Fragment>
            )}

            <RelevantKitchen />
        </Fragment>
    );
};
