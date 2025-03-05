import { FC, Fragment, useEffect, useState } from 'react';

import { BlogSection } from '~/components/blog-section/blog-section.tsx';
import { Carousel } from '~/components/carousel/carousel.tsx';
import { FavouritesBlock } from '~/components/favourites-block/favourites-block.tsx';
import { KitchenTabs } from '~/components/kitchen-tabs/kitchen-tabs.tsx';
import { RecipeCardList } from '~/components/recipes-card-list/recipes-card-list.tsx';
import { RelevantKitchen } from '~/components/relevant-kitchen';
import { SectionBox } from '~/components/section-box/section-box.tsx';
import { SectionHeader } from '~/components/section-header';
import { useAppDispatch, useAppSelector } from '~/hooks/typed-react-redux-hooks.ts';
import { useDetectParams } from '~/hooks/use-detect-params.ts';
import { Recipe } from '~/redux/api/types/recipes.ts';
import {
    selectFilteredByAllergens,
    selectisfromFilter,
    selectSelectedAllergens,
    setFilteredByAllergens,
} from '~/redux/features/allergens-slice.ts';
import { selectCategoriesMenu } from '~/redux/features/categories-slice.ts';
import { selectFilteredRecipes, selectRecipes } from '~/redux/features/recipies-slice.ts';
import {
    selectInputValue,
    selectMatchedRecipes,
    setInputValue,
    setMatchedRecipes,
} from '~/redux/features/search-slice.ts';
import { PageType } from '~/types/page.ts';
import { filterRecipes } from '~/utils/filter-recipes.ts';
import { isArrayWithItems } from '~/utils/is-array-with-items.ts';

import { filterRecipesByTitle } from './helpers/filter-by-title.ts';
import { getCategoryRecipes, getFavoritesRecipes } from './helpers/get-recipes.ts';

type KitchenPageProps = {
    pageType: PageType;
    relevantTitle?: string;
    relevantDesc?: string;
};

export const KitchenPage: FC<KitchenPageProps> = ({ pageType }) => {
    const { selectedCategory, selectedSubCategory } = useDetectParams();
    const dispatch = useAppDispatch();
    const recipes = useAppSelector(selectRecipes);

    const categories = useAppSelector(selectCategoriesMenu);
    const matchedRecipes = useAppSelector(selectMatchedRecipes);
    const selectedAllergens = useAppSelector(selectSelectedAllergens);
    const filteredByAllergens = useAppSelector(selectFilteredByAllergens);
    const filteredRecipes = useAppSelector(selectFilteredRecipes);
    const isfromFilter = useAppSelector(selectisfromFilter);

    const [relevantRecipes, setRelevantRecipes] = useState([] as Recipe[]);
    const [relevantTitle, setRelevantTitle] = useState('');
    const [relevantDesc, setRelevantDesc] = useState('');
    const [startSearch, setStartSearch] = useState(false);
    const searchValue = useAppSelector(selectInputValue);

    const isMainPage = pageType === PageType.Main;
    const isCategoryPage = pageType === PageType.Category;
    const isJuiciestPage = pageType === PageType.Juiciest;

    const favoritesRecipes = getFavoritesRecipes(recipes);
    const categoryRecipes = getCategoryRecipes(recipes, selectedCategory, selectedSubCategory);

    const searchRecipes: Record<PageType, Recipe[]> = {
        main: recipes,
        juiciest: favoritesRecipes,
        category: categoryRecipes,
    };

    // TODO перенести логику серча в компоненту поиска и закрепить за запросом
    const handleSearch = (inputValue: string) => {
        setStartSearch(true);

        let nameFiltered: Recipe[] | undefined;

        if (filteredRecipes.length) {
            nameFiltered = filterRecipesByTitle(filteredRecipes, inputValue);
        } else if (filteredByAllergens.length) {
            nameFiltered = filterRecipesByTitle(filteredByAllergens, inputValue);
        } else {
            nameFiltered = filterRecipesByTitle(searchRecipes[pageType] || [], inputValue);
        }

        dispatch(setMatchedRecipes(nameFiltered));
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
        const randomCategory = categories[Math.floor(Math.random() * categories.length)];

        setRelevantTitle(randomCategory.title);
        setRelevantDesc(randomCategory.description ?? '');

        const relatedRecipes = recipes.filter((recipe) =>
            recipe.categoriesIds.includes(randomCategory.category),
        );

        setRelevantRecipes(relatedRecipes);
    }, [categories, recipes]);

    useEffect(() => {
        const recipesToFilter =
            (filteredRecipes.length && filteredRecipes) ||
            (categoryRecipes.length && categoryRecipes) ||
            (recipes.length && recipes) ||
            [];

        if (selectedAllergens.length && !isfromFilter) {
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
                    {isfromFilter && isArrayWithItems(filteredRecipes) && (
                        <RecipeCardList recipeList={filteredRecipes} />
                    )}
                    {!isfromFilter && isArrayWithItems(filteredByAllergens) && (
                        <RecipeCardList recipeList={filteredByAllergens} />
                    )}
                    {!isfromFilter &&
                        !isArrayWithItems(filteredByAllergens) &&
                        isArrayWithItems(filteredRecipes) && (
                            <RecipeCardList recipeList={filteredRecipes} />
                        )}
                    {!isArrayWithItems(filteredRecipes) &&
                        !isArrayWithItems(filteredByAllergens) && (
                            <Fragment key='all-pages-flow'>
                                {isCategoryPage && <KitchenTabs recipeList={categoryRecipes} />}
                                {isJuiciestPage && (
                                    <SectionBox>
                                        <RecipeCardList recipeList={favoritesRecipes} />
                                    </SectionBox>
                                )}
                                {(isMainPage || !selectedCategory) && (
                                    <Fragment key='main-page-flow'>
                                        <Carousel />
                                        <FavouritesBlock />
                                        <BlogSection />
                                    </Fragment>
                                )}
                            </Fragment>
                        )}
                </Fragment>
            )}

            <RelevantKitchen
                recipes={relevantRecipes}
                title={relevantTitle}
                description={relevantDesc}
            />
        </Fragment>
    );
};
